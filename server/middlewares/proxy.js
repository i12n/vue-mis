'use strict';

var join = require('url').resolve;
var iconv = require('iconv-lite');
const config = require('config');
const axios = require('axios');

function proxy(options) {
  options || (options = {});

  if (!(options.host || options.map || options.url)) {
    throw new Error('miss options');
  }

  return async function (ctx, next) {
    if (typeof options.host === 'function') {
      options.host = options.host(ctx);
    }
    var url = resolve(ctx.path, options);

    if(typeof options.suppressRequestHeaders === 'object'){
      options.suppressRequestHeaders.forEach(function(h, i){
        options.suppressRequestHeaders[i] = h.toLowerCase();
      });
    }

    var suppressResponseHeaders = [];  // We should not be overwriting the options object!
    if(typeof options.suppressResponseHeaders === 'object'){
      options.suppressResponseHeaders.forEach(function(h, i){
        suppressResponseHeaders.push(h.toLowerCase());
      });
    }

    // don't match
    if (!url) {
      return await next;
    }

    // if match option supplied, restrict proxy to that match
    if (options.match) {
      if (!ctx.path.match(options.match)) {
        return await next;
      }
    }
    
    var parsedBody = getParsedBody(ctx);

    var opt = {
      url,
      headers: ctx.header,
      encoding: null,
      followRedirect: options.followRedirect === false ? false : true,
      method: ctx.method
    };

    if (opt.method == 'POST') {
      opt = { ...opt, data: ctx.request.body || {}};
    }

    if (opt.method == 'GET') {
      opt = { ...opt, params: ctx.request.query || {}};
    }
    // set 'Host' header to options.host (without protocol prefix), strip trailing slash
    if (options.host) opt.headers.host = options.host.slice(options.host.indexOf('://')+3).replace(/\/$/,'');

    if (options.requestOptions) {
      if (typeof options.requestOptions === 'function') {
        opt = options.requestOptions(ctx.request, opt);
      } else {
        Object.keys(options.requestOptions).forEach(function (option) { opt[option] = options.requestOptions[option]; });
      }
    }

    for(name in opt.headers){
      if(options.suppressRequestHeaders && options.suppressRequestHeaders.indexOf(name.toLowerCase()) >= 0){
        delete opt.headers[name];
      }
    }

    // var requestThunk = request(opt);

    /*if (parsedBody) {
      var res = await requestThunk;
    } else {
      // Is there a better way?
      // https://github.com/leukhin/co-request/issues/11
      var res = pipeRequest(ctx.req, requestThunk);
    }*/

    /*var res = await (function(){
      return new Promise((resolve, reject) => {
        request(opt, (error, response, body) => {
          resolve(response);
        });
      })
    })();*/

    var res = await axios(opt);

    ctx.status = res.status;
    for (var name in res.headers) {
      // http://stackoverflow.com/questions/35525715/http-get-parse-error-code-hpe-unexpected-content-length
      if(suppressResponseHeaders.indexOf(name.toLowerCase())>=0){
        continue;
      }
      if (name === 'transfer-encoding') {
        continue;
      }
      ctx.set(name, res.headers[name]);
    }

    if (options.encoding === 'gbk') {
      ctx.body = iconv.decode(res.data, 'gbk');
      return;
    }

    ctx.body = res.data;

    if (options.yieldNext) {
      await next;
    }
  };
};


function resolve(path, options) {
  var url = options.url;
  if (url) {
    if (!/^http/.test(url)) {
      url = options.host ? join(options.host, url) : null;
    }
    return ignoreQuery(url);
  }

  if (typeof options.map === 'object') {
    if (options.map && options.map[path]) {
      path = ignoreQuery(options.map[path]);
    }
  } else if (typeof options.map === 'function') {
    path = options.map(path);
  }

  return options.host ? join(options.host, path) : null;
}

function ignoreQuery(url) {
  return url ? url.split('?')[0] : null;
}

function getParsedBody(ctx){
  var body = ctx.request.body;
  if (body === undefined || body === null){
    return undefined;
  }

  var contentType = ctx.request.header['content-type'];
  /*if (!Buffer.isBuffer(body) && typeof body !== 'string'){
    if (contentType && contentType.indexOf('json') !== -1){
      body = JSON.stringify(body);
    } else {
      body = body + '';
    }
  }
  */
  return body;
}

function pipeRequest(readable, requestThunk){
  return function(cb){
    readable.pipe(requestThunk(cb));
  }
}

module.exports = proxy({
  map: (path) => {
    return path.replace(/^\/api\//, '/')
  },
  host: (ctx) => {
    if (!/^\/api\//.test(ctx.path)) {
      return null;
    }

    const name = ctx.request.get('api-proxy-host');
    const hosts = config.hosts || {};

    if (name) {
      return hosts[ name ] || null;
    }

    return null;
  }
})

const serve = require('koa-static');
const glob = require("glob");
const config = require("config");

module.exports = async function (ctx, next) {
  const staticPath = config.path.static || '';

  ctx.__assets = {
    app: 'app',
    vendor: 'vendor',
  }

  if (process.env.NODE_ENV !== 'development') {
    glob
      .sync(`${staticPath}/js/*.js`)
      .forEach(x => {
        const name = x.replace(/.*\/static\/js\/(.*)\.js$/, '$1');
        const [key, value] = name.split('-');
        if (key) {
          ctx.__assets[ key ] = name;
        }
      })
  }
  await next();
};
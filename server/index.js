const Koa = require('koa');
const convert = require('koa-convert');
const serve = require('koa-static');
const config = require('config');
const routes = require('router-bus');


const render = require('./middlewares/render');
const views = require('./middlewares/views');
const proxy = require('./middlewares/proxy');
const asset = require('./middlewares/assert');

const app = new Koa();

if (process.env.NODE_ENV == 'development') {
  const webpack = require('webpack');
  const koaWebpackMiddleware = require('koa-webpack-middleware');
  const config = require('./../webpack.config');

  const webpackDevMiddleware = koaWebpackMiddleware.devMiddleware;
  const webpackHotMiddleware = koaWebpackMiddleware.hotMiddleware;
  
  const compiler = webpack(config);

  app.use(convert(webpackDevMiddleware(compiler, {
    watchOptions: {
      aggregateTimeout: 300,
      poll: true
    },
    reload: true,
    publicPath: config.output.publicPath,
    stats: {
      colors: true
    }
  })));

  app.use(convert(webpackHotMiddleware(compiler)));
}

app.use(convert(serve(config.path.static)));
app.use(routes(config.path.controller));
app.use(asset);
app.use(views);
app.use(render);
app.use(proxy);

module.exports = app;

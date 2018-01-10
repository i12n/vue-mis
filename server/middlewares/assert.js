const serve = require('koa-static');
const glob = require("glob");
const config = require("config");
const hash = require('./../../.hash.json');

module.exports = async function (ctx, next) {
  ctx.__assets = hash;
  await next();
};
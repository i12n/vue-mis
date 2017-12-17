module.exports = async function (ctx, next) {
  if (/^\/api\//.test(ctx.path) && ctx.request.get('api-proxy-host')) {
    await next();
  } else {
    await ctx.render('index.hbs', ctx.__assets);
  }
};
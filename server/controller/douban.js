module.exports = [{
  url: '/api/douban/about',
  method: 'get',
  controller: async function (ctx, next) {
    ctx.body = {
      name: 'douban',
      url: 'https://www.douban.com'
    };
  }
}]
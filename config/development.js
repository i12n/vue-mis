const path = require('path');

const __root = f => path.join(__dirname, '..', f || '');

module.exports = {
  port: 8000,
  path: {
    root: __root(),
    static: __root('static')
  },
  maxage: 0,
  hosts: {
    douban: 'http://api.douban.com',
  },
};

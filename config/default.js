const path = require('path');

const __root = f => path.join(__dirname, '..', f || '');

module.exports = {
  port: 8080,
  path: {
    root: __root(),
    static: __root('static'),
    client: __root('client'),
    controller: __root('server/controller'),
  },
  maxage: 0,
  hosts: {
  },
};

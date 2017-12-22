if(process.env.NODE_ENV === 'development') {
  module.exports = require('./webpack.dev.config.js');
} else {
  module.exports = require('./webpack.prod.config.js');
}
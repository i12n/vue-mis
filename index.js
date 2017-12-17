require("babel-register");

const config = require('config')
const app = require('./server')

const server = app.listen(config.port, () => {
  console.log('server is running at %s', server.address().port);
});

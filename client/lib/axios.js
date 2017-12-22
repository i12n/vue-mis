var axios = require('axios');

/*
function Request() {
}

Request.prototype.axios = axios.create({
  baseURL: '/',
  timeout: 1000,
});

Request.prototype.host = function(name) {
  if (name) {
    this.hostname = name;
  }
}

request = axios.create({
  baseURL: '/',
  timeout: 1000,
});

*/
/*
request
  .host('xxxx')
  .get

request({
  host: 'xxxx',
})
*/

export default {
  install: function(Vue) {
    Object.defineProperty(Vue.prototype, '$axios', {
      value: axios.create({
        baseURL: '/',
        timeout: 5000,
      }) 
    });
  }
}
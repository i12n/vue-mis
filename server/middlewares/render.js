const path = require('path');
const views = require('koa-views');

module.exports = views(path.join(__dirname, './../view'), {map: { hbs: 'handlebars' }});
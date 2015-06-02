module.exports = function(app){
  var biz = require('../controllers/biz.controller');

  app.get('/biz', biz.getBiz);

  app.post('/biz', biz.createBiz);
};
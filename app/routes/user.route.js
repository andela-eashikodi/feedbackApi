module.exports = function(app){
  var user = require('../controllers/user.controller');

  app.get('/user', user.getUsers);

  app.post('/user', user.createUser);
};
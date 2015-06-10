module.exports = function(app){
  var User = require('../controllers/facebook.controller');

  app.get('/facebookUser', User.getUsers);

  app.post('/facebookUser', User.createUser);

  app.delete('/facebookUser', User.deleteUsers);
};
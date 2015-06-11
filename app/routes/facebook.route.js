"use strict";
var express = require('express');

var router = express.Router();

module.exports = function(app){
  var user = require('../controllers/facebook.controller');
    
  router.route('/facebookUsers')
    .get(user.getUsers)
    .post(user.createUser)
    .delete(user.deleteAll);

  router.route('/facebookUser/:id')
    .get(user.findUser)
    .put(user.updateUser)
    .delete(user.deleteUser);

  app.use('/api', router);
};
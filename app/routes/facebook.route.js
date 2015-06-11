"use strict";
var express = require('express');

var router = express.Router();

module.exports = function(app){
  var user = require('../controllers/facebook.controller');

  // router.route('/authenticate')
  //   .post(user.auth);
    
  router.route('/facebookUser')
    // .post(user.createUser)
    .get(user.getUsers);
    // .delete(user.deleteUser);

  app.use('/api', router);
};
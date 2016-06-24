"use strict";
var express = require('express');

var router = express.Router();

module.exports = function(app) {
  var user = require('../controllers/user.controller');

  router.route('/authenticate')
    .post(user.auth);

  router.route('/users')
    .get(user.verifyToken, user.getUsers)
    .post(user.createUser)
    .delete(user.verifyToken, user.deleteAll);

  router.route('/user/:id')
    .get(user.verifyToken, user.findUser)
    .put(user.verifyToken, user.updateUser)
    .delete(user.verifyToken, user.deleteUser);

  router.route("/me/:id")
    .get(user.getMe);

  app.use('/api', router);
};

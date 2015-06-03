'use strict';

require('../models/user.model');

var mongoose = require('mongoose');

var User = mongoose.model('User');

exports.getUsers = function(req, res){
  User.find({}).exec(function(err, users){
    if(err){
      return res.json(err);
    }
    return res.json(users);
  });
};

exports.createUser = function(req, res){
  User.create(req.body, function(err, user){
    if(err){
      return res.json(err);
    }
    return res.json(user);
  });
};

exports.deleteUser = function(req, res){
  User.remove(function(err, users){
    if(err){
      return res.json(err);
    }
    exports.getUsers(req, res);
  });
};
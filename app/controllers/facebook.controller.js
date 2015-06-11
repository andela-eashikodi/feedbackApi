'use strict';

require('../models/facebook.model');

var mongoose = require('mongoose');

var User = mongoose.model('FacebookUser');

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

exports.deleteAll = function(req, res){
  User.remove(function(err, users){
    if(err){
      return res.json(err);
    }
    exports.getUsers(req, res);
  });
};

exports.findUser = function(req, res){
  User.find({id: req.params.id}, function(err, user){
    if(err){
      return res.json(err);
    }
    return res.json(user);
  });
};

exports.updateUser = function(req, res){
  User.update({id : req.params.id}, req.body, function(err, user){
    if(err){
      return res.json(err);
    }
    exports.findUser(req, res);
  });
};

exports.deleteUser = function(req, res){
  User.remove({id : req.params.id}, function(err, user){
    if(err){
      return res.json(err);
    }
    res.json({
      success: true,
      message: 'user deleted'
    });
  });
};
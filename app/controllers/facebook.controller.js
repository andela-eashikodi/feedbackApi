'use strict';

require('../models/facebook.model');

var mongoose = require('mongoose');

var Facebook = mongoose.model('FacebookUser');

exports.getUsers = function(req, res){
  Facebook.find({}).exec(function(err, users){
    if(err){
      return res.json(err);
    }
    return res.json(users);
  });
};

exports.createUser = function(req, res){
  Facebook.create(req.body, function(err, user){
    if(err){
      return res.json(err);
    }
    return res.json(user);
  });
};

exports.deleteUsers = function(req, res){
  Facebook.remove(function(err, users){
    if(err){
      return res.json(err);
    }
    exports.getBiz(req, res);
  });
};
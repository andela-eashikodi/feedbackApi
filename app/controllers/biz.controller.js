'use strict';

require('../models/biz.model');

var mongoose = require('mongoose');

var Biz = mongoose.model('Biz');

exports.getBiz = function(req, res){
  Biz.find({}).exec(function(err, users){
    if(err){
      return res.json(err);
    }
    return res.json(users);
  });
};

exports.createBiz = function(req, res){
  Biz.create(req.body, function(err, user){
    if(err){
      return res.json(err);
    }
    return res.json(user);
  });
};
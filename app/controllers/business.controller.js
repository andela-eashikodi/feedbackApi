'use strict';
var mongoose = require('mongoose');

require('../models/business.model');

var formidable = require('formidable');
var cloudinary = require('cloudinary');
var twitter = require('twitter');

var twitterClient = new twitter({
  consumer_key: "roDDPkrOcczKD2iAkEJJcOKsT",
  consumer_secret: "Yxr76sLTqSUjiySGZmI8bpyJoWeIneDVMKNkVHjfNPWTnKPL2f",
  access_token_key: "3332398691-7HpOl1Mq3EzWaBC9dnzPCCPRxidjmUonxSkxw6C",
  access_token_secret: "QmdNBqJqXqETAdNhL899T2TzkatiUm7gaLoKNPHlywZmH"
});

require('../models/user.model');

var Business = mongoose.model('Business');

cloudinary.config({
  cloud_name: "shopal",
  api_key: "732827613157146",
  api_secret: "G96gDzcBkYcCthhhiQW4_kcNx6I"
});

exports.createBusiness = function(req, res) {
  twitterClient.post('statuses/update', {
    status: req.body.name + " has just been registered, visit http://andela-eashikodi.github.io/shopal to view more business online"
  }, function(err, tweet, res) {
    // console.log(tweet);
  });
  var business = new Business(req.body);
  business.save(req.body, function(err, business) {
    if (err) {
      return res.json(err);
    }
    return res.json(business);
  });
};

exports.getBusiness = function(req, res) {
  Business.find({}).populate('created_by').exec(function(err, business) {
    if (err) {
      return res.json(err);
    }
    return res.json(business);
  });
};
exports.getImage = function(req, res, next) {
  var form = new formidable.IncomingForm();
  form.parse(req, function(err, fields, file) {
    req.body = fields;
    cloudinary.uploader.upload(file.file.path, function(result) {
      req.body.imageUrl = result.secure_url;
      next();
    }, {
      width: 200,
      height: 200
    });
  });
};

exports.deleteAll = function(req, res) {
  Business.remove(function(err, business) {
    if (err) {
      return res.json(err);
    }
    exports.getBusiness(req, res);
  });
};

exports.findOne = function(req, res) {
  Business.find({
    BusinessName: req.params.BusinessName
  }, function(err, business) {
    if (err) {
      return res.json(err);
    }
    return res.json(business);
  });
};

exports.findCategory = function(req, res) {
  Business.find({
    category: req.params.category
  }, function(err, business) {
    if (err) {
      return res.json(err);
    }
    return res.json(business);
  });
};

exports.findUserBusiness = function(req, res) {
  Business.find({
    created_by: req.params.createdby
  }).populate('created_by').exec(function(err, business) {
    if (err) {
      return res.json(err);
    }
    return res.json(business);
  });
};

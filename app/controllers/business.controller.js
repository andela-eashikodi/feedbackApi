'use strict';
var mongoose = require('mongoose');

require('../models/business.model');

var Business = mongoose.model('Business');

exports.createBusiness = function(req, res) {
	Business.create(req.body, function(err, business) {
		if(err) {
			return res.json(err);
		}
		return res.json(business);
	});
};

exports.getBusiness = function(req, res) {
	Business.find(function(err, business) {
		if(err) {
			return res.json(err);
		}
		return res.json(business);
	});
};

exports.deleteAll = function(req, res) {
	Business.remove(function(err, business) {
		if(err) {
			return res.json(err);
		}
		exports.getBusiness(req, res);
	});
};

exports.findOne = function(req, res) {
	Business.find({BusinessName: req.params.BusinessName}, function(err, business) {
		if(err) {
			return res.json(err);
		}
		return res.json(business);
	});
};

exports.findCategory = function(req, res) {
	Business.find({Category: req.params.Category}, function(err, business) {
		if(err) {
			return res.json(err);
		}
		return res.json(business);
	});
};
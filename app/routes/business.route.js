'use strict';
var express = require('express');
var router = express.Router();

module.exports = function(app) {
	var business = require('../controllers/business.controller');

	router.route('/business')
		.post(business.createBusiness)
		.get(business.getBusiness)
		.delete(business.deleteAll);

	router.route('/business/:BusinessName')
		.get(business.findOne);

	router.route('/business/categories/:Category')
		.get(business.findCategory);

	app.use('/api', router);
}
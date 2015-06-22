'use strict';
var express = require('express');
var router = express.Router();

module.exports = function(app) {
  var business = require('../controllers/business.controller');

  router.route('/payment')
    .post(business.notification);

  router.route('/business')
    .post(business.getImage, business.createBusiness)
    .get(business.getBusiness)
    .delete(business.deleteAll);

  router.route('/business/:id')
    .get(business.findBusiness)
    .delete(business.deleteBusiness);

  router.route('/business/categories/:category')
    .get(business.findCategory);

  router.route('/business/user/:createdby')
    .get(business.findUserBusiness);

  app.use('/api', router);
};

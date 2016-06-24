'use strict';
var express = require('express');
var router = express.Router();

module.exports = function(app) {
  var business = require('../controllers/business.controller');
  var user = require('../controllers/user.controller');

  router.route('/payment')
    .post(business.paymentNotification);

  router.route('/business')
    .post(business.getImage, business.createBusiness)
    .get(business.getBusiness)
    .delete(user.verifyToken, business.deleteAll);

  router.route('/business/:id')
    .get(business.findBusiness)
    .delete(user.verifyToken, business.deleteBusiness);

  router.route('/business/categories/:category')
    .get(business.findCategory);

  router.route('/business/user/:createdby')
    .get(business.findUserBusiness);

  router.route('/postMail')
    .post(business.sendMail);

  router.route('/getMail')
    .post(business.getMail);

  app.use('/api', router);
};

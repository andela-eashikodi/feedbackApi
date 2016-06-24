'use strict';
var mongoose = require('mongoose');
var formidable = require('formidable');
var cloudinary = require('cloudinary');
var twitter = require('twitter');
var request = require("request");
var nodemailer = require("nodemailer");
var transporter = nodemailer.createTransport();

require('../models/business.model');
require('../models/user.model');

var Business = mongoose.model('Business');
var User = mongoose.model('User');

var twitterClient = new twitter({
  consumer_key: "roDDPkrOcczKD2iAkEJJcOKsT",
  consumer_secret: "Yxr76sLTqSUjiySGZmI8bpyJoWeIneDVMKNkVHjfNPWTnKPL2f",
  access_token_key: "3332398691-7HpOl1Mq3EzWaBC9dnzPCCPRxidjmUonxSkxw6C",
  access_token_secret: "QmdNBqJqXqETAdNhL899T2TzkatiUm7gaLoKNPHlywZmH"
});

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
      width: 400,
      height: 400
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

exports.findBusiness = function(req, res) {
  Business.find({
    _id: req.params.id
  }).populate('created_by').exec(function(err, business) {
    if (err) {
      return res.json(err);
    }
    return res.json(business);
  });
};

exports.deleteBusiness = function(req, res) {
  Business.remove({
    _id: req.params.id
  }, function(err, business) {
    if (err) {
      return res.json(err);
    }
    return res.json({
      success: true,
      message: "business deleted"
    });
  });
};

exports.findCategory = function(req, res) {
  Business.find({
    category: req.params.category
  }).populate('created_by').exec(function(err, business) {
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

exports.sendMail = function(req, res) {
  var data = req.body;
  transporter.sendMail({
    from: "Shopal Nigeria ✔ <no-reply@shopalng.com>",
    to: data.ownerMail,
    subject: data.timeTaken + " booked by " + data.contactName + " on " + data.businessName,
    text: "Hello Dear, " + data.contactName + " just booked for " + data.timeTaken
  }, function(err, result) {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
    }
  });
  res.json(data);
};

exports.getMail = function(req, res) {
  var data = req.body;
  transporter.sendMail({
    from: "Shopal Nigeria ✔ <no-reply@shopalng.com>",
    to: data.recipient,
    subject: "Confirmation of appointment booking",
    text: "Hello Dear, This is a confirmation of your appointment with " + data.businessName + " for " + data.timeTaken
  }, function(err, result) {
    if (err) {
      console.log(err);
    }
    else {
      console.log(result);
    }
  });
};

var checkRequest = function(str) {
  var info = str.split("-");
  return {
    'userId': info[0],
    'userName': info[1],
    'userEmail': info[2]
  };
};

exports.paymentNotification = function(req, res) {
  var transaction_id = req.body.transaction_id;
  request("https://voguepay.com/?v_transaction_id=" + transaction_id + "&type=json", function(err, response, body) {
    var transactionBody = JSON.parse(body);
    var info = checkRequest(transactionBody.merchant_ref);
    if (transactionBody.status && transactionBody.status === "Approved") {
      var message = "Hello " + info.userName + ", You have successfully switched to shopal premium account";
      var mailOptions = {
        from: "Shopal Nigeria ✔ <no-reply@shopalng.com>",
        to: info.userEmail,
        subject: "Shopal premium",
        html: "<b>" + message + "</b>"
      };

      var monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];

      var date = new Date();
      var exp_date = date.getDate() + '/' + (monthNames[date.getMonth()]) + '/' + (date.getFullYear() + 1);

      User.findByIdAndUpdate(info.userId, {
        premiumStatus: 'true',
        premiumExpiryDate: exp_date
      }, function(err, user) {
        if (err) {
          console.log(err);
        }
        console.log(user);
      });
      transporter.sendMail(mailOptions, function(error, response) {
        if (error) {
          console.log(error);
        }
        setTimeout(res.redirect('/#!/user/profile'), 3000);
      });
    }
    else {
      setTimeout(res.redirect('/#!/user/profile'), 3000);
    }
  });
};

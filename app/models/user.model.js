'use strict';

var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var userSchema = new mongoose.Schema({
  user_id: Number,
  
  firstname: {
    type: String,
    required: "Please enter your firstname"
  },
  lastname: {
    type: String,
    required: "Please enter your lastname"
  },
  email: {
    type: String,
    required: "Please enter your email",
    unique: true
  },
  password: {
    type: String,
    required: true
  },

  premiumStatus: String,

  premiumExpiryDate: String,

  phone_number: String,

  gender: String,

  created_at: Date,

  updated_at: Date

});

userSchema.pre('save', function(next) {
  var user = this;

  var currentDate = new Date();

  user.updated_at = currentDate;

  if (!user.created_at) {
    user.created_at = currentDate;
  }

  if (!user.isModified('password')) {
    return next();
  }

  bcrypt.hash(user.password, null, null, function(err, hash) {
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  });
});

userSchema.methods.comparePassword = function(password) {
  var user = this;
  return bcrypt.compareSync(password, user.password);
};

mongoose.model('User', userSchema);

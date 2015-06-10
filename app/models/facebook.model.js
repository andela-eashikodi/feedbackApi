'use strict';

var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  facebook:{
    id: Number,
    token: String,
    firstName: String,
    lastName: String 
  }
});

mongoose.model('FacebookUser', userSchema);
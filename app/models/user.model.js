'use strict';

var mongoose = require('mongoose');

var userFeedback = new mongoose.Schema({
  mail : String
});

mongoose.model('User', userFeedback);
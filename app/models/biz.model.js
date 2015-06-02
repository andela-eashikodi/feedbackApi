'use strict';

var mongoose = require('mongoose');

var bizFeedback = new mongoose.Schema({
  name : String
});

mongoose.model('Biz', bizFeedback);
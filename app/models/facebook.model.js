'use strict';

var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    user_id: Number,
    token: String,
    firstName: String,
    lastName: String,
    email: String,
    gender:String
});

mongoose.model('FacebookUser', userSchema);
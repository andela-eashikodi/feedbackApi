'use strict';
 
var mongoose = require('mongoose');
require('../models/user.model');
var Schema = mongoose.Schema;
var businessSchema = new mongoose.Schema({
 	name : {
 		type: String,
 		required: "Please enter your business name"
 	},
 	address: {
 		type: String,
 		required: "Enter the address"
 	},
 	description: {
 		type: String,
 		required: "Describe your business"
 	},
 	category: {
 		type: String
 	},
 	phoneNumber: {
 		type: String,
 		required: "Phone Number required"
 	},
 	imageUrl: {
 		type: String
 	},
 	created_by: {
 		type: Schema.ObjectId,
 		ref: "User"
 	},
 	created_at: Date,
 	updated_at: Date
 });

businessSchema.pre('save', function(next){
  var user = this;

  var currentDate = new Date();
  
  user.updated_at = currentDate;

  if (!user.created_at){
    user.created_at = currentDate;
    next();
  }
});


 mongoose.model('Business', businessSchema);
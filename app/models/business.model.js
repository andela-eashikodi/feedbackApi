'use strict';
 
var mongoose = require('mongoose');

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
 		type: Number,
 		required: "Phone Number required"
 	},
 	imageUrl: {
 		type: String
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
  }
});


 mongoose.model('Business', businessSchema);
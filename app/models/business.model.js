'use strict';
 
var mongoose = require('mongoose');
require('../models/user.model');
var Schema = mongoose.Schema;
var businessSchema = new mongoose.Schema({
 	name : {
 		type: String,
 		required: "Please enter your business name"
 	},
 	address1: {
 		type: String,
 		required: "Enter the address"
 	},
  city1: {
    type: String,
    required: "Enter the city name"
  },
  state1: {
    type: String,
    required: "Enter the state name"
  },

  address2: String,
  city2: String,
  state2: String,

  address3: String,
  city3: String,
  state3: String,

 	description: {
 		type: String,
 		required: "Describe your business"
 	},
 	category: {
 		type: String
 	},
 	phoneNumber1: {
 		type: String,
 		required: "Phone Number required"
 	},
  phoneNumber2: String,
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
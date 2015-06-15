'use strict';
 
var mongoose = require('mongoose');

var businessSchema = new mongoose.Schema({
 	BusinessName : {
 		type: String,
 		required: "Please enter your business name"
 	},
 	Address: {
 		type: String,
 		required: "Enter the address"
 	},
 	Description: {
 		type: String,
 		required: "Describe your business"
 	},
 	Category: {
 		type: String
 	},
 	PhoneNumber: {
 		type: Number,
 		required: "Phone Number required"
 	},
 	PictureUrl: {
 		type: String
 	},
 	created_at: Date,
 	updated_at: Date
 });

 mongoose.model('Business', businessSchema);
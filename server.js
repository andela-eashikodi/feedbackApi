'use strict';
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var express = require('express');
var app = express();
var config = require('./config/config');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var path = require('path');
var appDir = path.dirname(require.main.filename);
mongoose.connect(config[process.env.NODE_ENV].url);

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept, X-Requested-With, Authorization');
  next();
});
app.use(express.static(path.join(appDir + '/public')));
app.get('/', function(req, res) {
  res.sendFile(appDir + '/public/index.html');
});

require('./app/routes/user.route')(app);
require('./app/routes/business.route')(app);

require('./passport')(app);

var port = process.env.PORT || 4000;

app.listen(port, function(err) {
  if (err) {
    console.log(err);
  }
  console.log('Server started on port: ' + port);
});

module.exports = app;
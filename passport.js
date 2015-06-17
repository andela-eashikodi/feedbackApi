"use strict";
require('./app/models/user.model');
var passport = require('passport'),
    mongoose =require('mongoose'),
    FacebookStrategy = require('passport-facebook').Strategy,
    User =  mongoose.model('User'),
    userController = require("./app/controllers/user.controller");

module.exports = function(app) {
  app.use(passport.initialize());
 
  app.get('/auth/facebook/callback', 
    passport.authenticate('facebook', { 
      failureRedirect: 'http://localhost:8080/#/' }),
    function(req, res) {
      var userInfo = req.user.firstname;
      var jwttoken = userController.generateToken(req.user);
      // console.log(jwttoken);
      res.redirect('http://localhost:8080/#/user/dashboard?token='+jwttoken+'&userInfo='+userInfo);
    });

  app.get('/auth/facebook', passport.authenticate('facebook', { scope : [
    "email"
    ]
  }));


  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(obj, done) {
    done(null, obj);
  });

  passport.use(new FacebookStrategy({
    clientID: '815850818511954',
    clientSecret: '9aa55fcd820aec211155496acc4bf017',
    callbackURL: '/auth/facebook/callback',
    profileFields: ['id', 'displayName', 'photos','gender','email','first_name', 'last_name'],
    enableProof: false 
  },
  function(accessToken, refreshToken, profile, done){
    User.findOne({'user_id': profile.id}, function(err, user){
      if(err){
        done(err);
      }
      // console.log(1,profile._json);
      var localStorage;
      if(user){
        // localStorage.setItem('userName', angular.toJson(profile._json.first_name));
        return done(null, user);
      }
      else {
        var result = profile._json;

        // localStorage.setItem('userName', angular.toJson(result.first_name));

        var newUser = new User();

        newUser.user_id = result.id;
        newUser.firstname = result.first_name;
        newUser.lastname = result.last_name;
        newUser.email = result.email;
        newUser.gender = result.gender;

        newUser.save(function(err){
          if(err){
            return done(err);
          }
          else{
            return done(null, newUser);
          }
        });
      }
    });
  }));
};




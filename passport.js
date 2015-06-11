"use strict";
require('./app/models/facebook.model');
var passport = require('passport'),
    mongoose =require('mongoose'),
    FacebookStrategy = require('passport-facebook').Strategy,
    User =  mongoose.model('FacebookUser');
    var userController = require("./app/controllers/user.controller")

module.exports = function(app) {
  app.use(passport.initialize());
 
  app.get('/auth/facebook/callback', 
    passport.authenticate('facebook', { 
      failureRedirect: '/login' }),
    function(req, res) {
      var jwttoken = userController.generateToken(req.user);
      // console.log(jwttoken);
      res.redirect('http://localhost:8080/#/user/dashboard?token='+jwttoken);
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
    // console.log("profile");

    User.findOne({'facebook.id': profile.id}, function(err, user){
      if(err){
        done(err);
      }
      console.log(1,profile._json);
      if(user){
        return done(null, user);
      }
      else {
        var result = profile._json;
        var newUser = new User();

        newUser.facebook.id = result.id;
        newUser.firstName = result.first_name;
        newUser.lastName = result.last_name;

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

    if(profile) {
      return done(null, profile);
    }
    else {
      return done(null, false);
    }
  }));
};




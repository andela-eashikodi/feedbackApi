"use strict";
require('./app/models/facebook.model');
var passport = require('passport'),
    mongoose =require('mongoose'),
    FacebookStrategy = require('passport-facebook').Strategy,
    User =  mongoose.model('FacebookUser');

module.exports = function(app) {
  app.use(passport.initialize());
 
  app.get('/auth/facebook/callback', 
    passport.authenticate('facebook', { 
      failureRedirect: 'http://andela-eashikodi.github.io/shopal/#/home' }),
    function(req, res) {
      res.redirect('http://andela-eashikodi.github.io/shopal/#/user/dashboard');
    });

  app.get('/auth/facebook', passport.authenticate('facebook', { scope : [
    "email", "user_location", "user_hometown", "user_birthday"
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
    // profileFields: ['id', 'displayName', 'photos', 'email'],
    enableProof: false 
  },
  function(accessToken, refreshToken, profile, done){
    // console.log("profile");

    User.findOne({'facebook.id': profile.id}, function(err, user){
      if(err){
        done(err);
      }
      if(user){
        console.log(profile);
        return done(null, user);
      }
      else {
        var result = profile._json;
        var newUser = new User();

        newUser.facebook.id = result.id;
        newUser.facebook.firstName = result.first_name;
        newUser.facebook.lastName = result.last_name;

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




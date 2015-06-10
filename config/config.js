'use strict';

module.exports = {
  production: {
    'url': process.env.MONGOLAB_URI,
    'secret': "iloveshopal"
  },
  development: {
    'url': 'mongodb://localhost/findersfeedback',
    'secret': "iloveshopal",
    sessionSecret: 'developmentSessionSecret', 
    facebook: {
       clientID: '815850818511954',
       clientSecret: '9aa55fcd820aec211155496acc4bf017',
       callbackURL: '/oauth/facebook/callback'
    }
  }
};
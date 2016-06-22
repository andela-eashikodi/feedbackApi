'use strict';

module.exports = {
  production: {
    'url': process.env.MONGOLAB_URI,
    'secret': "iloveshopal"
  },
  development: {
    'url': 'mongodb://localhost/findersfeedback',
    'secret': "iloveshopal",
    sessionSecret: 'developmentSessionSecret'
  }
};

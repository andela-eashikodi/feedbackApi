'use strict';

module.exports = {
  production: {
    'url': process.env.MONGOLAB_URI
  },
  development: {
    'url': 'mongodb://localhost/findersfeedback'
  }
};
'use strict';

var App = angular.module('shopal', ['ui.router','ngMaterial', 'ngMessages','ngAnimate','ngAria','ngFileUpload','angularUtils.directives.dirDisqus','firebase']);

angular.module('shopal')
  .config(function($stateProvider, $urlRouterProvider, $locationProvider){

  $locationProvider.hashPrefix('!');

  $urlRouterProvider.otherwise('/home');

  $stateProvider
    .state('home',{
      url: '/home',
      templateUrl: 'app/views/home.view.html'
    })
    .state('user',{
      url: '/user',
      templateUrl: 'app/views/user.view.html'
    })
    .state('user.dashboard',{
      url: '/dashboard',
      templateUrl: 'app/views/dashboard.view.html'
    })
    .state('user.profile',{
      url: '/profile',
      templateUrl: 'app/views/profile.view.html'
    })
    .state('user.messages',{
      url: '/messages',
      templateUrl: 'app/views/message.view.html'
    })
    .state('user.businessInfo', {
      url: '/business/:logid',
      templateUrl: 'app/views/business_info.view.html',
      controller: 'businessCtrl'
    })
    .state('user.business',{
      url: '/add_business',
      templateUrl: 'app/views/add_business.view.html'
    });
  });

angular.module('shopal')
  .config(function($mdThemingProvider) {
  // Extend the red theme with a few different colors
  var neonRedMap = $mdThemingProvider.extendPalette('red', {
    '500': '000000'
  });
  // Register the new color palette map with the name <code>neonRed</code>
  $mdThemingProvider.definePalette('neonRed', neonRedMap);
  // Use that theme for the primary intentions
  $mdThemingProvider.theme('default')
    .primaryPalette('neonRed')
    .accentPalette('light-blue',{
      'default':'50'
    })
    .warnPalette('red');
});
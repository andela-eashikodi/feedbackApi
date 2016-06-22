'use strict';

angular.module('shopal')
  .controller('loginCtrl', ['$rootScope', '$scope', 'userService', '$mdToast', '$location', '$mdDialog', '$state', '$window', function($rootScope, $scope, userService, $mdToast, $location, $mdDialog, $state, $window) {

  var user_token = $location.search().token;
  var user_name = $location.search().userName;
  var user_id = $location.search().userId;
  if (user_token) {
    $rootScope.loggedIn = true;
    localStorage.setItem('userToken', angular.toJson(user_token));
    localStorage.setItem('userName', angular.toJson(user_name));
    localStorage.setItem('userId', angular.toJson(user_id));
  }
  $location.search('token', null);
  $location.search('userName', null);
  $location.search('userId', null);

  if (localStorage.getItem('userToken')) {
    $rootScope.loggedIn = true;
  }

  function validateEmail(email) {
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
  }

  $scope.userSignIn = function() {
    $location.url('/home');
  };

  $scope.toggleText = function(){
    $scope.shopal = !$scope.shopal;   
  };

  $scope.addUser = function() {
    if (!$scope.user) {
      $scope.showErrorToast();
    } else if ((validateEmail($scope.user.email)) === false) {
      $scope.progress_bar = false;
      $scope.incorrectEmailToast();
    } else {
      userService.createUser($scope.user).then(function(res) {
        $scope.progress_bar = true;
        if (res.data.message === "user email taken") {
          $scope.progress_bar = false;
          $scope.showEmailError();
        } else {
          if (res.data.message === "User validation failed") {
            $scope.progress_bar = false;
            $scope.showErrorToast();
          } else {
            $scope.progress_bar = true;
            $rootScope.userId = res.data._id;
            var authDetails = {
              email: $scope.user.email,
              password: $scope.user.password
            };
            userService.authenticate(authDetails).then(function(res) {
              localStorage.setItem('userToken', angular.toJson(res.data.token));
              localStorage.setItem('userName', angular.toJson(res.data.user));
              localStorage.setItem('userId', angular.toJson(res.data.id));
              $scope.progress_bar = false;
              $rootScope.loggedIn = true;
              $scope.showSuccessToast();
              $location.url('/user/dashboard');
              $scope.user = {};
              authDetails = {};
            });
          }
        }
      });
    }
  };


  $scope.loginUser = function() {
    $scope.login_bar = true;
    userService.authenticate($scope.login).then(function(res) {
      if (res.data.message === 'auth failed') {
        $scope.login_bar = false;
        $scope.errorLogin = true;
      } else {
        localStorage.setItem('userName', angular.toJson(res.data.user));
        localStorage.setItem('userId', angular.toJson(res.data.id));
        localStorage.setItem('userToken', angular.toJson(res.data.token));
        $scope.errorLogin = false;
        $scope.login = {};
        $scope.login_bar = false;
        $rootScope.loggedIn = true;
        $.magnificPopup.close();
        $location.url('/user/dashboard');
      }
    });
  };

  $scope.logout = function(ev) {
    var confirm = $mdDialog.confirm()
      .title('Log Out')
      .content("You're about to leave this page")
      .ariaLabel('log out')
      .ok('Yes')
      .cancel('Cancel')
      .targetEvent(ev);
    $mdDialog.show(confirm).then(function() {
      localStorage.removeItem('userToken');
      localStorage.removeItem('userName');
      localStorage.removeItem('userId');
      $rootScope.loggedIn = false;
      $location.url('/home');
    });
  };

  $scope.userName = angular.fromJson(localStorage.getItem('userName'));

  $scope.showErrorToast = function() {
    $mdToast.show({
      template: '<md-toast style="background:teal">' + 'Fill In All details Correctly' + '</md-toast>',
      hideDelay: 5000,
      position: 'top right'
    });
  };
  $scope.incorrectEmailToast = function() {
    $mdToast.show({
      template: '<md-toast style="background:teal">' + 'Enter Valid Email' + '</md-toast>',
      hideDelay: 5000,
      position: 'top right'
    });
  };
  $scope.showEmailError = function() {
    $mdToast.show({
      template: '<md-toast style="background:teal">' + 'Email Already Taken' + '</md-toast>',
      hideDelay: 5000,
      position: 'top right'
    });
  };
  $scope.showSuccessToast = function() {
    $mdToast.show({
      template: '<md-toast style="background:teal">' + 'User Created' + '</md-toast>',
      hideDelay: 5000,
      position: 'top left'
    });
  };
}]);

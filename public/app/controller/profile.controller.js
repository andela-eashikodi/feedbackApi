'use strict';

angular.module('shopal')
  .controller('profileCtrl', ['$rootScope', '$scope', 'businessService', 'userService', 'Upload', '$location', '$mdToast', function($rootScope, $scope, businessService, userService, Upload, $location, $mdToast) {

  $scope.myProfile = function() {
    var userId = angular.fromJson(localStorage.getItem('userId'));
    userService.getUserDetails(userId).then(function(res) {
      $scope.userInformation = res.data[0];
      businessService.getUserBusiness(userId).success(function(res) {
          $scope.myBusinesses = res;
        });
    });
  };

  $scope.updateUser = function() {
    var userId = angular.fromJson(localStorage.getItem('userId'));
    userService.updateUser(userId, $scope.userInformation).then(function(res) {
      if(res.data.code) {
        $scope.showErrorToast();
      }
      else {
        console.log(res);
        $scope.showSuccessToast();
      }
    });
  };

   $scope.showSuccessToast = function() {
    $mdToast.show({
      template: '<md-toast style="background:teal">' + 'Profile Successfully updated' + '</md-toast>',
      hideDelay: 5000,
      position: 'top right'
    });
  };

  $scope.showErrorToast = function() {
    $mdToast.show({
      template: '<md-toast style="background:teal">' + 'Email Address Taken ' + '</md-toast>',
      hideDelay: 5000,
      position: 'top right'
    });
  };


}]);

'use strict';

angular.module('shopal')
  .controller('SidebarCtrl', function ($scope, $timeout, $mdSidenav, $mdUtil) {

    $scope.toggleLeft = buildToggler('left');

    function buildToggler(navID) {
      var debounceFn =  $mdUtil.debounce(function(){
        $mdSidenav(navID).toggle();
          },300);

      return debounceFn;
    }

    $scope.close = function () {
      $mdSidenav('left').close();
    };

  });

  angular.module('shopal')
    .controller('LeftCtrl', function ($scope, $mdSidenav) {});

'use strict';

angular.module('shopal')
  .factory('userService', ['$http', function($http){
    var token = angular.fromJson(localStorage.getItem('userToken'));
    return {
      createUser : function(param) {
        return $http.post("/api/users", param);
      },
      authenticate: function(param) {
        return $http.post("/api/authenticate", param);
      },
      getUserDetails: function(userId) {
        return $http.get("/api/me/" + userId + "?token=" + token);
      },
      updateUser: function(userId, param) {
        return $http.put("/api/user/" + userId + "?token=" + token, param);
      }
    };
}]);
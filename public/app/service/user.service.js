'use strict';

angular.module('shopal')
  .factory('userService', ['$http', function($http){
  return {
    createUser : function(param){
      return $http.post("/api/users", param);
    },
    authenticate: function(param){
      return $http.post("/api/authenticate", param);
    },
    getUserDetails: function(userId){
      return $http.get("/api/me/" + userId );
    },
    updateUser: function(userId, param) {
      return $http.put("/api/user/" + userId, param);
    }
  };
}]);
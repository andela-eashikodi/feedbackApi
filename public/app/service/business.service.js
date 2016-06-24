'use strict';

angular.module('shopal')
  .factory('businessService', ['$http', function($http){
    var token = angular.fromJson(localStorage.getItem('userToken'));
	  return {
  		createBusiness : function(business) {
  			return $http.post("/api/business" , business);
  		},

      getUserBusiness : function(id) {
        return $http.get("/api/business/user/" + id );
      },

      allBusiness: function() {
        return $http.get("/api/business");
      },

      getBusinessDetail: function(businessId) {
        return $http.get("/api/business/" + businessId);
      },

      getCategory: function(category) {
        return $http.get("/api/business/categories/" + category);
      }
	 };
}]);
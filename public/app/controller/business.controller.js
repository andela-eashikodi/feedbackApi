angular.module('shopal')
  .controller('businessCtrl', ['$rootScope', '$scope', 'businessService', 'userService', 'Upload', '$location', '$mdDialog', '$mdToast', '$stateParams', '$firebaseObject', '$http',function($rootScope, $scope, businessService, userService, Upload, $location, $mdDialog, $mdToast, $stateParams, $firebaseObject, $http) {

  $scope.dashboard = function() {
    businessService.allBusiness().then(function(res) {
      $scope.logs = res.data;
    });
  };

  var userId = angular.fromJson(localStorage.getItem('userId'));
    userService.getUserDetails(userId).then(function(res) {
      $scope.UserDetails = res.data[0];
  });

  if (localStorage.getItem('userToken')) {
    $scope.loggedIn = true;
  }

  $scope.bookAppointment = function(ownerMail, timeTaken, businessName, day) {
    var data = ({
      contactName: $scope.UserDetails.firstname + ' ' + $scope.UserDetails.lastname,
      ownerMail: ownerMail,
      timeTaken: timeTaken + ' ' + day,
      businessName: businessName
    });
    $http.post('/api/postMail', data)
      .success(function(data, status, headers, config) {
        $scope.showBookingSuccess();
      });
      $scope.recieveBookingMail($scope.UserDetails.email, timeTaken, businessName, day);
    };

  $scope.recieveBookingMail = function(mail, timeTaken, businessName, day) {
    var data = ({
      businessName: businessName,
      timeTaken: timeTaken + ' ' + day,
      recipient: mail
    });
    $http.post('/api/getMail', data)
      .success(function(data, status, headers, config) {
        
      });
  };

  $scope.dashboardCategory = function(categoryName) {
    businessService.getCategory(categoryName).then(function(res) {
      if (res.data[0]===undefined) {
        $scope.logs = [];
      } else {
        $scope.noResult = false;
        $scope.logs = res.data;
      }
    });
  };

  $scope.userInfo = function(ev, log) {
    $mdDialog.show({
      clickOutsideToClose: true,
      controller: userInfoPage,
      locals: {
        log: log
      },
      templateUrl: "app/views/user_info.view.html",
      targetEvent: ev
    });
  };
  function userInfoPage($scope, $mdDialog, log) {
    $scope.userDetail = log.created_by;
  }

  $scope.businessId = $stateParams.logid;
  // $scope.url = "http://localhost:8080/#!/business/" + $stateParams.logid;
  // $scope.url = "http://andela-eashikodi.github.io/shopal/#!/business/" + $stateParams.logid;
  businessService.getBusinessDetail($stateParams.logid).then(function(res) {
    $scope.businessDetail = res.data[0];
  });

  $scope.registration = function() {
    if(!$scope.loggedIn) {
      $scope.showLoginError();
      $location.url('/home');
    }
  };

  var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  var curr = new Date();
  var first = (curr.getDate() - curr.getDay()) + 1;
  var last = first + 5;
  var firstday = new Date(curr.setDate(first));
  var firstDate = firstday.getDate();
  var firstMonth = monthNames[firstday.getMonth()];
  var firstYear = firstday.getFullYear();
  var lastday = new Date(curr.setDate(last));
  var lastDate = lastday.getDate();
  var lastMonth = monthNames[lastday.getMonth()];
  var lastYear = lastday.getFullYear();
  $scope.week = firstDate+' '+firstMonth+','+firstYear+' to '+lastDate+' '+lastMonth+','+lastYear;

  $scope.userId = angular.fromJson(localStorage.getItem('userId'));
  var ref = new Firebase('https://shopalng.firebaseio.com/comment/'+$stateParams.logid);
  var likeRef = new Firebase('https://shopalng.firebaseio.com/likes/'+$stateParams.logid);
  var favouriteRef = new Firebase('https://shopalng.firebaseio.com/favourite/'+$scope.userId);
  var appointmentRef = new Firebase('https://shopalng.firebaseio.com/booking/'+$stateParams.logid);

  $scope.reset = function() {
    appointmentRef.set({
      '1monday': {name: 'Monday', slots: {
          0900: {time: '09:00am',booked: false,blocked: false},
          1000: {time: '10:00am',booked:false,blocked: false},
          1100: {time: '11:00am',booked: false,blocked: false},
          1200: {time: '12:00pm',booked: false,blocked: false},
          1300: {time: '01:00pm',booked: false,blocked: false},
          1400: {time: '02:00pm',booked:false,blocked: false},
          1500: {time: '03:00pm',booked:false,blocked: false},
          1600: {time: '04:00pm',booked:false,blocked: false},
          1700: {time: '05:00pm',booked:false,blocked: false}
        }
      },
      '2tuesday': {name: 'Tuesday',slots: {
        0900: {time: '09:00am',booked: false,blocked: false},
        1000: {time: '10:00am',booked:false,blocked: false},
        1100: {time: '11:00am',booked: false,blocked: false},
        1200: {time: '12:00pm',booked: false,blocked: false},
        1300: {time: '01:00pm',booked: false,blocked: false},
        1400: {time: '02:00pm',booked:false,blocked: false},
        1500: {time: '03:00pm',booked:false,blocked: false},
        1600: {time: '04:00pm',booked:false,blocked: false},
        1700: {time: '05:00pm',booked:false,blocked: false}
        }
      },
      '3wednesday': {name: 'Wednesday',slots: {
        0900: {time: '09:00am',booked: false,blocked: false},
        1000: {time: '10:00am',booked:false,blocked: false},
        1100: {time: '11:00am',booked: false,blocked: false},
        1200: {time: '12:00pm',booked: false,blocked: false},
        1300: {time: '01:00pm',booked: false,blocked: false},
        1400: {time: '02:00pm',booked:false,blocked: false},
        1500: {time: '03:00pm',booked:false,blocked: false},
        1600: {time: '04:00pm',booked:false,blocked: false},
        1700: {time: '05:00pm',booked:false,blocked: false}
        }
      },
      '4thursday': {name: 'Thursday',slots: {
        0900: {time: '09:00am',booked: false,blocked: false},
        1000: {time: '10:00am',booked:false,blocked: false},
        1100: {time: '11:00am',booked: false,blocked: false},
        1200: {time: '12:00pm',booked: false,blocked: false},
        1300: {time: '01:00pm',booked: false,blocked: false},
        1400: {time: '02:00pm',booked:false,blocked: false},
        1500: {time: '03:00pm',booked:false,blocked: false},
        1600: {time: '04:00pm',booked:false,blocked: false},
        1700: {time: '05:00pm',booked:false,blocked: false}
        }
      },
      '5friday': {name: 'Friday',slots: {
        0900: {time: '09:00am',booked: false,blocked: false},
        1000: {time: '10:00am',booked:false,blocked: false},
        1100: {time: '11:00am',booked: false,blocked: false},
        1200: {time: '12:00pm',booked: false,blocked: false},
        1300: {time: '01:00pm',booked: false,blocked: false},
        1400: {time: '02:00pm',booked:false,blocked: false},
        1500: {time: '03:00pm',booked:false,blocked: false},
        1600: {time: '04:00pm',booked:false,blocked: false},
        1700: {time: '05:00pm',booked:false,blocked: false}
        }
      },
      '6saturday': {name: 'Saturday',slots: {
        0900: {time: '09:00am',booked: false,blocked: false},
        1000: {time: '10:00am',booked:false,blocked: false},
        1100: {time: '11:00am',booked: false,blocked: false},
        1200: {time: '12:00pm',booked: false,blocked: false},
        1300: {time: '01:00pm',booked: false,blocked: false},
        1400: {time: '02:00pm',booked:false,blocked: false},
        1500: {time: '03:00pm',booked:false,blocked: false},
        1600: {time: '04:00pm',booked:false,blocked: false},
        1700: {time: '05:00pm',booked:false,blocked: false}
        }
      }
    });
  };

  var syncObject = $firebaseObject(appointmentRef);
  syncObject.$bindTo($scope, 'days');

  $scope.submitComment = function(message) {
    var name = angular.fromJson(localStorage.getItem('userName'));
    var text = message.text;
    
    var newComment = ref.push();
    newComment.set({name: name, text: text, time: Date.now(), userId: $scope.userId, key: newComment.key()});
    message.text = "";
  };

  $scope.saveEdit = function(key, text) {
    var newEdit = ref.child(key);
    newEdit.update({text: text});
  };

  $scope.sum = 0;
  $scope.submitLike = function() {
    likeRef.set({'sum' : ++$scope.sum});
  };

  $scope.Unlike = function() {
    likeRef.set({'sum' : --$scope.sum});
  };

  $scope.favourite = function(businessName, businessId) {
    for(var key in $scope.saved) {
      if(businessId === $scope.saved[key].id) {
        $scope.showSavedErrorToast();
        return;
      }
    }
    var newSave = favouriteRef.push();
    newSave.set({name: businessName, id: businessId, key: newSave.key()});
    $scope.showSavedSuccessToast();
  };

  $scope.deleteItem = function(key) {
    favouriteRef.child(key).remove();
    $scope.saved = [];
    favouriteRef.on('child_added', function(snapshot) {
      $scope.saved.unshift(snapshot.val());
      if ($scope.$root && !$scope.$root.$$phase) {
        $scope.$apply();
      }
    });
  };

  $scope.removeSaved = function(ev) {
    var confirm = $mdDialog.confirm()
      .title('Clear list')
      .content("Are you sure about this?")
      .ariaLabel('clear')
      .ok('Yes')
      .cancel('Cancel')
      .targetEvent(ev);
    $mdDialog.show(confirm).then(function() {
      favouriteRef.remove();
      $scope.saved = [];  
    });
  };

  $scope.saved = [];
  favouriteRef.on('child_added', function(snapshot) {
    $scope.saved.unshift(snapshot.val());
    if ($scope.$root && !$scope.$root.$$phase) {
      $scope.$apply();
    }
  });

  likeRef.on('child_added', function(snapshot) {
    $scope.sum = snapshot.val();
    if ($scope.$root && !$scope.$root.$$phase) {
      $scope.$apply();
    }
  });

  $scope.comments = [];
  ref.on('child_added', function(snapshot) {
    $scope.comments.unshift(snapshot.val());
    if ($scope.$root && !$scope.$root.$$phase) {
      $scope.$apply();
    }
  });

  $scope.deleteComment = function(key) {
    ref.child(key).remove();
    $scope.comments = [];
    ref.on('child_added', function(snapshot) {
      $scope.comments.unshift(snapshot.val());
      if ($scope.$root && !$scope.$root.$$phase) {
        $scope.$apply();
      }
    });
  };

  $scope.createAccount = function(ev) {
    var confirm = $mdDialog.confirm()
      .title('Add Business')
      .content("sign up/sign in to add business")
      .ariaLabel('log in')
      .ok('Ok')
      .cancel('Cancel')
      .targetEvent(ev);
    $mdDialog.show(confirm).then(function() {
      $location.url('/home');
    });
  };

  $scope.states = ('ABIA,ADAMAWA,AKWA IBOM,ANAMBRA,BAUCHI,BAYELSA,BENUE,BORNO,CROSS RIVER,DELTA,EBONYI,EDO,' +
    'EKITI,ENUGU,GOMBE,IMO,JIGAWA,KADUNA,KANO KATSINA,KEBBI,KOGI,KWARA,LAGOS,NASSARAWA,NIGER,OGUN,ONDO,OSUN,' +
    'OYO,PLATEAU,RIVERS,SOKOTO,TARABA,YOBE,ZAMFARA').split(',').map(function(state) {
    return {
      item: state
    };
  });

  $scope.categories = ('Fashion Designer,Make-up Artist,Hair Stylist,Wire work,' +
    'Boutiques,Restaurant&Bars,Others').split(',').map(function(category) {
    return {
      item: category
    };
  });

  $scope.createBusiness = function(business) {
    $scope.progressLoad = true;
    var userId = angular.fromJson(localStorage.getItem('userId'));
    business.created_by = userId;
    Upload.upload({
        method: "POST",
        url: '/api/business',
        // url: 'http://localhost:4000/api/business',
        file: business.imageUrl,
        fields: business
      })
      .success(function(data) {
        $scope.progressLoad = false;
        $scope.showSuccessToast();
        $location.url('/user/profile');
      });
  };

  $scope.showSuccessToast = function() {
    $mdToast.show({
      template: '<md-toast style="background:teal">' + 'Business Created' + '</md-toast>',
      hideDelay: 3000,
      position: 'top right'
    });
  };

  $scope.showSavedSuccessToast = function() {
    $mdToast.show({
      template: '<md-toast style="background:teal">' + 'Business Saved' + '</md-toast>',
      hideDelay: 3000,
      position: 'bottom left'
    });
  };

  $scope.showSavedErrorToast = function() {
    $mdToast.show({
      template: '<md-toast style="background:teal">' + 'Business Already Saved' + '</md-toast>',
      hideDelay: 3000,
      position: 'bottom left'
    });
  };

  $scope.showLoginError = function() {
    $mdToast.show({
      template: '<md-toast style="background:teal">' + 'Login or sign up to add business' + '</md-toast>',
      hideDelay: 3000,
      position: 'top left'
    });
  };

 $scope.showBookingSuccess = function() {
  $mdToast.show({
    template: '<md-toast style="background:teal">' + 'Successful!, business owner would get notified. Kindly check your mail for a confirmation' + '</md-toast>',
    hideDelay: 5000,
    position: 'top left'
  });
};

$scope.reset();

}]);

angular.module('jobfinder.auth', [])
.controller('AuthController', function ($scope, $window, $location, Auth) {
  // Redirect to home account page if logged in
  if (Auth.loggedIn()) {
    Auth.redirectHome();
  } 

  $scope.signin = function() {
    Auth.signin($scope.user)
      .then(function(resp) {
        if (resp.hasOwnProperty('user')) {
          $window.localStorage.setItem('userId', resp.user);
          Auth.redirectHome();
        }
      });
  };

  $scope.signout = function() {
    console.log("A");

  }
});
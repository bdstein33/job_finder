angular.module('jobfinder.top-nav', [])

.controller('TopNavController', function ($scope, $window, $location, Auth) {
  $scope.signout = function() {
    Auth.signout();
  }
});
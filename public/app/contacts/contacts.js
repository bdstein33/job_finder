angular.module('jobfinder.contacts', [])
.controller('ContactsController', function ($scope, $window, $location, Auth) {
  // Redirect to sign in page if not logged in
  if (!Auth.loggedIn()) {
    Auth.redirectSignin();
  } 

  $scope.username = $window.localStorage.getItem('userName');
  
});
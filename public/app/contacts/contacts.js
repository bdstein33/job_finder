angular.module('jobfinder.contacts', [])
.controller('ContactsController', function ($scope, $window, $location, $http, Auth) {
  // Redirect to sign in page if not logged in
  if (!Auth.loggedIn()) {
    Auth.redirectSignin();
  } 

  $scope.username = $window.localStorage.getItem('userName');

  $scope.contacts = {};
 

  $scope.getContacts = function() {
    return $http({
      method: 'GET',
      url: 'contacts/' + $window.localStorage.userId
    })
    .then(function(res) {
      $scope.contacts = res.data;
      console.log($scope.contacts);
    });
  };

  $scope.getContacts();
  
});
angular.module('jobfinder.jobs', [])
.controller('JobsController', function ($scope, $window, $location, $http, Auth) {
  // Redirect to sign in page if not logged in
  if (!Auth.loggedIn()) {
    Auth.redirectSignin();
  } 

  $scope.contacts = {};

  $scope.companies = {};
 

  $scope.getContacts = function() {
    return $http({
      method: 'GET',
      url: 'contacts/' + $window.localStorage.userId
    })
    .then(function(res) {
      $scope.contacts = res.data;
      var name
      for (var i = 0; i < $scope.contacts.length; i++) {
        //This if statement needs to be REMOVED
        if ($scope.contacts[i].name !== "") {
          if ($scope.contacts[i].experiences.length > 0) {
            name = $scope.contacts[i].experiences[0].company['name'];
            $scope.companies[name] = true;
          }
        }
      }
      $scope.companies = Object.keys($scope.companies);
      
    });
  };


  $scope.getContacts();

  
});
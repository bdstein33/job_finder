angular.module('jobfinder.jobs', [])
.controller('JobsController', function ($scope, $window, $location, $http, Auth) {
  // Redirect to sign in page if not logged in
  if (!Auth.loggedIn()) {
    Auth.redirectSignin();
  } 

  $scope.contacts = {};

  $scope.companies = {};
 
  $scope.jobs = []

  $scope.getCompanies = function() {
    return $http({
      method: 'GET',
      url: 'contacts/' + $window.localStorage.userId
    })
    .then(function(res) {
      $scope.contacts = res.data;
      
      for (var i = 0; i < $scope.contacts.length; i++) {
        if ($scope.contacts[i].experiences.length > 0) {

          var company = $scope.contacts[i].experiences[0].company['name'];
          console.log("1", company);
          $scope.companies[company] = [];
          $http({
            method: 'GET',
            url: 'jobs/' + company
          })
          .then(function(res) {
            if (!!res.data.result) {
               res.data.result.forEach(function(job) {
                console.log(job.company[0]);
                if ( $scope.companies.hasOwnProperty(job.company[0])) {
                   $scope.companies[job.company[0]].push(job);
                 } else {
                  $scope.companies[job.company[0]] = [job];
                 }
               
              })
            }
           
          })
        }
      }
    });
  };

  $scope.getCompanies();
  
});
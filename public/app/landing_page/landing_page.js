angular.module('jobfinder.landing_page', [])

.controller('LandingPageController', function ($scope, $window, $location, Auth) {
  // Redirect to home account page if logged in
  if (Auth.loggedIn()) {
    Auth.redirectHome();
  } 
});
angular.module('jobfinder.landing-page', [])

.controller('LandingPageController', function ($scope, $window, $location, Auth) {
  // Redirect to home account page if logged in
  if (Auth.loggedIn()) {
    Auth.redirectHome();
  } 
});
angular.module('jobfinder.services', [])

.factory('Auth', function($http, $location, $window) {

  var signin = function(user) {
    return $http({
      method: 'POST',
      url: '/signin',
      data: user
    })
    .then(function(res) {
      return res.data;
    });
  };

  var signup = function(user) {
    return $http({
      method: 'POST',
      url: '/signup',
      data: user
    })
    .then(function(resp) {
      return resp.data;
    });
  };

  var signout = function() {
    $window.localStorage.removeItem('userId');
    $window.localStorage.removeItem('userName');
    $location.path('/');
  };

  var loggedIn = function() {
    return !!$window.localStorage.getItem('userId');
  };

  var redirectSignin = function() {

    $location.path('signin');
  };

  var redirectHome = function() {
    $location.path('home');
  };

  return {
    signin: signin,
    signup: signup,
    signout: signout,
    loggedIn: loggedIn,
    redirectSignin: redirectSignin,
    redirectHome: redirectHome
  };

})
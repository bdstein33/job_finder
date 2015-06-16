angular.module('jobfinder', [
  'jobfinder.services',
  'jobfinder.auth',
  'jobfinder.landing_page',
  'jobfinder.home',
  'jobfinder.top-nav',
  'ngRoute',
  'ui.router'

])
// .config(function($routeProvider, $httpProvider) {
//   $routeProvider
//     .when('/signin',  {
//       templateUrl: 'app/auth/signin.html',
//       controller: 'AuthController'
//     })
//     .when('/signup',  {
//       templateUrl: 'app/auth/signup.html',
//       controller: 'AuthController'
//     })
//     .when('/', {
//       templateUrl: 'app/landing_page/landing_page.html',
//       controller: 'LandingPageController'
//     })
//     .when('/home', {
//       templateUrl: 'app/home/home.html',
//       controller: 'HomeController'
//     })
//     .otherwise({
//       redirectTo: '/'
//     });
// })


.config(function($stateProvider, $urlRouterProvider) {
  // Redirect unmatched urls to /
  

  // Set up states
  $stateProvider
    .state('/', {
      url: '/',
      views: {
        'top-nav': {
          templateUrl: 'app/top-nav/top-nav-logged-out.html',
          controller: 'TopNavController'
        },
        'main': {
          templateUrl: 'app/landing_page/landing_page.html',
          controller: 'LandingPageController'
        }
      }
    })
    .state('/signin', {
      url: '/signin',
      views: {
        'top-nav': {
          templateUrl: 'app/top-nav/top-nav-logged-out.html',
          controller: 'TopNavController'
        },
        'main': {
          templateUrl: 'app/auth/signin.html',
          controller: 'AuthController'
        }
      }
    })
    .state('/signup', {
      url: '/signup',
      views: {
        'top-nav': {
          templateUrl: 'app/top-nav/top-nav-logged-out.html',
          controller: 'TopNavController'
        },
        'main': {
          templateUrl: 'app/auth/signup.html',
          controller: 'AuthController'
        }
      }
    })
    .state('/home', {
      url: '/home',
      views: {
        'top-nav': {
          templateUrl: 'app/top-nav/top-nav-logged-in.html',
          controller: 'TopNavController'
        },
        'main': {
          templateUrl: 'app/home/home.html',
          controller: 'HomeController'
        }
      }
    })

    $urlRouterProvider.otherwise("/");
})
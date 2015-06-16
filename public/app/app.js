angular.module('jobfinder', [
  'jobfinder.services',
  'jobfinder.auth',
  'jobfinder.landing-page',
  'jobfinder.contacts',
  'jobfinder.jobs',
  'jobfinder.home',
  'jobfinder.top-nav',
  'jobfinder.upload',
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
    .state('/upload', {
      url: '/upload',
      views: {
        'top-nav': {
          templateUrl: 'app/top-nav/top-nav-logged-in.html',
          controller: 'TopNavController'
        },
        'main': {
          templateUrl: 'app/upload/upload.html',
          controller: 'UploadController'
        }
      }
    })
    .state('/contacts', {
      url: '/contacts',
      views: {
        'top-nav': {
          templateUrl: 'app/top-nav/top-nav-logged-in.html',
          controller: 'TopNavController'
        },
        'main': {
          templateUrl: 'app/contacts/contacts.html',
          controller: 'ContactsController'
        }
      }
    })
    .state('/jobs', {
      url: '/jobs',
      views: {
        'top-nav': {
          templateUrl: 'app/top-nav/top-nav-logged-in.html',
          controller: 'TopNavController'
        },
        'main': {
          templateUrl: 'app/jobs/jobs.html',
          controller: 'JobsController'
        }
      }
    })

    $urlRouterProvider.otherwise("/");
})
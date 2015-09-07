// public/js/app.js
angular.module('crossfitApp', ['ngRoute', 'ngCookies', 'appRoutes', 'MainCtrl', 'CompareGroupsCtrl', 'CompareYourselfCtrl', 'AthleteService', 'LoginCtrl', 'RegisterCtrl', 'ForgotCtrl', 'ResetCtrl', 'ProfileCtrl', 'AuthenticationService', 'FlashService', 'UserService'])
       .run(run);

  run.$inject = ['$rootScope', '$location', '$cookieStore', '$http', '$route'];

  // Old way of authorizing a user on page reload. Need to update to just use passport.
  function run($rootScope, $location, $cookieStore, $http, $route) {
      // keep user logged in after page refresh
      $route.reload();
      $rootScope.globals = $cookieStore.get('globals') || {};
      if ($rootScope.globals.currentUser) {
          $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
      }
  }

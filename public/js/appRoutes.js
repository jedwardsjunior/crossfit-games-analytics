// public/js/appRoutes.js

angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider

		.when('/compareGroups', {
			templateUrl: 'views/compareGroups.html',
			controller: 'CompareGroupsController'
		})

		.when('/compareYourself', {
			templateUrl: 'views/compareYourself.html',
			controller: 'CompareYourselfController'
		})

		.when('/strengthFinder', {
			templateUrl: 'views/strengthFinder.html',
			controller: 'StrengthFinderController'
		})

		.when('/descriptions', {
			templateUrl: 'views/descriptions.html',
			controller: 'MainController'
		})

		.when('/links', {
			templateUrl: 'views/relatedLinks.html',
			controller: 'MainController'
		})

		.when('/about', {
			templateUrl: 'views/about.html',
			controller: 'MainController'
		})

		.when('/contact', {
			templateUrl: 'views/contact.html',
			controller: 'MainController'
		})

		.when('/login', {
      controller: 'LoginController',
      templateUrl: 'views/login.html',
      controllerAs: 'vm'
    })

		.when('/profile', {
			controller: 'ProfileController',
			templateUrl: 'views/profile.html'
		})

    .when('/register', {
	    controller: 'RegisterController',
	    templateUrl: 'views/register.html',
	    controllerAs: 'vm'
    })

		.when('/forgot', {
	    controller: 'ForgotController',
	    templateUrl: 'views/forgot.html',
	    controllerAs: 'vm'
    })

		.when('/reset/:token', {
			controller: 'ResetController',
			templateUrl: 'views/reset.html',
			controllerAs: 'vm'
		})

		// home page
		.when('/', {
			templateUrl: 'views/index.html',
			controller: 'MainController'
		})

		.otherwise({ redirectTo: '/login' });


	$locationProvider.html5Mode(true);
	$locationProvider.hashPrefix('!');

}]);

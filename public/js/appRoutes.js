// public/js/appRoutes.js

angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider
		// home page
		.when('/', {
			templateUrl: 'views/index.html',
			controller: 'MainController'
		})

		.when('/compareGroups', {
			templateUrl: 'views/compareGroups.html',
			controller: 'CompareGroupsController'
		})

		.when('/compareYourself', {
			templateUrl: 'views/compareYourself.html',
			controller: 'CompareYourselfController'
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

		.otherwise({ redirectTo: '/login' });


	$locationProvider.html5Mode(true);

}]);

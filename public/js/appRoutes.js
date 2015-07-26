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

		.when('/about', {
			templateUrl: 'views/about.html',
			controller: 'MainController'
		});


	$locationProvider.html5Mode(true);

}]);

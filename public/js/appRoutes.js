// public/js/appRoutes.js

angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider
		// home page
		.when('/', {
			templateUrl: 'views/index.html',
			controller: 'MainController'
		})

		.when('/descriptions', {
			templateUrl: 'views/descriptions.html',
			controller: 'MainController'
		});


	$locationProvider.html5Mode(true);

}]);

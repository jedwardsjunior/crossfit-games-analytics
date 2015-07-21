// public/js/services/AthleteService.js
angular.module('AthleteService', []).factory('Athlete', ['$http', function($http) {

	return {
		// call to get all nerds
		get : function() {
			return $http.get('/api/getAthleteScores');
		}
	}

}]);

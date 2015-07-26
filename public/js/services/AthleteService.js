// public/js/services/AthleteService.js
angular.module('AthleteService', []).factory('Athlete', ['$http', function($http) {


	return {
		// call to get all nerds
		get : function(division) {
			return $http.get('/api/athleteScores/'+division).then(function(res) {
				return res.data;
			});
		}
	}

}]);

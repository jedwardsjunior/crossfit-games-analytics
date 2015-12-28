// public/js/services/AthleteService.js
angular.module('AthleteService', []).factory('Athlete', ['$http', function($http) {

	// Looks up scores in the athlete DB collections to display on home, Compare Groups,
	// and Compare Yourself pages
	return {
		// call to get all nerds
		get : function(division, year) {
			var collection = division+"-"+year;

			return $http.get('/api/athleteScores/'+collection).then(function(res) {
				return res.data;
			});
		}
	}

}]);

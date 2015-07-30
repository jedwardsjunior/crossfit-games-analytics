// public/js/services/AthleteService.js
angular.module('AthleteService', []).factory('Athlete', ['$http', function($http) {


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

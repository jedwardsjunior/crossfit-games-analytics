// public/js/controllers/MainCtrl.js
angular.module('MainCtrl', []).controller('MainController', ['$scope', 'Athlete', function($scope, Athlete) {

  $scope.fran = 0;
  $scope.helen = 0;
  $scope.grace = 0;
  $scope.filthy50 = 0;
  $scope.fightGoneBad = 0;
  $scope.sprint400m = 0;
  $scope.run5k = 0;
  $scope.cleanAndJerk = 0;
  $scope.snatch = 0;
  $scope.deadlift = 0;
  $scope.backSquat = 0;
  $scope.maxPullups = 0;
  $scope.gender="women";
  $scope.level="top";

  $scope.getAthleteScores = function(){
    console.log($scope.gender);
    console.log($scope.level);
    var division = $scope.gender+"-"+$scope.level;
    console.log(division);
    Athlete.get(division).then(function(scores) {
    $scope.fran = scores.fran;
    $scope.helen = scores.helen;
    $scope.grace = scores.grace;
    $scope.filthy50 = scores.filthy50;
    $scope.fightGoneBad = scores.fightGoneBad;
    $scope.sprint400m = scores.sprint400m;
    $scope.run5k = scores.run5k;
    $scope.cleanAndJerk = scores.cleanAndJerk;
    $scope.snatch = scores.snatch;
    $scope.deadlift = scores.deadlift;
    $scope.backSquat = scores.backSquat;
    $scope.maxPullups = scores.maxPullups;
  })};

  $scope.getAthleteScores();

}]);

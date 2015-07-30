// public/js/controllers/CompareYourselfCtrl.js
angular.module('CompareYourselfCtrl', []).controller('CompareYourselfController', ['$scope', 'Athlete', function($scope, Athlete) {

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

  $scope.franMins;
  $scope.franSeconds;
  $scope.franScore = 0;
  $scope.helenMins;
  $scope.helenSeconds;
  $scope.helenScore = 0;
  $scope.graceMins;
  $scope.graceSeconds;
  $scope.graceScore = 0;
  $scope.filthy50Mins;
  $scope.filthy50Seconds;
  $scope.filthy50Score = 0;
  $scope.fightGoneBadScore;
  $scope.sprintMins;
  $scope.sprintSeconds;
  $scope.sprint400mScore = 0;
  $scope.runMins;
  $scope.runSeconds;
  $scope.run5kScore;
  $scope.cleanAndJerkScore;
  $scope.snatchScore;
  $scope.deadliftScore;
  $scope.backSquatScore;
  $scope.maxPullupsScore;

  $scope.level="women-top";
  $scope.levelLabel = "Female Top 10";
  $scope.hiddenForm = false;
  $scope.hiddenTable = true;

  getLevelLabel = function(level) {
    var levelLabel = "";
    if(level=="women-top") {
      levelLabel = "Female Top 10";
    } else if (level=="men-top") {
      levelLabel = "Male Top 10";
    } else if(level=="women-games") {
      levelLabel = "Female Games";
    } else if(level=="men-games") {
      levelLabel = "Male Games";
    } else if(level=="women-regionals") {
      levelLabel = "Female Regionals";
    } else if(level=="men-regionals") {
      levelLabel = "Male Regionals";
    } else if(level=="women-open") {
      levelLabel = "Female Open";
    } else if(level=="men-open") {
      levelLabel = "Male Open";
    } else if(level=="women-first") {
      levelLabel = "First Place Female";
    } else {
      levelLabel = "First Place Male";
    }
    return levelLabel;
  }

  getAthleteScores = function(level, year){
    Athlete.get(level, year).then(function(scores) {

    var franMins = Math.floor(parseInt(scores.fran) / 60);
    var franSecs = parseInt(scores.fran) % 60;
    franSecs = ("0" + franSecs).slice(-2)
    if(!franMins || !franSecs) {
      $scope.fran = "No Data";
    } else {
      $scope.fran = franMins+":"+franSecs;
    }

    var helenMins = Math.floor(parseInt(scores.helen) / 60);
    var helenSecs = parseInt(scores.helen) % 60;
    helenSecs = ("0" + helenSecs).slice(-2)
    if(!helenMins || !helenSecs) {
      $scope.helen = "No Data";
    } else {
      $scope.helen = helenMins+":"+helenSecs;
    }

    var graceMins = Math.floor(parseInt(scores.grace) / 60);
    var graceSecs = parseInt(scores.grace) % 60;
    graceSecs = ("0" + graceSecs).slice(-2)
    if(!graceMins || !graceSecs) {
      $scope.grace = "No Data";
    } else {
      $scope.grace = graceMins+":"+graceSecs;
    }

    var filthyMins = Math.floor(parseInt(scores.filthy50) / 60);
    var filthySecs = parseInt(scores.filthy50) % 60;
    filthySecs = ("0" + filthySecs).slice(-2)
    if(!filthyMins || !filthySecs) {
      $scope.filthy50 = "No Data";
    } else {
      $scope.filthy50 = filthyMins+":"+filthySecs;
    }

    if (!scores.fightGoneBad) {
      $scope.fightGoneBad = "No Data";
    } else {
      $scope.fightGoneBad = Math.floor(scores.fightGoneBad);
    }

    var sprintMins = Math.floor(parseInt(scores.sprint400m) / 60);
    var sprintSecs = parseInt(scores.sprint400m) % 60;
    sprintSecs = ("0" + sprintSecs).slice(-2)
    if(!sprintMins || !sprintSecs) {
      $scope.sprint400m = "No Data";
    } else {
      $scope.sprint400m = sprintMins+":"+sprintSecs;
    }


    var runMins = Math.floor(parseInt(scores.run5k) / 60);
    var runSecs = parseInt(scores.run5k) % 60;
    runSecs = ("0" + runSecs).slice(-2)
    if(!runMins || !runSecs) {
      $scope.run5k = "No Data";
    } else {
      $scope.run5k = runMins+":"+runSecs;
    }

    if (!scores.cleanAndJerk) {
      $scope.cleanAndJerk = "No Data";
    } else {
      $scope.cleanAndJerk = scores.cleanAndJerk+" lbs";
    }

    if (!scores.snatch) {
      $scope.snatch = "No Data";
    } else {
      $scope.snatch = scores.snatch+" lbs";
    }

    if (!scores.deadlift) {
      $scope.deadlift = "No Data";
    } else {
      $scope.deadlift = scores.deadlift+" lbs";
    }

    if (!scores.backSquat) {
      $scope.backSquat = "No Data";
    } else {
      $scope.backSquat = scores.backSquat+" lbs";
    }

    if (!scores.maxPullups) {
      $scope.maxPullups = "No Data";
    } else {
      $scope.maxPullups = Math.floor(scores.maxPullups);
    }
    });
  };


  $scope.submitCompareForm = function() {
    $scope.levelLabel = getLevelLabel($scope.level);
    getAthleteScores($scope.level, "14");
    $scope.franScore = $scope.franMins+":"+$scope.franSeconds;
    if (!$scope.franMins || !$scope.franSeconds) {
      $scope.franScore = "";
    }

    $scope.helenScore = $scope.helenMins+":"+$scope.helenSeconds;
    if (!$scope.helenMins || !$scope.helenSeconds) {
      $scope.helenScore = "";
    }

    $scope.graceScore = $scope.graceMins+":"+$scope.graceSeconds;
    if (!$scope.graceMins || !!$scope.graceSeconds) {
      $scope.graceScore = "";
    }

    $scope.filthy50Score = $scope.filthy50Mins+":"+$scope.filthy50Seconds;
    if (!$scope.filthy50Mins || !$scope.filthy50Seconds) {
      $scope.filthy50Score = "";
    }

    $scope.sprint400mScore = $scope.sprintMins+":"+$scope.sprintSeconds;
    if (!$scope.sprintMins || !$scope.sprintSeconds) {
      $scope.sprint400mScore = "";
    }

    $scope.run5kTime = $scope.runMins+":"+$scope.runSeconds;
    if(!$scope.runMins || !$scope.runSeconds) {
      $scope.run5kTime = "";
    }

    if ($scope.cleanAndJerkScore) {
      $scope.cleanAndJerkScore = $scope.cleanAndJerkScore + " lbs";
    }
    if ($scope.snatchScore) {
      $scope.snatchScore = $scope.snatchScore+ " lbs";
    }
    if ($scope.deadliftScore) {
      $scope.deadliftScore = $scope.deadliftScore+ " lbs";
    }
    if ($scope.backSquatScore) {
      $scope.backSquatScore = $scope.backSquatScore+ " lbs";
    }
    $scope.hiddenForm = true;
    $scope.hiddenTable = false;
  }

}]);

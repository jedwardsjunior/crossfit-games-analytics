// public/js/controllers/MainCtrl.js
angular.module('CompareGroupsCtrl', []).controller('CompareGroupsController', ['$scope', 'Athlete', function($scope, Athlete) {

  $scope.frans = {};
  $scope.helens = {};
  $scope.graces = {};
  $scope.filthy50s = {};
  $scope.fightGoneBads = {};
  $scope.sprint400ms = {};
  $scope.run5ks = {};
  $scope.cleanAndJerks = {};
  $scope.snatchs = {};
  $scope.deadlifts = {};
  $scope.backSquats = {};
  $scope.maxPullups = {};

  $scope.level="women-top";
  $scope.levels = [];
  $scope.levelLabels = [];

  $scope.tableWidth = 600;
  $scope.tdWidth = $scope.tableWidth/($scope.levels.length+1);

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
    } else {
      levelLabel = "Male Open";
    }
    return levelLabel;
  }

  getLevel = function(levelLabel) {
    var level = "";
    if(levelLabel=="Female Top 10") {
      level = "women-top";
    } else if (levelLabel=="Male Top 10") {
      level = "men-top";
    } else if(levelLabel=="Female Games") {
      level = "women-games";
    } else if(levelLabel=="Male Games") {
      level = "men-games";
    } else if(levelLabel=="Female Regionals") {
      level = "women-regionals";
    } else if(levelLabel=="Male Regionals") {
      level = "men-regionals";
    } else if(levelLabel=="Female Open") {
      level = "women-open";
    } else {
      level = "men-open";
    }
    return level;
  }

  getAthleteScores = function(level){
    console.log(level);
    Athlete.get(level).then(function(scores) {

    var franMins = Math.floor(parseInt(scores.fran) / 60);
    var franSecs = parseInt(scores.fran) % 60;
    franSecs = ("0" + franSecs).slice(-2)
    $scope.frans[level] = franMins+":"+franSecs;

    var helenMins = Math.floor(parseInt(scores.helen) / 60);
    var helenSecs = parseInt(scores.helen) % 60;
    helenSecs = ("0" + helenSecs).slice(-2)
    $scope.helens[level] = helenMins+":"+helenSecs;

    var graceMins = Math.floor(parseInt(scores.grace) / 60);
    var graceSecs = parseInt(scores.grace) % 60;
    graceSecs = ("0" + graceSecs).slice(-2)
    $scope.graces[level] = graceMins+":"+graceSecs;

    var filthyMins = Math.floor(parseInt(scores.filthy50) / 60);
    var filthySecs = parseInt(scores.filthy50) % 60;
    filthySecs = ("0" + filthySecs).slice(-2)
    $scope.filthy50s[level] = filthyMins+":"+filthySecs;

    $scope.fightGoneBads[level] = Math.floor(scores.fightGoneBad);

    var sprintMins = Math.floor(parseInt(scores.sprint400m) / 60);
    var sprintSecs = parseInt(scores.sprint400m) % 60;
    sprintSecs = ("0" + sprintSecs).slice(-2)
    $scope.sprint400ms[level] = sprintMins+":"+sprintSecs;

    var runMins = Math.floor(parseInt(scores.run5k) / 60);
    var runSecs = parseInt(scores.run5k) % 60;
    runSecs = ("0" + runSecs).slice(-2)
    $scope.run5ks[level] = runMins+":"+runSecs;

    $scope.cleanAndJerks[level] = scores.cleanAndJerk;

    $scope.snatchs[level] = scores.snatch;

    $scope.deadlifts[level] = scores.deadlift;

    $scope.backSquats[level] = scores.backSquat;

    $scope.maxPullups[level] = Math.floor(scores.maxPullups);
    });
  };

  removeAthleteScores = function(level) {
    if($scope.frans[level] != "") {
      delete $scope.frans[level];
      delete $scope.helens[level];
      delete $scope.graces[level];
      delete $scope.filthy50s[level];
      delete $scope.fightGoneBads[level];
      delete $scope.sprint400ms[level];
      delete $scope.run5ks[level];
      delete $scope.cleanAndJerks[level];
      delete $scope.snatchs[level];
      delete $scope.deadlifts[level];
      delete $scope.backSquats[level];
      delete $scope.maxPullups[level];
    }
  }

  $scope.submitLevelForm = function() {
    if ($scope.levels.indexOf($scope.level) == -1) {
      $scope.levels.push($scope.level);
      var levelLabel = getLevelLabel($scope.level)
      $scope.levelLabels.push(levelLabel);
      getAthleteScores($scope.level);
    }
    console.log($scope.levels);
    console.log($scope.levelLabels);
  }

  $scope.removeLevel = function(levelLabel) {
    var index = $scope.levelLabels.indexOf(levelLabel);
    if (index > -1) {
      $scope.levelLabels.splice(index, 1);
      var level = getLevel(levelLabel);
      var levelIndex = $scope.levels.indexOf(level);
      $scope.levels.splice(levelIndex, 1);
      removeAthleteScores(level);

    }
    console.log($scope.levels);
    console.log($scope.levelLabels);
  }

}]);
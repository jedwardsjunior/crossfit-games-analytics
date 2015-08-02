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
  $scope.year = "15";
  $scope.levels = [];
  $scope.levelLabels = [];

  $scope.tableWidth = 600;
  $scope.tdWidth = $scope.tableWidth/($scope.levels.length+1);

  getLevelLabel = function(level, year) {
    var levelLabel = "";
    if(level=="women-top") {
      levelLabel = "Female Top 10 (20"+year+")";
    } else if (level=="men-top") {
      levelLabel = "Male Top 10 (20"+year+")";
    } else if(level=="women-games") {
      levelLabel = "Female Games (20"+year+")";
    } else if(level=="men-games") {
      levelLabel = "Male Games (20"+year+")";
    } else if(level=="women-regionals") {
      levelLabel = "Female Regionals (20"+year+")";
    } else if(level=="men-regionals") {
      levelLabel = "Male Regionals (20"+year+")";
    } else if(level=="women-open") {
      levelLabel = "Female Open (20"+year+")";
    } else if(level=="men-open") {
      levelLabel = "Male Open (20"+year+")";
    } else if(level=="women-first") {
      levelLabel = "First Place Female (20"+year+")";
    } else {
      levelLabel = "First Place Male (20"+year+")";
    }
    return levelLabel;
  }

  getLevel = function(levelLabel) {
    var level = ""
    console.log(levelLabel)
    var year = levelLabel.substring(levelLabel.length - 3, levelLabel.length - 1);
    levelLabel = levelLabel.substring(0, levelLabel.length - 7);
    console.log(levelLabel)
    if(levelLabel=="Female Top 10") {
      level = "women-top-"+year;
    } else if (levelLabel=="Male Top 10") {
      level = "men-top-"+year;
    } else if(levelLabel=="Female Games") {
      level = "women-games-"+year;
    } else if(levelLabel=="Male Games") {
      level = "men-games-"+year;
    } else if(levelLabel=="Female Regionals") {
      level = "women-regionals-"+year;
    } else if(levelLabel=="Male Regionals") {
      level = "men-regionals-"+year;
    } else if(levelLabel=="Female Open") {
      level = "women-open-"+year;
    } else if(levelLabel=="Male Open") {
      level = "men-open-"+year;
    } else if(levelLabel=="First Place Female") {
      level = "women-first-"+year;
    } else {
      level = "men-first-"+year;
    }
    return level;
  }

  getAthleteScores = function(level, year){
    Athlete.get(level, year).then(function(scores) {
    // Hack so I don't have to change all the 'level' keys to
    // insert in the dictionary
    level = level+"-"+year;

    var franMins = Math.floor(parseInt(scores.fran) / 60);
    var franSecs = parseInt(scores.fran) % 60;
    franSecs = ("0" + franSecs).slice(-2)
    if(!franMins || !franSecs) {
      $scope.frans[level] = "No Data";
    } else {
      $scope.frans[level] = franMins+":"+franSecs;
    }

    var helenMins = Math.floor(parseInt(scores.helen) / 60);
    var helenSecs = parseInt(scores.helen) % 60;
    helenSecs = ("0" + helenSecs).slice(-2)
    if(!helenMins || !helenSecs) {
      $scope.helens[level] = "No Data";
    } else {
      $scope.helens[level] = helenMins+":"+helenSecs;
    }

    var graceMins = Math.floor(parseInt(scores.grace) / 60);
    var graceSecs = parseInt(scores.grace) % 60;
    graceSecs = ("0" + graceSecs).slice(-2)
    if(!graceMins || !graceSecs) {
      $scope.graces[level] = "No Data";
    } else {
      $scope.graces[level] = graceMins+":"+graceSecs;
    }

    var filthyMins = Math.floor(parseInt(scores.filthy50) / 60);
    var filthySecs = parseInt(scores.filthy50) % 60;
    filthySecs = ("0" + filthySecs).slice(-2)
    if(!filthyMins || !filthySecs) {
      $scope.filthy50s[level] = "No Data";
    } else {
      $scope.filthy50s[level] = filthyMins+":"+filthySecs;
    }

    if (!scores.fightGoneBad) {
      $scope.fightGoneBads[level] = "No Data";
    } else {
      $scope.fightGoneBads[level] = Math.floor(scores.fightGoneBad);
    }

    var sprintMins = Math.floor(parseInt(scores.sprint400m) / 60);
    var sprintSecs = parseInt(scores.sprint400m) % 60;
    sprintSecs = ("0" + sprintSecs).slice(-2)
    if(!sprintMins || !sprintSecs) {
      $scope.sprint400ms[level] = "No Data";
    } else {
      $scope.sprint400ms[level] = sprintMins+":"+sprintSecs;
    }

    var runMins = Math.floor(parseInt(scores.run5k) / 60);
    var runSecs = parseInt(scores.run5k) % 60;
    runSecs = ("0" + runSecs).slice(-2)
    if(!runMins || !runSecs) {
      $scope.run5ks[level] = "No Data";
    } else {
      $scope.run5ks[level] = runMins+":"+runSecs;
    }

    if (!scores.cleanAndJerk) {
      $scope.cleanAndJerks[level] = "No Data";
    } else {
      $scope.cleanAndJerks[level] = scores.cleanAndJerk+" lbs";
    }

    if (!scores.snatch) {
      $scope.snatchs[level] = "No Data";
    } else {
      $scope.snatchs[level] = scores.snatch+" lbs";
    }

    if (!scores.deadlift) {
      $scope.deadlifts[level] = "No Data";
    } else {
      $scope.deadlifts[level] = scores.deadlift+" lbs";
    }

    if (!scores.backSquat) {
      $scope.backSquats[level] = "No Data";
    } else {
      $scope.backSquats[level] = scores.backSquat+" lbs";
    }

    if (!scores.maxPullups) {
      $scope.maxPullups[level] = "No Data";
    } else {
      $scope.maxPullups[level] = Math.floor(scores.maxPullups);
    }
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
    if ($scope.levels.indexOf($scope.level+"-"+$scope.year) == -1) {
      $scope.levels.push($scope.level+"-"+$scope.year);
      var levelLabel = getLevelLabel($scope.level, $scope.year)
      $scope.levelLabels.push(levelLabel);
      getAthleteScores($scope.level, $scope.year);
    }
  }

  $scope.removeLevel = function(levelLabel) {
    var index = $scope.levelLabels.indexOf(levelLabel);
    if (index > -1) {
      $scope.levelLabels.splice(index, 1);
      var level = getLevel(levelLabel);
      console.log(level);
      var levelIndex = $scope.levels.indexOf(level);
      $scope.levels.splice(levelIndex, 1);
      removeAthleteScores(level);

    }
  }

}]);

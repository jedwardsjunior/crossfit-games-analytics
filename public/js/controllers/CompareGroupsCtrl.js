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

  $scope.franDiffs = {};
  $scope.helenDiffs = {};
  $scope.graceDiffs = {};
  $scope.filthy50Diffs = {};
  $scope.fightGoneBadDiffs = {};
  $scope.sprint400mDiffs = {};
  $scope.run5kDiffs = {};
  $scope.cleanAndJerkDiffs = {};
  $scope.snatchDiffs = {};
  $scope.deadliftDiffs = {};
  $scope.backSquatDiffs = {};
  $scope.maxPullupDiffs = {};

  $scope.franKeys = [];
  $scope.helenKeys = [];
  $scope.graceKeys = [];
  $scope.filthy50Keys = [];
  $scope.fightGoneBadKeys = [];
  $scope.sprint400mKeys = [];
  $scope.run5kKeys = [];
  $scope.cleanAndJerkKeys = [];
  $scope.snatchKeys = [];
  $scope.deadliftKeys = [];
  $scope.backSquatKeys = [];
  $scope.maxPullupKeys = [];

  $scope.level="women-top";
  $scope.year = "15";
  $scope.levels = [];
  $scope.levelLabels = [];

  $scope.tableWidth = 600;
  $scope.tdWidth = $scope.tableWidth/($scope.levels.length+1);
  $scope.hiddenDiff = true;
  $scope.hiddenTable = false;

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
    //console.log(levelLabel)
    var year = levelLabel.substring(levelLabel.length - 3, levelLabel.length - 1);
    levelLabel = levelLabel.substring(0, levelLabel.length - 7);
    //console.log(levelLabel)
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

  /* Add a new level to the comparison table */
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
    updateKeys();
    sortDiffs();
    });

  };

  /* Remove a level from the comparison table */
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
      updateKeys();
      sortDiffs();
    }
  }

  /** Keys needed to properly display differentials in Differential Mode */
  updateKeys = function() {
    $scope.franKeys = Object.keys($scope.frans);
    $scope.helenKeys = Object.keys($scope.helens);
    $scope.graceKeys = Object.keys($scope.graces);
    $scope.filthy50Keys = Object.keys($scope.filthy50s);
    $scope.fightGoneBadKeys = Object.keys($scope.fightGoneBads);
    $scope.sprint400mKeys = Object.keys($scope.sprint400ms);
    $scope.run5kKeys = Object.keys($scope.run5ks);
    $scope.cleanAndJerkKeys = Object.keys($scope.cleanAndJerks);
    $scope.snatchKeys = Object.keys($scope.snatchs);
    $scope.deadliftKeys = Object.keys($scope.deadlifts);
    $scope.backSquatKeys = Object.keys($scope.backSquats);
    $scope.maxPullupKeys = Object.keys($scope.maxPullups);
  }

  /** Converts standard MM:SS format to seconds for comparison */
  convertTimesToSeconds = function(time) {
    if (time.length == 4) {
      seconds = parseInt(time.substring(0, 1) * 60);
    } else {
      seconds = parseInt(time.substring(0, 2) * 60);
    }
    seconds = seconds + parseInt(time.substring(time.length-2, time.length));
    //console.log("Seconds = "+seconds);
    return seconds;
  }

  /** Converts seconds to standard MM:SS format */
  convertSecondsToTimes = function(seconds) {
    time = Math.floor(seconds/60) + ":";
    if (parseInt(seconds % 60) < 10) {
      time = time + "0" +seconds % 60;
    } else {
      time = time + seconds % 60;
    }
    //console.log(time);
    return time;
  }

  convertWeightToNumber = function(weight) {
    return weight.substring(0,weight.length - 4);
  }

  /** Merge sorts from largest --> smallest (for scores) */
  mergeSort = function(list) {
    if (list.length <= 1) {
      return list;
    }

    var a = list.slice(0, list.length/2);
    var b = list.slice(list.length/2, list.length);

    a = mergeSort(a);
    b = mergeSort(b)

    return merge(a, b);
  }

  merge = function(a, b) {
    var sorted = [];

    while ( a.length > 0 && b.length > 0 ) {
      if ( a[0] < b[0] ) {
        sorted.push(b[0]);
        b.splice(0, 1);
      } else {
        sorted.push(a[0]);
        a.splice(0, 1);
      }
    }
     while ( a.length > 0 ) {
       sorted.push(a[0]);
       a.splice(0, 1);
     }
     while ( b.length > 0 ) {
       sorted.push(b[0]);
       b.splice(0, 1);
     }
     return sorted;
  }

  /** Merge sorts from smallest --> largest (for times) */
  mergeSortTimes = function(list) {
    if (list.length <= 1) {
      return list;
    }

    var a = list.slice(0, list.length/2);
    var b = list.slice(list.length/2, list.length);

    a = mergeSortTimes(a);
    b = mergeSortTimes(b)

    return mergeTimes(a, b);
  }

  mergeTimes = function(a, b) {
    var sorted = [];

    while ( a.length > 0 && b.length > 0 ) {
      if ( a[0] > b[0] ) {
        sorted.push(b[0]);
        b.splice(0, 1);
      } else {
        sorted.push(a[0]);
        a.splice(0, 1);
      }
    }
     while ( a.length > 0 ) {
       sorted.push(a[0]);
       a.splice(0, 1);
     }
     while ( b.length > 0 ) {
       sorted.push(b[0]);
       b.splice(0, 1);
     }
     return sorted;
  }

  /** Returns a dictionary with the keys corresponding to the differentials
      time for times (i.e. Fran or Helen) **/
  convertTimesToDifferentials = function(list, dictionary) {
    diffDict = {};
    if(list.length > 0) {
      var keys = Object.keys(dictionary);
      firstTime = convertSecondsToTimes(list[0]);
      firstKey = "";
      for (j=0; j<keys.length; j++) {
        if (dictionary[keys[j]] == firstTime) {
          firstKey = keys[j];
          keys.splice(j, 1);
          break;
        }
      }

      diffDict[firstKey] = firstTime;
      for (i = 1; i < list.length; i++) {
        matchingKey = "";
        for (j=0; j<keys.length; j++) {
          if (dictionary[keys[j]] == convertSecondsToTimes(list[i])) {
            matchingKey = keys[j];
            keys.splice(j, 1);
            break;
          }
        }
        list[i] = list[i] - list[0];
        diffDict[matchingKey] = "+"+list[i]+" seconds";
      }
    }
    return diffDict;
  }

  /** Returns a dictionary with the keys corresponding to the differentials
      time for scores (1RMs) **/
  convertWeightsToDifferentials = function(list, dictionary) {
    diffDict = {};
    if(list.length > 0) {
      var keys = Object.keys(dictionary);
      firstScore = list[0];
      firstKey = "";
      for (j=0; j<keys.length; j++) {
        if (dictionary[keys[j]] == list[0]+" lbs") {
          firstKey = keys[j];
          keys.splice(j, 1);
          break;
        }
      }

      diffDict[firstKey] = firstScore;
      for (i = 1; i < list.length; i++) {
        matchingKey = "";
        for (j=0; j<keys.length; j++) {
          if (dictionary[keys[j]] == list[i]+" lbs") {
            matchingKey = keys[j];
            keys.splice(j, 1);
            break;
          }
        }
        list[i] = list[i] - firstScore;
        diffDict[matchingKey] = parseFloat(list[i]).toFixed(2)+" lbs";
      }
    }
    return diffDict;
  }

  /** Returns a dictionary with the keys corresponding to the differentials
      time for scores (i.e. 1RMs and FGB/Pullups) **/
  convertScoresToDifferentials = function(list, dictionary) {
    diffDict = {};
    if(list.length > 0) {
      var keys = Object.keys(dictionary);
      firstScore = list[0];
      firstKey = "";
      for (j=0; j<keys.length; j++) {
        if (dictionary[keys[j]] == list[0]) {
          firstKey = keys[j];
          keys.splice(j, 1);
          break;
        }
      }

      diffDict[firstKey] = firstScore;
      for (i = 1; i < list.length; i++) {
        matchingKey = "";
        for (j=0; j<keys.length; j++) {
          if (dictionary[keys[j]] == list[i]) {
            matchingKey = keys[j];
            keys.splice(j, 1);
            break;
          }
        }
        list[i] = list[i] - firstScore;
        diffDict[matchingKey] = list[i];
      }
    }
    return diffDict;
  }

  /** Updates the differentials every time a new level is added */
  sortDiffs = function() {
    var franArray = [];
    for (fran in $scope.frans) {
      franArray.push(convertTimesToSeconds($scope.frans[fran]));
    }
    $scope.franDiffs = convertTimesToDifferentials(mergeSortTimes(franArray), $scope.frans);

    var helenArray = [];
    for (helen in $scope.helens) {
      helenArray.push(convertTimesToSeconds($scope.helens[helen]));
    }
    $scope.helenDiffs = convertTimesToDifferentials(mergeSortTimes(helenArray), $scope.helens);

    var graceArray = [];
    for (grace in $scope.graces) {
      graceArray.push(convertTimesToSeconds($scope.graces[grace]));
    }
    $scope.graceDiffs = convertTimesToDifferentials(mergeSortTimes(graceArray), $scope.graces);

    var filthyArray = [];
    for (filthy in $scope.filthy50s) {
      filthyArray.push(convertTimesToSeconds($scope.filthy50s[filthy]));
    }
    $scope.filthy50Diffs = convertTimesToDifferentials(mergeSortTimes(filthyArray), $scope.filthy50s);

    var fgbArray = [];
    for (fgb in $scope.fightGoneBads) {
      fgbArray.push($scope.fightGoneBads[fgb]);
    }
    $scope.fightGoneBadDiffs = convertScoresToDifferentials(mergeSort(fgbArray), $scope.fightGoneBads);

    var sprintArray = [];
    for (sprint in $scope.sprint400ms) {
      sprintArray.push(convertTimesToSeconds($scope.sprint400ms[sprint]));
    }
    $scope.sprint400mDiffs = convertTimesToDifferentials(mergeSortTimes(sprintArray), $scope.sprint400ms);


    var runArray = [];
    for (run in $scope.run5ks) {
      runArray.push(convertTimesToSeconds($scope.run5ks[run]));
    }
    $scope.run5kDiffs = convertTimesToDifferentials(mergeSortTimes(runArray), $scope.run5ks);


    var cjArray = [];
    for (cj in $scope.cleanAndJerks) {
      cjArray.push(convertWeightToNumber($scope.cleanAndJerks[cj]));
    }
    $scope.cleanAndJerkDiffs = convertWeightsToDifferentials(mergeSort(cjArray), $scope.cleanAndJerks);

    var snatchArray = [];
    for (snatch in $scope.snatchs) {
      snatchArray.push(convertWeightToNumber($scope.snatchs[snatch]));
    }
    $scope.snatchDiffs = convertWeightsToDifferentials(mergeSort(snatchArray), $scope.snatchs);

    var deadliftArray = [];
    for (deadlift in $scope.deadlifts) {
      deadliftArray.push(convertWeightToNumber($scope.deadlifts[deadlift]));
    }
    $scope.deadliftDiffs = convertWeightsToDifferentials(mergeSort(deadliftArray), $scope.deadlifts);

    var backsquatArray = [];
    for (backsquat in $scope.backSquats) {
      backsquatArray.push(convertWeightToNumber($scope.backSquats[backsquat]));
    }
    $scope.backSquatDiffs = convertWeightsToDifferentials(mergeSort(backsquatArray), $scope.backSquats);


    var pullupArray = [];
    for (pullup in $scope.maxPullups) {
      pullupArray.push($scope.maxPullups[pullup]);
    }
    $scope.maxPullupDiffs = convertScoresToDifferentials(mergeSort(pullupArray), $scope.maxPullups);
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
      //console.log(level);
      var levelIndex = $scope.levels.indexOf(level);
      $scope.levels.splice(levelIndex, 1);
      removeAthleteScores(level);
    }
  }

  $scope.viewScores = function() {
    //console.log("View Scores!");
    $scope.hiddenDiff = true;
    $scope.hiddenTable = false;
  }

  $scope.viewDifferentials = function() {
    //console.log("View Differentials!");
    $scope.hiddenDiff = false;
    $scope.hiddenTable = true;
  }

}]);

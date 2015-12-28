// public/js/controllers/CompareYourselfCtrl.js
angular.module('StrengthFinderCtrl', []).controller('StrengthFinderController', ['$scope', 'Athlete', 'User', '$rootScope', function($scope, Athlete, User, $rootScope) {

  $scope.fran = 0;
  $scope.sprint = 0;
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

  $scope.franDiff = 0;
  $scope.helenDiff = 0;
  $scope.graceDiff = 0;
  $scope.filthy50Diff = 0;
  $scope.fightGoneBadDiff = 0;
  $scope.sprint400mDiff = 0;
  $scope.run5kDiff = 0;
  $scope.cleanAndJerkDiff = 0;
  $scope.snatchDiff = 0;
  $scope.deadliftDiff = 0;
  $scope.backSquatDiff = 0;
  $scope.maxPullupsDiff = 0;

  $scope.franScoreDiff = 0;
  $scope.helenScoreDiff = 0;
  $scope.graceScoreDiff = 0;
  $scope.filthy50ScoreDiff = 0;
  $scope.fightGoneBadScoreDiff = 0;
  $scope.sprint400mScoreDiff = 0;
  $scope.run5kScoreDiff = 0;
  $scope.cleanAndJerkScoreDiff = 0;
  $scope.snatchScoreDiff = 0;
  $scope.deadliftScoreDiff = 0;
  $scope.backSquatScoreDiff = 0;
  $scope.maxPullupsScoreDiff = 0;

  $scope.level="women-top";
  $scope.levelLabel = "Female Top 10";
  $scope.year = "15";
  $scope.hiddenForm = false;
  $scope.hiddenTable = true;
  $scope.hiddenDiff = true;

  $scope.loggedIn = false;

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

    compareScores();

    });
  };


  /** Converts standard MM:SS format to seconds for comparison */
  convertTimesToSeconds = function(time) {
    if(time == "No Data") {
      return time;
    }
    if (time.length == 4) {
      seconds = parseInt(time.substring(0, 1) * 60);
    } else {
      seconds = parseInt(time.substring(0, 2) * 60);
    }
    seconds = seconds + parseInt(time.substring(time.length-2, time.length));
    //console.log("Seconds = "+seconds);
    return seconds;
  }

  compareScores = function() {

    var competitorFranSecs = convertTimesToSeconds($scope.fran);
    var athleteFranSecs = parseInt($scope.franMins * 60) + parseInt($scope.franSeconds);
    if(competitorFranSecs == "No Data") {
      $scope.franDiff = "No Data";
      if (athleteFranSecs) {
        $scope.franScoreDiff = $scope.franMins+":"+$scope.franSeconds;
      } else {
        $scope.franScoreDiff = "No Data";
      }
    } else {
      if (athleteFranSecs) {
        if (athleteFranSecs < competitorFranSecs) {
          $scope.franDiff = "+"+parseInt(competitorFranSecs-athleteFranSecs)+" seconds";
          $scope.franScoreDiff = $scope.franMins+":"+$scope.franSeconds;
        } else {
          $scope.franDiff = $scope.fran;
          $scope.franScoreDiff = "+"+parseInt(athleteFranSecs-competitorFranSecs)+" seconds";
        }
      } else {
        $scope.franDiff = $scope.fran;
        $scope.franScoreDiff = "No Data";
      }
    }

    var competitorHelenSecs = convertTimesToSeconds($scope.helen);
    var athleteHelenSecs = parseInt($scope.helenMins * 60) + parseInt($scope.helenSeconds);
    if(competitorHelenSecs == "No Data") {
      $scope.helenDiff = "No Data";
      if (athleteHelenSecs) {
        $scope.helenScoreDiff = $scope.helenMins+":"+$scope.helenSeconds;
      } else {
        $scope.helenScoreDiff = "No Data";
      }
    } else {
      if (athleteHelenSecs) {
        if (athleteHelenSecs < competitorHelenSecs) {
          $scope.helenDiff = "+"+parseInt(competitorHelenSecs-athleteHelenSecs)+" seconds";
          $scope.helenScoreDiff = $scope.helenMins+":"+$scope.helenSeconds;
        } else {
          $scope.helenDiff = $scope.helen;
          $scope.helenScoreDiff = "+"+parseInt(athleteHelenSecs-competitorHelenSecs)+" seconds";
        }
      } else {
          $scope.helenDiff = $scope.helen;
          $scope.helenScoreDiff = "No Data";
      }
    }

    var competitorGraceSecs = convertTimesToSeconds($scope.grace);
    var athleteGraceSecs = parseInt($scope.graceMins * 60) + parseInt($scope.graceSeconds);
    if(competitorGraceSecs == "No Data") {
      $scope.graceDiff = "No Data";
      if (athleteGraceSecs) {
        $scope.graceScoreDiff = $scope.graceMins+":"+$scope.graceSeconds;
      } else {
        $scope.graceScoreDiff = "No Data";
      }
    } else {
      if (athleteGraceSecs) {
        if (athleteGraceSecs < competitorGraceSecs) {
          $scope.graceDiff = "+"+parseInt(competitorGraceSecs-athleteGraceSecs)+" seconds";
          $scope.graceScoreDiff = $scope.graceMins+":"+$scope.graceSeconds;
        } else {
          $scope.graceDiff = $scope.grace;
          $scope.graceScoreDiff = "+"+parseInt(athleteGraceSecs-competitorGraceSecs)+" seconds";
        }
      } else {
          $scope.graceDiff = $scope.grace;
          $scope.graceScoreDiff = "No Data";
      }
    }

    var competitorFilthy50Secs = convertTimesToSeconds($scope.filthy50);
    var athleteFilthy50Secs = parseInt($scope.filthy50Mins * 60) + parseInt($scope.filthy50Seconds);
    if(competitorFilthy50Secs == "No Data") {
      $scope.filthy50Diff = "No Data";
      if (athleteFilthy50Secs) {
        $scope.filthy50ScoreDiff = $scope.filthy50Mins+":"+$scope.filthy50Seconds;
      } else {
        $scope.filthy50ScoreDiff = "No Data";
      }
    } else {
      if (athleteFilthy50Secs) {
        if (athleteFilthy50Secs < competitorFilthy50Secs) {
          $scope.filthy50Diff = "+"+parseInt(competitorFilthy50Secs-athleteFilthy50Secs)+" seconds";
          $scope.filthy50ScoreDiff = $scope.filthy50Mins+":"+$scope.filthy50Seconds;
        } else {
          $scope.filthy50Diff = $scope.filthy50;
          $scope.filthy50ScoreDiff = "+"+parseInt(athleteFilthy50Secs-competitorFilthy50Secs)+" seconds";
        }
      } else {
          $scope.filthy50Diff = $scope.filthy50;
          $scope.filthy50ScoreDiff = "No Data";
      }
    }

    if($scope.fightGoneBad == "No Data") {
      $scope.fightGoneBadDiff = "No Data";
      if ($scope.fightGoneBadScore) {
        $scope.fightGoneBadScoreDiff = $scope.fightGoneBadScore;
      } else {
        $scope.fightGoneBadScoreDiff = "No Data";
      }
    }
    if ($scope.fightGoneBadScore) {
      if ($scope.fightGoneBadScore < $scope.fightGoneBad) {
        $scope.fightGoneBadDiff = $scope.fightGoneBad;
        $scope.fightGoneBadScoreDiff = "-"+parseInt($scope.fightGoneBad-$scope.fightGoneBadScore);
      } else {
        $scope.fightGoneBadDiff = "-"+parseInt($scope.fightGoneBadScore-$scope.fightGoneBad);
        $scope.fightGoneBadScoreDiff = $scope.fightGoneBadScore;
      }
    } else {
        $scope.fightGoneBadDiff = $scope.fightGoneBad;
        $scope.fightGoneBadScoreDiff = "No Data";
    }

    var competitorSprint400mSecs = convertTimesToSeconds($scope.sprint400m);
    var athleteSprint400mSecs = parseInt($scope.sprintMins * 60) + parseInt($scope.sprintSeconds);
    if(competitorSprint400mSecs == "No Data") {
      $scope.sprint400mDiff = "No Data";
      if (athleteSprint400mSecs) {
        $scope.sprint400mScoreDiff = $scope.sprintMins+":"+$scope.sprintSeconds;
      } else {
        $scope.sprint400mScoreDiff = "No Data";
      }
    } else {
      if (athleteSprint400mSecs) {
        if (athleteSprint400mSecs < competitorSprint400mSecs) {
          $scope.sprint400mDiff = "+"+parseInt(competitorSprint400mSecs-athleteSprint400mSecs)+" seconds";
          $scope.sprint400mScoreDiff = $scope.sprintMins+":"+$scope.sprintSeconds;
        } else {
          $scope.sprint400mDiff = $scope.sprint400m;
          $scope.sprint400mScoreDiff = "+"+parseInt(athleteSprint400mSecs-competitorSprint400mSecs)+" seconds";
        }
      } else {
          $scope.sprint400mDiff = $scope.sprint400m;
          $scope.sprint400mScoreDiff = "No Data";
      }
    }

    var competitorRun5kSecs = convertTimesToSeconds($scope.run5k);
    var athleteRun5kSecs = parseInt($scope.runMins * 60) + parseInt($scope.runSeconds);
    if(competitorRun5kSecs == "No Data") {
      $scope.run5kDiff = "No Data";
      if (athleteRun5kSecs) {
        $scope.run5kScoreDiff = $scope.runMins+":"+$scope.runSeconds;
      } else {
        $scope.run5kScoreDiff = "No Data";
      }
    } else {
      if (athleteRun5kSecs) {
        if (athleteRun5kSecs < competitorRun5kSecs) {
          $scope.run5kDiff = "+"+parseInt(competitorRun5kSecs-athleteRun5kSecs)+" seconds";
          $scope.run5kScoreDiff = $scope.runMins+":"+$scope.runSeconds;
        } else {
          $scope.run5kDiff = $scope.run5k;
          $scope.run5kScoreDiff = "+"+parseInt(athleteRun5kSecs-competitorRun5kSecs)+" seconds";
        }
      } else {
          $scope.run5kDiff = $scope.run5k;
          $scope.run5kScoreDiff = "No Data";
      }
    }

    if($scope.cleanAndJerk == "No Data") {
      $scope.cleanAndJerkDiff = "No Data";
      if ($scope.cleanAndJerkScore) {
        $scope.cleanAndJerkScoreDiff = $scope.cleanAndJerkScore + "lbs";
      } else {
        $scope.cleanAndJerkScoreDiff = "No Data";
      }
    } else {
      if ($scope.cleanAndJerkScore) {
        var athleteCleanAndJerk = $scope.cleanAndJerkScore;
        var competitorCleanAndJerk = $scope.cleanAndJerk.substring(0, $scope.cleanAndJerk.length - 4);
        if (athleteCleanAndJerk < competitorCleanAndJerk) {
          $scope.cleanAndJerkDiff = $scope.cleanAndJerk;
          $scope.cleanAndJerkScoreDiff = "-" + parseInt(competitorCleanAndJerk-athleteCleanAndJerk) + " lbs";
        } else {
          $scope.cleanAndJerkDiff = "-" + parseInt(athleteCleanAndJerk-competitorCleanAndJerk) + " lbs";
          $scope.cleanAndJerkScoreDiff = $scope.cleanAndJerkScore;
        }
      } else {
          $scope.cleanAndJerkDiff = $scope.cleanAndJerk;
          $scope.cleanAndJerkScoreDiff = "No Data";
      }
    }

    if($scope.snatch == "No Data") {
      $scope.snatchDiff = "No Data";
      if ($scope.snatchScore) {
        $scope.snatchScoreDiff = $scope.snatchScore + "lbs";
      } else {
        $scope.snatchScoreDiff = "No Data";
      }
    } else {
      if ($scope.snatchScore) {
        var athleteSnatch = $scope.snatchScore;
        var competitorSnatch = $scope.snatch.substring(0, $scope.snatch.length - 4);
        if (athleteSnatch < parseInt(competitorSnatch)) {
          $scope.snatchDiff = $scope.snatch;
          $scope.snatchScoreDiff = "-" + parseInt(competitorSnatch - athleteSnatch) + " lbs";
        } else {
          $scope.snatchDiff = "-"+parseInt(athleteSnatch - competitorSnatch) + " lbs";
          $scope.snatchScoreDiff = $scope.snatchScore;
        }
      } else {
          $scope.snatchDiff = $scope.snatch;
          $scope.snatchScoreDiff = "No Data";
      }
    }

    if($scope.deadlift == "No Data") {
      $scope.deadliftDiff = "No Data";
      if ($scope.deadliftScore) {
        $scope.deadliftScoreDiff = $scope.deadliftScore + "lbs";
      } else {
        $scope.deadliftScoreDiff = "No Data";
      }
    } else {
      if ($scope.deadliftScore) {
        var athleteDeadlift = $scope.deadliftScore;
        var competitorDeadlift = $scope.deadlift.substring(0, $scope.deadlift.length - 4);

        if (athleteDeadlift < competitorDeadlift) {
          $scope.deadliftDiff = $scope.deadlift;
          $scope.deadliftScoreDiff = "-" + parseInt(competitorDeadlift - athleteDeadlift) + " lbs";
        } else {
          $scope.deadliftDiff = "-"+parseInt(athleteDeadlift - competitorDeadlift) + " lbs";
          $scope.deadliftScoreDiff = $scope.deadliftScore;
        }
      } else {
          $scope.deadliftDiff = $scope.deadlift;
          $scope.deadliftScoreDiff = "No Data";
      }
    }

    if($scope.backSquat == "No Data") {
      $scope.backSquatDiff = "No Data";
      if ($scope.backSquatScore) {
        $scope.backSquatScoreDiff = $scope.backSquatScore + "lbs";
      } else {
        $scope.backSquatScoreDiff = "No Data";
      }
    } else {
      if ($scope.backSquatScore) {
        var athleteBackSquat = $scope.backSquatScore;
        var competitorBackSquat = $scope.backSquat.substring(0, $scope.backSquat.length - 4);

        if (athleteBackSquat < competitorBackSquat) {
          $scope.backSquatDiff = $scope.backSquat;
          $scope.backSquatScoreDiff = "-" + parseInt(competitorBackSquat - athleteBackSquat) + " lbs";
        } else {
          $scope.backSquatDiff = "-"+parseInt(athleteBackSquat - competitorBackSquat) + " lbs";
          $scope.backSquatScoreDiff = $scope.backSquat;
        }
      } else {
          $scope.backSquatDiff = $scope.backSquat;
          $scope.backSquatScoreDiff = "No Data";
      }
    }

    if($scope.maxPullups == "No Data") {
      $scope.maxPullupsDiff = "No Data";
      if ($scope.maxPullupsScore) {
        $scope.maxPullupsScoreDiff = $scope.maxPullupsScore;
      } else {
        $scope.maxPullupsScoreDiff = "No Data";
      }
    } else {
      if ($scope.maxPullupsScore) {
        if ($scope.maxPullupsScore < $scope.maxPullups) {
          $scope.maxPullupsDiff = $scope.maxPullups;
          $scope.maxPullupsScoreDiff = "-"+parseInt($scope.maxPullups-$scope.maxPullupsScore);
        } else {
          $scope.maxPullupsDiff = "-"+parseInt($scope.maxPullupsScore-$scope.maxPullups);
          $scope.maxPullupsScoreDiff = $scope.maxPullupsScore;
        }
      } else {
          $scope.maxPullupsDiff = $scope.maxPullups;
          $scope.maxPullupsScoreDiff = "No Data";
      }
    }
  }

  convertZeros = function() {
    if ($scope.franSeconds == "0") { $scope.franSeconds = "00"; }
    if ($scope.helenSeconds == "0") { $scope.helenSeconds = "00"; }
    if ($scope.graceSeconds == "0") { $scope.graceSeconds = "00"; }
    if ($scope.filthy50Seconds == "0") { $scope.filthy50Seconds = "00"; }
    if ($scope.sprintSeconds == "0") { $scope.sprintSeconds = "00"; }
    if ($scope.runSeconds == "0") { $scope.runSeconds = "00"; }
  }

  $scope.submitCompareForm = function() {
    if(!$scope.compareForm.$valid) {
       return;
    }

    convertZeros();

    $scope.levelLabel = getLevelLabel($scope.level, $scope.year);
    getAthleteScores($scope.level, $scope.year);
    $scope.franScore = $scope.franMins+":"+$scope.franSeconds;
    //console.log($scope.franScore);
    if (!$scope.franMins || !$scope.franSeconds) {
      $scope.franScore = "";
    }

    $scope.helenScore = $scope.helenMins+":"+$scope.helenSeconds;
    if (!$scope.helenMins || !$scope.helenSeconds) {
      $scope.helenScore = "";
    }

    $scope.graceScore = $scope.graceMins+":"+$scope.graceSeconds;
    if (!$scope.graceMins || !$scope.graceSeconds) {
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

    $scope.run5kScore = $scope.runMins+":"+$scope.runSeconds;
    if(!$scope.runMins || !$scope.runSeconds) {
      $scope.run5kScore = "";
    }

    if ($scope.cleanAndJerkScore) {
      $scope.cleanAndJerkScore = $scope.cleanAndJerkScore;
    }
    if ($scope.snatchScore) {
      $scope.snatchScore = $scope.snatchScore;
    }
    if ($scope.deadliftScore) {
      $scope.deadliftScore = $scope.deadliftScore;
    }
    if ($scope.backSquatScore) {
      $scope.backSquatScore = $scope.backSquatScore;
    }
    $scope.hiddenForm = true;
    $scope.hiddenTable = false;
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

  function init() {
    if ($rootScope.globals.currentUser) {
      $scope.loggedIn = true;

      User.GetByUsername($rootScope.globals.currentUser.username).then(
        function(userRes) {
          //console.log(user);
          if(!userRes.data.username) {
            return;
          } else {
            var user = userRes.data;
            $scope.franScore = user.fran;
            $scope.helenScore = user.helen;
            $scope.graceScore = user.grace;
            $scope.filthy50Score = user.filthy50;
            $scope.fightGoneBadScore = parseInt(user.fightGoneBad);
            $scope.sprint400mScore = user.sprint400m;
            $scope.run5kScore = user.run5k;
            $scope.cleanAndJerkScore = parseInt(user.cleanAndJerk.substring(0, user.cleanAndJerk.length - 4));
            $scope.snatchScore = parseInt(user.snatch.substring(0, user.snatch.length - 4));
            $scope.deadliftScore = parseInt(user.deadlift.substring(0, user.deadlift.length - 4));
            $scope.backSquatScore = parseInt(user.backSquat.substring(0, user.backSquat.length - 4));
            $scope.maxPullupsScore = parseInt(user.pullups);

            var franColon = user.fran.indexOf(":")
            $scope.franMins = parseInt(user.fran.substring(0, franColon));
            $scope.franSeconds = user.fran.substring(franColon+1, user.fran.length);
            var helenColon = user.helen.indexOf(":")
            $scope.helenMins = parseInt(user.helen.substring(0, helenColon));
            $scope.helenSeconds = user.helen.substring(helenColon+1, user.helen.length);
            var graceColon = user.grace.indexOf(":")
            $scope.graceMins = parseInt(user.grace.substring(0, graceColon));
            $scope.graceSeconds = user.grace.substring(graceColon+1, user.grace.length);
            var filthy50Colon = user.filthy50.indexOf(":")
            $scope.filthy50Mins = parseInt(user.filthy50.substring(0, filthy50Colon));
            $scope.filthy50Seconds = user.filthy50.substring(filthy50Colon+1, user.filthy50.length);
            var sprintColon = user.sprint400m.indexOf(":")
            $scope.sprintMins = parseInt(user.sprint400m.substring(0, sprintColon));
            $scope.sprintSeconds = user.sprint400m.substring(sprintColon+1, user.sprint400m.length);
            var runColon = user.run5k.indexOf(":")
            $scope.runMins = parseInt(user.run5k.substring(0, runColon));
            $scope.runSeconds = user.run5k.substring(runColon+1, user.run5k.length);

          }
        }, function(error) {
          return;
        }
      );
    }
  }

  init();

}]);

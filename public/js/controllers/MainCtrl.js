// public/js/controllers/MainCtrl.js
angular.module('MainCtrl', []).controller('MainController', ['$rootScope', '$scope', 'Athlete', 'User', function($rootScope, $scope, Athlete, User) {

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
  $scope.genderLabel="Female";
  $scope.levelLabel="Top 10";
  $scope.year = "15";

  /** User Authentication stuff */
  $scope.user = null;

  // For Authentication
  initController();

  function initController() {
    loadCurrentUser();
  }

  function loadCurrentUser() {
    if($rootScope.globals.currentUser) {
      $scope.user = $rootScope.globals.currentUser.username;
    }
  }

  function deleteUser(id) {
    User.Delete(id)
    .then(function () {
        loadAllUsers();
    });
  }


  $scope.getAthleteScores = function(){
    console.log("Doing it");
    if($scope.gender=="women") {
      $scope.genderLabel = "Female";
    } else {
      $scope.genderLabel = "Male";
    }

    if($scope.level=="top") {
      $scope.levelLabel = "Top 10";
    } else if($scope.level=="games") {
      $scope.levelLabel = "Games"
    } else if($scope.level=="regionals") {
      $scope.levelLabel = "Regionals"
    } else if ($scope.level=="open"){
      $scope.levelLabel = "Open"
    } else {
      $scope.levelLabel = "First Place";
    }

    console.log("Getting it");
    var division = $scope.gender+"-"+$scope.level;
    Athlete.get(division, $scope.year).then(function(scores) {
      console.log("Got it");

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
    })
    console.log("Done");

  };

  $scope.getAthleteScores();

}]);

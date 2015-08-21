angular.module('ProfileCtrl', []).controller('ProfileController', ['User','$location', '$rootScope', '$scope', 'Authentication', 'Flash', function(User, $location, $rootScope, $scope, Authentication, Flash) {


    $scope.edit = function(item) {
      if ($scope.editing[item] && $scope.editing[item].item) {
        $scope.editing[item].editing = true;
      } else {
        val = $scope.editing[item]
        $scope.editing[item] = { item : val };
        $scope.editing[item].editing = true;
      }
      console.log($scope.editing);
      console.log($scope.user);
    }

    convertZeros = function() {
      if ($scope.editing.franSeconds == "0") { $scope.editing.franSeconds = "00"; }
      if ($scope.editing.helenSeconds == "0") { $scope.editing.helenSeconds = "00"; }
      if ($scope.editing.graceSeconds == "0") { $scope.editing.graceSeconds = "00"; }
      if ($scope.editing.filthy50Seconds == "0") { $scope.editing.filthy50Seconds = "00"; }
      if ($scope.editing.sprintSeconds == "0") { $scope.editing.sprintSeconds = "00"; }
      if ($scope.editing.runSeconds == "0") { $scope.editing.runSeconds = "00"; }
    }

    function checkForScoreUpdates() {
      convertZeros();

      console.log("HERE");
      if ($scope.editing.franMins && $scope.editing.franSeconds) {
        console.log("FRAN");
        $scope.user.fran = $scope.editing.franMins+":"+$scope.editing.franSeconds;
      }

      if ($scope.editing.helenMins && $scope.editing.helenSeconds) {
        $scope.user.helen = $scope.editing.helenMins+":"+$scope.editing.helenSeconds;
      }

      if ($scope.editing.graceMins && $scope.editing.graceSeconds) {
        $scope.user.grace = $scope.editing.graceMins+":"+$scope.editing.graceSeconds;
      }

      if ($scope.editing.filthy50Mins && $scope.editing.filthy50Seconds) {
        $scope.user.filthy50 = $scope.editing.filthy50Mins+":"+$scope.editing.filthy50Seconds;
      }

      if ($scope.editing.sprintMins && $scope.editing.sprintSeconds) {
        $scope.user.sprint400m = $scope.editing.sprintMins+":"+$scope.editing.sprintSeconds;
      }

      if($scope.editing.runMins && $scope.editing.runSeconds) {
        $scope.user.run5k = $scope.editing.runMins+":"+$scope.editing.runSeconds;
      }

      if ($scope.editing.cleanAndJerk) {
        $scope.user.cleanAndJerk = $scope.editing.cleanAndJerk + " lbs";
      }
      if ($scope.editing.snatch) {
        $scope.user.snatch = $scope.editing.snatch+ " lbs";
      }
      if ($scope.editing.deadlift) {
        $scope.user.deadlift = $scope.editing.deadlift+ " lbs";
      }
      if ($scope.editing.backSquat) {
        $scope.user.backSquat = $scope.editing.backSquat+ " lbs";
      }
    }

    $scope.doneEditing = function(item) {
      checkForScoreUpdates();
      $scope.editing[item].editing = false;
      User.Update($scope.user).then(
        function(userRes) {
          return;
        }, function(error) {
          Flash.Error("There was a problem updating profile information. Please try again.")
          $scope.flash = $rootScope.flash;
        }
      );
      console.log($scope.editing);
      console.log($scope.user);
    }

    function init() {
      if (Authentication.IsUserLoggedIn() == "Log out") {
        User.GetByUsername($rootScope.globals.currentUser.username).then(
          function(userRes) {
            //console.log(user);
            if(!userRes.data.username) {
              //$location.path('/login');
            } else {
              $scope.user = userRes.data;
              $scope.editing = jQuery.extend({}, $scope.user);
            }
          }, function(error) {
            $location.path('/login');
          }
        );
      } else {
        $location.path('/login');
      }
    };

    init();
}]);

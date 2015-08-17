angular.module('ProfileCtrl', []).controller('ProfileController', ['User','$location', '$rootScope', '$scope', 'Authentication', function(User, $location, $rootScope, $scope, Authentication) {

    function init() {
      if (Authentication.IsUserLoggedIn() == "Log out") {
        User.GetByUsername($rootScope.globals.currentUser.username).then(
          function(userRes) {
            //console.log(user);
            if(!userRes.data.username) {
              $location.path('/');
            } else {
              $scope.user = userRes.data;
            }
          }, function(error) {
            $location.path('/');
          }
        );
      } else {
        $location.path('/');
      }
    };

    init();
}]);

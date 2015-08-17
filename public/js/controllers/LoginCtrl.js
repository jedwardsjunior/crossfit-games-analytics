angular.module('LoginCtrl', []).controller('LoginController', ['$rootScope', '$scope', '$window', '$location', 'Authentication', 'Flash', function($rootScope, $scope, $window, $location, Authentication, Flash) {
    var vm = this;

    vm.login = login;
    vm.flash = $rootScope.flash;

    $scope.loginText = Authentication.IsUserLoggedIn();

    function initController() {
        // reset login status
        //console.log("Here");
        if (Authentication.IsUserLoggedIn() == "Log out") {
          $location.path('/');
        }
    };

    $scope.loginLogout =function() {
      //console.log("LoginLogout()");
      if (Authentication.IsUserLoggedIn() == "Log out") {
        Authentication.ClearCredentials();
        $scope.loginText = Authentication.IsUserLoggedIn();
        //console.log("loginLogout(): "+$scope.loginText);
      }
      $location.path('/login');
    };

    function login() {
        vm.dataLoading = true;
        Authentication.Login(vm.username, vm.password, function (response) {
            if (response.success) {
                Authentication.SetCredentials(vm.username, vm.password);
                $scope.loginText = Authentication.IsUserLoggedIn();
                //console.log("login(): "+$scope.loginText);
                $window.location.reload();
            } else {
                //console.log("ERROR IN LOGIN");
                Flash.Error(response.message);
                vm.flash = $rootScope.flash;
                vm.dataLoading = false;
            }
        });
    };

    initController();
}]);

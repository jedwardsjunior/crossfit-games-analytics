angular.module('ResetCtrl', []).controller('ResetController', ['User','$location', '$rootScope', '$routeParams', 'Flash', function(User, $location, $rootScope, $routeParams, Flash) {
    var vm = this;
    vm.resetPassword = resetPassword;

    function init() {
      //console.log("Token is: ");
      //console.log($routeParams.token);
      User.CheckReset($routeParams.token).then(
        function(user) {
          //console.log(user);
          if(!user.data.username) {
            Flash.Error(user.data.message);
            vm.flashTokenExpired = $rootScope.flash;
          } else {
            vm.user = user;
          }
        }, function(error) {
          Flash.Error(error);
          vm.flash = $rootScope.flash;
        }
      );
    };

    function resetPassword() {
      //console.log("Resetting password!");
      //console.log("Password is: ");
      //console.log(vm.user.newPassword);
      //console.log(vm.user.confirmPassword);
      if(vm.user.newPassword != vm.user.confirmPassword) {
        Flash.Error("Passwords do not match.");
        vm.flash = $rootScope.flash;
        vm.flashInfo = null;
      } else {
        User.SetNewPassword($routeParams.token, vm.user).then(
          function(user) {
            Flash.Info("Password successfully reset.", true);
            vm.flashInfo = $rootScope.flash;
            vm.flash = null;
            $location.path("/login");
          }, function(error) {
            Flash.Error(error);
            vm.flash = $rootScope.flash;
            vm.flashInfo = null;
          }
        );
      }
    };
    init();
}]);

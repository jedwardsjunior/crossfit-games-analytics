angular.module('ForgotCtrl', []).controller('ForgotController', ['User','$location', '$rootScope', 'Flash', function(User, $location, $rootScope, Flash) {
    var vm = this;
    vm.email = false;
    vm.emailAddress;
    vm.flashInfo;
    vm.flashError;
    vm.flashSuccess;
    vm.checkForEmail = checkForEmail;
    vm.resetPassword = resetPassword;

    function checkForEmail() {
      //console.log("Checking for email!");
      //console.log("Email is: "+vm.emailAddress);
      User.GetByUsername(vm.emailAddress).then(
        function(user) {
          // User is already registered
          if(user.data) {
            Flash.Success("Username is registered!");
            vm.flashSuccess = $rootScope.flash;
            vm.flashError = null;
            vm.flashInfo = null;
          // User is not already registered
          } else {
            Flash.Error("Username is not registered!");
            vm.flashError = $rootScope.flash;
            vm.flashSuccess = null;
            vm.flashInfo = null;
          }
        }, function(error) {
          Flash.Error(error);
          vm.flashError = $rootScope.flash;
          vm.flashSuccess = null;
          vm.flashInfo = null;
        }
      );
    };


    function resetPassword() {
      //console.log("Resetting password!");
      //console.log("Password is: ");
      //console.log(vm.user);

      User.GetByUsername(vm.user.username).then(
        function(user) {
          // User is registered
          if(user.data) {
            User.ResetPassword(vm.user).then(
              function(user) {
                Flash.Info("Password reset link sent. Please check your email.");
                vm.flashInfo = $rootScope.flash;
                vm.flashSuccess = null;
                vm.flashError = null;
              }, function(error) {
                Flash.Error(error);
                vm.flashError = $rootScope.flash;
                vm.flashSuccess = null;
                vm.flashInfo = null;
              }
            );
          // User is not registered
          } else {
            Flash.Error("Username is not registered!");
            vm.flashError = $rootScope.flash;
            vm.flashSuccess = null;
            vm.flashInfo = null;
          }
        }, function(error) {
          Flash.Error(error);
          vm.flashError = $rootScope.flash;
          vm.flashSuccess = null;
          vm.flashInfo = null;
        }
      );
    }


}]);

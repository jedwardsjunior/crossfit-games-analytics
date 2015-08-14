angular.module('RegisterCtrl', []).controller('RegisterController', ['User', '$location', '$rootScope', 'Flash', function(User, $location, $rootScope, Flash) {
    var vm = this;

    vm.register = register;
    vm.flash = $rootScope.flash;

    function register() {
      vm.dataLoading = true;
      User.GetByUsername(vm.user.username).then( function(user) {
        // User is already registered
        if(user.data) {
          Flash.Error("Username is unavailable. Please select another.");
          vm.flash = $rootScope.flash;
          vm.dataLoading = false;
        // User is not already registered
        } else {
          User.Create(vm.user).then( function(response) {
            // Successfully created
            if (response.status == 200) {
              Flash.Success('Registration successful', true);
              vm.flash = $rootScope.flash;
              $location.path('/login');
            // Error creating user
            } else {
              Flash.Error(response.message);
              vm.flash = $rootScope.flash;
              vm.dataLoading = false;
            }
            // Some different error creating user
          }, function(error) {
              Flash.Error(error);
              vm.flash = $rootScope.flash;
              vm.dataLoading = false;
          });
        // Error looking up if there was a user
        }
      }, function(error) {
          Flash.Error(error);
          vm.dataLoading = false;
      });
    };

}]);

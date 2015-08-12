angular.module('RegisterCtrl', []).controller('RegisterController', ['User', '$location', '$rootScope', 'Flash', function(User, $location, $rootScope, Flash) {
    var vm = this;

    vm.register = register;

    function register() {
      console.log("In register()");
        vm.dataLoading = true;
        User.Create(vm.user)
            .then(function (response) {
                if (response.success) {
                  console.log("HERE");
                    Flash.Success('Registration successful', true);
                    $location.path('/login');
                } else {
                    Flash.Error(response.message);
                    vm.dataLoading = false;
                }
            });
    }
}]);

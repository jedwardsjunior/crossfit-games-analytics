angular.module('LoginCtrl', []).controller('LoginController', ['$location', 'Authentication', 'Flash', function($location, Authentication, Flash) {
    var vm = this;

    vm.login = login;

    (function initController() {
        // reset login status
        Authentication.ClearCredentials();
    })();

    function login() {
        vm.dataLoading = true;
        Authentication.Login(vm.username, vm.password, function (response) {
            if (response.success) {
                Authentication.SetCredentials(vm.username, vm.password);
                $location.path('/');
            } else {
                Flash.Error(response.message);
                vm.dataLoading = false;
            }
        });
    };
}]);

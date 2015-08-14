angular.module('UserService', []).factory('User', ['$http', function ($http) {

    var service = {};

    service.GetAll = GetAll;
    service.GetByUsername = GetByUsername;
    service.Create = Create;
    service.Update = Update;
    service.Delete = Delete;

    return service;

    function GetAll() {
        return $http.get('/api/users').then(handleSuccess, handleError('Error getting all users'));
    }

    function GetByUsername(username) {
      return $http.get('/api/users/' + username).then(handleSuccess, handleError('Error getting user by username'));
    }

    function Create(user) {
        return $http.post('/api/users', user).then(handleSuccess, handleError('Error creating user'));
    }

    function Update(user) {
        return $http.put('/api/users/' + user.id, user).then(handleSuccess, handleError('Error updating user'));
    }

    function Delete(id) {
        return $http.delete('/api/users/' + id).then(handleSuccess, handleError('Error deleting user'));
    }

    // private functions
    function handleSuccess(data) {
        return data;
    }

    function handleError(error) {
        return { success: false, message: error };
    }
}]);

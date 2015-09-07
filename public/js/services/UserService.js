// Retrieves user information for login, logout, updates, and displaying user information
angular.module('UserService', []).factory('User', ['$http', function ($http) {

    var service = {};

    service.GetAll = GetAll;
    service.GetByUsername = GetByUsername;
    service.Create = Create;
    service.ResetPassword = ResetPassword;
    service.CheckReset = CheckReset;
    service.SetNewPassword = SetNewPassword;
    service.Update = Update;
    service.Delete = Delete;

    return service;

    function GetAll() {
        return $http.get('/api/users').then(handleSuccess, handleError('Error getting all users'));
    }

    function GetByUsername(username) {
      return $http.get('/api/users/' + username).then(handleSuccess, handleError('Error getting user by email'));
    }

    function Create(user) {
        return $http.post('/api/users', user).then(handleSuccess, handleError('Error creating user'));
    }

    function ResetPassword(user) {
        return $http.post('/forgot', user).then(handleSuccess, handleError("Error resetting user's password"));
    }

    function SetNewPassword(token, user) {
        return $http.post('/reset/'+token, user).then(handleSuccess, handleError("Error resetting user's password"));
    }

    function CheckReset(token) {
      return $http.get('/checkReset/' + token).then(handleSuccess, handleError('Password reset token is invalid or has expired.'));
    }

    function Update(user) {
        return $http.put('/api/users/' + user.username, user).then(handleSuccess, handleError('Error updating user'));
    }

    function Delete(user) {
        return $http.delete('/api/users/' + user).then(handleSuccess, handleError('Error deleting user'));
    }

    // private functions
    function handleSuccess(data) {
        return data;
    }

    function handleError(error) {
        return { success: false, message: error };
    }
}]);

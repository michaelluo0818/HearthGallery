var LoginController = function ($scope, $http, $window) {

    //form to log in a user
    $scope.loginForm = {
        userName: '',
        password: '',
        rememberMe: false
    };

    //Logs a user in. Also assigns session and hides login tab. displays logoff tab.
    //redirect to index if successful.
    $scope.login = function () {
        $http.post('/account/login', $scope.loginForm).then(
           function successCallback(response) {
               if (response && response.data.Succeeded) {
                   $window.sessionStorage.setItem('showLogIn', false);
                   $window.location.href = '/home/index';
               } else if (response && !response.data.Succeeded) {
                   alert(response.data.Message);
               }
           });
    }
};

LoginController.$inject = ['$scope', '$http', '$window'];
var RegisterController =  function ($scope, $http, $window) {
    
    //The form used to register a user
    $scope.registerForm = {
        userName: '',
        password: '',
        confirmPassword: ''
    };

    //submit register form, redirect to index if successful.
    $scope.register = function () {
        if ($scope.registerForm.password === $scope.registerForm.confirmPassword) {
            $http.post('/account/register', $scope.registerForm).then(
                function successCallback(response) {
                    if (response && response.data.Succeeded) {
                        $window.location.href = '/account/login';
                    } else if (response && !response.data.Succeeded) {
                        alert(response.data.Message);
                    }
                });
        } else {
            alert("Passwords do not match");
        }
    }
};


RegisterController.$inject = ['$scope', '$http', '$window'];
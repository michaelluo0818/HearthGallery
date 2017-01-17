var NavigationController = function ($scope, $window, $http) {
    $scope.showLogIn = true;

    //Logs a user off. When logged off, update the session and boolean value to show login tab again
    //redirect to index if successful
    $scope.logOff = function () {
        $http.post('/account/logoff').then(
            function successCallback(response) {
                $window.sessionStorage.setItem('showLogIn', true);

                $scope.showLogIn = $window.sessionStorage.getItem('showLogIn');

                $window.location.href = '/home/index';
            });
    }

    //if booklean value to show login tab and session don't match, reassign it.
    if ($window.sessionStorage.getItem('showLogIn') != null) {
        if ($scope.showLogIn != $window.sessionStorage.getItem('showLogIn')) {
            $scope.showLogIn = $window.sessionStorage.getItem('showLogIn');
        }
    }

};

NavigationController.$inject = ['$scope', '$window', '$http'];
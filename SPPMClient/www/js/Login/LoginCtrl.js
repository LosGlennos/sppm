app.controller('LoginCtrl', [
    '$scope', '$location', '$http', 'sharedProperties', function ($scope, $location, $http, sharedProperties) {

        var _loginService = new LoginService($http);

        $scope.formData = {};

        $scope.submitLogin = function () {

            _loginService.login(this.formData)
                .success(function (result) {
                    console.log(result);
                    if (result.success == true) {
                        sharedProperties.setLoggedInUser(result.username);
                        $location.path('/mainmenu');
                    } else {
                        $location.path('/');
                    }
                });
        };
    }
]);
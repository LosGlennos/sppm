app.controller('LogoutCtrl', [
    '$scope', '$location', '$http', function ($scope, $location, $http) {
        var logoutService = new LogoutService($http);

        logoutService.logout()
            .success(function (result) {
                if (result.success == true) {
                    $location.path('/');
                }
            });
    }
]);
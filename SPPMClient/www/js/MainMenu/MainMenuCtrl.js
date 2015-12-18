app.controller('MainMenuCtrl', [
    '$scope', '$location', '$http',
    function ($scope, $location, $http) {
        var httpService = new HttpService($http);

        $scope.getSession = function() {
            httpService.get('getSession')
            .success(function (result) {
                    console.log(result);
                    $scope.session = result.session;
                });
        }
    }
]);
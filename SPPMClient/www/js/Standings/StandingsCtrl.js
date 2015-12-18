app.controller('StandingsCtrl', [
    '$scope', '$location', '$http', function ($scope, $location, $http) {
        var _generalServices = new GeneralServices($http);

        _generalServices.getAllPlayers()
            .success(function (result) {
                if (result.success == false) {
                    $location.path('/');
                } else {
                    $scope.players = result;
                }
            });
    }
]);
app.controller('DoubleSelectCtrl', [
    '$scope', '$location', '$http', '$route', 'sharedProperties', function ($scope, $location, $http, $route, sharedProperties) {
        var _generalServices = new GeneralServices($http);

        _generalServices.getAllPlayers()
            .success(function (result) {
                if (result.success == false) {
                    $location.path('/');
                } else {
                    $scope.players = result;
                }
            });

        $scope.idSelectedPlayers = [];

        $scope.setSelected = function (idSelectedPlayer) {
            if ($scope.idSelectedPlayers.indexOf(idSelectedPlayer) == -1) {
                if ($scope.idSelectedPlayers.length === 4) {
                    $scope.idSelectedPlayers.shift();
                }
                $scope.idSelectedPlayers[$scope.idSelectedPlayers.length] = idSelectedPlayer;
            } else {
                var indexOfPlayerId = $scope.idSelectedPlayers.indexOf(idSelectedPlayer);
                $scope.idSelectedPlayers.splice(indexOfPlayerId, 1);
            }
        }

        $scope.startGame = function () {
            sharedProperties.setDoubleMatchOpponents($scope.idSelectedPlayers);
            $location.path('/doublematch');
        };
    }
]);
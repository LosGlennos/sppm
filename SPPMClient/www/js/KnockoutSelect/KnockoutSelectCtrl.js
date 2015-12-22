app.controller('KnockoutSelectCtrl', [
    '$scope', '$location', '$http', '$route', function ($scope, $location, $http, $route) {
        var _generalServices = new GeneralServices($http);
        var _knockoutServices = new KnockoutService($http);

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
                $scope.idSelectedPlayers[$scope.idSelectedPlayers.length] = idSelectedPlayer;
            } else {
                var indexOfPlayerId = $scope.idSelectedPlayers.indexOf(idSelectedPlayer);
                $scope.idSelectedPlayers.splice(indexOfPlayerId, 1);
            }
        }

        $scope.updateStandings = function(idSelectedPlayers) {
            var placingsMap = {};
            var placing = 1;

            idSelectedPlayers.forEach(function (username) {
                var knockoutPlacings = {
                    username: username,
                    placing: placing
                }
                placingsMap['placing' + placing] = knockoutPlacings;
                placing++;
            });

            _knockoutServices.postKnockoutPlacings(placingsMap)
                .success(function(result) {
                    if (result.success == false) {
                        //Handle error
                    } else {
                        $route.reload();
                    }
                });
        }

        $scope.resetStandings = function () {
            _knockoutServices.resetStandings()
                .success(function () {
                    $location.reload();
                });
        }
    }
]);
app.controller('FridayFinalSelectCtrl', [
    '$scope', '$location', '$http', '$route', function ($scope, $location, $http, $route) {
        var _generalServices = new GeneralServices($http);
        var _fridayFinalSelectService = new FridayFinalSelectService($http);

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

        $scope.startFinals = function(players) {
            var numberOfRounds = Math.floor(Math.sqrt(players.length));
            var numberOfCompleteRounds = Math.pow(2, numberOfRounds);
            var tmp = players.length - numberOfCompleteRounds;
            var numberOfPlayersQualified = numberOfCompleteRounds - tmp;

            var playersSorted = $scope.idSelectedPlayers.sort(function (a, b) { return a.placing - b.placing });

            var result = {};
            var qualified = [];
            var qualification = [];

            for (var i = 0; i < $scope.idSelectedPlayers.length; i++) {
                if (i < numberOfPlayersQualified) {
                    qualified.push(playersSorted[i]);
                } else {
                    qualification.push(playersSorted[i]);
                }
            }

            result.qualified = qualified;
            result.qualification = qualification;

            _fridayFinalSelectService.postQualifications(result)
                .success(function (result) {
                    if (result.success == true) {
                        $location.path('/fridayfinals');
                    }
                });
        }
    }
]);
app.controller('SingleSelectCtrl', [
    '$scope', '$location', '$http', 'sharedProperties', function ($scope, $location, $http, sharedProperties) {
        var generalServices = new GeneralServices($http);
        $scope.opponents = [];

        generalServices.getAllPlayers()
            .success(function (result) {
                if (result.success == false) {
                    $location.path('/');
                } else {
                    $scope.players = result;
                }
            });

        $scope.setSelected = function(username) {
            if ($scope.opponents.indexOf(username) > -1) {
                $scope.opponents.splice($scope.opponents.indexOf(username), 1);
            } else {
                if ($scope.opponents.length === 2) {
                    $scope.opponents.splice(0, 1);
                }
                $scope.opponents.push(username);
            }
        };

        $scope.startGame = function() {
            sharedProperties.setSingleMatchOpponents($scope.opponents);
            $location.path('/singlematch');
        };
    }
]);
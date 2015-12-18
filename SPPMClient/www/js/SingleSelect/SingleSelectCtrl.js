app.controller('SingleSelectCtrl', [
    '$scope', '$location', '$http', 'sharedProperties', function ($scope, $location, $http, sharedProperties) {
        var generalServices = new GeneralServices($http);

        generalServices.getAllButCurrentUser(sharedProperties.getLoggedInUser())
            .success(function (result) {
                if (result.success == false) {
                    $location.path('/');
                } else {
                    $scope.players = result;
                }
            });

        $scope.username = "";

        $scope.setSelected = function(username) {
            if ($scope.username == username) {
                $scope.username = "";
            } else {
                $scope.username = username;
            }
        };

        $scope.startGame = function() {
            sharedProperties.setSingleMatchOpponent($scope.username);
            $location.path('/singlematch');
        };
    }
]);
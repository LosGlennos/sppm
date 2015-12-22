app.controller('SingleMatchCtrl', [
    '$scope', '$location', '$http', 'sharedProperties',
    function ($scope, $location, $http, sharedProperties) {
        $scope.opponents = sharedProperties.getSingleMatchOpponents();
        var singleMatchService = new SingleMatchService($http);

        $scope.registerResult = function() {
            var userResult = $scope.userResult;
            var opponentResult = $scope.opponentResult;

            var result = {}

            if (userResult > opponentResult) {
                result = {
                    winner: sharedProperties.getSingleMatchOpponents()[0],
                    loser: sharedProperties.getSingleMatchOpponents()[1]
                }
            } else {
                result = {
                    winner: sharedProperties.getSingleMatchOpponents()[1],
                    loser: sharedProperties.getSingleMatchOpponents()[0]
                }
            }
            singleMatchService.registerSingleMatchResult(result)
                .success(function (result) {
                    if (result.success == false) {
                        $location.path('/');
                    } else {
                        $location.path('/standings');
                    }
                });
        }
    }
]);
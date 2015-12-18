app.controller('SingleMatchCtrl', [
    '$scope', '$location', '$http', 'sharedProperties',
    function ($scope, $location, $http, sharedProperties) {
        $scope.user = sharedProperties.getLoggedInUser();
        $scope.opponent = sharedProperties.getSingleMatchOpponent();
        var singleMatchService = new SingleMatchService($http);

        $scope.registerResult = function() {
            var userResult = $scope.userResult;
            var opponentResult = $scope.opponentResult;

            var result = {}

            if (userResult > opponentResult) {
                result = {
                    winner: sharedProperties.getLoggedInUser(),
                    loser: sharedProperties.getSingleMatchOpponent()
                }
            } else {
                result = {
                    winner: sharedProperties.getSingleMatchOpponent(),
                    loser: sharedProperties.getLoggedInUser()
                }
            }
            singleMatchService.registerSingleMatchResult(result)
                .success(function (result) {
                    if (result.success == false) {
                        $location.path('/');
                    } 
                });
        }
    }
]);
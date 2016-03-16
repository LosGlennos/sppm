app.controller('DoubleMatchCtrl', [
    '$scope', '$location', '$http', 'sharedProperties',
    function ($scope, $location, $http, sharedProperties) {
        var _doubleMatchService = new DoubleMatchService($http);

        $scope.opponents = sharedProperties.getDoubleMatchOpponents();

        $scope.registerResult = function () {
            var userResult = $scope.userResult;
            var opponentResult = $scope.opponentResult;
            var losingResult = userResult > opponentResult ? opponentResult : userResult;

            var result = {}

            if (userResult > opponentResult) {
                result = {
                    winner: sharedProperties.getDoubleMatchOpponents().firstTeam,
                    loser: sharedProperties.getDoubleMatchOpponents().secondTeam
                }
            } else {
                result = {
                    winner: sharedProperties.getDoubleMatchOpponents().secondTeam,
                    loser: sharedProperties.getDoubleMatchOpponents().firstTeam
                }
            }

            if (parseInt(losingResult) === 0) {
                result.winner.points = 3;
                result.loser.points = 0;
            } else {
                result.winner.points = 2;
                result.loser.points = 1;
            }

            _doubleMatchService.registerDoubleMatchResult(result)
                .success(function () {
                    $location.path('/standings');
                });
        }
    }
]);
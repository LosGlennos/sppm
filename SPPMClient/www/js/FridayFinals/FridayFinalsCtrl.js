app.controller('FridayFinalsCtrl', ['$scope', '$http',
    function ($scope, $http) {
        var _fridayFinalsService = new FridayFinalsService($http);

        $scope.matches = [];
        $scope.qualification = [];
        $scope.qualified = [];
        $scope.activeTab = '';
        $scope.roundNames = [];
        $scope.matchesPerRound = [];

        _fridayFinalsService.getMatches().success(function(result) {
            $scope.matches = result;
            $scope.qualification = setQualification(result);
            $scope.qualified = setQualified(result);
            $scope.roundNames = setRoundNames($scope.qualified.rounds);
            $scope.matchesPerRound = dividePlayersForRound($scope.qualified.qualified);
        });

        $scope.getRounds = function (number) {
            return new Array(number);
        }
    }
]);

function dividePlayersForRound(qualified) {
    var rounds = [];
    
    for (var i = 0; i < qualified.length; i++) {
        if (rounds.indexOf(qualified[i].round) === -1) {
            rounds.push(qualified[i].round);
        }
    }

    var playoff = [];
    playoff.length = rounds.length;

    for (var y = 0; y < qualified.length; y++) {
        var index = rounds.indexOf(qualified[y].round);
        if (playoff[index] === undefined) {
            playoff[index] = [];
        }
        playoff[index][playoff[index].length] = qualified[y];
    }

    return playoff;
}

function setRoundNames(nrOfRounds) {
    var rounds = [];
    for (var i = nrOfRounds; i > 0; i--) {
        if (i === 1) {
            rounds.push('Final');
        } else {
            rounds.push('RO' + Math.pow(2, i));
        }
    }
    return rounds;
}

function setQualification(result) {
    var qualificationMatches = [];
    result.matches.forEach(function(match) {
        if (match.type === 2) {
            qualificationMatches.push(match);
        }
    });
    return qualificationMatches;
}

function setQualified(result) {
    var qualified = [];
    result.matches.forEach(function (match) {
        if (match.type === 1) {
            qualified.push(match);
        }
    });
    var returnObj = {
        qualified: qualified,
        rounds: qualified.length !== 0 ? Math.log2(qualified[0].round) : 0
    }

    return returnObj;
}

function setActiveTab(result) {
    var activeTab = '';
    var roArray = []
    result.matches.forEach(function (match) {
        if (match.type == 2) {
            activeTab = 'qualification';
            return false;
        }
        roArray.push(match.round);
    });

    if (activeTab !== '') {
        return activeTab;
    }

    roArray.sort(function(a, b) {
        return a.round - b.round;
    });
}


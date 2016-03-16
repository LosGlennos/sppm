app.controller('FridayFinalsCtrl', ['$scope', '$http',
    function ($scope, $http) {
        var _fridayFinalsService = new FridayFinalsService($http);
    
        _fridayFinalsService.getMatches().success(function(result) {
            $scope.matches = result;
        });
    }
]);

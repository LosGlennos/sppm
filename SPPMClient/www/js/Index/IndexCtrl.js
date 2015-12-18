app.controller('IndexCtrl', [
    '$scope', '$location', function ($scope, $location) {

        $scope.selected = 0;
        $scope.selectClicked = function (row) {
            $scope.selected = row;
        }
    }
]);
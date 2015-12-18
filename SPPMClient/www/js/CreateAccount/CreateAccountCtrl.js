app.controller('CreateAccountCtrl', [
    '$scope', '$http', function ($scope, $http) {

        var _createAccountService = new CreateAccountService($http);

        $scope.createAccount = function (form) {
            if (form.username.$invalid) {
                return;
            }
            var username = $scope.createUsernameInput;

            _createAccountService.createNewAccount(username)
                .success(function(data) {
                    if (data.success) {
                        form.$setValidity("userCreated", true);
                    } else {
                        switch (data.details) {
                        case 11000:
                            $scope.errormessage = "Användarnamn upptaget";
                            form.$setValidity("userCreated", false);
                            break;
                        default:
                            $scope.errormessage = "Något gick fel. Felkod: " + data.details;
                            form.$setValidity("userCreated", false);
                        }
                    }
                });
        };
    }
]);
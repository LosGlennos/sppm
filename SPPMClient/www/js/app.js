var app = angular
    .module("spinitPingPongMania", ['ngRoute', 'ngCookies'])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/MainMenu/MainMenuPage.html',
                controller: 'MainMenuCtrl'
            })
            .when('/newgame', {
                templateUrl: 'views/NewGame/NewGamePage.html',
                controller: 'NewGameCtrl'
            })
            .when('/knockoutselect', {
                templateUrl: 'views/KnockoutSelect/KnockoutSelectPage.html',
                controller: 'KnockoutSelectCtrl'
            })
            .when('/standings', {
                templateUrl: 'views/Standings/StandingsPage.html',
                controller: 'StandingsCtrl'
            })
            .when('/singleselect', {
                templateUrl: 'views/SingleSelect/SingleSelectPage.html',
                controller: 'SingleSelectCtrl'
            })
            .when('/singlematch', {
                templateUrl: 'views/SingleMatch/SingleMatchPage.html',
                controller: 'SingleMatchCtrl'
            })
            .when('/addNewPlayer', {
                templateUrl: 'views/CreateAccount/CreateAccountPage.html',
                controller: 'CreateAccountCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
        }
    ).service('sharedProperties', function () {
        var opponents = [];

        return {
            getSingleMatchOpponents: function () {
                return opponents;
            },
            setSingleMatchOpponents: function (value) {
                opponents = value;
            }
        }
    });
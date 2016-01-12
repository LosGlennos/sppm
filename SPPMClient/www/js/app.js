var app = angular
    .module("spinitPingPongMania", ['ngRoute', 'ngCookies'])
    .config(function($routeProvider) {
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
            .when('/doubleselect', {
                templateUrl: 'views/DoubleSelect/DoubleSelectPage.html',
                controller: 'DoubleSelectCtrl'
            })
            .when('/doublematch', {
                templateUrl: 'views/DoubleMatch/DoubleMatchPage.html',
                controller: 'DoubleMatchCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
        }
    ).service('sharedProperties', function () {
        var opponents = [];
        var doubleMatchOpponents = {};

        return {
            getSingleMatchOpponents: function () {
                return opponents;
            },
            setSingleMatchOpponents: function (value) {
                opponents = value;
            },
            setDoubleMatchOpponents: function(value) {
                var sortedList = value.sort(function (a, b) { return a.placing - b.placing });
                doubleMatchOpponents.firstTeam = { playerOne: sortedList[0], playerTwo: sortedList[3] };
                doubleMatchOpponents.secondTeam = { playerOne: sortedList[1], playerTwo: sortedList[2] };
            },
            getDoubleMatchOpponents: function() {
                return doubleMatchOpponents;
            }
        }
    });
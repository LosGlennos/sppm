var GeneralServices = function($http) {
    var httpService = new HttpService($http);

    this.getAllPlayers = function() {
        return httpService.get('getAllPlayers');
    }

    this.getAllButCurrentUser = function (username) {
        return httpService.get('getAllButCurrentUser', username);
    }
}
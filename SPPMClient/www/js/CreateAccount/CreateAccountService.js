var CreateAccountService = function ($http) {
    var httpService = new HttpService($http);

    this.createNewAccount = function(username) {
        return httpService.post("addNewPlayer", { username: username });
    }
}
var LogoutService = function($http) {
    var httpService = new HttpService($http);

    this.logout = function() {
        return httpService.post('logout');
    }
}
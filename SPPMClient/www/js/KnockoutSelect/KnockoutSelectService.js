var KnockoutService = function($http) {
    var httpService = new HttpService($http);

    this.postKnockoutPlacings = function(params) {
        return httpService.post('postKnockoutPlacings', params);
    }
}
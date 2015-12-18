var SingleMatchService = function($http) {
    var httpService = new HttpService($http);

    this.registerSingleMatchResult = function (params) {
        return httpService.post('registerSingleMatchResult', params);
    }
}
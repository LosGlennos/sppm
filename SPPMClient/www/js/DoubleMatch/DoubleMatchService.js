var DoubleMatchService = function($http) {
    var httpService = new HttpService($http);

    this.registerDoubleMatchResult = function (params) {
        return httpService.post('registerDoubleMatchResult', params);
    }
}
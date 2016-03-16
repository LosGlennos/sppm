var FridayFinalSelectService = function ($http) {
    var httpService = new HttpService($http);

    this.postQualifications = function (params) {
        return httpService.post('postQualifications', params);
    }
}
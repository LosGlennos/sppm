var FridayFinalsService = function ($http) {
    var httpService = new HttpService($http);

    this.getMatches = function () {
        return httpService.get('fridayFinalsMatches');
    }
}
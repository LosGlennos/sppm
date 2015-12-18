var LoginService = function ($http) {
    var httpService = new HttpService($http);

    this.login = function (formData) {
        return httpService.postForm('login', { username: formData.username, password: formData.password });
    }
}
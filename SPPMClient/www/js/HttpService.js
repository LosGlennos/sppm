function HttpService($http) {

    var serverAdress = 'http://' + serverConfiguration.serverhost;
    serverAdress += serverConfiguration.serverport === '' ? '/' : ':' + serverConfiguration.serverport + '/';

    this.get = function (action, params) {
        return $http({
            method: 'GET',
            url: serverAdress + action,
            data: params
        });
    };

    this.post = function (action, params) {
        return $http({
            method: 'POST',
            url: serverAdress + action,
            data: params
        });
    };
};

angular.module("app")
        .factory("UserProducerFactory",userProducerFactory);

userProducerFactory.$inject = ["$http","$log"];

function userProducerFactory(http,log) {
    var service = {};
    service.getRawUsers = getRawUsers;
    return service;

    ////////////////////////////////////////////////////////
    function getRawUsers() {
        return http.get('/data.json')
            .then(function (response) {
                log.debug("Producers Data-------",response.data);
                return response.data;
            })
    }
}

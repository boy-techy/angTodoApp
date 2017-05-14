

angular.module('app')
        .factory('TodoProducerFactory',todoProducerFactory);

todoProducerFactory.$inject = ['$http'];

function todoProducerFactory(http) {
    var service = {};
    service.todoProduce = todoProduce;
    return service;
    
    /////////////////////////////////////////
    function todoProduce() {
        return http.get('data.json')
            .then(function (response) {
                return response.data;
            });
    }
}



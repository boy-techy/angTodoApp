
angular.module('app')
        .factory('AddtodoFactory',addtodoFactory);

function addtodoFactory() {
    var service = {};
    service.addTodo = addTodo;
    return service;

    ///////////////////////////////////////
    function addTodo() {

    }
}
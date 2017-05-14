
angular.module('app')
        .factory('AddtodoFactory',addtodoFactory);

addtodoFactory.$inject = ['TodoProcessFactory'];

function addtodoFactory(TodoProcessFactory) {
    var service = {};
    service.addTodo = addTodo;
    return service;

    ///////////////////////////////////////
    function addTodo() {
        TodoProcessFactory.addNewTodo(newTodo);
    }
}
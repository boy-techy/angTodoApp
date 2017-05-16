
angular.module('app')
        .factory('AddtodoFactory',addtodoFactory);

addtodoFactory.$inject = ['TodoProcessFactory','$log'];

function addtodoFactory(TodoProcessFactory,$log) {
    var service = {};
    service.addTodo = addTodo;
    return service;

    ///////////////////////////////////////
    function addTodo(newTodo) {
        if(newTodo.title && newTodo.date && newTodo.desc){
            TodoProcessFactory.addNewTodo(newTodo);
        }
        else{
            $log.log("Enter Values: ");
        }
    }
}
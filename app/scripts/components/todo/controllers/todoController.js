
require('../services');

angular.module('app')
        .controller('TodoController',todoController);

todoController.$inject = ['TodoProcessFactory'];

function todoController(todoProcessFactory) {
    var vm = this;
    init();

    /////////////////////////////
    function init() {
        todoProcessFactory
            .getTodoList()
            .then(function (todoList) {
                vm.pre = todoList.pre;
                vm.post = todoList.post;

                console.log(vm);
            })
    }
}

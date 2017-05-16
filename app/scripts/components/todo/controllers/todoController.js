
require('../services');

angular.module('app')
        .controller('TodoController',todoController);

todoController.$inject = ['TodoProcessFactory','$log'];

function todoController(todoProcessFactory,$log) {
    var vm = this;
    vm.delete = deleteTodo;
    vm.edit = editTodo;
    init();

    /////////////////////////////////////////////////////
    function init() {
        registerListeners();
        initialView();
    }
    
    function deleteTodo(beforeAfter,type,id) {
        todoProcessFactory.deleteTodo(beforeAfter,type,id);
    }
    
    function editTodo(beforeAfter,type,id) {
        todoProcessFactory.editTodo(beforeAfter,type,id);
    }

    function registerListeners() {
        todoProcessFactory.registerUpdateListener(todoProcessFactory.ACTIONS.UPDATE,
                                                    updateView);

    }

    function updateView() {
        $log.debug("Updated View");
        $log.debug(JSON.parse(localStorage.getItem("todo")));
        var todos = JSON.parse(localStorage.getItem("todo"));
        vm.pre = todos.pre;
        vm.post = todos.post;
    }


    function initialView() {
        todoProcessFactory
            .getTodoList()
            .then(function (todoList) {
                vm.pre = todoList.pre;
                vm.post = todoList.post;

                // $log.debug("Initial Todo");
                // $log.debug(localStorage.getItem("todo"));
            })
    }
}

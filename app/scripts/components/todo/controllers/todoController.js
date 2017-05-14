
require('../services');

angular.module('app')
        .controller('TodoController',todoController);

todoController.$inject = ['TodoProcessFactory','$log'];

function todoController(todoProcessFactory,$log) {
    var vm = this;
    init();

    /////////////////////////////////////////////////////
    function init() {
        registerListeners();
        initialView();
    }


    function registerListeners() {
        todoProcessFactory.registerUpdateListener(todoProcessFactory.ACTIONS.UPDATE,
                                                    updateView);

    }

    function updateView() {
        $log.log("Updated View");
        $log.log(JSON.parse(localStorage.getItem("todo")));
    }


    function initialView() {
        todoProcessFactory
            .getTodoList()
            .then(function (todoList) {
                vm.pre = todoList.pre;
                vm.post = todoList.post;

                $log.log("Initial Todo");
                $log.log(localStorage.getItem("todo"));
            })
    }
}

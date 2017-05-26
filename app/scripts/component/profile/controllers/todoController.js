
angular.module("app")
        .controller("TodoController",todoController);

todoController.$inject = ["$log","$scope","UserProcessorFactory","ACTION","CONTROLLER"];

function todoController(log,$scope,UserProcessorFactory,ACTION,CONTROLLER) {
    var vm = this;
    vm.editTodo = editTodo;
    vm.deleteTodo = deleteTodo;
    init();

    //////////////////////////////////////


    function init() {
        vm.todos = $scope.todos;
        vm.userid = $scope.userid;
        log.debug("----------todoontroller--------------",vm);
    }
    
    function editTodo(index,type) {
        log.debug("Edit Button Clicked",index,type);
    }


    function deleteTodo(index,type) {
        
    }
}
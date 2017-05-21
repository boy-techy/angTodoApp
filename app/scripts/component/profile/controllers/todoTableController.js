
angular.module("app")
    .controller("TodoTableController",todoTableController);

todoTableController.$inject = ["$log","UserProcessorFactory"];

function todoTableController(log,UserProcessorFactory) {
    var vm = this;
    vm.isEditable = isEditable;
    vm.editTodo = editTodo;
    vm.deleteTodo = deleteTodo;


    /////////////////////////////////
    function isEditable() {
        vm.editFlag = true;
        vm.isEditable = !vm.isEditable;
    }

    function editTodo(index,type) {
        isEdiTable();
    }
    function deleteTodo(userId,todoType,index) {
        log.debug("Values from delete Function: ",userId,index,todoType);
        if(userId !== undefined && todoType && index !== undefined){
            UserProcessorFactory.deleteUserTodo(userId,todoType,index);
        }
    }

}
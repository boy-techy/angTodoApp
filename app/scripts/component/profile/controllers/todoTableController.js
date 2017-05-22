
angular.module("app")
    .controller("TodoTableController",todoTableController);

todoTableController.$inject = ["$log","UserProcessorFactory"];

function todoTableController(log,UserProcessorFactory) {
    var vm = this;
    vm.editFlag = [];
    vm.editTodo = editTodo;
    vm.deleteTodo = deleteTodo;


    /////////////////////////////////
    function editTodo(index,type) {

        vm.editFlag = vm.editFlag.map(function (list) {
            if(list.index === index){
                list.flag = !list.flag;
                return list;
            }
            else{
                return list;
            }
        });
    }
    function deleteTodo(userId,todoType,index) {
        log.debug("Values from delete Function: ",userId,index,todoType);
        if(userId !== undefined && todoType && index !== undefined){
            UserProcessorFactory.deleteUserTodo(userId,todoType,index);
        }
    }

}
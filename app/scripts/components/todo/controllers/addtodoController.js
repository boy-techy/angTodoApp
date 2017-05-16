
angular.module('app')
        .controller('AddtodoController',addtodoController);

addtodoController.$inject = ['AddtodoFactory','$log'];

function addtodoController(AddtodoFactory,$log) {
    var vm = this;

    vm.addTodo = addTodo;

    /////////////////////
    function addTodo() {
        $log.debug("Message from click Function");
        AddtodoFactory.addTodo(
            {
                title: vm.title,
                date: vm.date,
                desc: vm.desc,
                status: true
            }
        );
    }
}
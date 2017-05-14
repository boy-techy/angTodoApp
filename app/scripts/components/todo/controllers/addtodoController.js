
angular.module('app')
        .controller('AddtodoController',addtodoController);

addtodoController.$inject = ['AddtodoFactory'];

function addtodoController(AddtodoFactory) {
    var vm = this;
    vm.cancel = cancel;
    vm.addTodo = addTodo;

    /////////////////////
    function addTodo() {
        AddtodoFactory.addTodo(
            {
                title: vm.title,
                date: vm.date,
                desc: vm.desc,
                status: true
            }
        );
    }
    
    function cancel() {

        //Will toggle the Case For Add or not
    }
}
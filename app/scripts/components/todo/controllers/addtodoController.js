
angular.module('app')
        .controller('AddtodoController',addtodoController);

addtodoController.$inject = ['AddtodoFactory'];

function addtodoController(AddtodoFactory) {
    var vm = this;

    init()

    /////////////////////
    function init() {
        AddtodoFactory.addTodo(
            {
                title:vm.title,

            }
        );
    }
}
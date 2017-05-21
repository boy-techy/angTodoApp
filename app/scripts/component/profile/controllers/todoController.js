
angular.module("app")
        .controller("TodoController",todoController);

todoController.$inject = ["$log"];

function todoController(log) {
    var vm = this;
    init();
    
    //////////////////////////////////////
    function init() {
        
    }
    
}
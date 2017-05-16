

require('../services');
angular.module('app')
        .controller('TodoDisplayController',todoDisplayController);

todoDisplayController.$inject = ['$stateParams','$log','$state'];

function todoDisplayController(stateParams,$log,state) {
    var vm = this;

    displayData();
    // $log.debug(stateParams);
    // $log.debug(JSON.parse(localStorage.getItem("todo")));

    //////////////////////////////////////////////////////////
    function displayData() {
        var todos = JSON.parse(localStorage.getItem("todo"));
        vm =  resolve(todos);
        // state.go('todo')
        $log.debug(vm);
    }

    // var filterObject = new Promise(callback());
    //
    // function callback() {
    //     return promiseCallback(resolve,reject);
    // }
    // function promiseCallback(resolve,reject){
    //     if(localStorage.getItem("todo")){
    //         var todos = localStorage.getItem("todo");
    //         return resolve(todos);
    //     }
    //     else{
    //         return reject("Sorry There is no Todo Available For that Page");
    //     }
    // }

    function resolve(todos) {   /////////////Have to work for, reducing the Complexity//////
        var flag = false,
            output = "";
        for(var pre_past in todos){
            for(var compl_inc in todos[pre_past]){
                todos[pre_past][compl_inc].forEach(function (value) {
                    if(value.id === parseInt(stateParams.taskId)){
                        flag = true;
                        output =  value;
                    }
                });
                if(flag){
                    return output;
                }
            }
        }
    }

    // function reject(msg) {
    //     return msg;
    // }
}
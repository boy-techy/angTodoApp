
angular.module("app")
        .factory("UserDashBoardFactory",userDashBoardFactory);

function userDashBoardFactory() {
    var service = {};
    service.addNewTodo = addNewTodo;
    return service;

    ///////////////////////////////////////////////
    function addNewTodo(newTodo) {
        // if(){
        //
        // }else{
        //     return false;
        // }
    }
}
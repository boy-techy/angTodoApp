

angular.module("app")
        .directive("toDo",todoDirective);


function todoDirective() {
    return{
        restrict: "E",
        templateUrl: "scripts/component/profile/views/todoDirective.html",
        controller: "TodoController",
        controllerAs: "vm",
        scope:{
            todos: '='
        }
    }
}
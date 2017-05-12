

angular.module("app")
        .directive("toDo",toDo);


function toDo() {
    return {
        restrict: 'E',
        templateUrl: 'scripts/components/todo/views/todoDirective.html'
    }
}

require('./addtodoDirective');
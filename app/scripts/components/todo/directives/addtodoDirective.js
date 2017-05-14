
angular.module('app')
       .directive('addTodo',addTodo);

function addTodo() {
    return {
        restrict: 'E',
        templateUrl: 'scripts/components/todo/views/addTodo.html',
        scope: {}
    }
}

require("./todoList");

angular.module("app")
        .directive("editTodo",editTodo);

function editTodo() {
    return{
        restrict: 'E',
        templateUrl: 'scripts/component/profile/views/editTodoDirective.html',
        scope:{
            todo: '=',
            editTodo: '&',
            deleteTodo: '&'
        }
    }
}
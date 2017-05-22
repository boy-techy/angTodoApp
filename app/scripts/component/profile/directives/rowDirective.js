
angular.module("app")
        .directive("row",rowDirective);

function rowDirective() {
    return{
        restrict: "E",
        templateUrl: "../scripts/component/profile/views/row.html",
        scope:{
            todo: '=',
            editTodo: '&',
            deleteTodo: '&',
            authentic: '='
        }
    }
}
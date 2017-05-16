
angular.module("app")
        .directive("todoList",todoList);

function todoList() {
    return {
        restrict: "E",
        template: "scripts/components/todo/views/singleTodo.html",
        scope:{
            edit: '&',
            delete: '&'
        }
    }
}


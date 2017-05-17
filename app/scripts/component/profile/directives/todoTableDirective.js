
angular.module("app")
        .directive("todoTable",todoTableDirective);

function todoTableDirective() {
    return{
        restrict: "E",
        templateUrl: "../scripts/component/profile/views/todoTableDirective.html",
        scope:{
            type: '@',
            todos: '='
        }
    }
}
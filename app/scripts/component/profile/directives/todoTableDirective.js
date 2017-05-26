
angular.module("app")
        .directive("todoTable",todoTableDirective);

function todoTableDirective() {
    return{
        restrict: "E",
        templateUrl: "../scripts/component/profile/views/todoTableDirective.html",
        controller: ["$scope",function ($scope) {
            console.log("TodoTable Directive------",$scope);
        }],
        scope:{
            type: '@',
            userid: '=',
            todos: '=',
            authentic: '=',
            edit: '&',
            del: '&'
        }
    }
}
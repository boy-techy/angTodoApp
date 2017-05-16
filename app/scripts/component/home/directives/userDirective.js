
angular.module("app")
        .directive("user",userDirective);

function userDirective() {
    return{
        restrict: 'E',
        templateUrl: 'scripts/component/home/views/user.html',
        script:{
            user: '='
        }
    }
}

angular.module("app")
        .directive("login",loginDirective);

function loginDirective() {
    return{
        restrict: "E",
        templateUrl: "scripts/component/home/views/login.html"
    }
}
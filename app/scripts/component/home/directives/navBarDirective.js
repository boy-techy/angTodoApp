
angular.module("app")
        .directive("navBar",navBar);

function navBar() {
    return{
        restrict: 'E',
        templateUrl: "scripts/component/home/views/navbar.html"
    }
}
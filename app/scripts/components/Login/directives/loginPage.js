
angular.module("app")
        .directive("loginPage",loginPage);

function loginPage() {
    return {
        restrict: 'E',
        templateUrl: 'scripts/components/Login/views/signIn.html'
    }
}
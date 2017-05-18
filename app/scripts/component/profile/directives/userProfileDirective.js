
angular.module("app")
        .directive("userProfile",userProfileDirective);

function userProfileDirective() {
    return{
        restrict: "E",
        templateUrl: "scripts/component/profile/views/userProfileDirective.html",
        controller: "UserProfileController",
        controllerAs: "vm",
        scope:{
            profile: '=',
            authentic: '='
        }
    }
}
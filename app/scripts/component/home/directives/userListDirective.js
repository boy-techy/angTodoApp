
angular.module("app")
        .directive("userList",userList);

function userList() {
    return{
        restrict: 'E',
        templateUrl: 'scripts/component/home/views/userList.html',
        controller: "UserListController",
        controllerAs: "vm"
    }
}
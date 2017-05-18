
var homeRoutes = require("../app/scripts/component/home/homeroutes");

function routers(locationProvider, stateProvider, urlRouterProvider) {

    locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });

    stateProvider
        .state("/",{
            url: "/",
            templateUrl: "scripts/component/home/views/userList.html",
            controller: 'UserListController',
            controllerAs: "vm"
        });

    homeRoutes(stateProvider);
}

module.exports = routers;
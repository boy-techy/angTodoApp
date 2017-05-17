
var homeRoutes = require("../app/scripts/component/home/homeroutes");

function routers(locationProvider, stateProvider, urlRouterProvider) {

    locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });

    homeRoutes(stateProvider);
}

module.exports = routers;
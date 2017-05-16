var todoroutes = require("./scripts/components/todo/todoroutes");
var loginRoutes = require("./scripts/components/Login/loginRoutes");
function routerConfigurations(locationProvider,stateProvider,urlRouterProvider) {
    locationProvider.html5Mode({
        enabled: true,
        requireBase:false
    })

    loginRoutes(stateProvider);

    todoroutes(stateProvider);
}

module.exports = routerConfigurations;
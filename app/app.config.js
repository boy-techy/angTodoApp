
var angular = require("angular");
require("angular-ui-router");

var app = angular.module("app",["ui.router"]);

var routers =  require("./app.route");

configurations.$inject = ['$logProvider','$locationProvider','$stateProvider', '$urlRouterProvider'];

require("./scripts/component/shared/constants");

app.config(configurations);

function configurations(logProvider,locationProvider,stateProvider,urlRouterProvider) {
    logProvider.debugEnabled(true);
    routers(locationProvider,stateProvider,urlRouterProvider);
}

app.run(function () {
    localStorage.clear();
    var loggedInuser = {
        authentic: false,
        id: 0
    };

    Object.freeze(loggedInuser);

    localStorage.setItem("loggedInuser",JSON.stringify(loggedInuser));
});
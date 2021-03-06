var angular = require('angular');
require('angular-ui-router');
var app = angular.module('app',['ui.router']);

var routerConfigurations =  require('./app.route');

routeConfig.$inject = ['$logProvider','$locationProvider','$stateProvider','$urlRouterProvider'];

app.config(routeConfig)

function routeConfig(logProvider,locationProvider,stateProvider,urlRouterProvider){
    logProvider.debugEnabled(true);
    routerConfigurations(locationProvider,stateProvider,urlRouterProvider);
}

app.run(function () {
        localStorage.clear();
});



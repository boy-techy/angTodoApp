var angular = require('angular');
require('angular-ui-router');
var app = angular.module('app',['ui.router']);

routeConfig.$inject = ['$locationProvider','$stateProvider','$urlRouterProvider'];

app.config(routeConfig)

var routerConfigurations =  require('./app.route');


function routeConfig(locationProvider,stateProvider,urlRouterProvider){
    routerConfigurations(locationProvider,stateProvider,urlRouterProvider);
}

require("./scripts/components/todo/directives/todoDirective");
require("./scripts/components/todo/controllers");


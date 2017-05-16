
var angular = require("angular");
require("angular-ui-bootstrap");

var app = angular.module("app",["ui.bootstrap"]);

configurations.$inject = ["$logProvider"];

app.config(configurations);

function configurations(logProvider) {
    logProvider.debugEnabled(true);
}
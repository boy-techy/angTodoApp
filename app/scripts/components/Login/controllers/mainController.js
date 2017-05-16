
require("../services");

angular.module("app")
        .controller("MainController",mainController);

mainController.$inject = ["LoginFactory","$log",'$state'];

function mainController(LoginFactory,log,state) {
    var vm = this;
    init();

    /////////////////////////////////////////
    function init() {
        registerUpdateListener();
        initialView();
    }

    function registerUpdateListener() {
        LoginFactory.registerListeners(updateView,LoginFactory.actions.AUTH);
    }

    function updateView() {
        var value = JSON.parse(localStorage.getItem("authenticate"));
        vm.authenticate = (value === true);
        log.debug(vm.authenticate);
        state.go("profile");
    }

    function initialView() {
        vm.authenticate = false;
    }
}
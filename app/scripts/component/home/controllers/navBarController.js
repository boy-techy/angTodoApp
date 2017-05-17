
angular.module("app")
        .controller("NavBarController",navBarController);

navBarController.$inject = ["$log","AuthenticationFactory","UserProcessorFactory",
                               "CONTROLLER","ACTION", "state"];

function navBarController(log,AuthenticationFactory,UserProcessorFactory,CONTROLLER,ACTION ,state) {
    var vm = this;
    vm.authenticate = authenticate;
    init();
    
    ////////////////////////////////////////////////////
    function init() {
        registerControllerCallbacks();
    }

    function registerControllerCallbacks() {
        UserProcessorFactory.registerListeners({
            action: ACTION.LOGIN,
            controller: CONTROLLER.NAVBAR,
            callback: updateView
        });
    }

    function updateView() {
        //state.go something something
        log.debug("Login Successfully----- Message From Navbar");
        /// have to Update View Login to Logout
    }

    function authenticate() {
        AuthenticationFactory.authenticateUser({
            username: vm.username,
            password: vm.password
        });
    }
}
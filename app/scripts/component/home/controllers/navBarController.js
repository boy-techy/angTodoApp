
angular.module("app")
        .controller("NavBarController",navBarController);

navBarController.$inject = ["$log","AuthenticationFactory","UserProcessorFactory",
                               "CONTROLLER","ACTION", "$state"];

function navBarController(log,AuthenticationFactory,UserProcessorFactory,CONTROLLER,ACTION ,state) {
    var vm = this;
    vm.authenticate = authenticate;
    vm.logout = logout;
    init();
    
    ////////////////////////////////////////////////////
    function init() {
        vm.authentic = false;
        registerControllerCallbacks();
    }

    function registerControllerCallbacks() {
        UserProcessorFactory.registerListeners({
            action: ACTION.LOGIN,
            controller: CONTROLLER.NAVBAR,
            callback: updateView
        });

        UserProcessorFactory.registerListeners({
            action: ACTION.LOGOUT,
            controller: CONTROLLER.NAVBAR,
            callback: updateView
        })
    }

    function updateView(value) {
        log.debug("Login Successfully----- Message From Navbar",value);
        vm.authentic = value;
        /// have to Update View Login to Logout
    }

    function logout() {
        ////Have to do task for
        AuthenticationFactory.logOutUser();
    }

    function authenticate() {
        AuthenticationFactory.authenticateUser({
            username: vm.username,
            password: vm.password
        });
    }
}
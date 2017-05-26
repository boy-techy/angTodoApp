
angular.module("app")
        .controller("NavBarController",navBarController);

navBarController.$inject = ["$log","AuthenticationFactory","UserProcessorFactory",
                               "CONTROLLER","ACTION","toaster"];

function navBarController(log,AuthenticationFactory,UserProcessorFactory,CONTROLLER,ACTION,toaster) {
    var vm = this;
    vm.authenticate = authenticate;
    vm.logout = logout;
    init();
    
    ////////////////////////////////////////////////////
    function init() {
        registerControllerCallbacks();
        var loggedInuser = JSON.parse(localStorage.getItem("loggedInuser"));
        vm.authentic = loggedInuser.authentic;
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

    function updateView() {
        var loggedInuser = JSON.parse(localStorage.getItem("loggedInuser"));
        if(loggedInuser.authentic){
            toaster.pop({
                type: "success",
                body: "Welcome "+loggedInuser.name+" !!!",
                timeout: 3000,
                showCloseButton: true
            });
        }else{
            toaster.pop({
                body: "Logout Successfully",
                timeout: 3000,
                showCloseButton: true
            });
        }
        vm.authentic = loggedInuser.authentic;

    }

    function logout() {
        ////Have to do task for
        AuthenticationFactory.logOutUser();

    }

    function authenticate() {
        var isError =  AuthenticationFactory.authenticateUser({
            username: vm.username,
            password: vm.password
        });

        if(isError){
            toaster.pop({
                type: "error",
                body: "Wrong Credentials",
                timeout: 3000,
                showCloseButton: true
            });
        }
    }
}
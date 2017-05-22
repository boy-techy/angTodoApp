
angular.module("app")
        .controller("UserDashBoardController",userDashBoardController);

userDashBoardController.$inject = ["$stateParams","$log","ProfileFilterFactory",
                                    "UserProcessorFactory","CONTROLLER","ACTION"];

function userDashBoardController(stateParams,log,ProfileFilterFactory,
                                 UserProcessorFactory,CONTROLLER,ACTION) {
    var vm = this;
    init();

    /////////////////////////////////////
    function init() {
        registerForGetCurrentUser();
        initialView();
    }



    function registerForGetCurrentUser() {
        UserProcessorFactory.registerListeners({
            action: ACTION.CURRENTUSER,
            controller: CONTROLLER.USERDASHBOARD,
            callback: getId
        });

        UserProcessorFactory.registerListeners({
            action: ACTION.DELETE,
            controller: CONTROLLER.USERDASHBOARD,
            callback: updateDeleteView
        })

        UserProcessorFactory.registerListeners({
            action: ACTION.LOGIN,
            controller: CONTROLLER.USERDASHBOARD,
            callback: updateView
        });

        UserProcessorFactory.registerListeners({
            action: ACTION.LOGOUT,
            controller: CONTROLLER.USERDASHBOARD,
            callback: updateView
        })
    }

    function getId() {
        return vm.user.id;
    }

    function updateDeleteView() {
        var id = parseInt(stateParams.id);
        log.debug("UpdateDeleteView :",id);
        vm.user = ProfileFilterFactory.getProfile(id);
    }


    function updateView() {
        log.debug("UserDashBoard---- Now Update View For Edit Delete and all this Stuff");
        var loggedInuser = JSON.parse(localStorage.getItem("loggedInuser"));
        vm.authentic = (loggedInuser.authentic && loggedInuser.id === vm.user.id);
    }

    function initialView() {
        var id = parseInt(stateParams.id);
        vm.user =  ProfileFilterFactory.getProfile(id);
        var loggedInuser = JSON.parse(localStorage.getItem("loggedInuser"));
        vm.authentic = (loggedInuser.authentic && loggedInuser.id === id);
        log.debug("Profile--------------",vm.user);
    }

}
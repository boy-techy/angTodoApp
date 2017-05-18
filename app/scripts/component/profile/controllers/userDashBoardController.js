
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

    function updateView(value) {
        log.debug("UserDashBoard---- Now Update View For Edit Delete and all this Stuff");
        vm.authentic = value;
        ////Have to work
    }

    function initialView() {
        var id = parseInt(stateParams.id);
        vm.user =  ProfileFilterFactory.getProfile(id);
        vm.authentic = ProfileFilterFactory.isSameUser(id);
        log.debug("Profile--------------",vm.user);
    }

}
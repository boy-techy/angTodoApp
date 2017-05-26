
angular.module("app")
        .controller("UserDashBoardController",userDashBoardController);

userDashBoardController.$inject = ["$stateParams","$state","$log","ProfileFilterFactory",
                                    "UserProcessorFactory","CONTROLLER","ACTION"];

function userDashBoardController(stateParams,state,log,ProfileFilterFactory,
                                 UserProcessorFactory,CONTROLLER,ACTION) {
    var vm = this;
    vm.addTodoToggle = false;
    vm.addTodoTogg = addTodoTogg;
    vm.addTodo = addTodo;
    init();

    /////////////////////////////////////
    function init() {
        stateMount();
        stateUnmounted();
        initialView();
    }

    function stateUnmounted() {
        state.$current.onExit = function () {
            UserProcessorFactory.removeListeners(CONTROLLER.USERDASHBOARD);
        }
    }

    function stateMount() {
        log.debug("State Enter------------",state.$current);
        registerSubscriberListeners();
    }

    function registerSubscriberListeners() {
        UserProcessorFactory.registerListeners({
            action: ACTION.DELETE,
            controller: CONTROLLER.USERDASHBOARD,
            callback: update_CRUD_View
        });

        UserProcessorFactory.registerListeners({
            action: ACTION.ADDTODO,
            controller: CONTROLLER.USERDASHBOARD,
            callback: update_CRUD_View
        })

        UserProcessorFactory.registerListeners({
            action: ACTION.EDIT,
            controller: CONTROLLER.USERDASHBOARD,
            callback: update_CRUD_View
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


    function update_CRUD_View() {
        var id = parseInt(stateParams.id);
        log.debug("UpdateView :",id);
        vm.user = ProfileFilterFactory.getProfile(id);
        log.debug("After Update User----------",vm.user);
    }


    function updateView() {
        log.debug("UserDashBoard---- Now Update View For Edit Delete and all this Stuff");
        var loggedInuser = JSON.parse(localStorage.getItem("loggedInuser"));
        vm.authentic = (loggedInuser.authentic && loggedInuser.id === vm.user.id);
        vm.addTodoToggle = false;
    }

    function initialView() {
        var id = parseInt(stateParams.id);
        vm.user =  ProfileFilterFactory.getProfile(id);
        var loggedInuser = JSON.parse(localStorage.getItem("loggedInuser"));
        vm.authentic = (loggedInuser.authentic && loggedInuser.id === id);
        log.debug("Profile--------------",vm.user);
    }

    function addTodoTogg() {
        vm.addTodoToggle = !vm.addTodoToggle;
    }

    function addTodo() {
        var id = parseInt(stateParams.id);
        var newtodo = {
            title: vm.addTitle,
            status: vm.addStatus,
            date: vm.addDate,
            desc: vm.addDesc
        };
        log.debug("Values are passing here",newtodo);
        UserProcessorFactory.addUserTodo(newtodo,id);
    }
}
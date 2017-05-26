
angular.module("app")
        .controller("UserListController",userListController);

userListController.$inject = ["$log","$state","UserProcessorFactory","CONTROLLER","ACTION"];

function userListController(log,state,UserProcessorFactory,CONTROLLER,ACTION) {
    var vm = this;
    vm.loadMore = loadMore;
    vm.loadMoreDisable = false;
    var cache = "",
        loadCount = 3;

    init();
    
    /////////////////////////////////////////////
    function init() {
        registerControllerCallbacks();
        stateUnMount();
        initialView();
    }

    function stateUnMount() {
        state.$current.onExit = function () {
            UserProcessorFactory.removeListeners(CONTROLLER.USERLIST);
        }
    }

    function registerControllerCallbacks() {
        UserProcessorFactory.registerListeners({
            action: ACTION.LOGIN,
            controller: CONTROLLER.USERLIST,
            callback: update_LoginView
        });
    }

    function update_LoginView() {
        log.debug("HomePage------ Not this time but Can be used for Change Profile");
        ////UPdate View After Login
    }

    function loadMore() {
        if((loadCount+3) < cache.length){
            loadCount += 3;
            vm.users = cache.slice(0,loadCount);
        }
        else if((loadCount+3) > cache.length){
            loadCount = cache.length;
            vm.users = cache.slice(0,loadCount);
            vm.loadMoreDisable = true;
        }
    }

    function initialView() {
        UserProcessorFactory
            .getUsers()
            .then(function (users) {
                cache = users;
                vm.users= cache.slice(0,3);
            })

    }
}
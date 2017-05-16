
angular.module("app")
        .controller("UserListController",userListController);

userListController.$inject = ["$log","UserProcessorFactory"];

function userListController(log, UserProcessorFactory) {
    var vm = this;
    vm.loadMore = loadMore;
    vm.loadMoreDisable = false;
    init();
    
    /////////////////////////////////////////////
    var cache = "",
        loadCount = 3;
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

    function init() {
        UserProcessorFactory
            .getUsers()
            .then(function (users) {
                cache = users;
                vm.users= cache.slice(0,3);
            })

    }
}
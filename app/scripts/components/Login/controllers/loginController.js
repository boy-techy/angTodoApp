
angular.module("app")
        .controller("LoginController",loginController);

loginController.$inject = ['$state','LoginFactory'];

function loginController(state,LoginFactory){
    var vm = this;
    vm.signIn = signIn;
    vm.signUp = signUp;
    init();

    //////////////////////////////////
    function init() {

    }

    function signIn() {
        LoginFactory.authenticate({name: vm.username, password: vm.pwd})
        var authenticate =  JSON.parse(localStorage.getItem("authenticate"));
        authenticate = (authenticate === true);
        if(!authenticate){
            vm.error = true;
        }
    }
    function signUp() {
        state.go("signup");
    }
}
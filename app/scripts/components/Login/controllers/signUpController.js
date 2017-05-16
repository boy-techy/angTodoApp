
require("../services");

angular.module("app")
        .controller("SignUpController",signUpController);

signUpController.$inject = ["$state","SignUpFactory"];

function signUpController(state,SignUpFactory) {
    var vm = this;

    init();

    /////////////////////////////////////////
    function init() {
        vm.create = create;
        vm.signIn = signIn;

        function signIn() {
            state.go("signin");
        }

        function create() {
            var success = SignUpFactory.addUser({
                name: vm.name,
                dob: vm.dob,
                email: vm.email,
                pwd: vm.pwd
            });

            if(success){
                state.go("signin");
            }
            else{
                vm.error = true;
            }
        }
    }
}
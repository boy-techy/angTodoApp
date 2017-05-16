
angular.module("app")
        .controller("SignUpController",signUpController);

signUpController.$inject = ["$state"];

function signUpController(state) {
    var vm = this;

    init();

    /////////////////////////////////////////
    function init() {
        vm.create = create;

        function create() {
            var users = JSON.parse(localStorage.getItem("users"));
            users = users?users:[];
            users.push({
                name: vm.name,
                dob: vm.dob,
                email: vm.email,
                pwd: vm.pwd
            });
            localStorage.setItem("users",JSON.stringify(users));

            state.go("signin");
        }
    }
}
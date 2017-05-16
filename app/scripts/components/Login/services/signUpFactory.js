
angular.module("app")
        .factory("SignUpFactory",signUpFactory);

function signUpFactory() {
    var service = {};
    service.addUser = addUser;
    return service;

    ////////////////////////////////////////////////////
    function addUser(newUser) {
        var users = JSON.parse(localStorage.getItem("users"));
        users = users?users:[];
        if(newUser.name && newUser.dob && newUser.email && newUser.pwd){
            users.push({
                name: newUser.name,
                dob: newUser.dob,
                email: newUser.email,
                pwd: newUser.pwd
            });
            localStorage.setItem("users",JSON.stringify(users));
            return true;
        }
        else{
            return false;
        }
    }
}
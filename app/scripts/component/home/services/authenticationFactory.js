
angular.module("app")
        .factory("AuthenticationFactory",authenticationFactory);

authenticationFactory.$inject = ["$log","FormatFactory","UserProcessorFactory"];

function authenticationFactory(log,FormatFactory,UserProcessorFactory) {
    var service = {},
        LoggedInuser = [];
    service.authenticateUser = authenticateUser;
    service.logOutUser = logOutUser;
    return service;

    //////////////////////////////////////
    function authenticateUser(LoginCredentials) {
        var users = FormatFactory.returnCache();
        LoggedInuser =  users.filter(function (user) {
            return (user.user === LoginCredentials.username && user.user === LoginCredentials.password);
        });
        if(LoggedInuser.length > 0){
            LoggedInuser = LoggedInuser[0];

            var loggedInuser = {
                authentic: true,
                id: LoggedInuser.id
            };

            Object.freeze(loggedInuser);

            localStorage.setItem("loggedInuser",JSON.stringify(loggedInuser));
            updateListeners("loginViewUpdate");
        }
        else{
            log.debug("Login Credentials Are Wrong!!!!!");
        }
    }
    
    function logOutUser() {
        var loggedInuser = {
            authentic: false,
            id: LoggedInuser.id
        };

        Object.freeze(loggedInuser);

        localStorage.setItem("loggedInuser",JSON.stringify(loggedInuser));

        updateListeners("logoutViewUpdate");
    }

    function updateListeners(action) {
        UserProcessorFactory[action]();
    }
}
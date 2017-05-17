
angular.module("app")
        .factory("AuthenticationFactory",authenticationFactory);

authenticationFactory.$inject = ["FormatFactory","UserProcessorFactory"];

function authenticationFactory(FormatFactory,UserProcessorFactory) {
    var service = {};
    service.authenticateUser = authenticateUser;
    return service;

    //////////////////////////////////////
    function authenticateUser(LoginCredentials) {
        var users = FormatFactory.returnCache();
        var LoggedInuser =  users.filter(function (user) {
            return (user.user === LoginCredentials.username && user.user === user.password);
        });
        if(LoggedInuser.length > 0){
            LoggedInuser = LoggedInuser[0].user;
            updateListeners(LoggedInuser);
        }
        else{
            /////Message For Toaster Not User Existing
        }
    }
    
    function updateListeners(LoggedInuser) {
        UserProcessorFactory.loginViewUpdate(LoggedInuser);
    }
}
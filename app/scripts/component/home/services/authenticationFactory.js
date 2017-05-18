
angular.module("app")
        .factory("AuthenticationFactory",authenticationFactory);

authenticationFactory.$inject = ["FormatFactory","UserProcessorFactory"];

function authenticationFactory(FormatFactory,UserProcessorFactory) {
    var service = {},
        LoggedInuser = "";
    service.authenticateUser = authenticateUser;
    service.logOutUser = logOutUser;
    service.getLoggedInUserId = getLoggedInUserId;
    return service;

    //////////////////////////////////////
    function authenticateUser(LoginCredentials) {
        var users = FormatFactory.returnCache();
        LoggedInuser =  users.filter(function (user) {
            return (user.user === LoginCredentials.username && user.user === LoginCredentials.password);
        });
        if(LoggedInuser.length > 0){
            LoggedInuser = LoggedInuser[0];
            updateListeners(LoggedInuser,"loginViewUpdate");
        }
        else{
            /////Message For Toaster Not User Existing
        }
    }
    
    function logOutUser() {
        updateListeners({},"logoutViewUpdate");
    }

    function getLoggedInUserId() {
        return LoggedInuser.id;
    }
    
    function updateListeners(LoggedInuser,action) {
        UserProcessorFactory[action](LoggedInuser);
    }
}
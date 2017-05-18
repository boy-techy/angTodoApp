
angular.module("app")
        .factory("UserProcessorFactory",userProcessorFactory);

userProcessorFactory.$inject = ["FormatFactory","$log","CONTROLLER","ACTION"];

function userProcessorFactory(FormatFactory,log,CONTROLLER,ACTION) {
    var service = {},
        listeners = [];
    service.getUsers = getUsers;
    service.registerListeners = registerListeners;
    service.updateListeners = updateListeners;
    service.logoutViewUpdate = logoutViewUpdate;
    service.loginViewUpdate = loginViewUpdate;
    return service;

    //////////////////////////////////////////////////////////////
    function getUsers() {
        return FormatFactory.userData()
            .then(function (userdata) {
                log.debug(userdata);
                return userdata;
            })
    }

    function registerListeners(listener_to_register) {
        var newListener = new Listener(listener_to_register);
        listeners.push(newListener);

        ///deregister Listeners
        return function () {
            listeners =  listeners.filter(function (listener) {
                return listener.equalsTo(newListener);
            })
        };
    }

    function updateListeners(action) {
        listeners.forEach(function (listener) {
            if(listener.hasOwnProperty(action)){
                listener.callback();
            }
        })
    }

    function loginViewUpdate(LoggedInuser) {
        var getCurr_User_IdCallback =  listeners.filter(function (listener) {
            return listener.action === ACTION.CURRENTUSER;
        });
        var currnet_user_id = [];
        if(getCurr_User_IdCallback.length > 0){
            currnet_user_id = getCurr_User_IdCallback[0].callback(true);
        }

        if(LoggedInuser.id === currnet_user_id){
            listeners.forEach(function (listener) {
                if(listener.action === ACTION.LOGIN){
                    listener.callback(true);
                }
            })
        }
        else{
            listeners.forEach(function (listener) {
                if(listener.action === ACTION.LOGIN && listener.controller === CONTROLLER.NAVBAR){

                    listener.callback(true);
                }
            })
        }
    }

    function logoutViewUpdate(LogoutUser) {
        listeners.forEach(function (listener) {
            if(listener.action === ACTION.LOGOUT){
                listener.callback(false);
            }
        })
    }

}
function Listener(listener) {
    this.action = listener.action;
    this.controller = listener.controller;
    this.callback = listener.callback;
}

Listener.prototype.equalsTo = function (newListener) {
    return (this.action === newListener.action && this.controller === newListener.controller);
};

angular.module("app")
        .factory("UserProcessorFactory",userProcessorFactory);

userProcessorFactory.$inject = ["FormatFactory","$log","CONTROLLER","ACTION"];

function userProcessorFactory(FormatFactory,log,CONTROLLER,ACTION) {
    var service = {},
        listeners = [];
    service.getUsers = getUsers;
    service.registerListeners = registerListeners;
    service.updateListeners = updateListeners;
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
        })
        var currnet_user_id = getCurr_User_IdCallback[0].callback();

        if(LoggedInuser.id === currnet_user_id){
            listeners.forEach(function (listener) {
                if(listener.action === ACTION.LOGIN){
                    listener.callback();
                }
            })
        }
        else{
            listeners.forEach(function (listener) {
                if(listener.action === ACTION.LOGIN && listener.controller === CONTROLLER.NAVBAR){

                    listener.callback();
                }
            })
        }
    }

}
function Listener(listener) {
    this.action = listener.action;
    this.controller = listener.controller;
    this.callback = callback;
}

Listener.prototype.equalsTo = function (newListener) {
    return (this.action === newListener.action && this.controller === newListener.controller);
};
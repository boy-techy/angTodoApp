
angular.module("app")
        .factory("LoginFactory",loginFactory);

function loginFactory() {
    var service = {};
    var listeners = [];
    service.actions = {
        AUTH: "authenticate"
    }
    service.authenticate = authenticate;
    service.registerListeners = registerListeners;
    return service;

    //////////////////////////////////////////////////
    function authenticate(user) {
        var users = JSON.parse(localStorage.getItem("users"));
        users = users?users:[];
        for(var i=0;i<users.length;i++){
            if(user.name === users[i].name && user.password === users[i].pwd){
                localStorage.setItem("authenticate",JSON.stringify(true));
                callForListeners(service.actions.AUTH);
                return;
            }
        }
    }
    function callForListeners(action) {
        listeners.forEach(function (listener) {
            if(listener.hasOwnProperty(action)){
                listener[action]();
            }
        })
    }

    function registerListeners(listener,action) {
        var obj = {};
        obj[action] = listener;
        listeners.push(obj);
    }
}
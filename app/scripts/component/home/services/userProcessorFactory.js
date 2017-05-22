
angular.module("app")
        .factory("UserProcessorFactory",userProcessorFactory);

userProcessorFactory.$inject = ["FormatFactory","$log","CONTROLLER","ACTION"];

function userProcessorFactory(FormatFactory,log,CONTROLLER,ACTION) {
    var service = {},
        listeners = [];
    service.getUsers = getUsers;
    service.registerListeners = registerListeners;
    service.deleteUserTodo = deleteUserTodo;
    service.updateUserTodo = updateUserTodo;
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
        for(var i = 0;i<listeners.length;i++){
            if(listeners[i].equalsTo(newListener)){
                listeners[i] = newListener;
                return;
            }
        }
        listeners.push(newListener);
        return;

        ///deregister Listeners
        // return function () {
        //     listeners =  listeners.filter(function (listener) {
        //         return !(listener.equalsTo(newListener));
        //     })
        // };
    }

    function updateListeners(action) {
        listeners.forEach(function (listener) {
            if(listener.action === action){
                listener.callback();
            }
        })
    }

    function loginViewUpdate() {
        // /For get The Current User Which one Todo is Observing
        var getCurr_User_IdCallback =  listeners.filter(function (listener) {
            return listener.action === ACTION.CURRENTUSER;
        });

        var currnet_user_id = NaN;
        if(getCurr_User_IdCallback.length > 0){
            currnet_user_id = getCurr_User_IdCallback[(getCurr_User_IdCallback.length)-1].callback();
        }

        //Notify all View Update Controllers
        var loggedInuser = JSON.parse(localStorage.getItem("loggedInuser"));

        if(loggedInuser.id === currnet_user_id){
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

    function logoutViewUpdate() {
        listeners.forEach(function (listener) {
            if(listener.action === ACTION.LOGOUT){
                listener.callback();
            }
        })
    }

    function updateUserTodo(userId,todoType,index,updateValue) {
        var cache = FormatFactory.returnCache();
        var newCache = cache.map(function (user) {
            if(user.index === userId){
                return updateTodo(user,todoType,index,updateValue)
            }
        })

        return newCache;
    }

    function updateTodo(user,todoType,index,updateValue) {
        return user.todo[todoType].map(function (todo) {
            if(todo.index === index){
                var temp = user.todo[todoType];
                temp.title = updateValue.title;
                temp.status = updateValue.status;
                temp.desc = updateValue.desc;
                temp.date = updateValue.date;

                user.todo[todoType] = temp;
                return user;
            }
            else{
                return user;
            }
        })
    }

    function deleteUserTodo(userId,todoType,index) {
        var cache = FormatFactory.returnCache();
        var newCache = cache.map(function (user) {
            if(user.id === userId){
               return deleteTodo(user,todoType,index);
            }else {
                return user;
            }
        });
        FormatFactory.updateCache(newCache);
        updateListeners(ACTION.DELETE);
    }

    function deleteTodo(user,todoType,index) {
        user.todo[todoType] =  user.todo[todoType].filter(function (todo) {
            return todo.index !== index;
        });
        return user;
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

angular.module("app")
        .factory("UserProcessorFactory",userProcessorFactory);

userProcessorFactory.$inject = ["FormatFactory","$log","CONTROLLER","ACTION"];

function userProcessorFactory(FormatFactory,log,CONTROLLER,ACTION) {
    var service = {},
        listeners = [];
    var Listener = require("./../../shared/Classes/Listener");
    service.getUsers = getUsers;
    service.addUserTodo = addUserTodo;
    service.registerListeners = registerListeners;
    service.removeListeners = removeListeners;
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
        // for(var i = 0;i<listeners.length;i++){
        //     if(listeners[i].equalsTo(newListener)){
        //         listeners[i] = newListener;
        //         return;
        //     }
        // }
        listeners.push(newListener);
        console.log(listeners);
    }

    function removeListeners(nameOfController) {
        listeners = listeners.filter(function (listener) {
            return (listener.controller !== nameOfController);
        })
    }

    function updateListeners(action) {
        listeners.forEach(function (listener) {
            if(listener.action === action){
                listener.callback();
            }
        })
    }

    function addUserTodo(newtodo,userid) {
        FormatFactory.addUserTodo(newtodo,userid);
        updateListeners(ACTION.ADDTODO);
    }

    function loginViewUpdate() {
        listeners.forEach(function (listener) {
            if(listener.action === ACTION.LOGIN){
                listener.callback();
            }
        })
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

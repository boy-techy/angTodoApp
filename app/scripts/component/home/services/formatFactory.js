
angular.module("app")
        .factory("FormatFactory",formatFactory);

formatFactory.$inject = ["UserProducerFactory","$log"];

function formatFactory(UserProducerFactory,log) {
    var service = {},
        cache = "";
    service.userData = userData;
    service.addUserTodo = addUserTodo;
    service.toogleEdit = toogleEdit;
    service.updateCache = updateCache;
    service.returnCache = returnCache;
    return service;

    /////////////////////////////////
    function userData() {
        return UserProducerFactory
            .getRawUsers()
            .then(function (rawData) {
                var temp = wrapInUser(rawData);
                cache = temp;
                log.debug("Format Factory Data:-----------",temp);
                return temp;
            })
    }

    function updateCache(newCache){
        cache = newCache;
    }

    function returnCache() {
        return cache;
    }

    function addUserTodo(newtodo,userid) {
        newtodo = new Todo(newtodo);
        var newcache = appendTodo(newtodo,userid);
        updateCache(newcache);
    }

    function appendTodo(newtodo,userid) {
        return cache.map(function (user) {
            if(user.id === userid){
                var index = user.todo.complete.length+user.todo.incomplete.length;
                var newto_do = new Todo(newtodo,index);
                if(newtodo.isComplete()){
                    user.todo.complete.push(newto_do);
                }
                else{
                    user.todo.incomplete.push(newto_do);
                }
            }
            return user;
        })
    }

    function toogleEdit(editTodo) {

    }

    function wrapInUser(rawData) {
        return rawData.map(function (userData,index) {
            return new User(userData,index);
        });
    }
}
function User(rawData,index) {
    this.id = index;
    this.user = rawData.user;
    this.todo = makeTodos(rawData.todo);
}

function makeTodos(rawTodo) {
    var wrappedTodos = [];
    rawTodo.forEach(function (todo,index) {
        wrappedTodos.push(new Todo(todo,index))
    });

    return filterTodo(wrappedTodos);
}

function filterTodo(todos) {
    var todo = {
        complete: [],
        incomplete: []
    };

    todos.forEach(function (to_do) {
        if(to_do.isComplete()){
            todo.complete.push(to_do);
        }
        else{
            todo.incomplete.push(to_do)
        }
    });

    return todo;
}

function Todo(raw,index) {
    this.index = index;
    this.editFlag = false;
    this.title = raw.title;
    this.date = raw.date;
    this.desc = raw.desc;
    this.status = raw.status;
}

Todo.prototype.isComplete = function () {
    return this.status;
};





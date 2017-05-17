
angular.module("app")
        .factory("FormatFactory",formatFactory);

formatFactory.$inject = ["UserProducerFactory","$log"];

function formatFactory(UserProducerFactory,log) {
    var service = {},
        cache = "";
    service.userData = userData;
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

    function returnCache() {
        return cache;
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
    rawTodo.forEach(function (todo) {
        wrappedTodos.push(new Todo(todo))
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

function Todo(raw) {
    this.title = raw.title;
    this.date = raw.date;
    this.desc = raw.desc;
    this.status = raw.status;
}

Todo.prototype.isComplete = function () {
    return this.status;
};





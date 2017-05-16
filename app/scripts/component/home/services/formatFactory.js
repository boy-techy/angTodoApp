
angular.module("app")
        .factory("FormatFactory",formatFactory);

formatFactory.$inject = ["UserProducerFactory","$log"];

function formatFactory(UserProducerFactory,log) {
    var service = {};
    service.userData = userData;
    return service;

    /////////////////////////////////
    function userData() {
        return UserProducerFactory
            .getRawUsers()
            .then(function (rawData) {
                var temp = wrapInUser(rawData);
                log.debug("Format Factory Data:-----------",temp);
                return temp;
            })
    }

    function wrapInUser(rawData) {
        var usersList =  rawData.map(function (userData) {
            return new User(userData);
        })
        return usersList;
    }
}
function User(rawData) {
    this.user = rawData.user;
    this.todo = makeTodos(rawData.todo);
}

function makeTodos(rawTodo) {
    var wrappedTodos = [];
    rawTodo.forEach(function (todo) {
        wrappedTodos.push(new Todo(todo))
    });

    var filtered =  filterTodo(wrappedTodos);
    return filtered;
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





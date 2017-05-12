

angular.module('app')
        .factory('TodoProducerFactory',todoProducerFactory);

todoProducerFactory.$inject = ['$http'];

function todoProducerFactory(http) {
    var service = {};
    service.todoProduce = todoProduce;
    return service;
    
    /////////////////////////////////////////
    function todoProduce() {
        return http.get('data.json')
            .then(function (response) {
                   var temp  = wrapInTodo(response.data);
                   console.log(temp);
                   createCache(temp);
                   return temp;
            })
    }

    function createCache(todos) {
        localStorage.setItem("todo",todos);
    }

    function updateCache() {

    }

    function wrapInTodo(rawTodos) {
        return rawTodos.map(function (rawTodo) {
            return new Todo(rawTodo);
        });
    }
}


function Todo(data) {
    this.task = data.title;
    this.duedate = data.date;
    this.desc = data.description;
    this.status = data.status;
}

Todo.prototype.isCompleted = function () {
    return this.status;
}

Todo.prototype.isPastDate = function () {
    return (new Date(this.duedate) > new Date);
}
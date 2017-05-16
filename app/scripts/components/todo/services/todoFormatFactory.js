
angular.module('app')
        .factory("TodoFormatFactory",todoFormatFactory);

todoFormatFactory.$inject = ["TodoProducerFactory"];

function todoFormatFactory(TodoProducerFactory) {
    var service = {};
    service.generateTodo = generateTodo;
    service.wrapInTodo = wrapInTodo;
    return service;


    //////////////////////////////////////////////
    function generateTodo(newTodo,index) {
        if(newTodo){
            return new Todo(newTodo,index);
        }
        else{
            return TodoProducerFactory
                .todoProduce()
                .then(function (rawTodos) {
                    return wrapInTodo(rawTodos);
                })
        }
    }

    function wrapInTodo(rawTodos) {
        return rawTodos.map(function (rawTodo,index) {
            return new Todo(rawTodo,index);
        });
    }
}

function Todo(data,index) {
    this.id = index;
    this.title = data.title;
    this.date = data.date;
    this.desc = data.description;
    this.status = data.status;
}

Todo.prototype.isCompleted = function () {
    return this.status;
}

Todo.prototype.isPastDate = function () {
    return (new Date(this.date) > new Date);
}
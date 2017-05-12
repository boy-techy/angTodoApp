
angular.module('app')
       .factory('TodoProcessFactory',todoProcessFactory);

todoProcessFactory.$inject = ['TodoProducerFactory'];

function todoProcessFactory(todoProducer) {
    var service = {};

    service.getTodoList = getTodoList;
    return service;

    ////////////////////////////////////////
    function getTodoList() {
        return todoProducer.todoProduce()
                    .then(function (todos) {
                        return todosType(todos)
                    });
    }

    function todosType(todos) {
        var todoList = {
            pre: {
                complete: [],
                incomplete: []
            },
            post:{
                complete: [],
                incomplete: []
            }
        };

        todos.forEach(function (todo) {

            if(todo.isPastDate()){
                if(todo.isCompleted()){
                    todoList.post.complete.push(todo);
                }
                else{
                    todoList.post.incomplete.push(todo);
                }
            }
            else{
                if(todo.isCompleted()){
                    todoList.pre.complete.push(todo);
                }
                else{
                    todoList.pre.incomplete.push(todo);
                }
            }
        });

        return todoList;
    }
}
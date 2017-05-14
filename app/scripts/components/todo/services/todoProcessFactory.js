
angular.module('app')
       .factory('TodoProcessFactory',todoProcessFactory);

todoProcessFactory.$inject = ['TodoFormatFactory'];

function todoProcessFactory(todoFormat) {
    var service = {};
    service.getTodoList = getTodoList;
    service.addNewTodo = addNewTodo;
    service.registerUpdateListener = registerUpdateListener;
    var listeners = [];
    service.ACTIONS = {
        UPDATE: "update"
    };

    return service;


    ////////////////////////////////////////
    function getTodoList() {
        return todoFormat.generateTodo()
                    .then(function (todos) {
                        var type_todo =  todosType(todos)
                        createCache(type_todo);
                        return type_todo;
                    });
    }

    function registerUpdateListener(key,callback) {
        var obj = {};
        obj[key] = callback;
        listeners.push(obj);
    }

    function addNewTodo(newTodo) {
        var newTodos =  todoFormat.generateTodo([newTodo]);
        updateCache(newTodos);
        listeners.forEach(function (value) {
            if(value.hasOwnProperty("update")){
                value.update();
            }
        })
    }

    function createCache(todos) {
        localStorage.setItem("todo",JSON.stringify(todos));
    }

    function updateCache(newTodos) {
        var arr_todo = JSON.parse(localStorage.getItem("todo"));
        arr_todo =  arr_todo.concat(newTodos);
        localStorage.setItem("todo",JSON.stringify(arr_todo));
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
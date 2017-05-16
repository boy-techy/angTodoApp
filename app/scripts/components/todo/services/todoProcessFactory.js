
angular.module('app')
       .factory('TodoProcessFactory',todoProcessFactory);

todoProcessFactory.$inject = ['TodoFormatFactory','$log'];

function todoProcessFactory(todoFormat,$log) {
    var service = {};
    service.getTodoList = getTodoList;
    service.addNewTodo = addNewTodo;
    service.registerUpdateListener = registerUpdateListener;
    service.deleteTodo = deleteTodo;
    service.editTodo = editTodo;
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

    function updateListeners() {
        listeners.forEach(function (value) {
            if(value.hasOwnProperty("update")){
                value.update();
            }
        })
    }

    function addNewTodo(newTodo) {
        var oldTodo = JSON.parse(localStorage.getItem("todo"));
        var length = oldTodo.pre.complete.length +  oldTodo.pre.incomplete.length;
        length += oldTodo.post.complete.length +  oldTodo.post.incomplete.length;
        var newTodo =  todoFormat.generateTodo(newTodo,oldTodo+1);
        updateCache(newTodo);
        updateListeners();

    }
    function editTodo(beforeAfter,type,id) {
        var values = prompt("Enter Separated Values");
        var newTitle = values.substr(0,values.indexOf(" "));
        values = values.substr(values.indexOf(" ")+1);
        var newdate =  new Date(values.substr(0,values.indexOf(" ")));
        values = values.substr(values.indexOf(" ")+1);
        var newDesc =  values;

        var oldTodo = JSON.parse(localStorage.getItem("todo"));
        for(var i=0;i<oldTodo[beforeAfter][type].length;i++){
            if(oldTodo[beforeAfter][type][i].id === id){
                oldTodo[beforeAfter][type][i].title = newTitle;
                oldTodo[beforeAfter][type][i].date = newdate;
                oldTodo[beforeAfter][type][i].desc = newDesc;
                oldTodo = (oldTodo.pre.complete).concat(oldTodo.pre.incomplete).
                    concat(oldTodo.post.complete).concat(oldTodo.post.incomplete);
                oldTodo = todoFormat.wrapInTodo(oldTodo);
                oldTodo = todosType(oldTodo);
                localStorage.setItem("todo",JSON.stringify(oldTodo));
                break;
            }
        }
        updateListeners();
    }

    function deleteTodo(pre_past,compl_inc,id) {
        var oldTodo = JSON.parse(localStorage.getItem("todo"));
        for(var i = 0; i< oldTodo[pre_past][compl_inc].length;i++){
            if(oldTodo[pre_past][compl_inc][i].id === id){
                oldTodo[pre_past][compl_inc].splice([i],1);
                localStorage.setItem("todo",JSON.stringify(oldTodo));
            }
        }
        updateListeners();
    }


    function createCache(todos) {
        localStorage.setItem("todo",JSON.stringify(todos));
    }

    function updateCache(newTodo) {
        var arr_todo = JSON.parse(localStorage.getItem("todo"));

        if(newTodo.isPastDate()){
            if(newTodo.isCompleted()){
                arr_todo.post.complete.push(newTodo);
            }
            else{
                arr_todo.post.incomplete.push(newTodo);
            }
        }
        else{
            if(newTodo.isCompleted()){
                arr_todo.pre.complete.push(newTodo);
            }
            else{
                arr_todo.pre.complete.push(newTodo);
            }
        }
        $log.log(arr_todo);
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

var ACTION = {
    LOGIN: "authenticate",
    CURRENTUSER: "currentUser",
    LOGOUT: "logout",
    EDIT: "editTodo",
    DELETE: "deleteTodo",
    ADDTODO: "addNewTodo"
}

angular.module("app")
        .constant("ACTION",ACTION);
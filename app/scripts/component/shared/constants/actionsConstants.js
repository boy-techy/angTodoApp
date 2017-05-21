
var ACTION = {
    LOGIN: "authenticate",
    CURRENTUSER: "currentUser",
    LOGOUT: "logout",
    EDIT: "editTodo",
    DELETE: "deleteTodo"
}

angular.module("app")
        .constant("ACTION",ACTION);
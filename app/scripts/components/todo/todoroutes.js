
function todoRoutes(stateProvider) {
    stateProvider
        .state("profile",{
            url: '/profile/todo',
            templateUrl: 'scripts/components/todo/views/todoDirective.html'
        })
        .state('todo',{
        url: '/todo/:taskId',
        templateUrl: 'scripts/components/todo/views/rowTodo.html',
        controller: 'TodoDisplayController',
        controllerAs: 'vm'
        })

}

module.exports = todoRoutes;
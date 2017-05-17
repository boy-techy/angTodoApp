
function homeRoutesConfig(stateProvider) {
    stateProvider
        .state("profile",{
            url:"profile/:id",
            templateUrl: "scripts/component/profile/views/userDashBoard.html",
            controller: "UserDashBoardController",
            controllerAs: "vm"
        })
}

module.exports = homeRoutesConfig;
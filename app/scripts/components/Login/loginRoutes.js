
function loginRoutes(stateProvider) {
    stateProvider
        .state('signin',{
            url: "/Login",
            templateUrl: "scripts/components/Login/views/signIn.html"

        //    Add Controller and Change state from login to signup
        })
        .state('signup',{
            url: "/Signup",
            templateUrl: "scripts/components/Login/views/signUp.html"
        })
}

module.exports = loginRoutes;
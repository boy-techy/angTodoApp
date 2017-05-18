
angular.module("app")
        .factory("ProfileFilterFactory",profileFilterFactory);

profileFilterFactory.$inject = ["FormatFactory","AuthenticationFactory"];

function profileFilterFactory(formatFactory,AuthenticationFactory) {
    var service = {};
    service.getProfile = getProfile;
    service.isSameUser = isSameUser;
    return service;
    
    ////////////////////////
    function getProfile(reqestedId) {
        var cache =  formatFactory.returnCache();
        return filterProfile(cache,reqestedId);
    }

    function isSameUser(id) {
        var LoggedInUserId = AuthenticationFactory.getLoggedInUserId();
        return (LoggedInUserId === id);
    }

    function filterProfile(cache,reqestedId) {
       var users = cache.filter(function (profile) {
            return profile.id === reqestedId
        })
        return users[0];
    }
}
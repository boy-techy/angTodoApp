
angular.module("app")
        .factory("ProfileFilterFactory",profileFilterFactory);

profileFilterFactory.$inject = ["FormatFactory"];

function profileFilterFactory(formatFactory) {
    var service = {};
    service.getProfile = getProfile;
    return service;
    
    ////////////////////////
    function getProfile(reqestedId) {
        var cache =  formatFactory.returnCache();
        return filterProfile(cache,reqestedId);
    }
    
    function filterProfile(cache,reqestedId) {
       var users = cache.filter(function (profile) {
            return profile.id === reqestedId
        })
        return users[0];
    }
}
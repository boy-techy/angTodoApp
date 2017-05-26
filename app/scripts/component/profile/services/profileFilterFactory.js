
angular.module("app")
        .factory("ProfileFilterFactory",profileFilterFactory);

profileFilterFactory.$inject = ["FormatFactory"];

function profileFilterFactory(formatFactory) {
    var service = {},
        listeners = [];
    service.getProfile = getProfile;
    service.registerListeners = registerListeners;
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

    function registerListeners(listener_to_register) {

    }
}
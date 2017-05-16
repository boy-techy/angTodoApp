
angular.module("app")
        .factory("UserProcessorFactory",userProcessorFactory);

userProcessorFactory.$inject = ["FormatFactory","$log"];

function userProcessorFactory(FormatFactory,log) {
    var service = {};
    service.getUsers = getUsers;
    return service;

    function getUsers() {
        return FormatFactory.userData()
            .then(function (userdata) {
                log.debug(userdata);
                return userdata;
            })
    }
}
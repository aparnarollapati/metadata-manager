//= wrapped
angular
    .module("mms")
    .factory("Role", Role);

function Role(DomainServiceFactory) {
    return DomainServiceFactory("api/roles/:id", {id: '@id',max: '-1'});
}

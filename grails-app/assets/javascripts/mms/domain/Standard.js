//= wrapped
angular
    .module("mms")
    .factory("Standard", Standard);

function Standard(DomainServiceFactory) {
    return DomainServiceFactory("api/standards/:id", {id: '@id',max: '-1'});
}

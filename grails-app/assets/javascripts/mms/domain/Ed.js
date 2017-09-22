//= wrapped
angular
    .module("mms")
    .factory("Ed", Ed);

function Ed(DomainServiceFactory) {
    return DomainServiceFactory("api/ed/:id", {id: '@id',max: '-1'});
}
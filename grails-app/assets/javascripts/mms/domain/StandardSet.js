//= wrapped
angular
    .module("mms")
    .factory("StandardSet", StandardSet);

function StandardSet(DomainServiceFactory) {
    return DomainServiceFactory("api/standardsets/:id", {id: '@id',max: '-1'});
}

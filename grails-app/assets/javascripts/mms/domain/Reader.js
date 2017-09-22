//= wrapped
angular
    .module("mms")
    .factory("Reader", Reader);

function Reader(DomainServiceFactory) {
    return DomainServiceFactory("api/readers/:id", {id: '@id',max: '-1'});
}

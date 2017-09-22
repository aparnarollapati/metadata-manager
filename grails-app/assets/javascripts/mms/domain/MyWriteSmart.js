//= wrapped
angular
    .module("mms")
    .factory("MyWriteSmart", MyWriteSmart);

function MyWriteSmart(DomainServiceFactory) {
    return DomainServiceFactory("api/mwsguids/:id", {id: '@id',max: '-1'});
}

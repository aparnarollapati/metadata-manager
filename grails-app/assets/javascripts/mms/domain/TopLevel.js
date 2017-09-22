//= wrapped
angular
    .module("mms")
    .factory("TopLevel", TopLevel);

function TopLevel(DomainServiceFactory) {
    return DomainServiceFactory("api/toplevels/:id", {id: '@id',max: '-1'});
}
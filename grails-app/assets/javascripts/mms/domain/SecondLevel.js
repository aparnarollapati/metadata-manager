//= wrapped
angular
    .module("mms")
    .factory("SecondLevel", SecondLevel);

function SecondLevel(DomainServiceFactory) {
    return DomainServiceFactory("api/secondlevels/:id", {id: '@id',max: '-1'});
}
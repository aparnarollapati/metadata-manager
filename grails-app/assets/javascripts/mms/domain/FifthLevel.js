//= wrapped
angular
    .module("mms")
    .factory("FifthLevel", FifthLevel);

function FifthLevel(DomainServiceFactory) {
    return DomainServiceFactory("api/fifthlevels/:id", {id: '@id',max: '-1'});
}
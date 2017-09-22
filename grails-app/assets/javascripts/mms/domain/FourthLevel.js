//= wrapped
angular
    .module("mms")
    .factory("FourthLevel", FourthLevel);

function FourthLevel(DomainServiceFactory) {
    return DomainServiceFactory("api/fourthlevels/:id", {id: '@id',max: '-1'});
}
//= wrapped
angular
    .module("mms")
    .factory("Keyword", Keyword);

function Keyword(DomainServiceFactory) {
    return DomainServiceFactory("api/keywords/:id", {id: '@id',max: '-1'});
}

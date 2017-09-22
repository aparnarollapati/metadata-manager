//= wrapped
angular
    .module("mms")
    .factory("CategorizationMapping", CategorizationMapping);

function CategorizationMapping(DomainServiceFactory) {
    return DomainServiceFactory("api/categorizationmappings/:id", {id: '@id',max: '-1', sort: 'categorization', order: 'asc'});
}

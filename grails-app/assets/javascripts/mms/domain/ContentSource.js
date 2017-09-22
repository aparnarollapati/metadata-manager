//= wrapped

angular
    .module("mms.correlations")
    .factory("ContentSource", ContentSource);

function ContentSource(DomainServiceFactory) {
    return DomainServiceFactory("api/correlations/content/sources/:id", {id: '@id',max: '-1'});
}
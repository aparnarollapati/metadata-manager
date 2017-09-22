//= wrapped

angular
    .module("mms.correlations")
    .factory("ContentTarget", ContentTarget);

function ContentTarget(DomainServiceFactory) {
    return DomainServiceFactory("api/correlations/content/targets/:id", {id: '@id',max: '-1'});
}
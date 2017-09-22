//= wrapped

angular
    .module("mms.correlations")
    .factory("CorrelationTarget", CorrelationTarget);

function CorrelationTarget(DomainServiceFactory) {
    return DomainServiceFactory("api/correlations/targets/:id", {id: '@id',max: '-1'});
}

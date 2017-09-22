//= wrapped

angular
    .module("mms")
    .factory("CorrelationSource", CorrelationSource);

function CorrelationSource(DomainServiceFactory) {
    return DomainServiceFactory("api/correlations/sources/:id", {id: '@id',max: '-1'});
}

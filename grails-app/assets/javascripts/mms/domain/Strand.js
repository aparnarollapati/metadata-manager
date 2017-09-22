//= wrapped
angular
    .module("mms")
    .factory("Strand", Strand);

function Strand(DomainServiceFactory) {
    return DomainServiceFactory("api/strands/:id", {id: '@id',max: '-1'});
}

//= wrapped
angular
    .module("mms")
    .factory("StrandMapping", StrandMapping);

function StrandMapping(DomainServiceFactory) {
    return DomainServiceFactory("api/strandmappings/:id", {id: '@id', max: '-1', sort: 'strand', order: 'asc'});
}

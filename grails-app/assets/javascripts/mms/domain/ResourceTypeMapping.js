//= wrapped
angular
    .module("mms")
    .factory("ResourceTypeMapping", ResourceTypeMapping);

function ResourceTypeMapping(DomainServiceFactory) {
    return DomainServiceFactory("api/resourcetypemappings/:id", {id: '@id', max: '-1', sort: 'resourceType', order: 'asc'});
}
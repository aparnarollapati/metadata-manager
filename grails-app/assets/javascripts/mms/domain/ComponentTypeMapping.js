//= wrapped
angular
    .module("mms")
    .factory("ComponentTypeMapping", ComponentTypeMapping);

function ComponentTypeMapping(DomainServiceFactory) {
    return DomainServiceFactory("api/componenttypemappings/:id", {id: '@id', max: '-1', sort: 'componentType', order: 'asc'});
}

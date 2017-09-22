//= wrapped
angular
    .module("mms")
    .factory("ComponentMapping", ComponentMapping);

function ComponentMapping(DomainServiceFactory) {
    return DomainServiceFactory("api/componentmappings/:id", {id: '@id', max: '-1', sort: 'component', order: 'asc'});
}

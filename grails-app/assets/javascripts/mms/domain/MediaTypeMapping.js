//= wrapped
angular
    .module("mms")
    .factory("MediaTypeMapping", MediaTypeMapping);

function MediaTypeMapping(DomainServiceFactory) {
    return DomainServiceFactory("api/mediatypemappings/:id", {id: '@id', max: '-1', sort: 'mediaType', order: 'asc'});
}

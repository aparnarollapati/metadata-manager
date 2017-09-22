//= wrapped
angular
    .module("mms")
    .factory("Content", Content);

function Content(DomainServiceFactory) {
    return DomainServiceFactory("api/content/:id", {id: '@id',max: '-1'});
}

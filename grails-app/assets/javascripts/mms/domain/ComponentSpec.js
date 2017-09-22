//= wrapped
angular
    .module("mms")
    .factory("ComponentSpec", ComponentSpec)

function ComponentSpec(DomainServiceFactory) {
    return DomainServiceFactory("api/componentspecs/:id", {id: '@id',max: '-1'});
};

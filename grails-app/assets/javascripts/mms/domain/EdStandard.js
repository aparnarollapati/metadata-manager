//= wrapped
angular
    .module("mms")
    .factory("EdStandard", EdStandard)

function EdStandard(DomainServiceFactory) {
    return DomainServiceFactory("api/edstandards/:id", {id: '@id',max: '-1'});
};

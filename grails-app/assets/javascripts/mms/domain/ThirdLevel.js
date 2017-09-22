//= wrapped
angular
    .module("mms")
    .factory("ThirdLevel", ThirdLevel);

function ThirdLevel(DomainServiceFactory) {
    return DomainServiceFactory("api/thirdlevels/:id", {id: '@id',max: '-1'});
}
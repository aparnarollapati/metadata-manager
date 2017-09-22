//= wrapped
angular
    .module("mms")
    .factory("LevelStandard", LevelStandard);

function LevelStandard(DomainServiceFactory) {
    return DomainServiceFactory("api/levelstandards/:id", {id: '@id',max: '-1'});
}

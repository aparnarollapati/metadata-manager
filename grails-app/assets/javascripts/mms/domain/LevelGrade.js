//= wrapped
angular
    .module("mms")
    .factory("LevelGrade", LevelGrade);

function LevelGrade(DomainServiceFactory) {
    return DomainServiceFactory("api/levelgrades/:id", {id: '@id',max: '-1'});
}

//= wrapped
angular
    .module("mms")
    .factory("LevelKeyword", LevelKeyword);

function LevelKeyword(DomainServiceFactory) {
    return DomainServiceFactory("api/levelkeywords/:id", {id: '@id',max: '-1'});
}

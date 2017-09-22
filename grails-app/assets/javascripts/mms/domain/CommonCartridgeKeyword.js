//= wrapped
angular
    .module("mms")
    .factory("CommonCartridgeKeyword", CommonCartridgeKeyword);

function CommonCartridgeKeyword(DomainServiceFactory) {
    return DomainServiceFactory("api/commoncartridgekeywords/:id", {id: '@id',max: '-1'});
}
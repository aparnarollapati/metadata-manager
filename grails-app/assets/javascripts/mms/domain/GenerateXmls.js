//= wrapped
angular
    .module("mms")
    .factory("GenerateXmls", GenerateXmls);

function GenerateXmls(DomainServiceFactory) {
    return DomainServiceFactory("api/generateXmls/:id", {id: '@id',max: '-1'});
};

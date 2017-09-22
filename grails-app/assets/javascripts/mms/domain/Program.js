//= wrapped
angular
    .module("mms")
    .factory("Program", Program)

function Program(DomainServiceFactory) {
    return DomainServiceFactory("api/programs/:id", {id: '@id',max: '-1'});
};

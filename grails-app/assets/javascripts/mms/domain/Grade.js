//= wrapped
angular
    .module("mms")
    .factory("Grade", Grade);

function Grade(DomainServiceFactory) {
    return DomainServiceFactory("api/grades/:id", {id: '@id',max: '-1'});
}

//= wrapped
angular
    .module("mms")
    .factory("User", User);

function User(DomainServiceFactory) {
    return DomainServiceFactory("api/users/:id", {id: '@id',max: '-1'});
}

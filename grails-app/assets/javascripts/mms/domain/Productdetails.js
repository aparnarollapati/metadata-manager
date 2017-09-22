//= wrapped

angular
    .module("mms")
    .factory("Productdetails", Productdetails);

function Productdetails(DomainServiceFactory) {
    return DomainServiceFactory("api/productdetails/:id", {id: '@id',max: '-1'});
}

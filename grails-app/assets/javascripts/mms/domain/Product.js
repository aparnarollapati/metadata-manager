//= wrapped
angular
    .module("mms")
    .factory("Product", Product);

function Product(DomainServiceFactory) {
    return DomainServiceFactory("api/products/:id", {id: '@id', max: '-1'});
}

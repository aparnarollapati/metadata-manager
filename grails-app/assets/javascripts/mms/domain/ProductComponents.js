//= wrapped

angular
    .module("mms")
    .factory("ProductComponents", ProductComponents);

function ProductComponents(DomainServiceFactory) {
    return DomainServiceFactory("api/productcomponents/:id", {id: '@id',max: '-1'});
}

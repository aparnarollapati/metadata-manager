//= wrapped

angular
    .module("mms")
    .factory("GenerateExcel", GenerateExcel);

function GenerateExcel(DomainServiceFactory) {
    return DomainServiceFactory("api/generateExcel/:id", {"id": "@id",max :'-1'});
}

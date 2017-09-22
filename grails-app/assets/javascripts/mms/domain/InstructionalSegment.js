//= wrapped
angular
    .module("mms")
    .factory("InstructionalSegment", InstructionalSegment);

function InstructionalSegment(DomainServiceFactory) {
    return DomainServiceFactory("api/instructionalsegments/:id", {id: '@id',max: '-1'});
}

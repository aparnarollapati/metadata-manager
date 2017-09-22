//= wrapped
angular
    .module("mms")
    .factory("InstructionalSegmentMapping", InstructionalSegmentMapping);

function InstructionalSegmentMapping(DomainServiceFactory) {
		
    return DomainServiceFactory("api/instructionalsegmentmappings/:id", {id: '@id', max: '-1', offset: '0', sort: 'instructionalSegment', order: 'asc'});
}

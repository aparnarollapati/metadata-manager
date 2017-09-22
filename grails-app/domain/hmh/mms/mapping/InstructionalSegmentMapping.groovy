package hmh.mms.mapping
import grails.rest.*

@Resource(uri='/instructionalsegmentmappings', readOnly = false, formats = ['json', 'xml'])
class InstructionalSegmentMapping {
	
	String instructionalSegment

    static constraints = {
		
		instructionalSegment (blank: false)
    }
}

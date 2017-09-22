package hmh.mms

import grails.rest.*

@Resource(uri='/instructionalsegments', readOnly = false, formats = ['json', 'xml'])
class InstructionalSegment {

	// inject mapping service
	def mappingService

	Integer hierarchy
	String title

	static constraints = {

		hierarchy (range: 0..999)
		title (blank: false, validator: { titleValue, instructionalSegmentInstance ->

			// if value is not in predefined list return false
			if (!instructionalSegmentInstance.mappingService.isInstructionalSegmentValueInList(titleValue)) {
				return 'value.not.in.predefined.list'
			}
		})
	}

	static belongsTo = [program: Program]

}

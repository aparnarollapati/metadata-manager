package hmh.mms

import grails.rest.*

@Resource(uri='/strands', readOnly = false, formats = ['json', 'xml'])
class Strand {

	def mappingService

	Integer hierarchy
	String title

	static constraints = {

		hierarchy (range: 0..999)
		title (blank: false, validator: { titleValue, strandInstance ->

			// if value is not in predefined list return false
			if (!strandInstance.mappingService.isStrandValueInList(titleValue)) {
				return 'value.not.in.predefined.list'
			}
		})

	}

	static belongsTo = [program: Program]
}

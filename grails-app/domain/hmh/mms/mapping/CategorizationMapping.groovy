package hmh.mms.mapping

import grails.rest.*

@Resource(uri='/categorizationmappings', readOnly = false, formats = ['json', 'xml'])
class CategorizationMapping {

	String categorization

	static constraints = {

		categorization (blank: false)
	}
}

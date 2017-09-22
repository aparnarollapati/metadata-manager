package hmh.mms

import grails.rest.*

@Resource(uri='/standards', readOnly = false, formats = ['json', 'xml'])
class Standard {

	String standard

	static constraints = {		
		
		standard (shared: "standardsMatch")		

	}

	static belongsTo = [content: Content]
}

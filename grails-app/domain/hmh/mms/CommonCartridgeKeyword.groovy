package hmh.mms

import grails.rest.*

@Resource(uri='/commoncartridgekeywords', readOnly = false, formats = ['json', 'xml'])
class CommonCartridgeKeyword {

	String keyword

	static constraints = {
		
		keyword (blank: false)
	}

	static belongsTo = [content: Content]

}
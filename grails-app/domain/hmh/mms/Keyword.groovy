package hmh.mms

import grails.rest.*

@Resource(uri='/keywords', readOnly = false, formats = ['json', 'xml'])
class Keyword {

	String keyword

	static constraints = {

		keyword (blank: false)

	}

	static belongsTo = [content: Content]

}
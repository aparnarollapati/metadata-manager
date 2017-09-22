package hmh.mms

import grails.rest.*

@Resource(uri='/mwsguids', readOnly = false, formats = ['json', 'xml'])
class MyWriteSmart {

	String guid

	static constraints = {

		guid (blank: false)
	}

	static belongsTo = [content: Content]
}

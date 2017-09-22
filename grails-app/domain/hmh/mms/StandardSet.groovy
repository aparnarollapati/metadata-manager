package hmh.mms


import grails.rest.*

@Resource(readOnly = false, formats = ['json', 'xml'])
class StandardSet {


	String name

	static constraints = {

		name (nullable: false,blank: false)

	}

	static belongsTo = [program: Program]

}


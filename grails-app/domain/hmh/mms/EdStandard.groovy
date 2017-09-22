package hmh.mms


import grails.rest.*

@Resource(readOnly = false, formats = ['json', 'xml'])
class EdStandard {


	String standard

	static constraints = {

		standard (shared: "standardsMatch", nullable: false)
		standardSet (nullable: false)

	}

	static belongsTo = [content: Content]

	// Many to One
	StandardSet standardSet
}

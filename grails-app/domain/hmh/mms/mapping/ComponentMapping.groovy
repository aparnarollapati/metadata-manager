package hmh.mms.mapping
import grails.rest.*

@Resource(uri='/componentmappings', readOnly = false, formats = ['json', 'xml'])
class ComponentMapping {

	String component
	String code

	static constraints = {

		component (blank: false)
		code (nullable: true)
	}
}

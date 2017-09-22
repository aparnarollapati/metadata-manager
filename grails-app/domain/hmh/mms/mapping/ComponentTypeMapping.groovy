package hmh.mms.mapping
import grails.rest.*

@Resource(uri='/componentTypemappings', readOnly = false, formats = ['json', 'xml'])
class ComponentTypeMapping {

	String componentType

	static constraints = {

		componentType (blank: false)
	}
}

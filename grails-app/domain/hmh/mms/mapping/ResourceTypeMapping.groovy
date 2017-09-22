package hmh.mms.mapping
import grails.rest.*

@Resource(uri='/resourcetypemappings', readOnly = false, formats = ['json', 'xml'])
class ResourceTypeMapping {

	String resourceType

	static constraints = {

		resourceType (blank: false)
	}
}

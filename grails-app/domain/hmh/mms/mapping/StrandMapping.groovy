package hmh.mms.mapping
import grails.rest.*

@Resource(uri='/strandmappings', readOnly = false, formats = ['json', 'xml'])
class StrandMapping {

	String strand

	static constraints = {

		strand (blank: false)

	}
}

package hmh.mms.mapping
import grails.rest.*

@Resource(uri='/mediatypemappings', readOnly = false, formats = ['json', 'xml'])
class MediaTypeMapping {
	
	String mediaType

    static constraints = {
		
		mediaType (blank: false)
    }
}

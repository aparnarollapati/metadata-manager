package hmh.mms.correlation

import grails.transaction.Transactional
import hmh.mms.*


@Transactional
class CorrelationMappingService {

	def getTargetContents(Content contentInstance) {
	    def resourceData=[:]
		def sourceContents = ContentSource.where{content.id == contentInstance.id}.get()
		if(sourceContents){	
		def targetResources = ContentTarget.where{sourceResource.id == sourceContents.id}.list(sort:"sortId")			
		resourceData=[sourceContents:sourceContents,targetResources:targetResources]
		}
		resourceData
	}


}

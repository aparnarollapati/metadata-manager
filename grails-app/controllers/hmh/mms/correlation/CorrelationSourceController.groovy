package hmh.mms.correlation

import static org.springframework.http.HttpStatus.*
import grails.transaction.Transactional
import hmh.mms.Program
import grails.plugin.springsecurity.annotation.Secured

@Transactional(readOnly = true)
class CorrelationSourceController {

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index(Integer max) {
	params.max = Math.min(max ?: 10, 100)
	respond CorrelationSource.list(params), model:[correlationSourceCount: CorrelationSource.count()]
    }


    def show(CorrelationSource correlationSource) {
	respond correlationSource
    }


    @Transactional
    def save(CorrelationSource correlationSource) {
	if (correlationSource == null) {
	    transactionStatus.setRollbackOnly()
	    render status: NOT_FOUND
	    return
	}

	if (correlationSource.hasErrors()) {
	    transactionStatus.setRollbackOnly()
	    respond correlationSource.errors, view:'create'
	    return
	}

	correlationSource.save flush:true

	respond correlationSource, [status: CREATED, view:"show"]
    }

    @Transactional
    def update(CorrelationSource correlationSource) {


	if (correlationSource == null) {
	    transactionStatus.setRollbackOnly()
	    render status: NOT_FOUND
	    return
	}

	if (correlationSource.hasErrors()) {
	    transactionStatus.setRollbackOnly()
	    respond correlationSource.errors, view:'edit'
	    return
	}
	
	correlationSource.save flush:true

	respond correlationSource, [status: OK, view:"show"]
    }
  

    def deleteCorrelationTargets(CorrelationSource correlationSource){


	def jsondata = [:]
	def contentTargets = correlationSource?.resources?.targetResources
	log.info"looking for correlation target content instances to delete..."+contentTargets
	contentTargets.each{
	    if(it){
		log.info"deleting correlation target content ${it.content.displayTitle}..."
		def contentTargetInstance = ContentTarget.get(it.id)
		contentTargetInstance.delete()
	    }
	}
	def contentSources = correlationSource?.resources
	log.info"looking for contentSources content instances to delete..."+contentSources
	contentSources.each{
	    if(it){
		log.info"deleting correlation content sources ${it.content.displayTitle}..."
		def correlationCSourceInstance = ContentSource.get(it.id)
		correlationCSourceInstance.delete()
	    }
	}



	def correlationTargets = correlationSource?.targets
	log.info"looking for correlation target product instances to delete..."+correlationTargets
	correlationTargets.each{
	    if(it){
		log.info"deleting correlation target product ${it.product.isbn}..."
		def correlationTargetInstance = CorrelationTarget.get(it.id)
		correlationTargetInstance.delete()
	    }
	}

    }

    @Transactional
    @Secured(['ROLE_ADMIN'])
    def delete(CorrelationSource correlationSource) {

	if (correlationSource == null) {
	    transactionStatus.setRollbackOnly()
	    render status: NOT_FOUND
	    return
	}
	// Ensure the resources dependencies are not deleted first
	deleteCorrelationTargets(correlationSource)
	correlationSource.delete flush:true

	render status: NO_CONTENT
    }
}

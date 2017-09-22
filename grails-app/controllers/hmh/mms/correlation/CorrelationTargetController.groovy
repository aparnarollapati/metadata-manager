package hmh.mms.correlation

import static org.springframework.http.HttpStatus.*
import grails.transaction.Transactional

@Transactional(readOnly = true)
class CorrelationTargetController {

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index(Integer max) {
	params.max = Math.min(max ?: 10, 100)
	respond CorrelationTarget.list(params), model:[correlationTargetCount: CorrelationTarget.count()]
    }

    def show(CorrelationTarget correlationTarget) {
	respond correlationTarget
    }

    @Transactional
    def save(CorrelationTarget correlationTarget) {
	if (correlationTarget == null) {
	    transactionStatus.setRollbackOnly()
	    render status: NOT_FOUND
	    return
	}

	if (correlationTarget.hasErrors()) {
	    transactionStatus.setRollbackOnly()
	    respond correlationTarget.errors, view:'create'
	    return
	}

	correlationTarget.save flush:true

	respond correlationTarget, [status: CREATED, view:"show"]
    }

    @Transactional
    def update(CorrelationTarget correlationTarget) {
	if (correlationTarget == null) {
	    transactionStatus.setRollbackOnly()
	    render status: NOT_FOUND
	    return
	}

	if (correlationTarget.hasErrors()) {
	    transactionStatus.setRollbackOnly()
	    respond correlationTarget.errors, view:'edit'
	    return
	}
	
	deleteContentTargets(correlationTarget)	
	correlationTarget.save flush:true

	
	respond correlationTarget, [status: OK, view:"show"]
    }
    @Transactional
    private deleteContentTargets(CorrelationTarget correlationTarget){
		
	log.info"looking for correlation target content instances to delete..."
	def contentTargets = correlationTarget?.contentTarget
	contentTargets.each{
	    if(it){
		log.info"deleting correlation target content ${it.content.displayTitle}..."
		def contentTargetInstance = ContentTarget.get(it.id)
		correlationTarget.removeFromContentTarget(contentTargetInstance)
		contentTargetInstance.delete()
	    }
	}
    }
    @Transactional
    def delete(CorrelationTarget correlationTarget) {

	if (correlationTarget == null) {
	    transactionStatus.setRollbackOnly()
	    render status: NOT_FOUND
	    return
	}
	deleteContentTargets(correlationTarget)
	correlationTarget.delete flush:true

	render status: NO_CONTENT
    }
}

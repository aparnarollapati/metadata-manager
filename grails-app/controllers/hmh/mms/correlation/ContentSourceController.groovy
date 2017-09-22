package hmh.mms.correlation

import static org.springframework.http.HttpStatus.*
import grails.transaction.Transactional

@Transactional(readOnly = true)
class ContentSourceController {

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index(Integer max) {
	params.max = Math.min(max ?: 10, 100)
	respond ContentSource.list(params), model:[contentSourceCount: ContentSource.count()]
    }

    def show(ContentSource contentSource) {
	respond contentSource
    }

    @Transactional
    def save(ContentSource contentSource) {
	if (contentSource == null) {
	    transactionStatus.setRollbackOnly()
	    render status: NOT_FOUND
	    return
	}

	if (contentSource.hasErrors()) {
	    transactionStatus.setRollbackOnly()
	    respond contentSource.errors, view:'create'
	    return
	}

	contentSource.save flush:true

	respond contentSource, [status: CREATED, view:"show"]
    }

    @Transactional
    def update(ContentSource contentSource) {
	if (contentSource == null) {
	    transactionStatus.setRollbackOnly()
	    render status: NOT_FOUND
	    return
	}

	if (contentSource.hasErrors()) {
	    transactionStatus.setRollbackOnly()
	    respond contentSource.errors, view:'edit'
	    return
	}

	contentSource.save flush:true
	deleteContentTargets(contentSource)
	respond contentSource, [status: OK, view:"show"]
    }
    @Transactional
    private deleteContentTargets(ContentSource contentSource){

	log.info"looking for correlation target content instances to delete..."

	def contentTargets = contentSource?.targetResources
	contentTargets.each{contentTarget->
	    if(contentTarget){
		log.info"deleting correlation target content ${contentTarget.content.displayTitle}..."
		contentSource.removeFromTargetResources(contentTarget)
		contentTarget.delete()
	    }
	}
    }
    @Transactional
    def delete(ContentSource contentSource) {

	if (contentSource == null) {
	    transactionStatus.setRollbackOnly()
	    render status: NOT_FOUND
	    return
	}
	deleteContentTargets(contentSource)
	contentSource.delete flush:true

	render status: NO_CONTENT
    }
}

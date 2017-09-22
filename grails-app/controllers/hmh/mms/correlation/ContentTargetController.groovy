package hmh.mms.correlation

import static org.springframework.http.HttpStatus.*
import grails.transaction.Transactional

@Transactional(readOnly = true)
class ContentTargetController {

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond ContentTarget.list(params), model:[contentTargetCount: ContentTarget.count()]
    }

    def show(ContentTarget contentTarget) {
        respond contentTarget
    }

    @Transactional
    def save(ContentTarget contentTarget) {
        if (contentTarget == null) {
            transactionStatus.setRollbackOnly()
            render status: NOT_FOUND
            return
        }

        if (contentTarget.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond contentTarget.errors, view:'create'
            return
        }

        contentTarget.save flush:true

        respond contentTarget, [status: CREATED, view:"show"]
    }

    @Transactional
    def update(ContentTarget contentTarget) {
        if (contentTarget == null) {
            transactionStatus.setRollbackOnly()
            render status: NOT_FOUND
            return
        }

        if (contentTarget.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond contentTarget.errors, view:'edit'
            return
        }

        contentTarget.save flush:true

        respond contentTarget, [status: OK, view:"show"]
    }

    @Transactional
    def delete(ContentTarget contentTarget) {

        if (contentTarget == null) {
            transactionStatus.setRollbackOnly()
            render status: NOT_FOUND
            return
        }

        contentTarget.delete flush:true

        render status: NO_CONTENT
    }
    

}

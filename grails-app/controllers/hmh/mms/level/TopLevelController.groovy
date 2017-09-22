package hmh.mms.level

import static org.springframework.http.HttpStatus.*
import grails.transaction.Transactional

@Transactional(readOnly = true)
class TopLevelController {

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond TopLevel.list(params), model:[topLevelCount: TopLevel.count()]
    }

    def show(TopLevel topLevel) {
        respond topLevel
    }

    @Transactional
    def save(TopLevel topLevel) {
        if (topLevel == null) {
            transactionStatus.setRollbackOnly()
            render status: NOT_FOUND
            return
        }

        if (topLevel.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond topLevel.errors, view:'create'
            return
        }

        topLevel.save flush:true
        respond topLevel, [status: CREATED, view:"show"]
    }

    @Transactional
    def update(TopLevel topLevel) {
        if (topLevel == null) {
            transactionStatus.setRollbackOnly()
            render status: NOT_FOUND
            return
        }

        if (topLevel.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond topLevel.errors, view:'edit'
            return
        }

        topLevel.save flush:true
        respond topLevel, [status: OK, view:"show"]
    }

    @Transactional
    def delete(TopLevel topLevel) {

        if (topLevel == null) {
            transactionStatus.setRollbackOnly()
            render status: NOT_FOUND
            return
        }

        topLevel.delete flush:true

        render status: NO_CONTENT
    }
	
}
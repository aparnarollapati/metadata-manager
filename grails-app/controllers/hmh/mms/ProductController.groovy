package hmh.mms

import static org.springframework.http.HttpStatus.*
import grails.transaction.Transactional

@Transactional(readOnly = true)
class ProductController {

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond Product.list(params), model:[productCount: Product.count()]
    }

    def show(Product product) {
        respond product
    }

    @Transactional
    def save(Product product) {
        if (product == null) {
            transactionStatus.setRollbackOnly()
            render status: NOT_FOUND
            return
        }

        if (product.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond product.errors, view:'create'
            return
        }

        product.save flush:true
        respond product, [status: CREATED, view:"show"]
    }

    @Transactional
    def update(Product product) {
	
        if (product == null) {
            transactionStatus.setRollbackOnly()
            render status: NOT_FOUND
            return
        }

        if (product.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond product.errors, view:'edit'
            return
        }

        product.save flush:true
        respond product, [status: OK, view:"show"]
    }

    @Transactional
    def delete(Product product) {

        if (product == null) {
            transactionStatus.setRollbackOnly()
            render status: NOT_FOUND
            return
        }

        product.delete flush:true

        render status: NO_CONTENT
    }
}
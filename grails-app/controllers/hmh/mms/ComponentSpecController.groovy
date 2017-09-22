package hmh.mms

import static org.springframework.http.HttpStatus.*
import grails.transaction.Transactional

@Transactional(readOnly = true)
class ComponentSpecController {

	static responseFormats = ['json', 'xml']
	static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

	def index(Integer max) {
		params.max = Math.min(max ?: 10, 100)
		respond ComponentSpec.list(params), model:[componentSpecCount: ComponentSpec.count()]
	}

	def show(ComponentSpec componentSpec) {
		respond componentSpec
	}

	@Transactional
	def save(ComponentSpec componentSpec) {
		if (componentSpec == null) {
			transactionStatus.setRollbackOnly()
			render status: NOT_FOUND
			return
		}

		if (componentSpec.hasErrors()) {
			transactionStatus.setRollbackOnly()
			respond componentSpec.errors, view:'create'
			return
		}

		componentSpec.save flush:true

		respond componentSpec, [status: CREATED, view:"show"]
	}

	@Transactional
	def update(ComponentSpec componentSpec) {
		if (componentSpec == null) {
			transactionStatus.setRollbackOnly()
			render status: NOT_FOUND
			return
		}

		if (componentSpec.hasErrors()) {
			transactionStatus.setRollbackOnly()
			respond componentSpec.errors, view:'edit'
			return
		}

		componentSpec.save flush:true

		respond componentSpec, [status: OK, view:"show"]
	}

	@Transactional
	def delete(ComponentSpec componentSpec) {

		if (componentSpec == null) {
			transactionStatus.setRollbackOnly()
			render status: NOT_FOUND
			return
		}

		removeFromProduct(componentSpec)

		componentSpec.delete flush:true

		render status: NO_CONTENT
	}


	/**
	 * If a Product holds reference to this ComponentSpec then remove the association before deleting the ComponentSpec
	 * @return
	 */
	def removeFromProduct(def ComponentSpecInstance){

		def productList = Product.where{components{id==ComponentSpecInstance.id}}.list()

		productList.each{ productInstance ->

			productInstance.removeFromComponents(ComponentSpecInstance)
		}
	}


}

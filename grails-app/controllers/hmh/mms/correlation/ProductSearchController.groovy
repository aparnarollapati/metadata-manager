package hmh.mms.correlation




import grails.rest.*
import grails.converters.*
import hmh.mms.*

class ProductSearchController {

	def productSearchService

	def index() { }


	def productDetails(Product product) {

		if(!product) {
			response.sendError(404, 'No product specified')
		}

		Map data = [product: product.id, content: productSearchService.findContent(product)]

		withFormat {
			json { render data as JSON }
			xml { render data as XML }
		}
	}




	def productComponents(Product product){

		if(!product) {
			response.sendError(404, 'No product specified')
		}

		Map data = [product: product.id, components: productSearchService.listComponents(product)]

		withFormat {
			json { render data as JSON }
			xml { render data as XML }
		}


	}
}



package hmh.mms.correlation

import grails.transaction.Transactional
import hmh.mms.Product
import hmh.mms.Content
import hmh.mms.ComponentSpec

@Transactional
class ProductSearchService {

	def findContent(Product productInstance) {

		def content = Content.where{product.isbn == productInstance.isbn}.projections {

			property ('id')
			property ('displayTitle')
			property ('component')


		}.list(sort: 'displayTitle')


	}




	def listComponents(Product productInstance){

		def components = productInstance.components

	}
}

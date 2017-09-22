package hmh.mms


class ProductInterceptor {

	ProductInterceptor(){
		match(controller:"product", action:"delete")
	}

	boolean before() {

		// get a list of content using the Instructional Segment being deleted
		def productId = params.getIdentifier()

		def productComponents = Product.where{id==productId}.get()?.components

		if (productComponents){

			def contentUsingProduct = Content.where{component{id in productComponents.id}}.list()

			if(contentUsingProduct){

				log.info"Product: ${productId} is being used by the following Resources : ${contentUsingProduct.hmhId}"
				render(status: 405, text: "This Product is being referenced by ${contentUsingProduct.size()} Resources: ${contentUsingProduct.hmhId}")

				return false
			}

		}

		true

	}

	boolean after() { true }

	void afterView() {

	}
}

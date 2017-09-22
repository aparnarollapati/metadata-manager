package hmh.mms


class ComponentSpecInterceptor {

	ComponentSpecInterceptor(){
		match(controller:"componentSpec", action:"delete")
	}

	boolean before() {

		// get a list of content using the Strand being deleted
		def componentSpecId = params.getIdentifier()
		def contentUsingComponentSpec = Content.where{component{id==componentSpecId}}.list()

		if(contentUsingComponentSpec){

			log.info"Component-Spec: ${componentSpecId} is being used by the following Resources : ${contentUsingComponentSpec.hmhId}"

			render(status: 405, text: "This Component is being referenced by ${contentUsingComponentSpec.size()} Resources: ${contentUsingComponentSpec.hmhId}")

			return false
		}

		true

	}

	boolean after() { true }

	void afterView() {

	}
}

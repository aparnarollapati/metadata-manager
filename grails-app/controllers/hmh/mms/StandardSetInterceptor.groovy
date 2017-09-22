package hmh.mms


class StandardSetInterceptor {
	StandardSetInterceptor() {
		match(controller:"standardSet", action:"delete")
	}
	
	boolean before() {

		// get a list of content using the StanadrdSet being deleted
		def standardSetId = params.getIdentifier()
		def contentUsingStandardSet = Content.where{edStandards{standardSet.id==standardSetId}}.list()

		if(contentUsingStandardSet){

			log.info"StandardSet: ${standardSetId} is being used by the following Resources : ${contentUsingStandardSet.hmhId}"

			render(status: 405, text: "This StandardSet is being referenced by ${contentUsingStandardSet.size()} Resources: ${contentUsingStandardSet.hmhId}")

			return false
		}

		true

	}

	boolean after() { true }

	void afterView() {
		// no-op
	}
}

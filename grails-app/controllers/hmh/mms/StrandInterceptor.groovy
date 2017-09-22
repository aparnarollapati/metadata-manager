package hmh.mms


class StrandInterceptor {

	def messageSource

	StrandInterceptor() {
		match(controller:"strand", action:"delete")

	}

	boolean before() {

		// get a list of content using the Strand being deleted
		def strandId = params.getIdentifier()
		def contentUsingStrand = Content.where{strand{id==strandId}}.list()

		if(contentUsingStrand){

			log.info"Strand: ${strandId} is being used by the following Resources : ${contentUsingStrand.hmhId}"

			render(status: 405, text: "This Strand is being referenced by ${contentUsingStrand.size()} Resources: ${contentUsingStrand.hmhId}")

			return false
		}

		true
	}

	boolean after() { true }

	void afterView() {

	}


}

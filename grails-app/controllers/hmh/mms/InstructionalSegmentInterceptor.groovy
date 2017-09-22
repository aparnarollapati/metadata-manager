package hmh.mms


class InstructionalSegmentInterceptor {


	InstructionalSegmentInterceptor() {
		match(controller:"instructionalSegment", action:"delete")

	}

	boolean before() {

		// get a list of content using the Instructional Segment being deleted
		def segmentId = params.getIdentifier()
		def contentUsingSegment = Content.where{segment{id==segmentId}}.list()

		if(contentUsingSegment){

			log.info"Instructional Segment: ${segmentId} is being used by the following Resources : ${contentUsingSegment.hmhId}"

			render(status: 405, text: "This Segment is being referenced by ${contentUsingSegment.size()} Resources: ${contentUsingSegment.hmhId}")

			return false
		}

		true
	}

	boolean after() { true }

	void afterView() {

	}
}

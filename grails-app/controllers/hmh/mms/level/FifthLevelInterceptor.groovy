package hmh.mms.level


class FifthLevelInterceptor {

	FifthLevelInterceptor(){
		match(controller:"fifthLevel", action:"delete")
	}


	boolean before() {

		def fifthLevelId = params.getIdentifier()

		def fifthLevelContent = FifthLevel.where{id==fifthLevelId}.get()?.content
		def fifthLevelLessonPlans = FifthLevel.where{id==fifthLevelId}.get()?.lessonPlans


		if (fifthLevelContent){

			log.info"FifthLevel: ${fifthLevelId} contains the following Resources : ${fifthLevelContent.hmhId}"
			render(status: 405, text: "This Level is being referenced by ${fifthLevelContent.size()} Resources: ${fifthLevelContent.hmhId}")

			return false
		}

		if (fifthLevelLessonPlans){

			log.info"FifthLevel: ${fifthLevelId} contains the following Lesson-Plans : ${fifthLevelLessonPlans.id}"
			render(status: 405, text: "This Level contains ${fifthLevelLessonPlans.size()} Lesson Plans: ${fifthLevelLessonPlans.id}")

			return false
		}

		true

	}

	boolean after() { true }

	void afterView() {

	}
}

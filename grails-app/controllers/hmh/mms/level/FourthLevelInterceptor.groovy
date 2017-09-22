package hmh.mms.level


class FourthLevelInterceptor {

	FourthLevelInterceptor(){
		match(controller:"fourthLevel", action:"delete")
	}


	boolean before() {

		def fourthLevelId = params.getIdentifier()

		def fourthLevelContent = FourthLevel.where{id==fourthLevelId}.get()?.content
		def fourthLevelLessonPlans = FourthLevel.where{id==fourthLevelId}.get()?.lessonPlans
		def fifthLevelInstances = FourthLevel.where{id==fourthLevelId}.get()?.fifthLevels

		if (fourthLevelContent){

			log.info"FourthLevel: ${fourthLevelId} contains the following Resources : ${fourthLevelContent.hmhId}"
			render(status: 405, text: "This Level is being referenced by ${fourthLevelContent.size()} Resources: ${fourthLevelContent.hmhId}")

			return false
		}

		if (fourthLevelLessonPlans){

			log.info"FourthLevel: ${fourthLevelId} contains the following Lesson-Plans : ${fourthLevelLessonPlans.id}"
			render(status: 405, text: "This Level contanins ${fourthLevelLessonPlans.size()} Lesson Plans: ${fourthLevelLessonPlans.id}")

			return false
		}

		if (fifthLevelInstances){

			log.info"FourthLevel: ${fourthLevelId} contains the following Fifth-Level Instances : ${fifthLevelInstances.id}"
			render(status: 405, text: "This Level contains ${fifthLevelInstances.size()} Second-Level Instances: ${fifthLevelInstances.id}")

			return false
		}

		true

	}

	boolean after() { true }

	void afterView() {

	}
}

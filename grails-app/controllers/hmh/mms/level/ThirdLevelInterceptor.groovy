package hmh.mms.level


class ThirdLevelInterceptor {

	ThirdLevelInterceptor(){
		match(controller:"thirdLevel", action:"delete")
	}


	boolean before() {

		def thirdLevelId = params.getIdentifier()

		def thirdLevelContent = ThirdLevel.where{id==thirdLevelId}.get()?.content
		def thirdLevelLessonPlans = ThirdLevel.where{id==thirdLevelId}.get()?.lessonPlans
		def fourthLevelInstances = ThirdLevel.where{id==thirdLevelId}.get()?.fourthLevels

		if (thirdLevelContent){

			log.info"ThirdLevel: ${thirdLevelId} contains the following Resources : ${thirdLevelContent.hmhId}"
			render(status: 405, text: "This Level is being referenced by ${thirdLevelContent.size()} Resources: ${thirdLevelContent.hmhId}")

			return false
		}

		if (thirdLevelLessonPlans){

			log.info"ThirdLevel: ${thirdLevelId} contains the following Lesson-Plans : ${thirdLevelLessonPlans.id}"
			render(status: 405, text: "This Level contains ${thirdLevelLessonPlans.size()} Lesson Plans: ${thirdLevelLessonPlans.id}")

			return false
		}

		if (fourthLevelInstances){

			log.info"ThirdLevel: ${thirdLevelId} contains the following Fourth-Level Instances : ${fourthLevelInstances.id}"
			render(status: 405, text: "This Level contains ${fourthLevelInstances.size()} Fourth-Level Instances: ${fourthLevelInstances.id}")

			return false
		}

		true

	}

	boolean after() { true }

	void afterView() {

	}
}

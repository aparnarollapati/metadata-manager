package hmh.mms.level


class SecondLevelInterceptor {

	SecondLevelInterceptor(){
		match(controller:"secondLevel", action:"delete")
	}


	boolean before() {

		def secondLevelId = params.getIdentifier()

		def secondLevelContent = SecondLevel.where{id==secondLevelId}.get()?.content
		def secondLevelLessonPlans = SecondLevel.where{id==secondLevelId}.get()?.lessonPlans
		def thirdLevelInstances = SecondLevel.where{id==secondLevelId}.get()?.thirdLevels

		if (secondLevelContent){

			log.info"SecondLevel: ${secondLevelId} contains the following Resources : ${secondLevelContent.hmhId}"
			render(status: 405, text: "This Level is being referenced by ${secondLevelContent.size()} Resources: ${secondLevelContent.hmhId}")

			return false
		}

		if (secondLevelLessonPlans){

			log.info"SecondLevel: ${secondLevelId} contains the following Lesson-Plans : ${secondLevelLessonPlans.id}"
			render(status: 405, text: "This Level contains ${secondLevelLessonPlans.size()} Lesson Plans: ${secondLevelLessonPlans.id}")

			return false
		}

		if (thirdLevelInstances){

			log.info"SecondLevel: ${secondLevelId} contains the following Third-Level Instances : ${thirdLevelInstances.id}"
			render(status: 405, text: "This Level contains ${thirdLevelInstances.size()} Third-Level Instances: ${thirdLevelInstances.id}")

			return false
		}

		true

	}

	boolean after() { true }

	void afterView() {
		
	}
}

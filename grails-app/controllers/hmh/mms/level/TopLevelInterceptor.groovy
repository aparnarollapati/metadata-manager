package hmh.mms.level


class TopLevelInterceptor {

	TopLevelInterceptor(){
		match(controller:"topLevel", action:"delete")
	}


	boolean before() {

		def topLevelId = params.getIdentifier()

		def topLevelContent = TopLevel.where{id==topLevelId}.get()?.content
		def topLevelLessonPlans = TopLevel.where{id==topLevelId}.get()?.lessonPlans
		def secondLevelInstances = TopLevel.where{id==topLevelId}.get()?.secondLevels

		if (topLevelContent){

			log.info"TopLevel: ${topLevelId} contains the following Resources : ${topLevelContent.hmhId}"
			render(status: 405, text: "This Level is being referenced by ${topLevelContent.size()} Resources: ${topLevelContent.hmhId}")

			return false
		}

		if (topLevelLessonPlans){

			log.info"TopLevel: ${topLevelId} contains the following Lesson-Plans : ${topLevelLessonPlans.id}"
			render(status: 405, text: "This Level contains ${topLevelLessonPlans.size()} Lesson Plans: ${topLevelLessonPlans.id}")

			return false
		}

		if (secondLevelInstances){

			log.info"TopLevel: ${topLevelId} contains the following Second-Level Instances : ${secondLevelInstances.id}"
			render(status: 405, text: "This Level contains ${secondLevelInstances.size()} Second-Level Instances: ${secondLevelInstances.id}")

			return false
		}

		true

	}

	boolean after() { true }

	void afterView() {

	}
}

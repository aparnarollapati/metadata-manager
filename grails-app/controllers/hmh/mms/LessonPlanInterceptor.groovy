package hmh.mms


class LessonPlanInterceptor {

	LessonPlanInterceptor() {
		match(controller:"lessonPlan", action:"delete")
	}

	boolean before() {

		// get a list of content using the Lesson-Plan being deleted
		def lessonPlanId = params.getIdentifier()
		def contentUsingLessonPlan = Content.where{lessonPlan{id==lessonPlanId}}.list()

		if(contentUsingLessonPlan){

			log.info"LessonPlan: ${lessonPlanId} is being used by the following Resources : ${contentUsingLessonPlan.hmhId}"

			render(status: 405, text: "This LessonPlan is being referenced by ${contentUsingLessonPlan.size()} Resources: ${contentUsingLessonPlan.hmhId}")

			return false
		}

		true

	}

	boolean after() { true }

	void afterView() {

	}
}

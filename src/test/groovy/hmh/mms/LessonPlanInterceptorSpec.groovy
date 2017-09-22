package hmh.mms


import grails.test.mixin.TestFor
import spock.lang.Specification

/**
 * See the API for {@link grails.test.mixin.web.ControllerUnitTestMixin} for usage instructions
 */
@TestFor(LessonPlanInterceptor)
class LessonPlanInterceptorSpec extends Specification {

	void "Test lessonPlan interceptor matching"() {
		when:"A request matches the interceptor"
		withRequest(controller:"lessonPlan", action:"delete")

		then:"The interceptor does match"
		interceptor.doesMatch()
	}


	void "Test lessonPlan NOT matching a Save action"() {
		when:"A request is made to the save action"
		withRequest(controller:"lessonPlan", action: "save")

		then:"The interceptor does not match"
		!interceptor.doesMatch()
	}


	void "Test lessonPlan NOT matching an Edit action"() {
		when:"A request is made to the edit action"
		withRequest(controller:"lessonPlan", action: "edit")

		then:"The interceptor does not match"
		!interceptor.doesMatch()
	}


	void "Test lessonPlan NOT matching an Update action"() {
		when:"A request is made to the Update action"
		withRequest(controller:"lessonPlan", action: "update")

		then:"The interceptor does not match"
		!interceptor.doesMatch()
	}
}

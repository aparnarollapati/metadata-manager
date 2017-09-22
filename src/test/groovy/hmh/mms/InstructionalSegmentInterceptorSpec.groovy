package hmh.mms


import grails.test.mixin.TestFor
import spock.lang.Specification

/**
 * See the API for {@link grails.test.mixin.web.ControllerUnitTestMixin} for usage instructions
 */
@TestFor(InstructionalSegmentInterceptor)
class InstructionalSegmentInterceptorSpec extends Specification {


	void "Test instructionalSegment interceptor matching the Delete action"() {
		when:"A request matches the interceptor delete action"
		withRequest(controller:"instructionalSegment", action:"delete")

		then:"The interceptor does match"
		interceptor.doesMatch()
	}


	void "Test instructionalSegment NOT matching a Save action"() {
		when:"A request is made to the save action"
		withRequest(controller:"instructionalSegment", action: "save")

		then:"The interceptor does not match"
		!interceptor.doesMatch()
	}


	void "Test instructionalSegment NOT matching an Edit action"() {
		when:"A request is made to the edit action"
		withRequest(controller:"instructionalSegment", action: "edit")

		then:"The interceptor does not match"
		!interceptor.doesMatch()
	}


	void "Test instructionalSegment NOT matching an Update action"() {
		when:"A request is made to the Update action"
		withRequest(controller:"instructionalSegment", action: "update")

		then:"The interceptor does not match"
		!interceptor.doesMatch()
	}
}

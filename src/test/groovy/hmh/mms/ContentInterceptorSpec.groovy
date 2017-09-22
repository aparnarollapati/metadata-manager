package hmh.mms


import grails.test.mixin.TestFor
import spock.lang.Specification

/**
 * See the API for {@link grails.test.mixin.web.ControllerUnitTestMixin} for usage instructions
 */
@TestFor(ContentInterceptor)
class ContentInterceptorSpec extends Specification {


	void "Test Content interceptor matching"() {
		when:"A request matches the interceptor"
		withRequest(controller:"content", action: "delete")

		then:"The interceptor does match"
		interceptor.doesMatch()
	}

	void "Test Content NOT matching a Save action"() {
		when:"A request is made to the save action"
		withRequest(controller:"content", action: "save")

		then:"The interceptor does not match"
		!interceptor.doesMatch()
	}


	void "Test Content NOT matching an Edit action"() {
		when:"A request is made to the edit action"
		withRequest(controller:"content", action: "edit")

		then:"The interceptor does not match"
		!interceptor.doesMatch()
	}


	void "Test Content NOT matching an Update action"() {
		when:"A request is made to the Update action"
		withRequest(controller:"content", action: "update")

		then:"The interceptor does not match"
		!interceptor.doesMatch()
	}
}

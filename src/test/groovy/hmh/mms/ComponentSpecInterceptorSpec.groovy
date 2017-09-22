package hmh.mms


import grails.test.mixin.TestFor
import spock.lang.Specification

/**
 * See the API for {@link grails.test.mixin.web.ControllerUnitTestMixin} for usage instructions
 */
@TestFor(ComponentSpecInterceptor)
class ComponentSpecInterceptorSpec extends Specification {


	void "Test componentSpec interceptor matching"() {
		when:"A request matches the interceptor"
		withRequest(controller:"componentSpec", action: "delete")

		then:"The interceptor does match"
		interceptor.doesMatch()
	}

	void "Test componentSpec NOT matching a Save action"() {
		when:"A request is made to the save action"
		withRequest(controller:"componentSpec", action: "save")

		then:"The interceptor does not match"
		!interceptor.doesMatch()
	}


	void "Test componentSpec NOT matching an Edit action"() {
		when:"A request is made to the edit action"
		withRequest(controller:"componentSpec", action: "edit")

		then:"The interceptor does not match"
		!interceptor.doesMatch()
	}


	void "Test componentSpec NOT matching an Update action"() {
		when:"A request is made to the Update action"
		withRequest(controller:"componentSpec", action: "update")

		then:"The interceptor does not match"
		!interceptor.doesMatch()
	}
}

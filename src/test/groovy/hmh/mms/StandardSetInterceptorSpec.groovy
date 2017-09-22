package hmh.mms


import grails.test.mixin.TestFor
import spock.lang.Specification

/**
 * See the API for {@link grails.test.mixin.web.ControllerUnitTestMixin} for usage instructions
 */
@TestFor(StandardSetInterceptor)
class StandardSetInterceptorSpec extends Specification {

void "Test standardSet interceptor matching"() {
		when:"A request matches the interceptor"
		withRequest(controller:"standardSet", action:"delete")

		then:"The interceptor does match"
		interceptor.doesMatch()
	}


	void "Test standardSet NOT matching a Save action"() {
		when:"A request is made to the save action"
		withRequest(controller:"standardSet", action: "save")

		then:"The interceptor does not match"
		!interceptor.doesMatch()
	}


	void "Test standardSet NOT matching an Edit action"() {
		when:"A request is made to the edit action"
		withRequest(controller:"standardSet", action: "edit")

		then:"The interceptor does not match"
		!interceptor.doesMatch()
	}


	void "Test standardSet NOT matching an Update action"() {
		when:"A request is made to the Update action"
		withRequest(controller:"standardSet", action: "update")

		then:"The interceptor does not match"
		!interceptor.doesMatch()
	}

}

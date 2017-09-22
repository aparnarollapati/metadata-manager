package hmh.mms


import grails.test.mixin.TestFor
import spock.lang.Specification

/**
 * See the API for {@link grails.test.mixin.web.ControllerUnitTestMixin} for usage instructions
 */
@TestFor(StrandInterceptor)
class StrandInterceptorSpec extends Specification {


	void "Test strand interceptor matching"() {
		when:"A request matches the interceptor"
		withRequest(controller:"strand", action:"delete")

		then:"The interceptor does match"
		interceptor.doesMatch()
	}


	void "Test strand NOT matching a Save action"() {
		when:"A request is made to the save action"
		withRequest(controller:"strand", action: "save")

		then:"The interceptor does not match"
		!interceptor.doesMatch()
	}


	void "Test strand NOT matching an Edit action"() {
		when:"A request is made to the edit action"
		withRequest(controller:"strand", action: "edit")

		then:"The interceptor does not match"
		!interceptor.doesMatch()
	}


	void "Test strand NOT matching an Update action"() {
		when:"A request is made to the Update action"
		withRequest(controller:"strand", action: "update")

		then:"The interceptor does not match"
		!interceptor.doesMatch()
	}

}

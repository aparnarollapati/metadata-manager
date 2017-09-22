package hmh.mms


import grails.test.mixin.TestFor
import spock.lang.Specification

/**
 * See the API for {@link grails.test.mixin.web.ControllerUnitTestMixin} for usage instructions
 */
@TestFor(ProductInterceptor)
class ProductInterceptorSpec extends Specification {


	void "Test product interceptor matching"() {
		when:"A request matches the interceptor"
		withRequest(controller:"product", action: "delete")

		then:"The interceptor does match"
		interceptor.doesMatch()
	}


	void "Test Product NOT matching a Save action"() {
		when:"A request is made to the Save action"
		withRequest(controller:"product", action: "save")

		then:"The interceptor does not match"
		!interceptor.doesMatch()
	}


	void "Test Product NOT matching an Edit action"() {
		when:"A request is made to the Edit action"
		withRequest(controller:"product", action: "edit")

		then:"The interceptor does not match"
		!interceptor.doesMatch()
	}


	void "Test Product NOT matching an Update action"() {
		when:"A request is made to the Update action"
		withRequest(controller:"product", action: "update")

		then:"The interceptor does not match"
		!interceptor.doesMatch()
	}

}

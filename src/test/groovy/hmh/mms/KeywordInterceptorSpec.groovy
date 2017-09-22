package hmh.mms


import grails.test.mixin.TestFor
import spock.lang.Specification

/**
 * See the API for {@link grails.test.mixin.web.ControllerUnitTestMixin} for usage instructions
 */
@TestFor(KeywordInterceptor)
class KeywordInterceptorSpec extends Specification {

	void "Test keyword interceptor matching"() {
		when:"A request matches the interceptor"
		withRequest(controller:"keyword", action: "save")

		then:"The interceptor does match"
		interceptor.doesMatch()
	}

}

package hmh.mms


import grails.test.mixin.TestFor
import spock.lang.Specification

/**
 * See the API for {@link grails.test.mixin.web.ControllerUnitTestMixin} for usage instructions
 */
@TestFor(CommonCartridgeKeywordInterceptor)
class CommonCartridgeKeywordInterceptorSpec extends Specification {

	void "Test commonCartridgeKeyword interceptor matching"() {
		when:"A request matches the interceptor"
		withRequest(controller:"commonCartridgeKeyword", action:"save")

		then:"The interceptor does match"
		interceptor.doesMatch()
	}
}

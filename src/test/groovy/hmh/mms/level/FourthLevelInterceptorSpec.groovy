package hmh.mms.level


import grails.test.mixin.TestFor
import spock.lang.Specification

/**
 * See the API for {@link grails.test.mixin.web.ControllerUnitTestMixin} for usage instructions
 */
@TestFor(FourthLevelInterceptor)
class FourthLevelInterceptorSpec extends Specification {

    def setup() {
    }

    def cleanup() {

    }

    void "Test fourthLevel interceptor matching"() {
        when:"A request matches the interceptor"
            withRequest(controller:"fourthLevel", action:"delete")

        then:"The interceptor does match"
            interceptor.doesMatch()
    }
}

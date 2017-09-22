package hmh.mms.level


import grails.test.mixin.TestFor
import spock.lang.Specification

/**
 * See the API for {@link grails.test.mixin.web.ControllerUnitTestMixin} for usage instructions
 */
@TestFor(FifthLevelInterceptor)
class FifthLevelInterceptorSpec extends Specification {

    def setup() {
    }

    def cleanup() {

    }

    void "Test fifthLevel interceptor matching"() {
        when:"A request matches the interceptor"
            withRequest(controller:"fifthLevel", action:"delete")

        then:"The interceptor does match"
            interceptor.doesMatch()
    }
}

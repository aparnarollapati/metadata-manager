package hmh.mms.level


import grails.test.mixin.TestFor
import spock.lang.Specification

/**
 * See the API for {@link grails.test.mixin.web.ControllerUnitTestMixin} for usage instructions
 */
@TestFor(ThirdLevelInterceptor)
class ThirdLevelInterceptorSpec extends Specification {

    def setup() {
    }

    def cleanup() {

    }

    void "Test thirdLevel interceptor matching"() {
        when:"A request matches the interceptor"
            withRequest(controller:"thirdLevel", action:"delete")

        then:"The interceptor does match"
            interceptor.doesMatch()
    }
}

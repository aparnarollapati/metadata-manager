package hmh.mms.level


import grails.test.mixin.TestFor
import spock.lang.Specification

/**
 * See the API for {@link grails.test.mixin.web.ControllerUnitTestMixin} for usage instructions
 */
@TestFor(SecondLevelInterceptor)
class SecondLevelInterceptorSpec extends Specification {

    def setup() {
    }

    def cleanup() {

    }

    void "Test secondLevel interceptor matching"() {
        when:"A request matches the interceptor"
            withRequest(controller:"secondLevel", action:"delete")

        then:"The interceptor does match"
            interceptor.doesMatch()
    }
}

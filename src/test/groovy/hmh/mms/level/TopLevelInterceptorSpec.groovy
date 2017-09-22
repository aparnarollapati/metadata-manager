package hmh.mms.level


import grails.test.mixin.TestFor
import spock.lang.Specification

/**
 * See the API for {@link grails.test.mixin.web.ControllerUnitTestMixin} for usage instructions
 */
@TestFor(TopLevelInterceptor)
class TopLevelInterceptorSpec extends Specification {
   

    void "Test topLevel interceptor matching"() {
        when:"A request matches the interceptor"
            withRequest(controller:"topLevel", action:"delete")

        then:"The interceptor does match"
            interceptor.doesMatch()
    }
}

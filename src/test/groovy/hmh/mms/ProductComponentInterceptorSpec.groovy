package hmh.mms


import grails.test.mixin.TestFor
import spock.lang.Specification

/**
 * See the API for {@link grails.test.mixin.web.ControllerUnitTestMixin} for usage instructions
 */
@TestFor(ProductComponentInterceptor)
class ProductComponentInterceptorSpec extends Specification {

    def setup() {
    }

    def cleanup() {

    }

    void "Test productComponent interceptor matching"() {
        when:"A request matches the interceptor"
            withRequest(controller:"product", action: "update")

        then:"The interceptor does match"
            interceptor.doesMatch()
    }
}

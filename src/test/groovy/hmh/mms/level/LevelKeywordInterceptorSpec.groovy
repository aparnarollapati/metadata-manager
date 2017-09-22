package hmh.mms.level


import grails.test.mixin.TestFor
import org.grails.web.json.JSONObject
import spock.lang.Specification

/**
 * See the API for {@link grails.test.mixin.web.ControllerUnitTestMixin} for usage instructions
 */
@TestFor(LevelKeywordInterceptor)
class LevelKeywordInterceptorSpec extends Specification {

	void "Test levelKeyword interceptor matching"() {
		when:"A request matches the interceptor"
		withRequest(controller:"levelKeyword", action: "save")

		then:"The interceptor does match"
		interceptor.doesMatch()
	}



	//getRequestLevelKey
	@spock.lang.Unroll("Request Map: #requestMapValue returns the expected #expectedLevelType")
	def "Helper Method: get LevelType from Map"(){

		given: "A test http request Map"
		def requestMap = requestMapValue

		when: "The Interceptor calls the get-Request-level-Key"
		def returnedLevelType = interceptor.getRequestLevelKey(requestMap)

		then: "The expected String is returned"
		returnedLevelType == expectedLevelType

		where:
		requestMapValue 														|| expectedLevelType
		["topLevel": "topLevel", keyword: "s1,s2"] as JSONObject				|| "topLevel"
		["secondLevel": "secondLevel", keyword: "s1,s2"] as JSONObject			|| "secondLevel"
		["thirdLevel": "thirdLevel", keyword: "s6,s2"] as JSONObject			|| "thirdLevel"
		["fourthLevel": "fourthLevel", keyword: "s6,s2"] as JSONObject			|| "fourthLevel"
		["fifthLevel": "fifthLevel", keyword: "s1,s2,as.5"] as JSONObject		|| "fifthLevel"

	}

}

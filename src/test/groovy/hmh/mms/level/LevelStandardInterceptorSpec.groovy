package hmh.mms.level


import grails.test.mixin.TestFor
import org.grails.web.json.JSONObject
import spock.lang.Specification

/**
 * See the API for {@link grails.test.mixin.web.ControllerUnitTestMixin} for usage instructions
 */
@TestFor(LevelStandardInterceptor)
class LevelStandardInterceptorSpec extends Specification {


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
		["topLevel": "topLevel", standard: "s1,s2"] as JSONObject				|| "topLevel"
		["secondLevel": "secondLevel", standard: "s1,s2"] as JSONObject			|| "secondLevel"
		["thirdLevel": "thirdLevel", standard: "s6,s2"] as JSONObject			|| "thirdLevel"
		["fourthLevel": "fourthLevel", standard: "s6,s2"] as JSONObject			|| "fourthLevel"
		["fifthLevel": "fifthLevel", standard: "s1,s2,as.5"] as JSONObject		|| "fifthLevel"

	}



	//getStandardsList
	@spock.lang.Unroll("CSV List: '#commaSeparatedString' is correctly parsed into a Set of objects = #expectedParsedSet")
	def "Helper Method: convert CSV String into a Set of objects"(){

		given: "A Standard Code or a CSV List of codes"
		def stringToBeParsed = commaSeparatedString

		when: "The method returns a Set of parsed Strings"
		def returnedList = interceptor.getStandardsList(stringToBeParsed)

		then: "The returned list equals the expected parsed set"
		returnedList == expectedParsedSet

		where:
		commaSeparatedString 		|| expectedParsedSet
		"a1,a2,a3,a4,a5"			|| ['a1','a2','a3','a4','a5'] as Set
		"a1,a1,a2,a3,a4"			|| ['a1','a2','a3','a4'] as Set
		","							|| [] as Set
		"a1 "						|| ['a1'] as Set
		" a1WithWhiteSpace "		|| ['a1WithWhiteSpace'] as Set
		" a1WithWhiteSpace ,a2  ,a3"|| ['a1WithWhiteSpace','a2','a3'] as Set
		",,,,,"						|| [] as Set
		"a1;a1;a2;a3;a4"			|| ['a1','a2','a3','a4'] as Set // semicolon

	}


	void "Test Levelstandard matching a Save action"() {
		when:"A request is made to the save action of Level Standard"
		withRequest(controller:"levelStandard", action: "save")

		then:"The interceptor matches"
		interceptor.doesMatch()
	}


}

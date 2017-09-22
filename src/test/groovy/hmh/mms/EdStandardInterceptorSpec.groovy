package hmh.mms


import grails.test.mixin.TestFor
import spock.lang.Specification

/**
 * See the API for {@link grails.test.mixin.web.ControllerUnitTestMixin} for usage instructions
 */
@TestFor(EdStandardInterceptor)
class EdStandardInterceptorSpec extends Specification {


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




	void "Test ED standard NOT matching the delete action"() {
		when:"A request is made to the delete action"
		withRequest(controller:"edStandard", action: "delete")

		then:"The interceptor does not matches"
		!interceptor.doesMatch()
	}

	void "Test ED standard matching a Save action"() {
		when:"A request is made to the save action"
		withRequest(controller:"edStandard", action: "save")

		then:"The interceptor matches"
		interceptor.doesMatch()
	}


	void "Test ED standard NOT matching an Edit action"() {
		when:"A request is made to the edit action"
		withRequest(controller:"edStandard", action: "edit")

		then:"The interceptor does not match"
		!interceptor.doesMatch()
	}


	void "Test ED standard NOT matching an Update action"() {
		when:"A request is made to the Update action"
		withRequest(controller:"edStandard", action: "update")

		then:"The interceptor does not match"
		!interceptor.doesMatch()
	}

}

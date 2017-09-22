package hmh.mms

import grails.test.mixin.TestFor
import spock.lang.Specification
import spock.lang.Ignore

/**
 * See the API for {@link grails.test.mixin.services.ServiceUnitTestMixin} for usage instructions
 */
@TestFor(AlchemyCsvGeneratorService)
class AlchemyCsvGeneratorServiceSpec extends Specification {



	//setVariablesBasedOnToolType
	@Ignore //TEST BROKE TODO FIX TEST
	@spock.lang.Unroll("validate Tool-Type #toolType with Schedulable= #setSchedulable and assignable= #setAssignable returns 'IsStudentAllow'= #columnA, 'resourceType'= #columnF, and dummy URL: #columnUri ")
	def "validate expected varibles"(){

		given: "A Content Instance"
		def schedulableValue = setSchedulable
		def assignableValue = setAssignable
		def content1 = new Content(schedulable: schedulableValue, assignable: assignableValue, uri: "/content")

		when: "setVariablesBasedOnToolType service method is called"
		def returnedList = service.setVariablesBasedOnToolType(toolType, content1)

		then: "The returned list is expected"
		returnedList == expectedList


		where:
		toolType    | setSchedulable | setAssignable 	| columnA 			| columnF 			| columnUri								||expectedList
		2 			|		false 	 |  false			|	"<blank>"		|	"<blank>"		| 	"<blank>"							||["","",""]
		2 			|		true 	 |  true			|	"34"			| 	"13"			| 	"<blank>"							||["34","13",""]
		2 			|		true 	 |  false			|	"34"			| 	"13"			| 	"<blank>"							||["34","13",""]
		2 			|		false 	 |  true			|	"34"			| 	"13"			| 	"<blank>"							||["34","13",""]
		4           |		true 	 |  true			|	"1"				|	"0"				| 	"<blank>"							||["1","0",""]
		5           |		true 	 |  true			|	"35"			|	"11"			| 	"/content"							||["35","11","/content"]
		6           |		true 	 |  true			|	"1"				|	"11"			| 	"/content"							||["1","11","/content"]
		7           |		true 	 |  true			|	"3"				|	"5"				| 	"/content"							||["3","5","/content"]
		8           |		true 	 |  true			|	"3"				|	"6"				| 	"/content"							||["3","6","/content"]
		9           |		true 	 |  true			|	"3"				|	"1"				| 	"/content"							||["3","1","/content"]
		10          |		true 	 |  true			|	"3"				|	"2"				| 	"/content"							||["3","2","/content"]
		11          |		true 	 |  true			|	"3"				|	"0"				| 	"/content"							||["3","0","/content"]
		12          |		true 	 |  true			|	"3"				|	"12"			| 	"/content"							||["3","12","/content"]
		13          |		true 	 |  true			|	"3"				|	"15"			| 	"/content"							||["3","15","/content"]
		16          |		true 	 |  true			|	"36"			|	"12"			| 	"/content"							||["36","12","/content"]
		17          |		true 	 |  true			|	"36"			|	"15"			| 	"/content"							||["36","15","/content"]
		0 			|		false 	 |  false			|	"<blank>"		|	"<blank>"		| 	"<blank>"							||["","",""] //Unsupported HMOF tool-type


	}

}

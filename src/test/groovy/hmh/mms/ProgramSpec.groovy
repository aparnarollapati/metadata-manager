package hmh.mms

import grails.test.mixin.TestFor
import spock.lang.Specification

/**
 * See the API for {@link grails.test.mixin.domain.DomainClassUnitTestMixin} for usage instructions
 */
@TestFor(Program)
class ProgramSpec extends Specification {


	@spock.lang.Unroll("validate on a Programs Second-Level-Scope. Type: '#type' should have returned #shouldBeValid")
	def "test ScondLevelScope type Validation"(){

		given: "A new Program"
		def program1 = new Program()

		and: "Setting a Second-Level-Scope to pramaterized #type"
		program1.secondLevelScope=type

		expect: "The field is validated and should be valid" // Trivial tests with the expect: block
		program1.validate(['secondLevelScope'])==shouldBeValid

		where:
		type	 	|shouldBeValid
		""		  	| true
		"Volume"	| true
		"Book"		| true
		"Unit"		| true
		"Collection"| true
		"Theme"		| true
		"Module"	| true
		"Chapter"	| true
		"Section"	| true
		"Grade"		| false
		null		| true
		"Lesson"	| true // now available as a second level scope
		"Week"		| false
		"Selection" | false
		"Day"		| false
		"collection"| false
		"uNiT" 		| false


	}


	@spock.lang.Unroll("validate on a Program Copyright Year. Year: #year should have returned #shouldBeValid")
	def "Validate copyright value"(){

		expect: // expect can be the only block in the test but it is recommended to use given: block for better readability
		new Program(copyrightYear:year).validate(['copyrightYear'])==shouldBeValid

		where:
		year	  |shouldBeValid
		0		  | false
		2007	  | false
		2015	  | true
		2016	  | true
		2020      | true
		2021	  | true
		2099	  | true
		3000      | false

	}


}

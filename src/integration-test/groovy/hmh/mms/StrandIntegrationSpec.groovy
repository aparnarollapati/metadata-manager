package hmh.mms


import grails.test.mixin.integration.Integration
import grails.transaction.*
import spock.lang.*

@Integration
@Rollback
class StrandIntegrationSpec extends Specification {


	@Shared
	def program1 = new Program(name:"Spock2020", state: "FL", copyrightYear:"2020", discipline:"Social Studies", code:"SS", platform:"HMOF", topLevelScope: "Grade",
	"secondLevelScope": "Module", "thirdLevelScope": "Lesson", "fourthLevelScope": null, "fifthLevelScope": null)


	@spock.lang.Unroll("Validate Strand with hierarchy: #hierarchy and title: '#title' to confirm validation was #anticipatedValid ")
	def "Testing Segment Object Creation and Program Association"(){ // what the test does

		given: "A new Strand"
		def strand1 = new Strand()

		and: "A set of values"
		strand1.hierarchy=hierarchy
		strand1.title=title

		when: "the Program instance is Validated" //stimulus phase "setting the scene"
		def isValidObject = program1.addToStrands(strand1).validate()

		then: "the objects is correctly flagged as valid or not" // assess phase
		isValidObject == anticipatedValid


		where:
		hierarchy 	| title 							|| anticipatedValid
		'1'			| "Core Instruction"				|| true
		'2'			| "Core Instruction"				|| true
		'3'			| "References"						|| true
		'3'			| "References"						|| true // should we prevent duplicate titles within the same program
		99			| "References"						|| true
		1002		| "Additional Resources"			|| false
		9999		| "Additional Resources"			|| false		
		'3'			| "not-a-valid-title"				|| false

	}

}

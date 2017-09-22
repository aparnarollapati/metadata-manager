package hmh.mms


import grails.test.mixin.integration.Integration
import grails.transaction.*
import spock.lang.*

@Integration
@Rollback
class SegmentIntegrationSpec extends Specification {

	@Shared
	def program1 = new Program(name:"Spock2020", state: "FL", copyrightYear:"2020", discipline:"Social Studies", code:"SS", platform:"HMOF", topLevelScope: "Grade",
	"secondLevelScope": "Module", "thirdLevelScope": "Lesson", "fourthLevelScope": null, "fifthLevelScope": null)


	@spock.lang.Unroll("Validate Instructional Segments with hierarchy: #hierarchy and title: '#title' to confirm validation was #anticipatedValid ")
	def "Testing Instructional Segments Object Creation and Program Association"(){ // what the test does

		given: "A new Segment"
		def segment1 = new InstructionalSegment()

		and: "A set of values"
		segment1.hierarchy=hierarchy
		segment1.title=title

		when: "the Program instance is Validated" //stimulus phase "setting the scene"
		def isValidObject = program1.addToSegments(segment1).validate()

		then: "the objects is correctly flagged as valid or not" // assess phase
		isValidObject == anticipatedValid


		where:
		hierarchy 	| title 							|| anticipatedValid
		'1'			| "Course-Level Resources"			|| true
		'2'			| "Module-Level Resources"			|| true
		'3'			| "Lesson-Level Resources"			|| true
		'3'			| "Lesson-Level Resources"			|| true // should we prevent duplicate titles within the same program
		99			| "Course-Level Resources"			|| true // exception passing in a String "99"
		1002		| "Course-Level Resources"			|| false
		9999		| "Course-Level Resources"			|| false
		//0			| "Course-Level Resources"			|| true // this works as in the Unit test
		'3'			| "not-a-valid-title"				|| false

	}



}

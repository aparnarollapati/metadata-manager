package hmh.mms


import grails.test.mixin.integration.Integration
import grails.transaction.*
import spock.lang.*

@Integration
@Rollback
@Narrative('''Various Spock Integration tests that shows some basic tests and more useful parameterized tests to check business logic regarding Scope and Sequence
			 and Custom Validators. 
				1 - Spock is a superset of JUNIT 
				2 - Follows a Given-When-Then code flow
				3 - Full Sentences describes what the test does''')
class ProgramIntegrationSpec extends Specification { // All Spock tests extend the Specification Class


	@Shared
	def programShared = new Program(name:"Spock2020", state: "FL", copyrightYear:"2020", discipline:"Social Studies", code:"SS", platform:"HMOF", topLevelScope: "Grade",
	"secondLevelScope": "Module", "thirdLevelScope": "Lesson", "fourthLevelScope": null, "fifthLevelScope": null)


	def "saving a Program Instance to the database"(){ // full sentence of what the test does

		given: "A brand new Program" //setup phase
		def program1 = programShared

		when: "the Program is saved" //stimulus phase
		program1.save()

		then: "it saved successfully and can be retrieved" // assess phase
		program1.errors.errorCount == 0
		program1.id !=null
		Program.get(program1.id).name == program1.name
	}

	def "Updating a Saved Program changes its Properties"(){

		given: "An existing Program"
		def existingProgram = programShared
		existingProgram.save(failOnError: true)

		when: "A property is changed"
		def foundProgram = Program.get(existingProgram.id)
		foundProgram.discipline = 'Reading and Language Arts'
		foundProgram.save(failOnError: true)

		then: "The change is reflected in the db"
		Program.get(existingProgram.id).discipline == 'Reading and Language Arts'


	}

	def "Saving a Program with invalid properties causes an error"(){

		given: "A Program which fails several field validations"
		def invalidProgram = new Program (name:" ", state: "FL", copyrightYear:"2020", discipline:"Social Studies", code:"SS", platform:"HMHONE", topLevelScope: "Grade",
		"secondLevelScope": "Module", "thirdLevelScope": "Lesson", "fourthLevelScope": null, "fifthLevelScope": null)

		when: "The Program is validated"
		invalidProgram.validate() // Instance is unsaved

		then:
		invalidProgram.hasErrors()
		null == invalidProgram.errors.getFieldError("name").rejectedValue // blank not allowed
		"HMHONE" == invalidProgram.errors.getFieldError("platform").rejectedValue // not in enumerator
		!invalidProgram.errors.getFieldError("discipline") // not an error

	}


	def "Adding products to a Program links Product instances to a Program"(){

		given: "A new Program"
		def program1 = programShared
		program1.save(failOnError : true)

		when: "Several products are added to the Program"
		program1.addToProducts(new Product("isbn":9787774567831, title:"US History beg to 1877 - MS"))
		program1.addToProducts(new Product("isbn":9787774567832, title:"Test title"))

		then: "The Program has 2 Products attached"
		2 == Program.get(program1.id).products.size()

	}

	// using @Unroll treats each scenario as a seperate test
	@spock.lang.Unroll("MMS can support: #program - Which follows the #secondLevel-#thirdLevel-#fourthLevel-#fifthLevel Scope and Sequence" )
	def "Testing Scope and Sequence for all existing HMH Digital Programs"(){ // what the test does

		given: "A new program Instance"
		def program1 = new Program()

		and: "A set of initial values" // accompanies the given: block as a semantic extension
		program1.name="Test Program name"
		program1.state="FL"
		program1.copyrightYear=2020
		program1.discipline="Social Studies"
		program1.code="SS"
		program1.platform="HMOF"
		program1.topLevelScope= "Grade"
		program1.secondLevelScope = secondLevel
		program1.thirdLevelScope = thirdLevel
		program1.fourthLevelScope = fourthLevel
		program1.fifthLevelScope = fifthLevel

		when: "the Program is saved" //stimulus phase
		program1.save()

		then: "it saved successfully without errors" // assess phase
		program1.errors.errorCount == 0

		where: // data tables
		secondLevel | thirdLevel 	| fourthLevel	 	| fifthLevel	| program
		"Unit"		|"Chapter"		|"Lesson"			|"Day"			|"Houghton Mifflin Science"
		"Unit"		|"Lesson"		|"Day"				|null			|"Science Fusion, Journeys, Math Expressions, Reflections"
		"Unit"		|"Chapter"		|"Section"			|"Day"			|"Biology, Holt Science & Technology,  American Anthem"
		"Unit"		|"Chapter"		|"Lesson"			|null			|"Go Math, HSP Math, Harcourt Language, Harcourt Horizons, Steck-Vaughn Gateway, SocialStudies"
		"Collection"|"Lesson"		|"Day"				|null			|"HMD Literature"
		"Theme"		|"Lesson"		|"Day"				|null			|"Storytown, Excursions"
		"Theme"		|"Week"			|"Day"				|null			|"Trophies, Splash into PreK, HM Reading"
		"Theme"		|"Selection"	|"Day"				|null			|"Medallion"
		"Chapter"	|"Section"		|"Day"				|null			|"Modern Chemistry, Physics, Chemistry, Environmental Science"
		"Theme"		|"Week"			|"Lesson"			|null			|"Literacy by Design"
		"Unit"		|"Week"			|"Lesson"			|null			|"On the Way to English"
		"Section"	|"Lesson"		|null				|null			|"Saxon Math"
		"Volume"	|"Chapter"		|"Lesson"			|"Day"			|"Math in Focus"
		"Chapter"	|"Lesson"		|"Day"				|null			|"Holt Literature and Language, Bien Dit!"
		"Unit"		|"Week"			|"Day"				|null			|"Write Source"
		"Unit"		|"Lesson"		|"Day"				|null			|"Avancemos"
		"Chapter"	|"Section"		|"Lesson"			|null			|"Burger Math, Pre-Algebra, Algebra 1, Geometry, Algebra 2, Pre-Calculus"
		"Chapter"	|"Lesson"		|null				|null			|"Algebra 1, Geometry, Algebra 2; Larson Math, Pre-Algebra, Pre-Calculus"
		"Theme"		|"Lesson"		|"Skill"			|null			|"Destination Math, Destination Reading, iTools, SOAR, MegaMath"
		"Theme"		|"Lesson"		|null				|null			|"Video"
		"Module"	|"Lesson"		|null				|null			|"SocialStudies2018"
		"Unit"		|"Module"		|null				|null			|"Requested-by-stakeholder"


	}

	@spock.lang.Unroll("Custom Validator #secondLevel-#thirdLevel-#fourthLevel-#fifthLevel returned #anticipatedValid with error code: '#errorCode'")
	def "Testing Custom Validators"(){ // what the test does

		given: "A new program Instance"
		def program1 = new Program()

		and: "A set of initial values"
		program1.name="Test Program name"
		program1.state="CA"
		program1.copyrightYear=2020
		program1.discipline="Social Studies"
		program1.code="SS"
		program1.platform="HMOF"
		program1.topLevelScope= "Grade"
		program1.secondLevelScope = secondLevel
		program1.thirdLevelScope = thirdLevel
		program1.fourthLevelScope = fourthLevel
		program1.fifthLevelScope = fifthLevel

		when: "the Program instance is validated" //stimulus phase "setting the scene"
		def isValidScope = program1.validate() // validate not saved

		then: "the Scope is correctly flagged as valid or not" // assess phase
		isValidScope == anticipatedValid

		and: "the appropriate error code is returned if scope is invalid"
		program1.errors.getFieldError(fieldInError)?.code == errorCode

		where:
		secondLevel | thirdLevel 	| fourthLevel	 	| fifthLevel	| anticipatedValid 	| fieldInError		| errorCode
		null		| "Chapter"		| "Lesson"			|"Day"			| false				| "thirdLevelScope"	| "higherlevel.scope.null"
		"Unit"		| null			| "Lesson"			|"Day"			| false				| "fourthLevelScope"| "higherlevel.scope.null"
		"Unit"		| "Chapter"		| null				|"Day"			| false				| "fifthLevelScope"	| "higherlevel.scope.null"
		null		| null			| null				|null			| true				| null				| null // Grade only Program
		"Unit"		| null			| null				|null			| true				| null				| null // To Second Level Program
		"Unit"		| "Chapter"		| null				|null			| true				| null				| null // To Third Level Program
		"Unit"		| "Chapter"		| "Lesson"			|null			| true				| null				| null
		"Chapter"	| "Chapter"		| "Lesson"			|"Day"			| false				| "thirdLevelScope"	| "higherlevel.scope.same"
		"Unit"		| "Lesson"		| "Lesson"			|"Day"			| false				| "fourthLevelScope"| "higherlevel.scope.same"
		"Unit"		| "Lesson"		| "Lesson"			|null			| false				| "fourthLevelScope"| "higherlevel.scope.same"
		"Unit"		| "Lesson"		| "Day"				|"Day"			| false				| "fifthLevelScope"	| "higherlevel.scope.same"
		"Section"	| "Chapter"		| "Section"			|null			| false				| "fourthLevelScope"| "higherlevel.scope.same"
		"Module"	| "Module"		| "Lesson"			|"Day"			| false				| "thirdLevelScope"	| "higherlevel.scope.same"

	}

}

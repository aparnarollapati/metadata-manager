package hmh.mms

import grails.test.mixin.TestFor
import grails.test.mixin.Mock
import spock.lang.Specification
import hmh.mms.level.*

/**
 * See the API for {@link grails.test.mixin.services.ServiceUnitTestMixin} for usage instructions
 */
@TestFor(LevelsService)
@Mock([Program, TopLevel, LevelKeyword, LevelStandard, Content, ComponentSpec, SecondLevel, ThirdLevel, FourthLevel, FifthLevel]) // mocking All Levels
class LevelsServiceSpec extends Specification {


	// getSecondLevelNumber
	@spock.lang.Unroll("Validate Second-Level '#scopeValue' returns the expected Level Number #expectedLevelNumber")
	def "validate getSecondLevelNumber method returns the expected Level Number"(){

		given: "A new Program Instance"
		def programInstance = new Program(secondLevelScope:scopeValue)

		when: "The getSecondLevelNumber Service method is called"
		def returnedLevelNumber = service.getSecondLevelNumber(programInstance)

		then: "The returned level number is expected #expectedLevelNumber"
		returnedLevelNumber == expectedLevelNumber

		where:
		scopeValue				||expectedLevelNumber
		"Volume" 				|| 1
		"Book"					|| 1
		"Unit"					|| 2
		"Collection"			|| 2
		"Theme"					|| 2
		"Module"				|| 3
		"Chapter"				|| 3
		"Section"				|| 4
		"NewScope"				|| 2

	}


	// getThirdLevelNumber
	@spock.lang.Unroll("Validate Third-Level '#scopeValue' returns the expected Level Number #expectedLevelNumber")
	def "validate getThirdLevelNumber method returns the expected Level Number"(){

		given: "A new Program Instance"
		def programInstance = new Program(thirdLevelScope:scopeValue)

		when: "The getThirdLevelNumber Service method is called"
		def returnedLevelNumber = service.getThirdLevelNumber(programInstance)

		then: "The returned level number is expected #expectedLevelNumber"
		returnedLevelNumber == expectedLevelNumber

		where:
		scopeValue				||expectedLevelNumber
		"Chapter"               || 3
		"Lesson"                || 5
		"Week"                  || 4
		"Selection"             || 5
		"Section"               || 4
		"Module"           	    || 3

	}
   // getFourthLevelNumber
	@spock.lang.Unroll("Validate Fourth-Level '#scopeValue' returns the expected Level Number #expectedLevelNumber")
	def "validate getFourthLevelNumber method returns the expected Level Number"(){

		given: "A new Program Instance"
		def programInstance = new Program(fourthLevelScope:scopeValue)
		
		when: "The getFourthLevelNumber Service method is called"
		def returnedLevelNumber = service.getFourthLevelNumber(programInstance)

		then: "The returned level number is expected #expectedLevelNumber"
		returnedLevelNumber == expectedLevelNumber

		where:
		scopeValue				||expectedLevelNumber		
		 "Lesson"                               || 5
		 "Day"                                  || 6
		 "Skill"                                || 6
		 "Section"                              || 4

	}
	// getFifthLevelNumber
	@spock.lang.Unroll("Validate Fifth-Level '#scopeValue' returns the expected Level Number #expectedLevelNumber")
	def "validate getFifthLevelNumber method returns the expected Level Number"(){

		given: "A new Program Instance"
		def programInstance = new Program(fifthLevelScope:scopeValue)
		
		when: "The getFifthLevelNumber Service method is called"
		def returnedLevelNumber = service.getFifthLevelNumber(programInstance)

		then: "The returned level number is expected #expectedLevelNumber"
		returnedLevelNumber == expectedLevelNumber

		where:
		scopeValue				||expectedLevelNumber
		 "Day"                                  || 6		

	}

	// getSecondLevelType
	def "validate getSecondLevelType method returns the expected LevelType"(){

		given: "A new Program Instance"
		def programInstance = new Program(secondLevelScope:"Collection")

		when: "The getSecondLevelType Service method is called"
		def returnedType = service.getSecondLevelType(programInstance)

		then: "ReturnedType returns the Programs Second-Levels Scope Value"
		returnedType == "Collection"

	}
    // getThirdLevelType
	def "validate getThirdLevelType method returns the expected LevelType"(){

		given: "A new Program Instance"
		def programInstance = new Program(thirdLevelScope:"Chapter")

		when: "The getThirdLevelType Service method is called"
		def returnedType = service.getThirdLevelType(programInstance)

		then: "ReturnedType returns the Programs Third-Levels Scope Value"
		returnedType == "Chapter"

	}
	
	// getFourthLevelType
	def "validate getFourthLevelType method returns the expected LevelType"(){

		given: "A new Program Instance"
		def programInstance = new Program(fourthLevelScope:"Lesson")

		when: "The getFourthLevelType Service method is called"
		def returnedType = service.getFourthLevelType(programInstance)

		then: "ReturnedType returns the Programs Fourth-Levels Scope Value"
		returnedType == "Lesson"

	}
	
	// getFifthLevelType
	def "validate getFifthLevelType method returns the expected LevelType"(){

		given: "A new Program Instance"
		def programInstance = new Program(fifthLevelScope:"Day")

		when: "The getFifthLevelType Service method is called"
		def returnedType = service.getFifthLevelType(programInstance)

		then: "ReturnedType returns the Programs Fifth-Levels Scope Value"
		returnedType == "Day"

	}

	// getLevelKeywords
	def "validate getLevelKeywords returns the expected keywords for a Top-Level Instance"(){

		given: "A Content Instance"
		def contentInstance = new Content()

		and: "A top-Level instance that has Content and a Keyword"
		def topLevelInstance = new TopLevel()
		topLevelInstance.addToContent(contentInstance)
		topLevelInstance.addToKeywords(keyword: "Journeys")
		topLevelInstance.addToKeywords(keyword: "test")

		when: "The getLevelKeywords Service method is called"
		def returnedKeywords = service.getLevelKeywords(contentInstance)

		then: "a Keywords ArrayList is returned with the expected value"
		returnedKeywords.size() == 2
		returnedKeywords.getClass() == java.util.ArrayList
		returnedKeywords[0] == "Journeys"
		returnedKeywords[1] == "test"

	}


	// getLevelStandards
	def "validate getLevelStandards method returns the expected standards"(){

		given: "A new Content instance"
		def contentInstance = new Content()
		def secondLevelInstance = new SecondLevel(hierarchy: 3)
		secondLevelInstance.addToStandards(standard: "T.E.S.T")
		secondLevelInstance.addToStandards(standard: "T.E.S.T") // duplicate
		secondLevelInstance.addToStandards(standard: "T.E.S.T2")
		secondLevelInstance.addToContent(contentInstance)

		when: "The getLevelStandards Service Method is called"
		def returnedScopeInfo = service.getLevelStandards(contentInstance)

		then: "returned list is the expected Standards"
		returnedScopeInfo == ["T.E.S.T", "T.E.S.T2"] as Set


	}
   // getScopeAndSequence
	def "validate getScopeAndSequence method returns the scope and sequence for a Program"(){

		given: "A new Program Instance"		
		def program = new Program(name:"Spock2020",discipline:"Social Studies",platform:"HMOF",state:"FL",code:"SS",copyrightYear:2099,topLevelScope:"Grade",secondLevelScope: "Module",thirdLevelScope: null,fourthLevelScope: null,fifthLevelScope: null).save()
				
		when: "The getScopeAndSequence Service Method is called"
		def returnedScopeInfo = service.getScopeAndSequence(program)
         
		then: "returned list is the expected scope and sequences"
		returnedScopeInfo == ['topLevelScope':'Grade', 'secondLevelScope':'Module']
	}


	// getFullLevelsMap 1 of 5
	def "validate that a contentInstance belonging to TopLevel Instance returns the correct Map"(){

		given: "A Content Instance"
		def topLevelInstance = new TopLevel()
		def contentInstance = new Content(topLevel:topLevelInstance)

		when: "The getFullLevelsMap method is called"
		def returnedMap = service.getFullLevelsMap(contentInstance)

		then: "The returned map is expected"
		returnedMap ==  [top:topLevelInstance, second:null, third: null, fourth: null, fifth:null]

	}


	// getFullLevelsMap 2 of 5
	def "validate that a contentInstance belonging to Second-Level-Instance returns the correct Map"(){

		given: "A Content Instance"
		def topLevelInstance = new TopLevel()
		def secondLevelInstance = new SecondLevel(topLevel: topLevelInstance)
		def contentInstance = new Content(secondLevel:secondLevelInstance) // content belongs to second-Level instance

		when: "The getFullLevelsMap method is called"
		def returnedMap = service.getFullLevelsMap(contentInstance)

		then: "The returned map is expected"
		returnedMap ==  [top:topLevelInstance, second:secondLevelInstance, third: null, fourth: null, fifth:null]

	}


	// getFullLevelsMap 3 of 5
	def "validate that a contentInstance belonging to Third-Level-Instance returns the correct Map"(){

		given: "A Content Instance"
		def topLevelInstance = new TopLevel()
		def secondLevelInstance = new SecondLevel(topLevel: topLevelInstance)
		def thirdLevelInstance = new ThirdLevel(secondLevel: secondLevelInstance)
		def contentInstance = new Content(thirdLevel:thirdLevelInstance) // content belongs to third-Level instance

		when: "The getFullLevelsMap method is called"
		def returnedMap = service.getFullLevelsMap(contentInstance)

		then: "The returned map is expected"
		returnedMap ==  [top:topLevelInstance, second:secondLevelInstance, third:thirdLevelInstance, fourth: null, fifth:null]

	}


	// getFullLevelsMap 4 of 5
	def "validate that a contentInstance belonging to Fourth-Level-Instance returns the correct Map"(){

		given: "A Content Instance"
		def topLevelInstance = new TopLevel()
		def secondLevelInstance = new SecondLevel(topLevel: topLevelInstance)
		def thirdLevelInstance = new ThirdLevel(secondLevel: secondLevelInstance)
		def fourthLevelInstance = new FourthLevel(thirdLevel: thirdLevelInstance)
		def contentInstance = new Content(fourthLevel:fourthLevelInstance) // content belongs to fourth-Level instance

		when: "The getFullLevelsMap method is called"
		def returnedMap = service.getFullLevelsMap(contentInstance)

		then: "The returned map is expected"
		returnedMap ==  [top:topLevelInstance, second:secondLevelInstance, third:thirdLevelInstance, fourth:fourthLevelInstance, fifth:null]

	}


	// getFullLevelsMap 5 of 5
	def "validate that a contentInstance belonging to Fifth-Level-Instance returns the correct Map"(){

		given: "A Content Instance"
		def topLevelInstance = new TopLevel()
		def secondLevelInstance = new SecondLevel(topLevel: topLevelInstance)
		def thirdLevelInstance = new ThirdLevel(secondLevel: secondLevelInstance)
		def fourthLevelInstance = new FourthLevel(thirdLevel: thirdLevelInstance)
		def fifthLevelInstance = new FifthLevel(fourthLevel: fourthLevelInstance)
		def contentInstance = new Content(fifthLevel:fifthLevelInstance) // content belongs to fifth-Level instance

		when: "The getFullLevelsMap method is called"
		def returnedMap = service.getFullLevelsMap(contentInstance)

		then: "The returned map is expected"
		returnedMap ==  [top:topLevelInstance, second:secondLevelInstance, third:thirdLevelInstance, fourth:fourthLevelInstance, fifth:fifthLevelInstance]

	}

}

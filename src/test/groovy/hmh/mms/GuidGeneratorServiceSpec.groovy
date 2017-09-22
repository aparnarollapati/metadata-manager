package hmh.mms

import grails.test.mixin.TestFor
import spock.lang.Specification

/**
 * See the API for {@link grails.test.mixin.services.ServiceUnitTestMixin} for usage instructions
 */
@TestFor(GuidGeneratorService)
class GuidGeneratorServiceSpec extends Specification {



	@spock.lang.Unroll("validate '#programName' generates the expected acronymn: #expectedAcronym")
	def "validate expected Program Acronym code"(){

		given: "A Program Name Value"
		def programNameValue = programName

		when: "Guid-Service method is called"
		def programAcronymn = service.createProgramCode(programNameValue)

		then: "The generated program acronymn is expected"
		programAcronymn == expectedAcronym

		where:
		programName	 					||expectedAcronym
		"Journeys2014"		  			|| "JY"
		"Journeys2017"					|| "JY"
		"Journeys"						|| "JY"
		"Senderos"						|| "SN"
		"Senderos2020"					|| "SN"
		"Science Fusion"				|| "SCI"
		"ScienceFusion"					|| "SCI"
		"ScienceFusion2017"				|| "SCI"
		"GoMath"						|| "GM"
		"GoMath2020"					|| "GM"
		"GoMathTexas"					|| "GM"
		"High School Math"				|| "HSM"
		"HighSchoolMath"				|| "HSM"
		"High-School-Math"				|| "HSM"
		"HighSchoolMath2020"			|| "HSM"
		"Collections"					|| "LT"
		"Collections2017"				|| "LT"
		"HMHCollections2017"			|| "LT"
		"MathExpressions"				|| "MX"
		"EscalateEnglish"				|| "ESC"
		"FamilyEngagement"				|| "FE"
		"FamilyEngagement2020"			|| "FE"
		"HighSchoolScience"				|| "HSS"
		"HighSchoolBiology"				|| "HSB"
		"HighSchoolPhysics"				|| "HSP"
		"HighSchoolChemistry"			|| "HSC"
		"OnOurWayToEnglish"				|| "OWE"
		"Visual Math"					|| "VH"
		"SocialStudies2020"				|| "SS"

	}


	@spock.lang.Unroll("validate '#programName' generates the expected default 2 letter acronymn: #expectedAcronym")
	def "validate generateTwoDigitProgramCode method"(){

		given: "A Program Name Value"
		def programNameValue = programName

		when: "Guid-Service method is called"
		def programAcronymn = service.generateTwoDigitProgramCode(programNameValue)

		then: "The generated default program acronymn is expected"
		programAcronymn == expectedAcronym

		where:
		programName	 					||expectedAcronym
		"NewProgram2030"		  		|| "NM"
		"New Program"					|| "NM"
		"HMH"							|| "HH"
		"test-2-go!"					|| "TO"
		"t1"							|| "HMH"
		"t!G86-2019"					|| "TG"
		"NotJourneys"					|| "NS"
		""								|| "HMH"

	}



	@spock.lang.Unroll("validate '#copyrightYear' generates the expected #expectedYY")
	def "validate expected 2 digit Copyright Year"(){

		given: "A Copyright year Value in YYYY"
		def copyrightYearValue = copyrightYear

		when: "Guid-Service method is called to extract YY digits"
		def extractedYearDigits = service.extractYearDigits(copyrightYearValue)

		then: "The generated YY digits are expected"
		extractedYearDigits == expectedYY

		where:
		copyrightYear	 		||expectedYY
		"2014"		  			|| "14"
		"2017"					|| "17"
		"2020"					|| "20"
		"2030"					|| "30"

	}


	// Only English and Spanish is requested to be supported
	@spock.lang.Unroll("validate '#languageCode' generates the expected symbol: #expectedLanguageSymbol")
	def "validate createLanguageLetter Service method"(){

		given: "A Language Code"
		def languageCodeValue = languageCode

		when: "Guid-Service method is called to generate the Language Symbol"
		def languageSymbol = service.createLanguageLetter(languageCodeValue)

		then: "The generated Symbol is expected"
		languageSymbol == expectedLanguageSymbol

		where:
		languageCode	 		||expectedLanguageSymbol
		"en-US"		  			|| "E"
		"es-419"				|| "S"
		"other"					|| "O"
		"ES"					|| "S"
		"es-US"					|| "S"

	}


	//createComponentCode
	@spock.lang.Unroll("validate '#componentName' generates the expected Component-Code: #expectedAcronym")
	def "validate createComponentCode method"(){

		given: "A Component Value"
		def componentNameValue = componentName

		when: "Guid-Service method is called"
		def componentAcronymn = service.createComponentCode(componentNameValue)

		then: "The generated component acronymn is expected"
		componentAcronymn == expectedAcronym

		where:
		componentName	 																||expectedAcronym
		"Student Edition"		  														|| "ESE"
		"Interactive Student Edition"		  											|| "ESE"
		"Math in Focus Student Edition Volume A"										|| "ESE"
		"Student Edition Pages"															|| "ESE"
		"Science Fusion Electronic Student Edition (eSE)-Life"							|| "ESE"
		"Spanish GO Math! Student Edition"												|| "ESE"
		"Texas GO Math! Response to Intervention Tier 1 Student Edition"				|| "ESE"
		"Electronic Student Edition (eSE)"												|| "ESE"
		"Student Edition (Spanish)"														|| "ESE"
		"Excursions Student eBook"														|| "ESE"
		"Student eBook"																	|| "ESE"
		"Teacher View of Interactive Student Edition"									|| "ETE"
		"Online ISAT Preparation & Standards Practice (Teacher Edition)"				|| "ETE"
		"Texas GO Math! Teacher Edition"												|| "ETE"
		"Texas GO Math! Response to Intervention Tier 1-2-3 Teacher Edition"			|| "ETE"
		"Tennessee Test Power Teacher's Edition"										|| "ETE"
		"Lab Manuals Teacher Edition"													|| "ETE"
		"Math in Focus Teacher eBook"													|| "ETE"
		"GO Math! Florida Common Core Reteach Book (SE)"								|| "EBK"
		"Teacher eBook"																	|| "ETE"
		"GO Math! Enrich Book"															|| "EBK"
		"Think Math! Lesson Activity Book"												|| "EBK"
		"eBook"																			|| "EBK"
		"Leveled Readers - Red"															|| "RDR"
		"Above Leveled Reader"															|| "RDR"
		"Leveled Readers Teacher's Guide"												|| "RDR"
		"Leveled Reader"																|| "RDR"
		"HMH Decoding Power Letter Cards"												|| "PWR"
		"Journeys Georgia Test Power"													|| "PWR"
		"Science Fusion Power Notes Presentations - Earth"								|| "PWR"
		"Minute-by-Minute Assessment Tracker"											|| "OLA"
		"Online Assessment"																|| "OLA"
		"Journeys Online Assessment"													|| "OLA"
		"Storytown Online Assessment 2012"												|| "OLA"
		"Saxon Math Reteach and Reassessment"											|| "OLA"
		"Journeys Magazine"																|| "MAG"
		"Xplor eMagazine"																|| "MAG"
		"Journeys myWriteSmart"															|| "MWS"
		"myWriteSmart"																	|| "MWS"
		"Write Smart"																	|| "MWS"
		"Additional Resources"															|| "RES"
		"Supplemental Resources"														|| "RES"
		"Teacher Resources"																|| "RES"
		"HMH Resource Hub"																|| "RES"
		"Science Fusion Teacher Resource Bank"											|| "RES"
		"Interactive Vocabulary Cards"													|| "SVC"
		"Tarjetas de vocabulario (por unidad)"											|| "SVC"
		"Teacher Vocab Cards"															|| "SVC"
		"Teacher Guide"																	|| "EGD"
		"NA Ell Activity Guide SE"														|| "EGD"
		"Constitution Study Guide"														|| "EGD"
		"ExamView"																		|| "EVT"
		"Science Fusion ExamView Test Banks-Physical"									|| "EVT"
		"StoryTown Literacy Center Cards Set A"											|| "CRD"
		"Activity Cards TE"																|| "CRD"
		"Sound Spelling Cards"															|| "CRD"
		"Standards-Based Weekly Tests"													|| "STN"
		"GO Math! Standards Practice"													|| "STN"
		"Professional Development Videos"												|| "VID"
		"English Language Learners Videos"												|| "VID"
		"History Channel Videos"														|| "VID"
		"Interactive Glossary TX"														|| "MMG"
		"eGlossary"																		|| "MMG"
		"Senderos: Murales de enfoque adaptables"										|| "SND"
		"HSP Science Lab Manual"														|| "MAN"
		"Lab Manuals"																	|| "MAN"
		"iTools Primary"																|| "ITL"
		"iTools (Primary)"																|| "ITL"
		"FYI Site"																		|| "FYI"
		"Getting Ready for PARCC (TE)"													|| "RDY"
		"Journeys Ready-Made Work Stations"												|| "RDY"
		"Online Focus Wall"																|| "FWL"
		"ancillary"																		|| "ANC"
		"Test Prep SE"																	|| "TST"
		"CA TRIMESTER TESTS"															|| "TST"
		"Test of Silent Contextual Fluency"												|| "TST"
		"Unit Quiz"																		|| "QUZ"
		"Math Practice Games"															|| "PRC"
		"Math in Focus Extra Practice"													|| "PRC"
		"Graphic Organizers &amp; Mini-Lessons"											|| "GOA"


	}


	//generateThreeLetterComponentCode
	@spock.lang.Unroll("validate '#componentName' generates the expected fall-through acronymn: #expectedAcronym")
	def "validate generateThreeLetterComponentCode method"(){

		given: "A Component Value"
		def componentNameValue = componentName

		when: "Guid-Service method is called"
		def componentAcronymn = service.generateThreeLetterComponentCode(componentNameValue)

		then: "The generated component acronymn is expected"
		componentAcronymn == expectedAcronym

		where:
		componentName	 																||expectedAcronym
		"Journeys Interactive Whiteboard Lessons"		  								|| "JIW"
		"Journeys Literacy Centers"		  												|| "JLC"
		"My Journey Home: Family Connection"											|| "MJH"
		"Journeys My Journey Home: Family Connection (in Haitian Creole)"				|| "JMJ"
		"Go Math Multilingual Letters"													|| "GMM"
		"Teacher One Stop"																|| "TOS"
		"HSP Lecturas de conceptos matemÃ¡ticos en lÃ­nea"								|| "HLD"
		"Projectables"																	|| "PRO"
		"School-Home Connection"														|| "SCH"
		"HMH in the News"																|| "HIT"
		"Author Online"																	|| "AUT"
		"Rubrics"																		|| "RUB"
		"Skillsheets (Spanish)"															|| "SKI"
		"TE"																			|| "TET"
		""																				|| "HMH"
		"Graphic Organizers & Body Systems Diagrams"									|| "GOB"
		"Math Center (Student)"															|| "MCS"
		"Revisita Aventuras"															|| "REV"

	}


	//trimGuidTo32Characters
	@spock.lang.Unroll("validate '#guidString' generates the expected final Guid: #expectedGuid")
	def "validate trimGuidTo32Characters method"(){

		given: "A GUID value"
		def guidStringValue = guidString

		when: "Guid-Service: trimGuidTo32Characters method is called"
		def finalGuid = service.trimGuidTo32Characters(guidStringValue)

		then: "The generated final Guid is expected"
		finalGuid == expectedGuid

		where:
		guidString	 																	||expectedGuid
		"JY_CA17E_ETE_G03U00L00D0_0004016"		  										|| "JY_CA17E_ETE_G03U00L00D0_0004016"
		"JY_CA17E_ETE_G03U00L00D5_0004017"		  										|| "JY_CA17E_ETE_G03U00L00D5_0004017"
		"JY_CA17E_ETE_G03C10U00L00D5_0004018"		  									|| "JYCA17EETEG03C10U00L00D5_0004018"
		"SS_FL20E_ETE_G08M01L00S12D3_999999999"											|| "SSFL20ETEG08M01L00S12D3999999999" // allows for 999 Million resources with full scope

	}


	//getGradeNumber
	@spock.lang.Unroll("validate '#grade' generates the expected Grade Sequence: #expectedGradeSequence")
	def "validate getGradeNumber method"(){

		given: "A Grade value or range"
		def gradeValue = grade

		when: "Guid-Service: getGradeNumber method is called"
		def returnedGrade = service.getGradeNumber(gradeValue)

		then: "The generated final Guid is expected"
		returnedGrade == expectedGradeSequence

		where:
		grade				||expectedGradeSequence
		["8"]				|| "08"
		["K"]				|| "00"
		["12"]				|| "12"
		["10"]				|| "10"
		["6","7", "8"]		|| "08"
		["6","7", "12"]		|| "12"
		["6","PS", "13"]	|| "14"
		["IT", "PK"]		|| "00"
		[]					|| "22"
		["K","1","6"]		|| "06"

	}

	//padLeftZero
	@spock.lang.Unroll("validate '#grade' generates the expected padded Sequence: #expectedPaddedSequence")
	def "validate padLeftZero method"(){

		given: "A Grade value"
		def gradeValue = grade

		when: "Guid-Service: padLeftZero method is called"
		def returnedGrade = service.padLeftZero(gradeValue)

		then: "The generated final Guid is expected"
		returnedGrade == expectedPaddedSequence

		where:
		grade				||expectedPaddedSequence
		"8"					|| "08"
		"0"					|| "00"
		"1"					|| "01"
		"2"					|| "02"
		"12"				|| "12"
		"123456"			|| "123456"
		"999999999"			|| "999999999"

	}
}




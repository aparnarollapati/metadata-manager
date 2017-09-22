package hmh.mms

import grails.test.mixin.TestFor
import spock.lang.Specification
import grails.test.mixin.Mock
import hmh.mms.level.*

/**
 * See the API for {@link grails.test.mixin.services.ServiceUnitTestMixin} for usage instructions
 */
@TestFor(KeywordService)
@Mock([Program, Content, ComponentSpec, TopLevel, SecondLevel, ThirdLevel, FourthLevel, FifthLevel, CommonCartridgeKeyword]) // mocking these Domains
class KeywordServiceSpec extends Specification {



	// getSecondLevelScopeInfo
	@spock.lang.Unroll("Resource at 2nd Level Scope: '#scopeValue: #secondLevelHierarchy' results in expected Scope keyword: #expectedKeywords ")
	def "validate getSecondLevelScopeInfo method returns the expected Scope and hierarchy keyword"(){

		given: "A new mocked Component Spec"
		def program1 = new Program("secondLevelScope": scopeValue)
		def componentSpec = new ComponentSpec(component: "Teacher's Edition", componentHierarchy: 2)
		program1.addToComponents(componentSpec)

		and: "A new mocked Content Instance that uses that component Spec and lives at a particualar level"
		def contentInstance = new Content(component: componentSpec)
		def secondLevelInstance = new SecondLevel(hierarchy: secondLevelHierarchy )
		secondLevelInstance.addToContent(contentInstance)

		when: "Service Method is called"
		def returnedScopeInfo = service.getSecondLevelScopeInfo(contentInstance)


		then: "returned list is the expected keyword"
		returnedScopeInfo == expectedKeywords

		where:
		scopeValue 	| secondLevelHierarchy		||expectedKeywords
		"Module"	|	1						|| ["Module 1"]
		"Module"	|	12						|| ["Module 12"]
		"Volume"	|	12						|| ["Volume 12"]
		"Unit"		|	20						|| ["Unit 20"]
		"Collection"|	2						|| ["Collection 2"]
		"Collection"|	6						|| ["Collection 6"]


	}

	//getThirdLevelAndParentScopeInfo
	@spock.lang.Unroll("Resource at 3rd level scope: '#thirdLevelScopeValue: #thirdLevelHierarchy', and 2nd Level Scope: '#secondLevelscopeValue: #secondLevelHierarchy' results in expected Scope keywords: #expectedKeywords")
	def "validate getThirdLevelAndParentScopeInfo method returns the expected Scope and hierarchy keyword"(){

		given: "A new mocked Component Spec"
		def program1 = new Program("secondLevelScope": secondLevelscopeValue, "thirdLevelScope": thirdLevelScopeValue)
		def componentSpec = new ComponentSpec(component: "Teacher's Edition", componentHierarchy: 2)
		program1.addToComponents(componentSpec)

		and: "A new mocked Content Instance that uses that component Spec and lives at a particualar level"
		def contentInstance = new Content(component: componentSpec)
		def secondLevelInstance = new SecondLevel(hierarchy: secondLevelHierarchy )
		def thirdLevelInstance = new ThirdLevel(secondLevel: secondLevelInstance, "hierarchy": thirdLevelHierarchy, "title": "The Earliest Americans")


		thirdLevelInstance.addToContent(contentInstance)

		when: "Service Method is called"
		def returnedScopeInfo = service.getThirdLevelAndParentScopeInfo(contentInstance)


		then: "returned list is the expected keyword"
		returnedScopeInfo == expectedKeywords

		where:
		secondLevelscopeValue	| thirdLevelScopeValue 		| secondLevelHierarchy	| thirdLevelHierarchy	||expectedKeywords
		"Module"				| 	"Lesson"				|	1					| 3						|| ["Module 1", "Lesson 3"]
		"Collection"			| 	"Lesson"				|	6					| 6						|| ["Collection 6", "Lesson 6"]
		"Unit"					| 	"Chapter"				|	1					| 2						|| ["Unit 1", "Chapter 2"]
		"Unit"					| 	"Section"				|	1					| 2						|| ["Unit 1", "Section 2"]
		"Theme"					| 	"Lesson"				|	10					| 12					|| ["Theme 10", "Lesson 12"]
		"Section"				| 	"Lesson"				|	1					| 2						|| ["Section 1", "Lesson 2"]
		"Chapter"				| 	"Lesson"				|	4					| 2						|| ["Chapter 4", "Lesson 2"]
		"Chapter"				| 	"Day"					|	4					| 2						|| ["Chapter 4", "Day 2"]

	}


	//getFourthLevelAndParentScopeInfo
	@spock.lang.Unroll("Resource at 4th level scope: '#fourthLevelScopeValue : #fourthLevelHierarchy', 3rd level scope: '#thirdLevelScopeValue: #thirdLevelHierarchy', and 2nd Level Scope: '#secondLevelscopeValue: #secondLevelHierarchy' results in expected Scope keywords: #expectedKeywords")
	def "validate getFourthLevelAndParentScopeInfo method returns the expected Scope and hierarchy keyword"(){

		given: "A new mocked Component Spec"
		def program1 = new Program("secondLevelScope": secondLevelscopeValue, "thirdLevelScope": thirdLevelScopeValue, "fourthLevelScope": fourthLevelScopeValue )
		def componentSpec = new ComponentSpec(component: "Teacher's Edition", componentHierarchy: 2)
		program1.addToComponents(componentSpec)

		and: "A new mocked Content Instance that uses that component Spec and lives at a particualar level"
		def contentInstance = new Content(component: componentSpec)
		def secondLevelInstance = new SecondLevel(hierarchy: secondLevelHierarchy )
		def thirdLevelInstance = new ThirdLevel(secondLevel: secondLevelInstance, "hierarchy": thirdLevelHierarchy, "title": "The Earliest Americans")
		def fourthLevelInstance = new FourthLevel(thirdLevel: thirdLevelInstance, "hierarchy": fourthLevelHierarchy, "title": "4th Level")


		fourthLevelInstance.addToContent(contentInstance)

		when: "Service Method is called"
		def returnedScopeInfo = service.getFourthLevelAndParentScopeInfo(contentInstance)


		then: "returned list is the expected keyword"
		returnedScopeInfo == expectedKeywords

		where:
		secondLevelscopeValue	| thirdLevelScopeValue	| fourthLevelScopeValue		| 	secondLevelHierarchy	| thirdLevelHierarchy 	| fourthLevelHierarchy	||expectedKeywords
		"Module"				| 	"Lesson"			| "Day"						|	1						| 3						|	4					|| ["Module 1", "Lesson 3", "Day 4"]
		"Book"					| 	"Chapter"			| "Lesson"					|	2						| 3						|	4					|| ["Book 2", "Chapter 3", "Lesson 4"]
		"Unit"					| 	"Week"				| "Skill"					|	4						| 40					|	6					|| ["Unit 4", "Week 40", "Skill 6"]
		"Collection"			| 	"Lesson"			| "Day"						|	6						| 4						|	5					|| ["Collection 6", "Lesson 4", "Day 5"]
		"Unit"					| 	"Lesson"			| "Day"						|	4						| 12					|	6					|| ["Unit 4", "Lesson 12", "Day 6"]
		"Unit"					| 	"Chapter"			| "Lesson"					|	4						| 12					|	6					|| ["Unit 4", "Chapter 12", "Lesson 6"]
		"Theme"					| 	"Week"				| "Day"						|	4						| 12					|	6					|| ["Theme 4", "Week 12", "Day 6"]
		"Theme"					| 	"Selection"			| "Day"						|	4						| 12					|	6					|| ["Theme 4", "Selection 12", "Day 6"]
		"Theme"					| 	"Section"			| "Day"						|	4						| 9						|	1					|| ["Theme 4", "Section 9", "Day 1"]
		"Theme"					| 	"Lesson"			| "Skill"					|	4						| 9						|	1					|| ["Theme 4", "Lesson 9", "Skill 1"]
		"Volume"				| 	"Chapter"			| "Lesson"					|	5						| 2						|	1					|| ["Volume 5", "Chapter 2", "Lesson 1"]

	}


	//getFifthLevelAndParentScopeInfo
	@spock.lang.Unroll("Resource at 5th level scope: '#fifthLevelScopeValue: #fifthLevelHierarchy', 4th Level scope: '#fourthLevelScopeValue: #fourthLevelHierarchy', 3rd level scope: '#thirdLevelScopeValue: #thirdLevelHierarchy', and 2nd Level Scope: '#secondLevelscopeValue: #secondLevelHierarchy' results in expected scope keywords: #expectedKeywords")
	def "validate getFifthLevelAndParentScopeInfo method returns the expected Scope and hierarchy keyword"(){

		given: "A new mocked Component Spec"
		def program1 = new Program("secondLevelScope": secondLevelscopeValue, "thirdLevelScope": thirdLevelScopeValue, "fourthLevelScope": fourthLevelScopeValue, "fifthLevelScope": fifthLevelScopeValue )
		def componentSpec = new ComponentSpec(component: "Teacher's Edition", componentHierarchy: 2)
		program1.addToComponents(componentSpec)

		and: "A new mocked Content Instance that uses that component Spec and lives at a particualar level"
		def contentInstance = new Content(component: componentSpec)
		def secondLevelInstance = new SecondLevel(hierarchy: secondLevelHierarchy )
		def thirdLevelInstance = new ThirdLevel(secondLevel: secondLevelInstance, "hierarchy": thirdLevelHierarchy, "title": "The Earliest Americans")
		def fourthLevelInstance = new FourthLevel(thirdLevel: thirdLevelInstance, "hierarchy": fourthLevelHierarchy, "title": "4th Level")
		def fifthhLevelInstance = new FifthLevel(fourthLevel: fourthLevelInstance, "hierarchy": fifthLevelHierarchy, "title": "5th Level")


		fifthhLevelInstance.addToContent(contentInstance)

		when: "Service Method is called"
		def returnedScopeInfo = service.getFifthLevelAndParentScopeInfo(contentInstance)


		then: "returned list is the expected keyword"
		returnedScopeInfo == expectedKeywords

		where:
		secondLevelscopeValue	| thirdLevelScopeValue	| fourthLevelScopeValue	| fifthLevelScopeValue	| 	secondLevelHierarchy	| thirdLevelHierarchy 	| fourthLevelHierarchy 	| fifthLevelHierarchy	||expectedKeywords
		"Module"				| 	"Chapter"			| "Lesson"				|		"Day"			|	1						| 3						|	4					|	1					|| ["Module 1", "Chapter 3", "Lesson 4", "Day 1"]
		"Volume"				| 	"Chapter"			| "Lesson"				|		"Day"			|	1						| 3						|	8					|	5					|| ["Volume 1", "Chapter 3", "Lesson 8", "Day 5"]
		"Unit"					| 	"Chapter"			| "Lesson"				|		"Day"			|	2						| 8						|	15					|	4					|| ["Unit 2", "Chapter 8", "Lesson 15", "Day 4"]
		"Unit"					| 	"Chapter"			| "Section"				|		"Day"			|	2						| 8						|	15					|	4					|| ["Unit 2", "Chapter 8", "Section 15", "Day 4"]


	}


	//getDisplayTitlePart
	@spock.lang.Unroll("A Resource with Component Value: '#componentValue', and Display Title: '#commonCartridgeTitleValue' returns the expects CC Keyword: '#expectedTitle' ")
	def "identify display title does not reurn the component name"(){

		given: "A Component Spec"
		def componentSpec = new ComponentSpec(component: componentValue, componentHierarchy: 2)

		and: "A content Instance"
		def contentInstance = new Content(component: componentSpec, commonCartridgeTitle: commonCartridgeTitleValue)


		when: "The method returns an Array"
		def returnedTitle = service.getDisplayTitlePart(contentInstance)

		then: "The scope is identified as needing more context"
		returnedTitle == expectedTitle

		where:
		componentValue 						|commonCartridgeTitleValue 																	|| expectedTitle
		"Teacher's Edition"					| "Teacher's Edition: first CC Title"														|| "first CC Title"
		"Vocabulary Reader"					| "Vocabulary Reader : second CC Title"														|| "second CC Title"
		"Teacher's Edition" 				| "Teacher&apos;s Edition: Strategic Intervention"											|| "Strategic Intervention" //corner case
		"Student Edition" 					| "Component Value Not Used In Title"														|| "Component Value Not Used In Title"
		"Student Edition" 					| "Component Value: Not Used In Title"														|| "Component Value: Not Used In Title"
		"Student Edition" 					| "Student Edition:: Test double colon"														|| "Test double colon"
		"Xplor eMagazine"					| "Xplor eMagazine: Family Reunion"															|| "Family Reunion"
		"Student Edition"					| "Student Edition: Analyze Stories: Character, p. 27"  									|| "Analyze Stories: Character, p. 27"
		"Teacher's Edition"					| "Teacher's Edition: Reading Informational Texts: Patterns of Organization, pp. R16-R21"	|| "Reading Informational Texts: Patterns of Organization, pp. R16-R21"
		"Teacher's Edition"					| "Teacher's Edition"																		|| ""
		"Author Biographies" 				| "Author Biography: Russell Freedman" 														|| "Russell Freedman" // corner case
		"Interactive Graphic Organizer" 	| "Interactive Graphic Organizer: Venn Diagram" 											|| "Venn Diagram"
		"Interactive Whiteboard Lessons"	| "Interactive Whiteboard Lessons: Grade 8"													|| "Grade 8"
		"NovelWise TE"						| "NovelWise (Teacher's Version)"															|| "NovelWise (Teacher's Version)"
		"Language Workshop" 				| "Language Workshop: Lesson 10: Scary Tales"												|| "Lesson 10: Scary Tales"
		"Xplor eMagazine"					| "Xplor eMagazine: Immigrants"																|| "Immigrants"
		"Teacher Edition" 					| "Teacher&apos;s Edition: Vocabulary Strategy: Context Clues, T58-T59"						|| "Vocabulary Strategy: Context Clues, T58-T59" // corner case
		"Teacher Edition"					| "Teacher&apos;s Edition: Strategic Intervention Lessons, Unit 1"							|| "Strategic Intervention Lessons, Unit 1"
		"Student Book"						| "Student Book: \"You Be the Jury,\" 74-76"												|| "\"You Be the Jury,\" 74-76"
		"Student Book"						| "Journeys Student Book"																	|| "Journeys Student Book" // corner case
		"myWriteSmart"						| "myWriteSmart: Lesson 8 Write About Reading"												|| "Lesson 8 Write About Reading"
		"Online Assessment"					| "Online Assessment: Novel Test: Jake Drake, Know-It-All"									|| "Novel Test: Jake Drake, Know-It-All"
		"Language Workshop Resources"		| "Language Workshop Resources: Lesson 26"													|| "Lesson 26"
		"Student Edition"					| "Student Edition: Focus on Mathematical Practices, pages 209-214"							|| "Focus on Mathematical Practices, pages 209-214"
		"Online Assessment"					| "Online Assessment: Unit 1 Quick Quiz 2: Addition and Subtraction Within 20"              || "Unit 1 Quick Quiz 2: Addition and Subtraction Within 20"
		"Online Assessment"					| "Lesson Assessment: The English Colonies, Lesson 1"										|| "Lesson Assessment: The English Colonies, Lesson 1" // SS18
		"Online Assessment"					| "Benchmark Assessment 1: Modules 1-4"														|| "Benchmark Assessment 1: Modules 1-4" // SS18
		"Teacher eBook"						| "Teacher eBook: The Civil War, Lesson 4: Daily Life during the War"						|| "The Civil War, Lesson 4: Daily Life during the War"
		"Teacher Guide"						| "Teacher Guide PDF: Reconstruction"														|| "Reconstruction" // SS18
		"Student Edition"					| "Student Edition PDF: The American Revolution"											|| "The American Revolution"
		"Student eBook"						| "Student eBook: The English Colonies"														|| "The English Colonies"
		"Additional Resources"				| "Graphic Organizer Answer Key: The American Revolution, Lesson 1"							|| "Graphic Organizer Answer Key: The American Revolution, Lesson 1"
		"Student eBook"						| "  Student eBook : Support for Whitespace"												|| "Support for Whitespace"

	}

	//getLevelKewords
	@spock.lang.Unroll("Level-Keywords: given non-grade-level: #nonGradeLevel, and #nonGradeTitle, and #title, expect: #expectedKeywords")
	def "validate getLevelKewords Service method"(){

		given: "A new mocked Content"
		def contentInstance = new Content()

		def topLevelInstance = new TopLevel(title: title, nonGradeLevel: nonGradeLevel, nonGradeTitle: nonGradeTitle)
		def secondLevelInstance = new SecondLevel(topLevel: topLevelInstance, title: "2nd Level Title" )
		def thirdLevelInstance = new ThirdLevel(secondLevel: secondLevelInstance, "title": "3rd Level Title")
		def fourthLevelInstance = new FourthLevel(thirdLevel: thirdLevelInstance, "title": "4th Level Title")
		def fifthLevelInstance = new FifthLevel(fourthLevel: fourthLevelInstance, "title": "5th Level Title")


		fifthLevelInstance.addToContent(contentInstance)

		when: "Service Method is called"
		def returnedScopeInfo = service.getLevelKewords(contentInstance)[0] - null // first list minus null objects


		then: "returned list is the expected keyword"
		returnedScopeInfo == expectedKeywords

		where:
		nonGradeLevel	| nonGradeTitle			 	| title							||expectedKeywords
		"Course -"		| "United States History"	| "Grade Level Title"			|| ["5th Level Title", "4th Level Title", "3rd Level Title", "2nd Level Title", "Course - United States History"]
		"Module"		| "Irish History"			| "Grade Level Title"			|| ["5th Level Title", "4th Level Title", "3rd Level Title", "2nd Level Title", "Module Irish History"]
		"Module -"		| "Irish History"			| "Grade Level Title"			|| ["5th Level Title", "4th Level Title", "3rd Level Title", "2nd Level Title", "Module - Irish History"]
		null			| "British History"			| "Grade Level Title"			|| ["5th Level Title", "4th Level Title", "3rd Level Title", "2nd Level Title", "British History"]
		""				| "History 1877"			| "Grade Level Title"			|| ["5th Level Title", "4th Level Title", "3rd Level Title", "2nd Level Title", "History 1877"]
		"Grade"			| ""						| "Grade Level Title"			|| ["5th Level Title", "4th Level Title", "3rd Level Title", "2nd Level Title", "Grade Level Title"]
		"Grade"			| ""						| ""							|| ["5th Level Title", "4th Level Title", "3rd Level Title", "2nd Level Title"]
		""				| ""						| ""							|| ["5th Level Title", "4th Level Title", "3rd Level Title", "2nd Level Title"]

	}



	//identifyCommonCartridgeKeywords
	@spock.lang.Unroll("Full Keywords with titles: Resource has Component: #componentValue, 5th level scope: '#fifthLevelScopeValue: #fifthLevelHierarchy', 4th Level scope: '#fourthLevelScopeValue: #fourthLevelHierarchy', 3rd level scope: '#thirdLevelScopeValue: #thirdLevelHierarchy', and 2nd Level Scope: '#secondLevelscopeValue: #secondLevelHierarchy' results in expected Resource keywords: #expectedKeywords")
	def "validate identifyCommonCartridgeKeywords method returns the expected Scope and hierarchy keyword"(){

		given: "A new mocked Component Spec"
		def program1 = new Program("secondLevelScope": secondLevelscopeValue, "thirdLevelScope": thirdLevelScopeValue, "fourthLevelScope": fourthLevelScopeValue, "fifthLevelScope": fifthLevelScopeValue )
		def componentSpec = new ComponentSpec(component: componentValue, componentHierarchy: 2)
		program1.addToComponents(componentSpec)

		and: "A new mocked Content Instance that uses that component Spec and lives at a particualar level"
		def contentInstance = new Content(component: componentSpec, commonCartridgeTitle: commonCartridgeTitleValue)
		contentInstance.addToCommonCartridgeKeywords(keyword:"Additional")

		def topLevelInstance = new TopLevel(title: "Grade Level Title", nonGradeLevel: "Course -", nonGradeTitle: "History 1999")
		def secondLevelInstance = new SecondLevel(topLevel: topLevelInstance, hierarchy: secondLevelHierarchy, title: "2nd Level Title" )
		def thirdLevelInstance = new ThirdLevel(secondLevel: secondLevelInstance, "hierarchy": thirdLevelHierarchy, "title": "3rd Level Title")
		def fourthLevelInstance = new FourthLevel(thirdLevel: thirdLevelInstance, "hierarchy": fourthLevelHierarchy, "title": "4th Level Title")
		def fifthLevelInstance = new FifthLevel(fourthLevel: fourthLevelInstance, "hierarchy": fifthLevelHierarchy, "title": "5th Level Title")


		fifthLevelInstance.addToContent(contentInstance)

		when: "Service Method is called"
		def returnedScopeInfo = service.identifyCommonCartridgeKeywords(contentInstance)


		then: "returned list is the expected keyword"
		returnedScopeInfo == expectedKeywords

		where:
		componentValue		| commonCartridgeTitleValue  					|secondLevelscopeValue	| thirdLevelScopeValue	| fourthLevelScopeValue	| fifthLevelScopeValue	| 	secondLevelHierarchy	| thirdLevelHierarchy 	| fourthLevelHierarchy 	| fifthLevelHierarchy	||expectedKeywords
		"Teacher's Edition" | "Teacher's Edition: Common Cartridge Title"	|"Unit"					|"Chapter"				| "Section"				|		"Day"			|	2						| 8						|	15					|	1					|| ["Teacher's Edition","5th Level Title", "4th Level Title", "3rd Level Title", "2nd Level Title", "Course - History 1999", "Unit 2", "Chapter 8", "Section 15", "Day 1", "Common Cartridge Title", "Additional"] as Set
		"Vocabulary Reader"	| "Vocabulary Reader: Another CC Title"			|"Unit"					|"Chapter"				| "Lesson"				|		"Day"			|	6						| 5						|	4					|	4					|| ["Vocabulary Reader","5th Level Title", "4th Level Title", "3rd Level Title", "2nd Level Title", "Course - History 1999", "Unit 6", "Chapter 5", "Lesson 4", "Day 4", "Another CC Title", "Additional"] as Set
		"Teacher's Edition" | "Teacher's Edition"							|"Unit"					|"Chapter"				| "Section"				|		"Day"			|	2						| 8						|	15					|	1					|| ["Teacher's Edition","5th Level Title", "4th Level Title", "3rd Level Title", "2nd Level Title", "Course - History 1999", "Unit 2", "Chapter 8", "Section 15", "Day 1", "Additional"] as Set
	}



	//replaceHtmlEntityCodes
	@spock.lang.Unroll("Word: '#wordValue' correcly replaces the HTML Entity Code = #parsedWord")
	def "Helper Method: convert HTML Entity Codes"(){

		given: "A service class word"
		def wordToBeParsed = wordValue

		when: "The method returns an Array"
		def returnedWord = service.replaceHtmlEntityCodes(wordToBeParsed)

		then: "The scope is identified as needing more context"
		returnedWord == parsedWord

		where:
		wordValue 					|| parsedWord
		"Teacher's Edition"			|| "Teacher's Edition"
		"Teacher&apos;s Edition"	|| "Teacher's Edition"

	}


	//getKeywordList
	@spock.lang.Unroll("CSV List: '#commaSeparatedString' is correctly parsed into a Set of objects = #expectedParsedSet")
	def "Helper Method: convert CSV String into a Set of objects"(){

		given: "A Standard Code or a CSV List of codes"
		def stringToBeParsed = commaSeparatedString

		when: "The method returns a Set of parsed Strings"
		def returnedList = service.getKeywordList(stringToBeParsed)

		then: "The returned list equals the expected parsed set"
		returnedList == expectedParsedSet

		where:
		commaSeparatedString 						|| expectedParsedSet
		"history,k1,k2,master-test,keyword"			|| ['history','k1','k2','master-test','keyword'] as Set
		","											|| [] as Set
		",,,,,"										|| [] as Set
		"master\\, and tester,second"				|| ['master, and tester','second'] as Set //escape the comma
		"Test, master\\, and tester,second, mask"	|| ['Test','master, and tester','second', 'mask'] as Set
		"Test\\, master\\, and tester,second, mask"	|| ['Test, master, and tester','second', 'mask'] as Set
		"Math \\is fun, Science\\, is better"		|| ['Math is fun', 'Science, is better'] as Set
		"semi-colon; seperated, list"				|| ['semi-colon', 'seperated', 'list'] as Set
		"American History\\, 1877"					|| ['American History, 1877'] as Set
	}

}

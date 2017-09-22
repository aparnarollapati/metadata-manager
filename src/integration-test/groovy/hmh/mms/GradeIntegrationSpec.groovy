package hmh.mms


import grails.test.mixin.integration.Integration
import grails.transaction.*
import hmh.mms.level.LevelGrade
import hmh.mms.level.TopLevel
import spock.lang.*

@Integration
@Rollback
class GradeIntegrationSpec extends Specification {



	@spock.lang.Unroll("Validate Product Grade: '#grade' results in the expected guiOrdering: #gradeOrdering")
	void "test guiOrdering Domain method and beforeInsert method"() {

		given: "A new Program Instance"
		def program1 = new Program(name:"socialstudies2020", code: "SS", discipline:"Social Studies", state: "FL", copyrightYear: 2020, platform:"HMOF", topLevelScope: "Grade",
		"secondLevelScope": "Module", "thirdLevelScope": "Lesson", "fourthLevelScope": null, "fifthLevelScope": null,standardSetName:"FLSS_2018_MS_USH_v4.xml")

		when: "When Products and Grades are added to the program Instance"
		def product1 = new Product("isbn":9787774569999, title:"US History beg to 1877 - MS")
		def gradeInstance = new Grade(grade: grade)
		product1.addToGrades(gradeInstance)
		program1.addToProducts(product1)
		program1.save(flush: true)


		then: "The beforeInsert event method creates the expected guiOrdering"
		gradeInstance.guiOrdering == gradeOrdering

		where:
		grade 					|| gradeOrdering
		"PR" 					|| 0
		"PK" 					|| 1
		"TK" 					|| 2
		"K" 					|| 3
		"K" 					|| 3
		"1" 					|| 4
		"2"						|| 5
		"3"						|| 6
		"4"						|| 7
		"5"						|| 8
		"6"						|| 9
		"7"						|| 10
		"8"						|| 11
		"9"						|| 12
		"10"					|| 13
		"11"					|| 14
		"12"					|| 15
		"13"					|| 16
		"PS"					|| 17
		"AE"					|| 18
		"UG"					|| 19
		"Other"					|| 20

	}



	@spock.lang.Unroll("Validate Top-Level Grade: '#grade' results in the expected guiOrdering: #gradeOrdering")
	void "test guiOrdering LevelGrade Domain method and beforeInsert method"() {

		given: "A new Program Instance"
		def program1 = new Program(name:"socialstudies2020", code: "SS", discipline:"Social Studies", state: "FL", copyrightYear: 2020, platform:"HMOF", topLevelScope: "Grade",
		"secondLevelScope": "Module", "thirdLevelScope": "Lesson", "fourthLevelScope": null, "fifthLevelScope": null,standardSetName:"FLSS_2018_MS_USH_v4.xml")

		when: "When Top-Levels and Grades are added to the program Instance"
		def topLevelInstance = new TopLevel()
		def gradeInstance = new LevelGrade(grade: grade)
		topLevelInstance.addToGrades(gradeInstance)

		program1.addToTopLevels(topLevelInstance)
		program1.save(flush: true)

		then: "The beforeInsert event method creates the expected guiOrdering"
		gradeInstance.guiOrdering == gradeOrdering

		where:
		grade 					|| gradeOrdering
		"PR" 					|| 0
		"PK" 					|| 1
		"TK" 					|| 2
		"K" 					|| 3
		"K" 					|| 3
		"1" 					|| 4
		"2"						|| 5
		"3"						|| 6
		"4"						|| 7
		"5"						|| 8
		"6"						|| 9
		"7"						|| 10
		"8"						|| 11
		"9"						|| 12
		"10"					|| 13
		"11"					|| 14
		"12"					|| 15
		"13"					|| 16
		"PS"					|| 17
		"AE"					|| 18
		"UG"					|| 19
		"Other"					|| 20

	}

}

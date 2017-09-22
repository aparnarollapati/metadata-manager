package hmh.mms


import grails.test.mixin.integration.Integration
import grails.transaction.*
import hmh.mms.level.TopLevel
import spock.lang.*

@Integration
@Rollback
class LessonPlanIntegrationSpec extends Specification {

	@Ignore // LESSON Plans are needed across Programs
	def "Adding duplicate Lesson-Plan-IDs causes an expected validation error"(){

		given: "A new Program"
		def program1 = new Program(name:"Spock2022", state: "FL", copyrightYear:"2020", discipline:"Social Studies", code:"SS", platform:"HMOF", topLevelScope: "Grade",
		"secondLevelScope": "Module", "thirdLevelScope": "Lesson", "fourthLevelScope": null, "fifthLevelScope": null)
		program1.save(failOnError : true)

		and: "A new Level that belongs to program1"
		def topLevel1 = new TopLevel("title": "United States History, Beginnings to 1877", nonGradeLevel: "Course -", nonGradeTitle: "United States History, Beginnings to 1877")
		topLevel1.addToGrades(grade:"6")
		program1.addToTopLevels(topLevel1).save( failOnError: true, flush: true )

		and: "A Lesson Plan that is persisted"
		def lessonPlan1 = new LessonPlan("lessonPlanId":"SS_1", "duration":45, "title": "Module 1 Introduction", sortId:1).save(failOnError: true)
		topLevel1.addToLessonPlans(lessonPlan1).save(failOnError: true) // Lesson Plan for Module 1

		when: "Another Lesson Plan is added with the same Lesson-Plan-ID"
		def duplicateLessonPlan = new LessonPlan("lessonPlanId":"SS_1", "duration":45, "title": "Module 1 Introduction", sortId:1)
		topLevel1.addToLessonPlans(duplicateLessonPlan) //not saved

		then: "the duplicate lesson-Plan-Id fails validation"
		! duplicateLessonPlan.validate()
		duplicateLessonPlan.errors.hasFieldErrors('lessonPlanId')
		duplicateLessonPlan.errors.getFieldError('lessonPlanId')?.code == 'unique'

	}
}

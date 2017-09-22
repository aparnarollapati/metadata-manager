package hmh.mms.level
import hmh.mms.Content
import hmh.mms.LessonPlan
import grails.rest.*

@Resource(uri='/fifthlevels', readOnly = false, formats = ['json', 'xml'])
class FifthLevel {

	Integer hierarchy
	String title

	static constraints = {

		hierarchy (nullable: false)
		title (nullable: true)

	}

	static hasMany = [content: Content, lessonPlans: LessonPlan, keywords: LevelKeyword, standards: LevelStandard]
	static belongsTo = [fourthLevel: FourthLevel]

	static mapping = {
		keywords cascade: 'all-delete-orphan'
		standards cascade: 'all-delete-orphan'
	}
}

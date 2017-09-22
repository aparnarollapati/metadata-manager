package hmh.mms.level
import hmh.mms.Content
import hmh.mms.LessonPlan
import grails.rest.*

@Resource(uri='/fourthlevels', readOnly = false, formats = ['json', 'xml'])
class FourthLevel {


	Integer hierarchy
	String title


	static constraints = {

		hierarchy (nullable: false)
		title (nullable: true)

	}

	static hasMany = [fifthLevels: FifthLevel, content: Content, lessonPlans: LessonPlan, keywords: LevelKeyword, standards: LevelStandard]
	static belongsTo = [thirdLevel: ThirdLevel]

	static mapping = {
		keywords cascade: 'all-delete-orphan'
		standards cascade: 'all-delete-orphan'
	}
}

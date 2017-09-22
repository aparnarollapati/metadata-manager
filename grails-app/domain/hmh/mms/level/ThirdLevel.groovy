package hmh.mms.level
import hmh.mms.Content
import hmh.mms.LessonPlan

import grails.rest.*

@Resource(uri='/thirdlevels', readOnly = false, formats = ['json', 'xml'])
class ThirdLevel {

	Integer hierarchy
	String title

	static constraints = {

		hierarchy (nullable: false)
		title (nullable: true)

	}

	static hasMany = [fourthLevels: FourthLevel, content: Content, lessonPlans: LessonPlan, keywords: LevelKeyword, standards: LevelStandard]
	static belongsTo = [secondLevel: SecondLevel]

	static mapping = {
		keywords cascade: 'all-delete-orphan'
		standards cascade: 'all-delete-orphan'
	}
}

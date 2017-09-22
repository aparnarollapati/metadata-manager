package hmh.mms.level
import hmh.mms.Content
import hmh.mms.LessonPlan

import grails.rest.*

@Resource(uri='/secondlevels', readOnly = false, formats = ['json', 'xml'])
class SecondLevel {

	Integer hierarchy
	String title

	static constraints = {

		hierarchy (nullable: false)
		title (nullable: true)
	}

	static hasMany = [thirdLevels: ThirdLevel, content: Content, lessonPlans: LessonPlan, keywords: LevelKeyword, standards: LevelStandard]
	static belongsTo = [topLevel: TopLevel]

	static mapping = {
		keywords cascade: 'all-delete-orphan'
		standards cascade: 'all-delete-orphan'
	}
}

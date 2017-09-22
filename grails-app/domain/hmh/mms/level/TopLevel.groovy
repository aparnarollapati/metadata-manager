package hmh.mms.level
import hmh.mms.Content
import hmh.mms.Program
import hmh.mms.LessonPlan

class TopLevel {

	String title
	String nonGradeLevel
	String nonGradeTitle

	static constraints = {
		title (nullable: true)
		nonGradeLevel (nullable:true, maxSize: 40)
		nonGradeTitle (nullable:true, maxSize: 50)

	}

	// A top-level has many second levels
	static hasMany = [grades: LevelGrade, secondLevels: SecondLevel, content: Content, lessonPlans: LessonPlan, keywords: LevelKeyword, standards: LevelStandard]
	static belongsTo = [program: Program]

	static mapping = {
		keywords cascade: 'all-delete-orphan'
		standards cascade: 'all-delete-orphan'
		grades sort:'guiOrdering'
	}

}
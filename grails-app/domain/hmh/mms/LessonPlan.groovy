package hmh.mms
import hmh.mms.level.*

class LessonPlan {

	String lessonPlanId
	Integer duration
	Integer sortId		//  Lesson plan sequence
	String title

	static constraints = {


		lessonPlanId (blank: false, maxSize: 32, unique: false) // this was true but the same LP is needed across programs
		duration (range: 0..1000) // Restriction from schema
		sortId (nullable: false)
		title (nullable: false)

		// Associations
		topLevel (nullable: true)
		secondLevel (nullable: true)
		thirdLevel (nullable: true)
		fourthLevel (nullable: true)
		fifthLevel (nullable: true)

	}

	// A resource belong to a Level
	static belongsTo = [topLevel: TopLevel, secondLevel: SecondLevel, thirdLevel: ThirdLevel, fourthLevel: FourthLevel, fifthLevel: FifthLevel]

}
package hmh.mms.level

import grails.rest.*

@Resource(uri='/levelgrades', readOnly = false, formats = ['json', 'xml'])
class LevelGrade {

	String grade
	Integer guiOrdering = 0

	static constraints = {
		guiOrdering (nullable: true)
		// grade range is shared between Product level grade and Level0 grade
		grade (nullable: true, shared: "gradeRange")
	}

	def beforeInsert() {
		//  Need the grade to be set
		this.guiOrdering = getSortIdForGUI()
	}

	static mapping = {
		sort "guiOrdering"	//  We need to do this so that we can take the first one in hasMany and know its the earliest grade
	}

	static belongsTo = [topLevels: TopLevel]

	// get sort order
	def getSortIdForGUI(){

		if(this.grade){

			["PR", "PK", "TK", "K", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "PS", "AE", "UG", "Other"].indexOf(this.grade)

		}
	}
}
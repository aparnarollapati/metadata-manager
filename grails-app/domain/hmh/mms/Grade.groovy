package hmh.mms

import grails.rest.*

@Resource(uri='/grades', readOnly = false, formats = ['json', 'xml'])
class Grade {

	String grade
	Integer guiOrdering = 0

	static constraints = {
		guiOrdering (nullable: true)
		grade (blank: false, shared: "gradeRange")
	}

	def beforeInsert() {
		//  Need the grade to be set
		this.guiOrdering = getSortIdForGUI()
	}

	static mapping = {
		sort "guiOrdering"	//  We need to do this so that we can take the first one in hasMany and know its the earliest grade
	}

	static belongsTo = [product: Product]

	// get sort order
	def getSortIdForGUI(){

		if(this.grade){

			["PR", "PK", "TK", "K", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "PS", "AE", "UG", "Other"].indexOf(this.grade)

		}
	}
}
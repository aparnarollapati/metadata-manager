package hmh.mms.level


import grails.rest.*

@Resource(uri='/levelstandards', readOnly = false, formats = ['json', 'xml'])
class LevelStandard {

	String standard

	TopLevel topLevel
	SecondLevel secondLevel
	ThirdLevel thirdLevel
	FourthLevel fourthLevel
	FifthLevel fifthLevel

	static constraints = {

		standard (shared: "standardsMatch")

		topLevel (nullable: true)
		secondLevel (nullable: true)
		thirdLevel (nullable: true)
		fourthLevel (nullable: true)
		fifthLevel (nullable: true)
	}

}
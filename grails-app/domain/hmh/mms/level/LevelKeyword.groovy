package hmh.mms.level
import grails.rest.*

@Resource(uri='/levelkeywords', readOnly = false, formats = ['json', 'xml'])
class LevelKeyword {
	
	String keyword
	TopLevel topLevel
	SecondLevel secondLevel
	ThirdLevel thirdLevel
	FourthLevel fourthLevel
	FifthLevel fifthLevel

    static constraints = {
		keyword (blank: false)
		topLevel (nullable: true)
		secondLevel (nullable: true)
		thirdLevel (nullable: true)
		fourthLevel (nullable: true)
		fifthLevel (nullable: true)
    }
	
}
package hmh.mms

import grails.rest.*

@Resource(uri='/readers', readOnly = false, formats = ['json', 'xml'])
class Reader {

	String isbn10
	String isbn13
	String readerLevel = "N/A"
	String guidedReadingLevels
	String draEdlLevel
	String readingRecoveryLevels
	String readingSkills

	static constraints = {

		isbn10 (nullable: true, matches: /[0-9X]{10}/)
		isbn13 (nullable: true, matches: /[0-9]{13}/)
		readerLevel (inList: ["Above-Level", "On-Level", "Below-Level", "ELL", "N/A"])
		guidedReadingLevels (nullable: true, matches: /[A-Z]{1,10}/)
		draEdlLevel (nullable: true, maxSize: 10 )
		readingRecoveryLevels (nullable: true, maxSize: 10)
		readingSkills (nullable: true, maxSize: 200)
	}

	static belongsTo = [content: Content]
}

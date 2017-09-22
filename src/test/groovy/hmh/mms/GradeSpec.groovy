package hmh.mms

import grails.test.mixin.TestFor
import spock.lang.Specification

/**
 * See the API for {@link grails.test.mixin.domain.DomainClassUnitTestMixin} for usage instructions
 */
@TestFor(Grade)
class GradeSpec extends Specification {


	// getSortIdForGUI
	@spock.lang.Unroll("Validate Grade: #gradeValue returns the expected getSortIdForGUI number: #expectedOrder ")
	def "validate getSortIdForGUI"(){

		given: "A new Grade Instance"
		def gradeInstance = new Grade(grade: gradeValue)

		when: "The getSortIdForGUI method is called"
		def returnedSortIdForGUI = gradeInstance.getSortIdForGUI()

		then: "The returned order number #expectedOrder is expected"
		returnedSortIdForGUI == expectedOrder

		where:
		gradeValue				||expectedOrder
		"PR" 					|| 0
		"PK" 					|| 1
		"TK" 					|| 2
		"K" 					|| 3
		"K" 					|| 3
		"1" 					|| 4
		"2"						|| 5
		"3"						|| 6
		"4"						|| 7
		"5"						|| 8
		"6"						|| 9
		"7"						|| 10
		"8"						|| 11
		"9"						|| 12
		"10"					|| 13
		"11"					|| 14
		"12"					|| 15
		"13"					|| 16
		"PS"					|| 17
		"AE"					|| 18
		"UG"					|| 19
		"Other"					|| 20
		"invalid"				|| -1
		null					|| null

	}

}

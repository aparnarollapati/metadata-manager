package hmh.mms

import grails.test.mixin.TestFor
import spock.lang.Specification

/**
 * See the API for {@link grails.test.mixin.domain.DomainClassUnitTestMixin} for usage instructions
 */
@TestFor(Reader)
class ReaderSpec extends Specification {



	@spock.lang.Unroll("Test for 10-digit ISBN: #isbn10Value returns shouldBeValid: #shouldBeValid")
	def "Validating ISBN-10"(){

		expect: "valid ISBNs to be true"
		new Reader(isbn10:isbn10Value ).validate(['isbn10'])==shouldBeValid

		where:
		isbn10Value	 	|| shouldBeValid
		"1234567891"	|| true
		"123456789"  	|| false // 9 digits
		"12345678911"  	|| false // 11 digits
		"1328661466"	|| true
		"0544651235"	|| true
		"054458189X" 	|| true
		"054458189x"	|| false // small x
		null			|| true


	}



	@spock.lang.Unroll("Test for 13-digit ISBN: #isbn13Value returns shouldBeValid: #shouldBeValid")
	def "Validating ISBN-13"(){

		expect: "valid ISBNs to be true"
		new Reader(isbn13:isbn13Value ).validate(['isbn13'])==shouldBeValid

		where:
		isbn13Value	 		|| shouldBeValid
		"1234567891013"		|| true
		"123456789"  		|| false // 9 digits
		"12345678911"  		|| false // 11 digits
		"9781328660671"		|| true
		"9781328660672"		|| true
		"978132866067X" 	|| false //characters not supported
		"97813286606722"	|| false // extra digit
		null				|| true


	}

	@spock.lang.Unroll("Test for guidedReadingLevels: #guidedReadingLevelsValue returns shouldBeValid: #shouldBeValid")
	def "Validating guidedReadingLevels"(){

		expect: "valid guidedReadingLevels to be true"
		new Reader(guidedReadingLevels:guidedReadingLevelsValue ).validate(['guidedReadingLevels'])==shouldBeValid

		where:
		guidedReadingLevelsValue	 		|| shouldBeValid
		"B"									|| true
		"A"  								|| true
		null								|| true
		"ELEVENCHARS"						|| false


	}


	@spock.lang.Unroll("Test for draEdlLevel: #draEdlLevelValue returns shouldBeValid: #shouldBeValid")
	def "Validating draEdlLevel"(){

		expect: "valid draEdlLevel to be true"
		new Reader(draEdlLevel:draEdlLevelValue ).validate(['draEdlLevel'])==shouldBeValid

		where:
		draEdlLevelValue	 		|| shouldBeValid
		"A"							|| true
		null						|| true
		"2" 						|| true
		"0"							|| true
		"1234567891"				|| true 	// 10 digits
		"12345678911"				|| false 	// 11 digits




	}


}

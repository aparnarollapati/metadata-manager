package hmh.mms

import grails.test.mixin.TestFor
import spock.lang.Specification

/**
 * See the API for {@link grails.test.mixin.domain.DomainClassUnitTestMixin} for usage instructions
 */
@TestFor(Product)
class ProductSpec extends Specification {



	@spock.lang.Unroll("validate an ISBN: #isbnValue should have returned #shouldBeValid")
	def "Validate ISBN value"(){

		expect: // expect can be the only block in the test but it is recommended to use given: block for better readability
		new Product(isbn:isbnValue).validate(['isbn'])==shouldBeValid

		where:
		isbnValue			|shouldBeValid
		0					| false
		00					| false
		000					| false
		111					| false
		"9781234567891"		| true
		9781234567891		| true
		" "					| false // null
		978123456789		| false // too short
		97812345678912		| false // too long
		"ISBN123"			| false // not a number
		9780000000001		| true
		"0000000000001"		| true // dummy ISBN
		1111111111111		| true // dummy ISBN

	}


}

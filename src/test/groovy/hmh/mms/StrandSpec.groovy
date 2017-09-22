package hmh.mms

import grails.test.mixin.TestFor
import spock.lang.Specification

/**
 * See the API for {@link grails.test.mixin.domain.DomainClassUnitTestMixin} for usage instructions
 */
@TestFor(Strand)
class StrandSpec extends Specification {

	@spock.lang.Unroll("validate strand hierarchy with value #hierarchy is valid: #shouldBeValid ")
	def "Validate strand hierarchy value"(){

		expect: "hierarchy >=0 and <=999 to be valid"
		new Strand(hierarchy:hierarchy).validate(['hierarchy'])==shouldBeValid

		where:
		hierarchy	  							||shouldBeValid
		0		  								||true
		1	 									||true
		99	  									||true
		100      								||true
		999  									||true
		-1										||false
		1000									||false

	}


}

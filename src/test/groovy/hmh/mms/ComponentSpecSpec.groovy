package hmh.mms

import grails.test.mixin.TestFor
import spock.lang.Specification

/**
 * See the API for {@link grails.test.mixin.domain.DomainClassUnitTestMixin} for usage instructions
 */
@TestFor(ComponentSpec)
class ComponentSpecSpec extends Specification {


	@spock.lang.Unroll("validate toolType with value #toolType is valid: #shouldBeValid")
	def "Validate toolType value"(){

		expect: "tooltype >=0 and <=99 to be valid"
		new ComponentSpec(toolType:toolType).validate(['toolType'])==shouldBeValid

		where:
		toolType	  							||shouldBeValid
		0		  								||true
		1	 									||true
		99	  									||true
		100      								||false
		999  									||false
		-1										||false

	}



	@spock.lang.Unroll("validate component hierarchy with value #hierarchy is valid: #shouldBeValid ")
	def "Validate component hierarchy value"(){

		expect: "hierarchy >=0 and <=99 to be valid"
		new ComponentSpec(componentHierarchy:hierarchy).validate(['componentHierarchy'])==shouldBeValid

		where:
		hierarchy	  							||shouldBeValid
		0		  								||true
		1	 									||true
		99	  									||true
		100      								||false
		999  									||false
		-1										||false

	}






}

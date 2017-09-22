package hmh.mms.spock

import grails.test.mixin.TestMixin
import grails.test.mixin.support.GrailsUnitTestMixin
import hmh.demo.spock.Calculator
import spock.lang.*

/**
 * See the API for {@link grails.test.mixin.support.GrailsUnitTestMixin} for usage instructions
 */
@TestMixin(GrailsUnitTestMixin)
class CalculatorSpec extends Specification {


	void "test addTwoNumbers method"() {

		given: "A Calculator Object"
		def calculator = new Calculator()

		when: "Two numbers are passed into the addTwoNumbers method"
		def result = calculator.addTwoNumbers(2, 2)

		then: "The expected result is the sum of both numbers"
		result == 4

	}


	@spock.lang.Unroll("test adding #x and #y equals #expectedResult")
	void "test addTwoNumbers method with a data table"() {

		given: "A Calculator Object"
		def calculator = new Calculator()

		when: "Two numbers are passed into the addTwoNumbers method"
		def result = calculator.addTwoNumbers(x, y)

		then: "result equals expected Results"
		result == expectedResult
		
		where:
		
		x	|	y	|| expectedResult
		4	|	4	|| 8
		6	|   7	|| 13
		954 |   21	|| 975
		-1  |   13  || 12
		4 	|   7	|| 11
		-4	|	-7	|| -11
		4	|	-7	|| -3
		5 	| 	0	|| 5
		

	}

















}
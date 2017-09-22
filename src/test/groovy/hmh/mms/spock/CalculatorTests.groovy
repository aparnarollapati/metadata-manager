package hmh.mms.spock

import static org.junit.Assert.*
import grails.test.mixin.*
import hmh.demo.spock.Calculator

import org.junit.*


public class CalculatorTests {

	@Test
	public void testAddTwoPositiveNumbers() {
		int expected = 11
		int actual = new Calculator().addTwoNumbers(4, 7)
		assertEquals(expected, actual)

	}


	@Test
	public void testAddTwoNegativeNumbers() {
		int expected = -11
		int actual = new Calculator().addTwoNumbers(-4, -7)
		assertEquals(expected, actual)

	}


	@Test
	public void testAddNegativeAndPositiveNumbers() {
		int expected = -3
		int actual = new Calculator().addTwoNumbers(4, -7)
		assertEquals(expected, actual)

	}


	@Test
	void testAddZero(){

		Calculator calc = new Calculator()
		assertEquals("5 + 0 must be 5", 5, calc.addTwoNumbers(5, 0))
	}


}

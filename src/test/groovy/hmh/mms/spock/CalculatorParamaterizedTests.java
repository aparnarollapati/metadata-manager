package hmh.mms.spock;

import static org.junit.Assert.*;

import hmh.demo.spock.Calculator;
import java.util.Arrays;
import java.util.Collection;
import org.junit.runner.RunWith;
import org.junit.runners.Parameterized;
import org.junit.runners.Parameterized.Parameters;
import org.junit.*;

@RunWith(Parameterized.class)
public class CalculatorParamaterizedTests {

	private int m1;
	private int m2;
	private int expected;

	public CalculatorParamaterizedTests(int p1, int p2, int expected) {
		m1 = p1;
		m2 = p2;
		this.expected = expected;
	}

	// creates the test data
	@Parameters
	public static Collection<Object[]> data() {
		Object[][] data = new Object[][] { { 4 , 7, 11 }, { -4, -7, -11 }, { 4, -7, -3}, { 5, 0, 5 }};

		return Arrays.asList(data);
	}

	@Test
	public void testAddTwoNumbersMethod() {
		Calculator calc = new Calculator();
		assertEquals("Result: ", expected, calc.addTwoNumbers(m1, m2));
	}


}



package hmh.mms


import grails.test.mixin.TestFor
import spock.lang.Specification

/**
 * See the API for {@link grails.test.mixin.domain.DomainClassUnitTestMixin} for usage instructions
 */
@TestFor(LessonPlan)
class LessonPlanSpec extends Specification {

	@spock.lang.Unroll("validate on a lessonPlan with duration #lpDuration should be valid #shouldBeValid")
	void "test lessonPlan duration validation"(){

		expect: "Lesson Plan duration should be between 0 and 1000 minutes"
		new LessonPlan(duration:lpDuration).validate(['duration'])==shouldBeValid

		where:
		lpDuration|shouldBeValid
		0		  | true // does this make sense?
		45		  | true
		180	      | true
		225       | true
		999		  | true
		1000	  | true
		1001	  | false
		-1		  | false

	}




	@spock.lang.Unroll("validate on a lessonPlan with lessonPlanId length #length should be valid #shouldBeValid")
	void "test lessonPlan ID Max length validation"(){

		expect: "Lesson Plan ID should have 32 charachters max but cannot be blank"
		new LessonPlan(lessonPlanId:lessonPlanId).validate(['lessonPlanId'])==shouldBeValid

		where:
		lessonPlanId						| length 			||shouldBeValid		
		"short-id"							|8  		        || true
		"SS_FL18E_LP_8.1.2.1"				|19					|| true
		"SS_FL18E_LP_8.1.2.1.1.2.3.4.5.32"	|32					|| true
		"SS_FL18E_LP_8.1.2.1.1.2.3.4.51.33"	|33					|| false
		""									|0  		        || false
		"a"									|1					|| true // does this make sense?


	}
}

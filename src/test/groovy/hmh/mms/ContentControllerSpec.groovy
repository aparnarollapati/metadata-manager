package hmh.mms

import grails.test.mixin.*
import spock.lang.*
import static org.springframework.http.HttpStatus.*

@TestFor(ContentController)
@Mock(Content)
class ContentControllerSpec extends Specification {

	def populateValidParams(params) {
		assert params != null

		params.with {
			resourceId= "9787774567831-00001"
			displayTitle= "Teacher eBook: America"
			uri= "/content/hmof/social_studies/hmhss/fl/gr6-8/united_states_history_ese_9780544927520_/index.html#?page=/module_1opener/essential_question.xhtml&amp;u=1efbbef0f49ec5327ffd389831cbe95e"
			language= "en-US"
			reteach= false
			difInst= false
			hmhId="SS_FL20E_CDT_G08M01L00S00S7_0071"
			meaningfulDescription="During the module &quot;America, Africa, and Europe before 1500,&quot; students ..."
			viewable= true
			assignable= false
			schedulable= true
			searchable= true
			teacherManaged= false
			seFacing= false
			enrich= false
			mediaType= "HTML"
			freeplay= false
			active= false
			persistent= false
			resourcesPanelTe= false
			resourcesPanelSe= false
			sortId= 1
		}

	}

	@spock.lang.Unroll("Validate Tool-type Value: #toolTypeValue is a PMT tooltype: #istoolTypePmtRelated")
	void "Test the isToolTypePmt returns the correct boolean"(){

		given: "a Content Instance"
		def component1 = new ComponentSpec(toolType: toolTypeValue)
		def content1 = new Content(component: component1)

		when: "the controller method isToolTypePmtis called"
		def isToolTypePmt = controller.isToolTypePmt(content1)

		then:
		isToolTypePmt == istoolTypePmtRelated

		where:
		toolTypeValue			||istoolTypePmtRelated
		1						|| false
		6						|| false
		7						|| true
		8						|| true
		9						|| true
		10						|| true
		11						|| true
		12						|| true
		13						|| true
		14						|| true
		15						|| true
		16						|| false
		17						|| true
		18						|| false
		0						|| false

	}


	void "Test the index action returns the correct response"() {

		when:"The index action is executed"
		controller.index()

		then:"The response is correct"
		response.text == '[]'
	}


	void "Test the save action correctly persists an instance"() {

		when:"The save action is executed with an invalid instance"
		request.contentType = JSON_CONTENT_TYPE
		request.method = 'POST'
		def content = new Content(hmhId:"SS_FL20E_CDT_G08M01L00S00S7_0071")
		content.validate()
		controller.save(content)

		then:"The create view is rendered again with the correct model"
		response.status == UNPROCESSABLE_ENTITY.value()
		response.json.errors

	}	
	
}
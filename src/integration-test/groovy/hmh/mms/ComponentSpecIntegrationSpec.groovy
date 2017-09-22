package hmh.mms


import grails.test.mixin.integration.Integration
import grails.transaction.*
import spock.lang.*

@Integration
@Rollback
class ComponentSpecIntegrationSpec extends Specification {


	@spock.lang.Unroll("validate component with value #component is valid: #shouldBeValid")
	def "Validate component value"(){

		expect: "component value that is in the Component Mapping table is valid"
		new ComponentSpec(component:component).validate(['component'])==shouldBeValid

		where:
		component	  							||shouldBeValid
		"Teacher eBook"  						||true
		"Student eBook" 						||true
		"Additional Resources" 					||true
		"Online Assessment" 					||true
		"Guided Reading Workbook" 				||true
		"Student Edition"						||true
		"Not-In-The-DB"							||false
		" "										||false


	}


	@spock.lang.Unroll("validate componentType with value #componentType is valid: #shouldBeValid")
	def "Validate componentType value"(){

		expect: "componentTypeent value that is in the componentType Mapping table is valid"
		new ComponentSpec(componentType:componentType).validate(['componentType'])==shouldBeValid

		where:
		componentType	  							||shouldBeValid
		"Key Student Resource"  					||true
		"Ancillary" 								||true
		"Assessment" 								||true
		"Not-In-The-DB"								||false
		" "											||false


	}
	

	@spock.lang.Unroll("validate categorization with value #categorization is valid: #shouldBeValid")
	def "Validate categorization value"(){

		expect: "categorization value that is in the categorization Mapping table is valid"
		new ComponentSpec(categorization:categorization).validate(['categorization'])==shouldBeValid

		where:
		categorization	  							||shouldBeValid
		"Teaching Aids"  							||true
		"Assessments" 								||true
		"Interactive Content" 						||true
		"Not-In-The-DB"								||false
		" "											||false


	}


}

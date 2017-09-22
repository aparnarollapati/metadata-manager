package hmh.mms
//import grails.rest.*
//@Resource(uri='/componentspecs', readOnly = false, formats = ['json', 'xml'])

class ComponentSpec {

	def mappingService

	String component
	Integer componentHierarchy
	String componentType
	String categorization
	Integer toolType

	static constraints = {

		component (blank: false, validator: { componentValue, componentSpecInstance ->

			// if value is not in predefined list return false
			if (!componentSpecInstance.mappingService.isComponentValueInList(componentValue)) {
				return 'value.not.in.predefined.list'
			}
		})

		componentHierarchy (range: 0..99)

		componentType (blank: false, validator: { componentTypeValue, componentTypeSpecInstance ->

			// if value is not in predefined list return false
			if (!componentTypeSpecInstance.mappingService.isComponentTypeValueInList(componentTypeValue)) {
				return 'value.not.in.predefined.list'
			}
		})

		categorization (blank: false, validator: { categorizationValue, categorizationSpecInstance ->

			// if value is not in predefined list return false
			if (!categorizationSpecInstance.mappingService.isCategorizationValueInList(categorizationValue)) {
				return 'value.not.in.predefined.list'
			}
		})

		toolType (range: 0..99)
	}

	static belongsTo = [program: Program]
}
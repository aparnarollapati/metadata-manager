package hmh.mms


import grails.rest.*

@Resource(readOnly = false, formats = ['json', 'xml'])
class Ed {

	Integer toolType
	String 	instructionalPurpose
	Integer instructionalPurposeHierarchy
	String 	pedagogicalPurpose
	Integer pedagogicalPurposeHierarchy
	Integer productCategory
	String 	mediaType
	String 	component
	Integer componentHierarchy


	static constraints = {


		toolType (nullable: true)
		instructionalPurpose (nullable: true)
		instructionalPurposeHierarchy (nullable: true)
		pedagogicalPurpose (nullable: true)
		pedagogicalPurposeHierarchy (nullable: true)
		productCategory (nullable: true)
		mediaType (nullable: true)
		component (nullable: true)
		componentHierarchy (nullable: true)

	}

	static belongsTo = [content: Content]

}
package hmh.mms
import hmh.mms._enums.*
import hmh.mms.level.TopLevel
import hmh.mms.correlation.*


class Program {

	String name
	String code
	String discipline
	PlatformNames platform

	// Not used directly by generated files
	StateNames state
	int copyrightYear
	String standardSetName

	// Levels
	String topLevelScope = "Grade"
	String secondLevelScope
	String thirdLevelScope
	String fourthLevelScope
	String fifthLevelScope

	//AB and HMSI standards SVN links
	String abStandard
	String hmsiStandard

	static constraints = {

		name (blank: false)
		code (blank: false) // A 2 or 3 Letter code to represent the Program, that is used in the GUID Generator
		discipline (inList: ["Reading and Language Arts", "Mathematics", "Science and Health", "Social Studies", "World Languages", "Other"])
		platform (nullable: false) // Constrained by enum

		state (nullable: false) // Constrained by enum
		copyrightYear (range: 2008..2099)
		standardSetName (nullable: true)

		topLevelScope (nullable: false, inList: ["Grade"]) //Every Product has at least this level

		secondLevelScope (nullable: true, inList:["Volume", "Book", "Unit", "Collection", "Theme", "Module", "Chapter", "Section", "Lesson"])

		// Validator applicable to Chapter and Section
		thirdLevelScope (nullable: true, inList:["Chapter", "Lesson", "Week", "Selection", "Section", "Module"], validator: { thirdLevelValue, programInstance ->
			if (thirdLevelValue !=null && thirdLevelValue == programInstance.secondLevelScope){ return "higherlevel.scope.same" }
			if (thirdLevelValue !=null && programInstance.secondLevelScope == null  ) { return 'higherlevel.scope.null'} })

		// Validator applicable to Lesson and Section
		fourthLevelScope (nullable: true, inList:["Lesson", "Day", "Section", "Skill"], validator: { fourthLevelValue, programInstance ->
			if ( fourthLevelValue !=null && fourthLevelValue == programInstance.thirdLevelScope || fourthLevelValue !=null && fourthLevelValue == programInstance.secondLevelScope ) { return "higherlevel.scope.same" }
			if ( fourthLevelValue !=null && programInstance.thirdLevelScope == null ) {return 'higherlevel.scope.null' } } )

		// Validator applicable to Day
		fifthLevelScope (nullable: true, inList:["Day"], validator: { fifthLevelValue, programInstance ->
			if (fifthLevelValue != null && fifthLevelValue == programInstance.fourthLevelScope) {return "higherlevel.scope.same"}
			if (fifthLevelValue != null && programInstance.fourthLevelScope == null ) {return "higherlevel.scope.null"} })

		generateXmls(nullable: true)
		generateExcel(nullable: true)

		abStandard(nullable: true)
		hmsiStandard(nullable: true)
	}

	// A program has many products and topLevels. Strands and Instructional Segments are defined here too
	static hasMany = [segments: InstructionalSegment, strands: Strand, products: Product, topLevels: TopLevel, generateXmls: GenerateXmls, components: ComponentSpec, correlations: CorrelationSource, generateExcel: GenerateExcel, standardSets: StandardSet]

}
package hmh.mms

class GenerateXmls {

    String xmlType
    String username
    String lastUpdatedDate
    String programsId
    String ccXmlLevel
    String isStandards
    String standardType
    static belongsTo = [program: Program]
    static constraints = {
	//program()
	xmlType nullable: true, inList: ["XML_MDS", "XML_PLANNER","XML_ALCHEMY","XML_CC12","XML_CC13","XML_CORRELATIONS"]
	ccXmlLevel(nullable: true,inList: ["Program Level","Grade Level"])
	isStandards(nullable: true,inList: ["Include Standards","Ignore Standards"])
	standardType(nullable: true,inList: ["Generic Delivery","Brainhoney Delivery"])
    }
}

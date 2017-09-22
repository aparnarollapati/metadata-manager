package hmh.mms

import hmh.mms.level.*

import grails.transaction.Transactional
import hmh.mms.mapping.*

class MappingService {

    def levelsService
    def keywordService
    /**
     * Return true if value is in mapping table
     * @param mediaTypeValue
     * @return
     */
    def isMediaTypeValueInList(def mediaTypeValue) {

	def mediaType = MediaTypeMapping.where{}.mediaType.list()

	if (mediaTypeValue in mediaType ){
	    return true
	}

	return false

    }

    /**
     * Return true if value is in mapping table
     * @param segmentValue
     * @return
     */
    def isInstructionalSegmentValueInList(def segmentValue) {

	def segment = InstructionalSegmentMapping.where{}.instructionalSegment.list()

	if ( segmentValue in segment ){
	    return true
	}

	return false

    }


    /**
     * Return true if value is in mapping table
     * @param strandValue
     * @return
     */
    def isStrandValueInList(def strandValue) {

	def strandList = StrandMapping.where{}.strand.list()

	if ( strandValue in strandList ){
	    return true
	}

	return false

    }

    /**
     * Return true if value is in mapping table
     * @param componentValue
     * @return
     */
    def isComponentValueInList(def componentValue) {

	def componentList = ComponentMapping.where{}.component.list()

	if ( componentValue in componentList ){
	    return true
	}

	return false

    }

    /**
     * Return true if value is in mapping table
     * @param componentTypeValue
     * @return
     */
    def isComponentTypeValueInList(def componentTypeValue) {

	def componentTypeList = ComponentTypeMapping.where{}.componentType.list()

	if ( componentTypeValue in componentTypeList ){
	    return true
	}

	return false

    }


    /**
     * Return true if value is in mapping table
     * @param categorizationValue
     * @return
     */
    def isCategorizationValueInList(def categorizationValue) {

	def categorizationList = CategorizationMapping.where{}.categorization.list()

	if ( categorizationValue in categorizationList ){
	    return true
	}

	return false

    }


    /**
     * Derive the Component type to generate the Planner XML for a particular Component Type	  
     * @param type
     * @return
     */
    def getPlannerComponentType(def type){

	def componentType

	switch (type) {
	    case "Key Student Resource": componentType = "SE"; break;
	    case "Key Teacher Resource": componentType = "TE"; break;
	    case "Intervention Resource": componentType = "ancillary"; break;
	    case "assessment": componentType = "assessment"; break;
	    case "Ancillary": componentType ="ancillary"; break;
	    case "interactive activity": componentType = "online activity"; break;
	    case "Reader": componentType = "leveled reader"; break;
	    case "Video": componentType = "movie"; break;
	    case "Lab": componentType = "ancillary"; break;
	    case "Website": componentType = "online activity"; break;
	    case "Presentation": componentType = "ancillary"; break;
	    case "Audio": componentType = "ancillary"; break;
	    case "ISE": componentType = "online activity"; break;
	    case "resource": componentType = "resource"; break;
	    case ~/ise_lesson.*/: componentType = "ise_lesson"; break; // regex

	    default: componentType =  "ancillary";
	}

	componentType
    }


    /**
     * Derive MDS Component Types to generate MDS XML
     * @param type
     * @return
     */
    def getMdsComponentType(def type){

	def componentType = type

	switch (type) {
	    case ~/ise_lesson.*/: componentType = "ISE"; break; // regex, currently this is the only mapping needed for MDS
	}

	componentType
    }


    /**
     * Derive the Media type to generate the Planner XML for a particular Component Type, default to url
     * @return
     */
    def getMediaType(def type){

	def mediaType

	switch (type) {
	    case "HTML": mediaType = "url"; break;
	    case "Flash": mediaType = "url"; break;
	    case "PDF": mediaType = "pdf"; break;
	    case "Presentation": mediaType = "power point"; break;
	    case "IWB": mediaType ="url"; break;
	    case "Editable File": mediaType = "text file"; break;
	    case "Video": mediaType = "url"; break;
	    case "Audio": mediaType = "url"; break;
	    case "URL": mediaType = "url"; break;
	    case "Java": mediaType = "url"; break;
	    case "Graphing Calculator": mediaType = "url"; break;
	    case "Spark": mediaType = "url"; break;

	    default: mediaType =  "url";
	}

	mediaType
    }

    /**
     * A level zero has a hierarchy that is derived from the grade of the resource
     * if grade is multi-grade set to 22
     * if k set to 5
     * if 1 set to 6 etc
     * @return
     */
    def getGradeHierarchy(List gradeList){

	def levelZeroHierarchy = 22

	if (gradeList.size == 1){

	    def gradeValue = gradeList[0]

	    switch (gradeValue) {
		case "IT": levelZeroHierarchy = 1; break;
		case "PR": levelZeroHierarchy = 2; break;
		case "PK": levelZeroHierarchy = 3; break;
		case "TK": levelZeroHierarchy = 4; break;
		case "K": levelZeroHierarchy = 5; break;
		case "1": levelZeroHierarchy = 6; break;
		case "2": levelZeroHierarchy = 7; break;
		case "3": levelZeroHierarchy = 8; break;
		case "4": levelZeroHierarchy = 9; break;
		case "5": levelZeroHierarchy = 10; break;
		case "6": levelZeroHierarchy = 11; break;
		case "7": levelZeroHierarchy = 12; break;
		case "8": levelZeroHierarchy = 13; break;
		case "9": levelZeroHierarchy = 14; break;
		case "10": levelZeroHierarchy = 15; break;
		case "11": levelZeroHierarchy = 16; break;
		case "12": levelZeroHierarchy = 17; break;
		case "13": levelZeroHierarchy = 18; break;
		case "PS": levelZeroHierarchy = 19; break;
		case "AE": levelZeroHierarchy = 20; break;
		case "UG": levelZeroHierarchy = 21; break;
		case "Other": levelZeroHierarchy = 22; break;

		default: 22;
	    }

	}

	return levelZeroHierarchy
    }

    /**
     * A Discipline has a code that is derived from the discipline label of the resource
     * @return
     */

    def getDisciplineCode(def label){

	def code = '10'

	switch (label) {
	    case "Reading and Language Arts": code = '01'; break;
	    case "Mathematics": code = '02'; break;
	    case "Science and Health": code = '03'; break;
	    case "Social Studies": code = '04'; break;
	    case "World Languages": code = '05'; break;
	    case "Other": code = '10'; break;

	    default: '10';
	}

	return code
    }

    /**
     * Split URL if it contains PMT for MDS output
     * @return
     */
    def splitPmtUrl(def uri){

	if (uri == null){uri = ""}

	def relativeUrl = uri


	if((uri).contains("||PMT")){

	    def parts = (uri).split("\\|\\|PMT")
	    relativeUrl = parts[0]
	}

	relativeUrl
    }


    /**
     * Get the Platform URL
     * @param platform
     * @return
     */
    def identifyPlatform(def platform){

	def platformUrl = ""

	if (platform?.equalsIgnoreCase("HMOF")){
	    platformUrl="http://my.hrw.com"
	}else if(platform?.equalsIgnoreCase("TCK6")) {
	    platformUrl="http://www-k6.thinkcentral.com"

	}

	platformUrl
    }

    /**
     *  Append the resource string to the CC 1.2 XML
     * @param resource
     * @param programInstance
     * @param productInstance
     * @return
     */
    def getCC12Resource(resource,Program programInstance,Product productInstance){
	def discipline=getDisciplineCode(productInstance.program.discipline)
	def level1Map =levelsService.getFullLevelsMap(resource)	
	
	def lduration
	if(resource.lessonPlan){
	    lduration=resource.lessonPlan.duration
	}else{
	    lduration=20
	}
	StringBuffer str=new StringBuffer()
	def displayTitle=resource.commonCartridgeTitle ?: resource.displayTitle
	
	String strGrade=""
	level1Map.top.grades.grade.each{
	    strGrade+=it+","
	}
	def commonCartridgeKeywords = keywordService.identifyCommonCartridgeKeywords(resource)
	
	str.append("<lomimscc:lom><lomimscc:general>")
	str.append("<lomimscc:title><lomimscc:string language='en-US'>"+displayTitle+"</lomimscc:string></lomimscc:title>")
	str.append("<lomimscc:identifier><lomimscc:catalog>GRADE</lomimscc:catalog><lomimscc:entry>Grade "+strGrade+"</lomimscc:entry></lomimscc:identifier>")
	str.append("<lomimscc:identifier><lomimscc:catalog>SUBJECT</lomimscc:catalog><lomimscc:entry>HMH $discipline $productInstance.program.state $productInstance.program.name Grade $strGrade</lomimscc:entry></lomimscc:identifier>")
	str.append("<lomimscc:identifier><lomimscc:catalog>DURATION</lomimscc:catalog><lomimscc:entry>$lduration</lomimscc:entry></lomimscc:identifier>")
	str.append("<lomimscc:identifier><lomimscc:catalog>MEANINGFUL_DESCRIPTION</lomimscc:catalog><lomimscc:entry>$resource.meaningfulDescription</lomimscc:entry></lomimscc:identifier>")
	str.append("<lomimscc:identifier><lomimscc:catalog>INSTRUCTIONAL_USAGE</lomimscc:catalog><lomimscc:entry>$resource.component.componentType </lomimscc:entry></lomimscc:identifier>")
	str.append("<lomimscc:identifier><lomimscc:catalog>RESOURCE_TYPE</lomimscc:catalog><lomimscc:entry>$resource.component.componentType</lomimscc:entry></lomimscc:identifier>")
	str.append("<lomimscc:identifier><lomimscc:catalog>MEDIA_TYPE</lomimscc:catalog><lomimscc:entry>$resource.mediaType</lomimscc:entry></lomimscc:identifier>")
	str.append("<lomimscc:identifier><lomimscc:catalog>CATEGORIZATION</lomimscc:catalog><lomimscc:entry>$resource.component.categorization</lomimscc:entry></lomimscc:identifier>")
	str.append("<lomimscc:identifier><lomimscc:catalog>ISBN</lomimscc:catalog><lomimscc:entry>$productInstance.isbn</lomimscc:entry></lomimscc:identifier>")
	str.append("<lomimscc:identifier><lomimscc:catalog>Component Type</lomimscc:catalog><lomimscc:entry>$resource.component.component</lomimscc:entry></lomimscc:identifier>")
	str.append("<lomimscc:language>$resource.language</lomimscc:language>")
	//keywords
	str.append("<lomimscc:keyword>")	
	commonCartridgeKeywords.each{keyword->
	    str.append("<lomimscc:string language='en_US'>"+keyword+"</lomimscc:string>")
	}	
	str.append("</lomimscc:keyword>")
	str.append("<lomimscc:identifier><lomimscc:catalog>ASSESSMENT_ID</lomimscc:catalog><lomimscc:entry>$resource.hmhId</lomimscc:entry></lomimscc:identifier>")
	str.append("</lomimscc:general>")
	str.append("<lomimscc:lifeCycle><lomimscc:contribute><lomimscc:role><lomimscc:value>publisher</lomimscc:value></lomimscc:role><lomimscc:entity>Houghton Mifflin Harcourt</lomimscc:entity><lomimscc:date><lomimscc:dateTime>$productInstance.program.copyrightYear</lomimscc:dateTime><lomimscc:description><lomimscc:string>Houghton Mifflin Harcourt</lomimscc:string></lomimscc:description></lomimscc:date></lomimscc:contribute></lomimscc:lifeCycle></lomimscc:lom>")

	return str
    }


    /**
     * Append the resource string to the CC 1.3 XML
     * @param resource
     * @param programInstance
     * @param productInstance
     * @return
     */
    def getCC13Resource(resource,Program programInstance,Product productInstance){
	def discipline=getDisciplineCode(productInstance.program.discipline)
	def level1Map =levelsService.getFullLevelsMap(resource)
	
	def topgrade=level1Map.top.grades.grade
	def lduration
	if(resource.lessonPlan){
	    lduration=resource.lessonPlan.duration
	}else{
	    lduration=20
	}
	StringBuffer str=new StringBuffer()
	def displayTitle=resource.commonCartridgeTitle ?: resource.displayTitle
	def commonCartridgeKeywords = keywordService.identifyCommonCartridgeKeywords(resource)
	str.append("<lomr:lom><lomr:general><lomr:title><lomr:string language='en-US'>$displayTitle</lomr:string></lomr:title>")
	str.append("<lomr:description><lomr:string language='en-US'>$resource.meaningfulDescription</lomr:string></lomr:description>")
	str.append("<lomr:language>$resource.language</lomr:language>")

	//keywords
	str.append("<lomr:keyword>")	
	commonCartridgeKeywords.each{keyword->
	    str.append("<lomr:string language='en_US'>"+keyword+"</lomr:string>")
	}	
	str.append("</lomr:keyword></lomr:general>")
	str.append("<lomr:lifeCycle><lomr:contribute><lomr:role><lomr:value>publisher</lomr:value></lomr:role><lomr:entity>Houghton Mifflin Harcourt</lomr:entity>")
	str.append("<lomr:date><lomr:dateTime>$productInstance.program.copyrightYear</lomr:dateTime><lomr:description><lomr:string>Houghton Mifflin Harcourt</lomr:string></lomr:description></lomr:date></lomr:contribute></lomr:lifeCycle>")
	//Placeholder
	//str.append(" <lomr:annotation>  <lomr:description><lomr:string>When these appear from MDS we will populate</lomr:string></lomr:description></lomr:annotation>")
	str.append("</lomr:lom>")
	return str
    }
}

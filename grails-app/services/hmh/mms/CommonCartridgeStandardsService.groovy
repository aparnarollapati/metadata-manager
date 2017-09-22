package hmh.mms
import hmh.mms.mapping.*
import grails.core.GrailsApplication;
import grails.transaction.Transactional

@Transactional
class CommonCartridgeStandardsService {

    GrailsApplication grailsApplication
    def subversionIntegrationService


    /**
     * parse the AB Guid Standards XML file after updating or creating the Working Copy
     * @return
     */
    def parseStandardsXML(def svnLocation,def xmlType){
	try
	{
	    def standardsXMLLocation
	    if(xmlType=="ABGUID")
		standardsXMLLocation = grailsApplication.config.getProperty('ABStandardsXMLFolder')
	    else if(xmlType=="HMSI")
		standardsXMLLocation = grailsApplication.config.getProperty('HMSIStandardsXMLFolder')


	    String[] urlArray = svnLocation.split("/");
	    String lastPath = urlArray[urlArray.length-1];
	    File mappingFile = new File(standardsXMLLocation + lastPath)
	    if(mappingFile.exists()){
		log.info "Running SVN Update for:" + mappingFile
		subversionIntegrationService.doSvnUpdate(mappingFile)
	    }else{
		log.info "Checking out SVN Mapping File from: " + svnLocation
		subversionIntegrationService.checkoutSvnContent( svnLocation, standardsXMLLocation )
	    }
	    log.info "Parsing the Mapping XML..."

	    XmlParser parser = new XmlParser()
	    def xmlData = parser.parse(mappingFile)

	    xmlData
	}
	catch(Exception ex)
	{
	    log.error ex.getMessage()
	}
    }

    /**
     * get Ab Guids	
     * @param mappingXml
     * @return
     */
    def getAbGuids(def mappingXml,def standards){
	log.info "Getting ab guid values to List"
	def JsonData = [:]
	def standardsXmlMap = [:]
	def mediaTypeXmlListCopy = []
	def mediaTypeToDelete = []
	mappingXml.STANDARD.TOPIC.each{

	    if(standards.contains(it['@state_num']))
	    {
		standardsXmlMap.put(it['@state_num'],it['@id'])
	    }
	}
	mappingXml.STANDARD.TOPIC.TOPIC.each{

	    if(standards.contains(it['@state_num']))
	    {
		standardsXmlMap.put(it['@state_num'],it['@id'])
	    }
	}
	mappingXml.STANDARD.TOPIC.TOPIC.TOPIC.each{
	    if(standards.contains(it['@state_num']))
	    {
		standardsXmlMap.put(it['@state_num'],it['@id'])
	    }
	}

	JsonData=[standardsXmlMap:standardsXmlMap,state:mappingXml.STATE.text()]

    }



    /**
     * get HMSI xml Heirarchy Id
     * @param mappingXml
     * @return
     */
    def getHMSIHeirarchyId(def mappingXml,def standards){
	log.info "Getting HMSI heirarchy id values to List"
	def JsonData = [:]
	def state
	def standardsXmlMap = [:]
	mappingXml.correlationElement.corrLeftSide.standardDataElem.each{
	    if(standards.contains(it.stateNumber.text()))
	    {
		state=it.state.text()
		standardsXmlMap.put(it.stateNumber.text(),it.hierarchyId.text())
	    }
	}

	JsonData=[standardsXmlMap:standardsXmlMap,state:state]

    }

    /**
     * get HMSI xml Ab Guids
     * @param mappingXml
     * @return
     */
    def getHMSIXmlAbGUID(def mappingXml,def standards){
	log.info "Getting HMSI Ab Guid values to List"

	def JsonData = [:]
	def state
	def standardsXmlMap = [:]
	mappingXml.correlationElement.corrLeftSide.standardDataElem.each{
	    if(it.abGuid){
		if(standards.contains(it.stateNumber.text()) && it.abGuid.text()!="NO AB GUID" && it.abGuid.text()!="" )
		{
		    state=it.state.text()
		    standardsXmlMap.put(it.stateNumber.text(),it.abGuid.text())
		}
	    }
	}
	JsonData=[standardsXmlMap:standardsXmlMap,state:state]

    }

}

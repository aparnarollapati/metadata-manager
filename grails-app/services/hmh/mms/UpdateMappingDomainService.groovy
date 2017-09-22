package hmh.mms
import hmh.mms.mapping.*
import grails.core.GrailsApplication;
import grails.transaction.Transactional

@Transactional
class UpdateMappingDomainService {

	GrailsApplication grailsApplication
	def subversionIntegrationService


	/**
	 * parse the mapping XML file after updating or creating the Working Copy
	 * @return
	 */
	def parseMappingXml(){
		try
		{
			def mappingXMLLocation = grailsApplication.config.getProperty('MappingXMLFolder')
			File mappingFileLocation = new File(mappingXMLLocation)
			File mappingFile = new File(mappingXMLLocation + "mappings.xml")
			if(mappingFile.exists()){
				log.info "Running SVN Update for:" + mappingFile
				subversionIntegrationService.doSvnUpdate(mappingFile)
			}else{
				def svnLocation = "http://dubsvn.hmco.com/svn/MDS_Content/trunk/MDS/Common/mapping"
				log.info "Checking out SVN Mapping File from: " + svnLocation
				subversionIntegrationService.checkoutSvnContent( svnLocation, mappingXMLLocation )
			}
			log.info "Parsing the Mapping XML..."

			XmlParser parser = new XmlParser()
			def xmlData = parser.parse(mappingFile)

			updateInstructionalSegment(xmlData)
			updateMediaType(xmlData)
			updateStrandType(xmlData)
			updateComponent(xmlData)
			updateComponentType(xmlData)
			setIseLessonValue()
			updateResourceType(xmlData)
			updateCategorization(xmlData)
			updateDefaultComponentCodes()

			log.info "Maping Domain Objects are Updated"
		}
		catch(Exception ex)
		{
			log.error ex.getMessage()
		}
	}


	/**
	 * Update the Instructional-Segment Domain
	 * @param mappingXml
	 * @return
	 */
	def updateInstructionalSegment(def mappingXml){

		def instructionalSegmentXmlList = []
		def instructionalSegmentXmlListCopy = []
		def instructionalSegmentsToDelete = []

		log.info "Adding Instructional_segment values to List"

		mappingXml.instructional_segment.value.each{
			instructionalSegmentXmlList.add(it.text())
			instructionalSegmentXmlListCopy.add(it.text())
		}

		def instructionalSegmentDomainList = InstructionalSegmentMapping.list()

		instructionalSegmentXmlList.removeAll(instructionalSegmentDomainList.instructionalSegment)
		if(instructionalSegmentXmlList){
			instructionalSegmentXmlList.each{
				if(it!=null && it!='')
					new InstructionalSegmentMapping("instructionalSegment": it).save(failOnError: true)
			}
		}

		instructionalSegmentsToDelete = instructionalSegmentDomainList.instructionalSegment
		instructionalSegmentsToDelete.removeAll(instructionalSegmentXmlListCopy)

		instructionalSegmentsToDelete.each{

			String strType = it.toString()

			def instructionalSegmentInstance = InstructionalSegmentMapping.where{instructionalSegment == strType}.get()
			if(instructionalSegmentInstance){ instructionalSegmentInstance.delete()}
		}

	}


	/**
	 * Update MediaType	Domain Class 
	 * @param mappingXml
	 * @return
	 */
	def updateMediaType(def mappingXml){

		log.info "Adding the Media Type values to List"

		def mediaTypeXmlList = []
		def mediaTypeXmlListCopy = []
		def mediaTypeToDelete = []

		mappingXml.media_type.value.each{
			mediaTypeXmlList.add(it.text())
			mediaTypeXmlListCopy.add(it.text())
		}

		def mediaTypeDomainList = MediaTypeMapping.list()
		mediaTypeXmlList.removeAll(mediaTypeDomainList.mediaType)

		if(mediaTypeXmlList){
			mediaTypeXmlList.each{
				if(it!=null && it!='')
					new MediaTypeMapping("mediaType": it).save(failOnError: true)
			}
		}

		mediaTypeToDelete = mediaTypeDomainList.mediaType
		mediaTypeToDelete.removeAll(mediaTypeXmlListCopy)

		mediaTypeToDelete.each{
			String strType=it.toString()
			def deletedMediaType= MediaTypeMapping.where{mediaType==strType}.get()
			if(deletedMediaType){ deletedMediaType.delete()}
		}

	}

	/**
	 * Update Strand-Type Domain Class
	 * @param mappingXml
	 * @return
	 */
	def updateStrandType(def mappingXml){

		log.info "Adding the Strand-Type values to List"

		def strandTypeXmlList = []
		def strandTypeXmlListCopy = []
		def strandTypeToDelete = []

		mappingXml.strand_type.value.each{
			strandTypeXmlList.add(it.text())
			strandTypeXmlListCopy.add(it.text())
		}

		def strandTypeDomainList = StrandMapping.list()
		strandTypeXmlList.removeAll(strandTypeDomainList.strand)
		if(strandTypeXmlList){
			strandTypeXmlList.each{
				if(it!=null && it!='')
					new StrandMapping("strand": it).save(failOnError: true)
			}
		}

		strandTypeToDelete = strandTypeDomainList.strand
		strandTypeToDelete.removeAll(strandTypeXmlListCopy)

		strandTypeToDelete.each{
			String strType = it.toString()
			def deletedStrandType = StrandMapping.where{strand==strType}.get()
			if(deletedStrandType){ deletedStrandType.delete()}
		}

	}

	/**
	 * Update Component Mapping Domain Class
	 * @param mappingXml
	 * @return
	 */
	def updateComponent(def mappingXml){

		log.info "Adding the Component values to List"
		def componentXmlList = []
		def componentXmlListCopy = []
		def componentToDelete = []

		mappingXml.component.value.each{
			componentXmlList.add(it.text())
			componentXmlListCopy.add(it.text())
		}


		def componentDomainList = ComponentMapping.list()
		componentXmlList.removeAll(componentDomainList.component)
		if(componentXmlList){
			componentXmlList.each{
				if(it!=null && it!='')
					new ComponentMapping("component": it).save(failOnError: true)
			}
		}

		componentToDelete = componentDomainList.component
		componentToDelete.removeAll(componentXmlListCopy)

		componentToDelete.each{

			String strType=it.toString()
			def deletedComponent = ComponentMapping.where{component==strType}.get()
			if(deletedComponent){ deletedComponent.delete()}
		}

	}


	/**
	 * Update Component Type Domain Class
	 * @return
	 */
	def updateComponentType(def mappingXml){

		log.info "Adding the Component Type values to List"
		def componentTypeXmlList= []
		def componentTypeXmlListCopy = []
		def componentTypeToDelete = []

		mappingXml.component_type.value.each{
			componentTypeXmlList.add(it.text())
			componentTypeXmlListCopy.add(it.text())
		}

		def ComponentTypeDomainList = ComponentTypeMapping.list()
		componentTypeXmlList.removeAll(ComponentTypeDomainList.componentType)

		if(componentTypeXmlList){
			componentTypeXmlList.each{
				if(it!=null && it!='')
					new ComponentTypeMapping("componentType": it).save(failOnError: true)
			}
		}

		componentTypeToDelete = ComponentTypeDomainList.componentType
		componentTypeToDelete.removeAll(componentTypeXmlListCopy)

		componentTypeToDelete.each{

			String strType=it.toString()
			def deletedComponent= ComponentTypeMapping.where{componentType==strType}.get()
			if(deletedComponent){ deletedComponent.delete()}
		}


	}


	/**
	 * Set the ise_lesson if its not available to support Planner XML functionality
	 * @return
	 */
	def setIseLessonValue(){

		def iseLesson = "ise_lesson (DLO enabled)"
		def iseLessonAvailable = ComponentTypeMapping.where{componentType == iseLesson}.get()

		if(iseLessonAvailable == null){
			new ComponentTypeMapping("componentType": iseLesson).save(failOnError: true)
		}
	}


	/**
	 * Update Resource Type Domain Class
	 * @param mappingXml
	 * @return
	 */
	def updateResourceType(def mappingXml){

		log.info "Adding the Resource Type values to List"
		def resourceTypeXmlList = []
		def resourceTypeXmlListCopy = []
		def resourceTypeToDelete = []

		mappingXml.resource_type.value.each{
			resourceTypeXmlList.add(it.text())
			resourceTypeXmlListCopy.add(it.text())
		}

		def resourceTypeDomainList = ResourceTypeMapping.list()
		resourceTypeXmlList.removeAll(resourceTypeDomainList.resourceType)
		resourceTypeToDelete = resourceTypeXmlList.removeAll(resourceTypeDomainList.resourceType)

		if(resourceTypeXmlList){
			resourceTypeXmlList.each{
				if(it!=null && it!='')
					new ResourceTypeMapping("resourceType": it).save(failOnError: true)
			}
		}

		resourceTypeToDelete = resourceTypeDomainList.resourceType
		resourceTypeToDelete.removeAll(resourceTypeXmlListCopy)

		resourceTypeToDelete.each{

			String strType=it.toString()
			def deletedResource= ResourceTypeMapping.where{resourceType==strType}.get()
			if(deletedResource){ deletedResource.delete()}
		}

	}

	/**
	 * Update Categorization Domain Class
	 * @param mappingXml
	 * @return
	 */
	def updateCategorization(def mappingXml){

		log.info "Adding the Categorization values to List"

		def categorizationXmlList = []
		def categorizationXmlListCopy = []
		def categorizationListToDelete = []

		mappingXml.categorization.value.each{
			categorizationXmlList.add(it.text())
			categorizationXmlListCopy.add(it.text())
		}

		def categorizationDomainList = CategorizationMapping.list()
		categorizationXmlList.removeAll(categorizationDomainList.categorization)

		if(categorizationXmlList){
			categorizationXmlList.each{
				if(it!=null && it!='')
					new CategorizationMapping( "categorization": it).save(failOnError: true)
			}
		}

		categorizationListToDelete = categorizationDomainList.categorization
		categorizationListToDelete.removeAll(categorizationXmlListCopy)

		categorizationListToDelete.each{

			String strType=it.toString()
			def deletedcategorization = CategorizationMapping.where{categorization==strType}.get()
			if(deletedcategorization){ deletedcategorization.delete()}
		}
	}


	/**
	 * find any component codes that are NULL and update the code
	 * @return
	 */
	def updateDefaultComponentCodes(){

		log.info "Updating Component Codes from JSON File..."

		def cacheLocation = grailsApplication.config.getProperty('CacheLocation')
		String componentCodeFolder = cacheLocation + "component_codes/"
		File codeFile = new File(componentCodeFolder + "componentCodes.json")

		if(codeFile.exists()){
			log.info "Running SVN Update for:" + componentCodeFolder
			subversionIntegrationService.doSvnUpdate(new File(componentCodeFolder))

		}else{
			def svnLocation = "http://dubv-engsvn01.dubeng.local/svn/tools/MMS/assets"
			log.info "Checking out SVN Code File from: " + svnLocation
			subversionIntegrationService.checkoutSvnContent( svnLocation, componentCodeFolder )
		}


		def slurper = new groovy.json.JsonSlurper()
		def result = slurper.parse(codeFile, "UTF-8")

		def componentMappingDefaultCodes = ComponentMapping.where{code == null}.list()

		componentMappingDefaultCodes.each{componentInstance ->

			def jsonKey = "${componentInstance.component}"

			if(result."${jsonKey}"){
				componentInstance.properties = [code:result."${jsonKey}"]
			}
		}
	}

	/**
	 * find any changes on excel header template that are modified and update the code
	 * @return
	 */
	def updateMDSHeaderExcelTemplate(){

		log.info "Updating MDS header Excel Template..."

		def cacheLocation = grailsApplication.config.getProperty('CacheLocation')
		String excelTemplateFolder = cacheLocation + "MDSHeaderExcel/"
		File excelFile = new File(excelTemplateFolder + "MDSHeaderTemplate.xlsx")

		if(excelFile.exists()){
			log.info "Running SVN Update for:" + excelTemplateFolder
			subversionIntegrationService.doSvnUpdate(new File(excelTemplateFolder))

		}else{
			def svnLocation = "http://dubv-engsvn01.dubeng.local/svn/tools/MMS/assets/excel_template/mds"
			log.info "Checking out SVN Code File from: " + svnLocation
			subversionIntegrationService.checkoutSvnContent( svnLocation, excelTemplateFolder )
		}
	}



	/**
	 * Update Program Structure Template
	 * @return
	 */
	def updateProgramStructureHeaderExcelTemplate(){

		log.info "Updating Program Structure header Excel Template..."

		def cacheLocation = grailsApplication.config.getProperty('ProgramStructureExcelFolder')
		String excelTemplateFolder = cacheLocation + "template/"
		File excelFile = new File(excelTemplateFolder + "programStructureTemplate.xlsx")

		if(excelFile.exists()){
			log.info "Running SVN Update for:" + excelTemplateFolder
			subversionIntegrationService.doSvnUpdate(new File(excelTemplateFolder))

		}else{
			def svnLocation = "http://dubv-engsvn01.dubeng.local/svn/tools/MMS/assets/excel_template/program_structure"
			log.info "Checking out SVN Code File from: " + svnLocation
			subversionIntegrationService.checkoutSvnContent( svnLocation, excelTemplateFolder )
		}
	}
}

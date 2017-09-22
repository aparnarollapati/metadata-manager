package hmh.mms

import grails.transaction.Transactional
import java.util.zip.ZipEntry
import java.util.zip.ZipOutputStream
import grails.core.GrailsApplication
import groovy.xml.*
import org.apache.commons.io.FileUtils;
/**
 * FileGeneratorService
 * A service class which generates the HMOF/TCK6 xmls  and Zip files
 */
@Transactional
class FileGeneratorService {

    GrailsApplication grailsApplication
    def mdsBuilderService
    def plannerBuilderService
    def alchemyBuilderService
    def levelsService
    def commonCartridgeService
    def excelGeneratorService
    def alchemyCsvGeneratorService
    def standardTCCorrelationService
    def correlationMappingService
    def contentService

    /**
     * generateXMLs
     * @param programInstance
     * @param xmlType
     * A Method which generates the HMOF/TCK6 xmls and Zip files
     */
    def  generateXMLs(Program programInstance,def generateXml) {
	def isbnValue=programInstance.products.isbn
	def productsXMLLocation
	def zipFile
	def xmlType=generateXml.xmlType
	try{
	    if(xmlType=='XML_MDS'){
		log.info "===================Generate MDS XML========================"
		isbnValue.each{
		    log.info "Generate MDS XML for the Product ISBN :"+it
		    mdsXmlGenerator(programInstance,it,generateXml)
		    log.info "Successfully Generated MDS XML for the Product ISBN :"+it
		}
		//Generate MDS Zip
		log.info "Generate MDS Zip file for the Program ISBNs :"+programInstance.products.isbn
		generateZipFile(programInstance,xmlType)
		log.info "Successfully Generate MDS Zip file for the Program ISBNs :"+programInstance.products.isbn
		log.info "=============================Done================================================"
	    }else if(xmlType=='XML_PLANNER')
	    {
		log.info "===================Generate Planner XML========================"
		isbnValue.each{
		    log.info "Generate Planner XML for the Product ISBN :"+it
		    plannerXmlGenerator(programInstance,it)
		    log.info "Successfully Generated Planner XML for the Product ISBN :"+it
		}
		//Generate Planner Zip
		log.info "Generate Planner Zip file for the Program ISBNs :"+programInstance.products.isbn
		generateZipFile(programInstance,xmlType)
		log.info "Successfully Generate Planner Zip file for the Program ISBNs :"+programInstance.products.isbn
		log.info "=============================Done================================================"
	    } else if(xmlType=='XML_CC12')
	    {
		log.info "===================Generate Common Catridge 1.2 Schema XML========================"
		isbnValue.each{
		    log.info "Generate Common Catridge 1.2 XML for the Product ISBN :"+it
		    commonCartridge12IndividualXml(programInstance,it,generateXml)
		    commonCartridge12manifestXml(programInstance,it,generateXml)
		    log.info "Successfully Generated Common Catridge 1.2 XML for the Product ISBN :"+it
		}
		//Generate common catridge Zip
		log.info "Generate Common Catridge 1.2 xmls Zip file for the Program ISBNs :"+programInstance.products.isbn
		generateCCZipFile(programInstance,isbnValue,xmlType,generateXml)
		log.info "Successfully Generate Common Catridge 1.2 xmls Zip file for the Program ISBNs :"+programInstance.products.isbn
		log.info "=============================Done================================================"
	    }else if(xmlType=='XML_ALCHEMY')
	    {
		log.info "===================Generate Alchemy Import XML========================"
		isbnValue.each{

		    log.info "Generate Alchemy Import XML for the Product ISBN :"+it
		    alchemyBuildImportXmlGenerator(programInstance,it)
		    log.info "Successfully Generated Alchemy Import XML for the Product ISBN :"+it
		    log.info "Generate Alchemy Individual XML for the Product ISBN :"+it
		    alchemyBuildIndividualXmlGenerator(programInstance,it)
		    log.info "Successfully Generated Alchemy Individual XML for the Product ISBN :"+it
		    log.info "Generate Alchemy CSV for the Product ISBN :"+it
		    alchemyCsvGeneratorService.alchemyBuildCSVGenerator( programInstance, it )
		    log.info "Successfully Generated Alchemy CSV for the Product ISBN :"+it


		}
		//Generate MDS,Planner and common catridge XMLs
		log.info "Generate Alchemy Zip file for the Program ISBNs :"+programInstance.products.isbn
		generateAlchemyZipFile(programInstance,isbnValue)
		log.info "Successfully Generate Alchemy Zip file for the Program ISBNs :"+programInstance.products.isbn
		log.info "=============================Done================================================"
	    }else if(xmlType=='XML_CC13')
	    {
		log.info "===================Generate Common Catridge 1.3 Schema XML========================"
		isbnValue.each{
		    log.info "Generate Common Catridge 1.3 Schema XML for the Product ISBN :"+it
		    commonCartridge13manifestXml(programInstance,it,generateXml)
		    log.info "Successfully Generated Common Catridge 1.3 Schema XML for the Product ISBN :"+it
		}
		//Generate common catridge Zip
		log.info "Generate Common Catridge xmls 1.3 Schema Zip file for the Program ISBNs :"+programInstance.products.isbn
		generateCCZipFile(programInstance,isbnValue,xmlType,generateXml)

		log.info "Successfully Generated Common Catridge xmls 1.3 Schema Zip file for the Program ISBNs :"+programInstance.products.isbn
		log.info "=============================Done================================================"

	    }else if(xmlType=='XML_CORRELATIONS')
	    {
		log.info "===================Generate TC Standard Correlations XML========================"
		def cFlag=true
		isbnValue.each{
		    log.info "Generate TC Standard Correlation XML for the Product ISBN :"+it
		    cFlag=tcStandardCorrelationsGenerator(programInstance,it)
		    log.info "Successfully Generated TC Standard Correlation XML for the Product ISBN :"+it
		}
		if(cFlag){
		//Generate common catridge Zip
		log.info "Generate TC Standard Correlations Zip file for the Program ISBNs :"+programInstance.products.isbn
		generateZipFile(programInstance,xmlType)
		

		log.info "Successfully Generated TC Standard Correlation XML Schema Zip file for the Program ISBNs :"+programInstance.products.isbn
		
		}
		
		log.info "=============================Done================================================"
	    }

	}catch(Exception ex){
	    log.error "generateXMLs : Found errors while generating XMLs/Zip files "+ ex.getMessage()
	    return false
	}
	return true
    }
    /**
     * mdsXmlGenerator
     * @param programInstance
     * @param isbnValue
     * A Method which generates the HMOF MDS xml
     */
    def mdsXmlGenerator(Program programInstance,def isbnValue,GenerateXmls generateXml)
    {

	def productInstance = Product.where{ isbn == isbnValue}.get()
	def targetResourceList = Content.where{product.isbn == productInstance.isbn}.list()
	def builder = new StreamingMarkupBuilder()
	builder.encoding = 'UTF-8'
	ArrayList<String> items = new ArrayList<String>()
	def productsXMLLocation =grailsApplication.config.getProperty('MDSXMLFolder')
	try{

	    if(targetResourceList){

		File dir = new File(productsXMLLocation)
		if(dir.exists()){
		    log.info("A folder is already exist in the path "+productsXMLLocation)
		}else{
		    dir.mkdir()
		}
		File dir1 = new File(productsXMLLocation+programInstance.name)
		dir1.mkdir()
		File f1 = new File(productsXMLLocation+programInstance.name+"/mds_resources_"+productInstance.isbn+".xml")
		//Build XML

		def xml = mdsBuilderService.mdsBuildXml(targetResourceList,programInstance,productInstance,generateXml)
		BufferedWriter writer = new BufferedWriter(new OutputStreamWriter(new FileOutputStream(productsXMLLocation+programInstance.name+"/mds_resources_"+productInstance.isbn+".xml"),"UTF-8"))
		writer << builder.bind(xml)
		writer.close()
	    }
	}catch(Exception ex){
	    log.error "mdsXmlGenerator : Found errors while generating MDS XMLs "+ ex.getMessage()
	    return false
	}
    }


    /**
     * plannerXmlGenerator
     * @param programInstance
     * @param isbnValue
     * A Method which generates the HMOF Planner XML
     */
    def plannerXmlGenerator(Program programInstance, def isbnValue) {

	def productInstance = Product.where{ isbn == isbnValue}.get()
	if (productInstance){

	    def isbn = productInstance.isbn

	    def nonLocalResources = Content.where{product.isbn == productInstance.isbn && nonLocalResource==true }.list()
	    if(nonLocalResources){
		log.info"The following ${nonLocalResources.size()} Resources are not icluded in the Planner XML as they have non-local-resource field set to True: ${nonLocalResources.displayTitle}"
	    }

	    def targetResourceList = Content.where{product.isbn == productInstance.isbn && nonLocalResource==false }.list(sort: "sortId")

	    def builder = new StreamingMarkupBuilder()
	    builder.encoding = 'UTF-8'
	    ArrayList<String> items = new ArrayList<String>()
	    def plannerXMLLocation =grailsApplication.config.getProperty('PlannerXMLFolder')

	    try{
		if(targetResourceList){
		    File dir = new File(plannerXMLLocation)
		    if(dir.exists()){
			log.debug("A folder is already exist in the path " + plannerXMLLocation)
		    }else{
			dir.mkdir()
		    }
		    File f = new File(plannerXMLLocation+"/"+programInstance.name)
		    f.mkdir()
		    File f1 = new File(plannerXMLLocation+"/"+programInstance.name+"/hsp_plannercontent_"+isbn+".xml")

		    //Build XML
		    def xml = plannerBuilderService.plannerBuildXml(targetResourceList, programInstance, productInstance)
		    BufferedWriter writer = new BufferedWriter(new FileWriter(plannerXMLLocation+"/"+programInstance.name+"/hsp_plannercontent_"+isbn+".xml"))
		    writer << builder.bind(xml)
		    writer.close()
		}
	    }catch(Exception ex){
		log.error "There were errors generating Planner XML files: " + ex.getMessage()
		return false
	    }

	    return true
	}
    }

    /**
     * alchemyBuildImportXmlGenerator
     * @param programInstance
     * @param isbnValue
     * A Method which generates the TCK6 Alchemy xml
     */
    def alchemyBuildImportXmlGenerator(Program programInstance,def isbnValue) {
	def productInstance = Product.where{ isbn == isbnValue}.list()
	def targetResourceLists=Content.where{product.isbn == productInstance.isbn}.list()
	def targetResourceList=[]
	targetResourceLists.each{resrc->
	    def toolTypes =grailsApplication.config.getProperty('ExcludeAlchemyXmlToolType')
	    if(!toolTypes.contains(String.valueOf(resrc.component.toolType)))
	    {
		targetResourceList.add(resrc)
	    }else
	    {
		log.warn("Resource '"+resrc.displayTitle+"' which have tool type "+resrc.component.toolType+" is not including in the Alchemy Xml's.")
	    }
	}
	def builder = new StreamingMarkupBuilder()
	builder.encoding = 'UTF-8'
	ArrayList<String> items = new ArrayList<String>()
	def alchemyXMLLocation =grailsApplication.config.getProperty('AlchemyXMLFolder')
	try{
	    if(targetResourceList){
		File dir = new File(alchemyXMLLocation)
		if(dir.exists()){
		    log.info("A folder is already exist in the path "+alchemyXMLLocation)
		}else{
		    dir.mkdir()
		}
		File f = new File(alchemyXMLLocation+"/"+programInstance.name)
		f.mkdir()
		if(f.exists()){
		    log.info("A folder is already exist in the path "+alchemyXMLLocation+"/"+programInstance.name)
		}else{
		    f.mkdir()
		}
		File f1 = new File(alchemyXMLLocation+"/"+programInstance.name+"/"+isbnValue)
		f1.mkdir()
		//Build alchemy_import  XML
		def xml = alchemyBuilderService.alchemyBuildImportXml(targetResourceList,programInstance)
		items.add(alchemyXMLLocation+"/"+programInstance.name+"/"+isbnValue+"/alchemy_import.xml")
		BufferedWriter writer = new BufferedWriter(new FileWriter(alchemyXMLLocation+"/"+programInstance.name+"/"+isbnValue+"/alchemy_import.xml"))
		writer << builder.bind(xml)
		writer.close()
	    }
	    //End alchemy_import xml
	}catch(Exception ex){
	    log.error "alchemyBuildImportXmlGenerator : Found errors while generating Alchemy Import XMLs "+ ex.getMessage()
	    return false
	}

	return true

    }


    /**
     * alchemyXmlGenerator
     * @param programInstance
     * @param isbnValue
     * A Method which generates the TCK6 Alchemy xml
     */
    def alchemyBuildIndividualXmlGenerator(Program programInstance,def isbnValue) {

	def productInstance = Product.where{ isbn == isbnValue}.list()
	def targetResourceLists=Content.where{product.isbn == productInstance.isbn}.list()
	def targetResourceList=[]
	targetResourceLists.each{resrc->
	    def toolTypes =grailsApplication.config.getProperty('ExcludeAlchemyXmlToolType')
	    if(!toolTypes.contains(String.valueOf(resrc.component.toolType)))
	    {
		targetResourceList.add(resrc)
	    }
	}
	def builder = new StreamingMarkupBuilder()
	builder.encoding = 'UTF-8'
	ArrayList<String> items = new ArrayList<String>()
	def alchemyXMLLocation =grailsApplication.config.getProperty('AlchemyXMLFolder')

	try{
	    //Build alchemy individual  XML
	    if(targetResourceList){
		targetResourceList.hmhId.each{hmhid->
		    def xml = alchemyBuilderService.alchemyBuildIndividualXml(hmhid)
		    items.add(alchemyXMLLocation+"/"+programInstance.name+"/"+isbnValue+"/"+hmhid+".xml")
		    BufferedWriter writer = new BufferedWriter(new FileWriter(alchemyXMLLocation+"/"+programInstance.name+"/"+isbnValue+"/"+hmhid+".xml"))
		    writer << builder.bind(xml)
		    writer.close()
		}
	    }
	    //End alchemy_import xml
	}catch(Exception ex){
	    log.error "alchemyBuildIndividualXmlGenerator : Found errors while generating Alchemy Individual XMLs "+ ex.getMessage()
	    return false
	}

	return true

    }

    /**
     * generateZipFile
     * @param programInstance
     * @param xmlType
     * A Method which generates the HMOF/TCK6  MDS/Planner/Cartridge Zip files
     */
    def generateZipFile(Program programInstance,def xmlType)
    {
	def productsXMLLocation
	def zipFile
	try{
	    FileOutputStream fos= null
	    ZipOutputStream zos = null
	    FileInputStream fis= null
	    // create byte buffer
	    byte[] buffer = new byte[1024]
	    if(xmlType=='XML_MDS'){
		productsXMLLocation =grailsApplication.config.getProperty('MDSXMLFolder')
		zipFile = productsXMLLocation+"/MDS_"+programInstance.name+".zip"
	    }else if(xmlType=='XML_PLANNER')
	    {
		productsXMLLocation =grailsApplication.config.getProperty('PlannerXMLFolder')
		zipFile = productsXMLLocation+"/Planner_"+programInstance.name+".zip"
	    }else if(xmlType=='XML_CORRELATIONS')
	    {
		productsXMLLocation =grailsApplication.config.getProperty('TCStndCorrelationsFolder')
		zipFile = productsXMLLocation+"/TCCorrelations_"+programInstance.name+".zip"
	    }

	    fos = new FileOutputStream(zipFile)
	    zos = new ZipOutputStream(fos)
	    int count=1
	    File folder = new File(productsXMLLocation+"/"+programInstance.name)
	    File[] listOfFiles = folder.listFiles()
	    for (int i = 0 ;i < listOfFiles.length; i++) {
		if(listOfFiles){
		    if (listOfFiles[i].isFile()) {
			fis = new FileInputStream(listOfFiles[i])
			zos.putNextEntry(new ZipEntry(listOfFiles[i].getName()))
			int length
			while ((length = fis.read(buffer)) > 0) {
			    zos.write(buffer, 0, length)
			}

			zos.closeEntry()
			// close the InputStream
			fis.close()
		    }
		}
	    }


	    if(zos!=null)
		zos.close()

	    log.info "generateZipFile : Delete the folder after Zip file generated"
	    if(folder.exists())
		deleteFolder(folder)
	    log.info "generateZipFile : Deleted the folder"
	}catch(Exception ex){
	    log.error "generateZipFile : Found errors while generating Zip file "+ ex.getMessage()
	    return false
	}
    }
    /**
     * generateAlchemyZipFile
     * @param programInstance
     * @param isbnValues
     * A Method which generates the TCK6 Alchemy Zip files
     */
    def generateAlchemyZipFile(Program programInstance,def isbnValues)
    {
	def productsXMLLocation
	def zipFile
	try{
	    FileOutputStream fos= null
	    ZipOutputStream zos = null
	    FileInputStream fis= null
	    // create byte buffer
	    byte[] buffer = new byte[1024]
	    productsXMLLocation =grailsApplication.config.getProperty('AlchemyXMLFolder')
	    zipFile = productsXMLLocation+"/Alchemy_"+programInstance.name+".zip"
	    File parentfolder = new File(productsXMLLocation+"/"+programInstance.name)
	    fos = new FileOutputStream(zipFile)
	    zos = new ZipOutputStream(fos)
	    int count=1
	    isbnValues.each{
		File folder = new File(productsXMLLocation+"/"+programInstance.name+"/"+it)
		File[] listOfFiles = folder.listFiles()
		if(listOfFiles){
		    for (int i = 0; i < listOfFiles.length; i++) {
			if (listOfFiles[i].isFile()) {
			    fis = new FileInputStream(listOfFiles[i])
			    zos.putNextEntry(new ZipEntry(it+"/"+listOfFiles[i].getName()))
			    int length
			    while ((length = fis.read(buffer)) > 0) {
				zos.write(buffer, 0, length)
			    }
			    zos.closeEntry()
			    // close the InputStream
			    fis.close()
			}

		    }
		}
	    }

	    if(zos!=null)
		zos.close()

	    log.info "generateAlchemyZipFile : Delete the folder after Zip file generated"
	    if(parentfolder.exists())
		deleteFolder(parentfolder)
	    log.info "generateAlchemyZipFile : Deleted the folder"
	}catch(Exception ex){
	    log.error "generateAlchemyZipFile : Found errors while generating Alchemy Zip file "+ ex.getMessage()
	    return false
	}
    }
    /**
     * generateCCZipFile
     * @param programInstance
     * @param isbnValues
     * A Method which generates the TCK6 Alchemy Zip files
     */
    def generateCCZipFile(Program programInstance,def isbnValues,def xmlType,def generateXmls)
    {
	def productsXMLLocation
	def zipFile
	try{
	    FileOutputStream fos= null
	    ZipOutputStream zos = null
	    FileInputStream fis= null
	    // create byte buffer
	    byte[] buffer = new byte[1024]
	    //grades=grades.replaceAll(",","_")

	    if(xmlType=='XML_CC12')
	    {
		productsXMLLocation =grailsApplication.config.getProperty('CommonCartridge12XMLFolder')
		if(generateXmls.ccXmlLevel=="Program Level"){
		    if(generateXmls.isStandards=="Ignore Standards")
		    {
			zipFile = productsXMLLocation+"/CC_12_"+programInstance.name+".zip"
		    }else if(generateXmls.isStandards=="Include Standards" && generateXmls.standardType=="Generic Delivery")
		    {
			zipFile = productsXMLLocation+"/CC_12_ABStandards_"+programInstance.name+".zip"
		    }else if(generateXmls.isStandards=="Include Standards" && generateXmls.standardType=="Brainhoney Delivery")
		    {
			zipFile = productsXMLLocation+"/CC_12_BrainHoney_"+programInstance.name+".zip"
		    }
		}
		else{

		    if(generateXmls.isStandards=="Ignore Standards")
		    {
			zipFile = productsXMLLocation+"/CC_12_grades_"+programInstance.name+".zip"
		    }else if(generateXmls.isStandards=="Include Standards" && generateXmls.standardType=="Generic Delivery")
		    {
			zipFile = productsXMLLocation+"/CC_12_grades_ABStandards_"+programInstance.name+".zip"
		    }else if(generateXmls.isStandards=="Include Standards" && generateXmls.standardType=="Brainhoney Delivery")
		    {

			zipFile = productsXMLLocation+"/CC_12_grades_BrainHoney_"+programInstance.name+".zip"
		    }
		}

	    }else if(xmlType=='XML_CC13')
	    {
		productsXMLLocation =grailsApplication.config.getProperty('CommonCartridge13XMLFolder')
		if(generateXmls.ccXmlLevel=="Program Level"){
		    if(generateXmls.isStandards=="Ignore Standards")
		    {
			zipFile = productsXMLLocation+"/CC_13_"+programInstance.name+".zip"
		    }else if(generateXmls.isStandards=="Include Standards" && generateXmls.standardType=="Generic Delivery")
		    {
			zipFile = productsXMLLocation+"/CC_13_ABStandards_"+programInstance.name+".zip"
		    }else if(generateXmls.isStandards=="Include Standards" && generateXmls.standardType=="Brainhoney Delivery")
		    {
			zipFile = productsXMLLocation+"/CC_13_BrainHoney_"+programInstance.name+".zip"
		    }

		}else
		{
		    if(generateXmls.isStandards=="Ignore Standards")
		    {
			zipFile = productsXMLLocation+"/CC_13_grades_"+programInstance.name+".zip"
		    }else if(generateXmls.isStandards=="Include Standards" && generateXmls.standardType=="Generic Delivery")
		    {
			zipFile = productsXMLLocation+"/CC_13_grades_ABStandards_"+programInstance.name+".zip"
		    }else if(generateXmls.isStandards=="Include Standards" && generateXmls.standardType=="Brainhoney Delivery")
		    {

			zipFile = productsXMLLocation+"/CC_13_grades_BrainHoney_"+programInstance.name+".zip"
		    }

		}

	    }
	    fos = new FileOutputStream(zipFile)
	    zos = new ZipOutputStream(fos)
	    int count=1
	    File parentfolder = new File(productsXMLLocation+"/"+programInstance.name)
	    if(generateXmls.ccXmlLevel=="Program Level"){
		isbnValues.each{


		    File folder = new File(productsXMLLocation+"/"+programInstance.name+"/"+it);
		    File[] listOfFiles = folder.listFiles();
		    if(listOfFiles){
			for (int i = 0; i < listOfFiles.length; i++) {
			    if (listOfFiles[i].isFile()) {
				fis = new FileInputStream(listOfFiles[i]);
				zos.putNextEntry(new ZipEntry(it+"/"+listOfFiles[i].getName()));
				int length;
				while ((length = fis.read(buffer)) > 0) {
				    zos.write(buffer, 0, length);
				}
				zos.closeEntry()
				//close the InputStream
				fis.close()
				if(xmlType=='XML_CC12')
				{
				    File resFolder = new File(productsXMLLocation+"/"+programInstance.name+"/"+it+"/res");
				    File[] listOfResFiles = resFolder.listFiles();
				    if(listOfResFiles){
					for (int r = 0; r < listOfResFiles.length; r++) {
					    if (listOfResFiles[r].isFile()) {
						fis = new FileInputStream(listOfResFiles[r]);
						zos.putNextEntry(new ZipEntry(it+"/res/"+listOfResFiles[r].getName()))
						int resLength;
						while ((resLength = fis.read(buffer)) > 0) {
						    zos.write(buffer, 0, resLength)
						}
						zos.closeEntry()
						//close the InputStream
						fis.close()
					    }
					}
				    }

				}

			    }


			}
		    }

		}
	    }


	    if(generateXmls.ccXmlLevel=="Grade Level"){


		File folder = new File(productsXMLLocation+"/"+programInstance.name)
		File[] listOfFiles = folder.listFiles()

		if(listOfFiles){
		    for (int i = 0; i < listOfFiles.length; i++) {
			File folder1 = new File(productsXMLLocation+"/"+programInstance.name+"/"+listOfFiles[i].getName())
			File[] listOfGFiles = folder1.listFiles()
			if(listOfGFiles){
			    for (int j = 0; j < listOfGFiles.length; j++) {
				File folder2 = new File(productsXMLLocation+"/"+programInstance.name+"/"+listOfFiles[i].getName()+"/"+listOfGFiles[j].getName())
				File[] listOfIsbnFiles = folder2.listFiles()
				// if (listOfGFiles[j].isFile()) {
				for (int k = 0; k < listOfIsbnFiles.length; k++) {

				    if (listOfIsbnFiles[k].isFile()) {
					fis = new FileInputStream(listOfIsbnFiles[k])
					zos.putNextEntry(new ZipEntry(listOfFiles[i].getName()+"/"+listOfGFiles[j].getName()+"/"+listOfIsbnFiles[k].getName()))
					int length;
					while ((length = fis.read(buffer)) > 0) {
					    zos.write(buffer, 0, length)
					}
					zos.closeEntry()
					//close the InputStream
					fis.close()

					if(xmlType=='XML_CC12')
					{
					    File resFolder = new File(productsXMLLocation+"/"+programInstance.name+"/"+"/"+listOfFiles[i].getName()+"/"+listOfGFiles[j].getName()+"/res")
					    File[] listOfResFiles = resFolder.listFiles()
					    if(listOfResFiles){
						for (int r = 0; r < listOfResFiles.length; r++) {

						    if (listOfResFiles[r].isFile()) {
							fis = new FileInputStream(listOfResFiles[r])
							zos.putNextEntry(new ZipEntry(listOfFiles[i].getName()+"/"+listOfGFiles[j].getName()+"/res/"+listOfResFiles[r].getName()));
							int resLength;
							while ((resLength = fis.read(buffer)) > 0) {
							    zos.write(buffer, 0, resLength);
							}
							zos.closeEntry()
							//close the InputStream
							fis.close()
						    }
						}
					    }
					}
				    }

				}
			    }
			}

		    }


		}


	    }
	    if(zos!=null)
		zos.close();

	    fos.close();
	    log.info "generateCCXmlZipFile : Delete the folder after Zip file generated"
	    if(parentfolder.exists())
		deleteFolder(parentfolder)
	    log.info "generateCCXmlZipFile : Deleted the folder"
	    return true
	}catch(Exception ex){
	    log.error "generateCCZipFile : Found errors while generating CC Zip file "+ ex.getMessage()
	    return false
	}
    }
    /**
     * commonCartridge12manifestXml
     * @param programInstance
     * @param isbnValue
     * A Method which generates the HMOF/TC Common Cartridge 1.2 Individual Xml
     */
    def commonCartridge12manifestXml(Program programInstance,def isbnValue,GenerateXmls generateXmls) {

	def productInstance = Product.where{ isbn == isbnValue}.get()

	def isbn=productInstance.isbn
	def targetResourceList
	def isbnTargetResourceList = []
	def gradeTargetResourceMap = new HashMap<String,String>();
	def keywords = []
	def standards = []
	def builder = new StreamingMarkupBuilder()
	builder.encoding = 'UTF-8'
	ArrayList<String> items = new ArrayList<String>()
	def commonCartridgeXMLLocation = grailsApplication.config.getProperty('CommonCartridge12XMLFolder')

	try{

	    File dir = new File(commonCartridgeXMLLocation)
	    if(dir.exists()){
		log.info("A folder is already exist in the path "+commonCartridgeXMLLocation)
	    }else{
		dir.mkdir()
	    }
	    File f = new File(commonCartridgeXMLLocation+"/"+programInstance.name)
	    f.mkdir()


	    if(generateXmls.ccXmlLevel=="Program Level"){

		isbnTargetResourceList = Content.where{product.isbn == productInstance.isbn && searchable==true}.list(sort: "sortId")
		//Build XML
		if(isbnTargetResourceList){
		    def xml = commonCartridgeService.commonCartridge12manifestXml(isbnTargetResourceList,programInstance,productInstance,generateXmls)
		    BufferedWriter writer
		    File f1 = new File(commonCartridgeXMLLocation+"/"+programInstance.name+"/"+isbn)
		    f1.mkdir()
		    writer = new BufferedWriter(new FileWriter( commonCartridgeXMLLocation+"/"+programInstance.name+"/"+isbn+"/imsmanifest.xml"))
		    writer << builder.bind(xml)
		    writer.close()
		}
	    }else
	    {

		targetResourceList = Content.where{product.isbn == productInstance.isbn && searchable==true }.list(sort: "sortId")
		if(targetResourceList){
		    targetResourceList.each{resrc->
			def levelMap =levelsService.getFullLevelsMap(resrc)
			if(levelMap.top)
			{
			    def gradeResourceList=new ArrayList()
			    for(int i=0;i<levelMap.top.grades.grade.size();i++){
				def lgrade=levelMap.top.grades.grade[i]
				if(gradeTargetResourceMap.containsKey(lgrade))
				{
				    gradeResourceList=gradeTargetResourceMap.get(lgrade);
				    gradeResourceList.add(resrc)
				    gradeTargetResourceMap.put(lgrade,gradeResourceList)
				}else{
				    gradeResourceList = new ArrayList();
				    gradeResourceList.add(resrc);
				    gradeTargetResourceMap.put(lgrade,gradeResourceList);
				}


			    }

			}

		    }
		}
		/*File f0 = new File(commonCartridgeXMLLocation+"/"+programInstance.name+"/"+isbn)
		 f0.mkdir()*/
		if(gradeTargetResourceMap){
		    gradeTargetResourceMap.each{grade,rscList->
			if(rscList){

			    def xml = commonCartridgeService.commonCartridge12manifestXml(rscList,programInstance,productInstance,generateXmls)
			    BufferedWriter writer
			    File f0 = new File(commonCartridgeXMLLocation+"/"+programInstance.name+"/Grade_"+grade)
			    f0.mkdir()
			    File f1 = new File(commonCartridgeXMLLocation+"/"+programInstance.name+"/Grade_"+grade+"/"+isbn)
			    f1.mkdir()
			    writer = new BufferedWriter(new FileWriter(commonCartridgeXMLLocation+"/"+programInstance.name+"/Grade_"+grade+"/"+isbn+"/imsmanifest.xml"))
			    writer << builder.bind(xml)
			    writer.close()
			}
		    }
		}

	    }
	}catch(Exception ex){
	    log.error "commonCartridge12XmlGenerator : Found errors while generating CommonCartridge XMLs "+ ex.getMessage()
	    return false
	}

	return true
    }
    /**
     * commonCartridge12IndividualXml
     * @param programInstance
     * @param isbnValue
     * A Method which generates the HMOF/TC Common Cartridge 1.2 Individual Xmls
     */
    def commonCartridge12IndividualXml(Program programInstance,def isbnValue,GenerateXmls generateXml) {
	def productInstance = Product.where{ isbn == isbnValue}.get()
	def isbn=productInstance.isbn

	//def targetResourceList=[]
	def isbnTargetResourceList=[]
	def gradeTargetResourceMap=new HashMap<String,String>();
	def builder = new StreamingMarkupBuilder()
	builder.encoding = 'UTF-8'
	ArrayList<String> items = new ArrayList<String>()
	def commonCartridgeXMLLocation =grailsApplication.config.getProperty('CommonCartridge12XMLFolder')

	try{

	    File dir = new File(commonCartridgeXMLLocation)
	    if(dir.exists()){
		deleteCCXmlsFolder(dir,programInstance.name)
		log.info("A folder is already exist in the path "+commonCartridgeXMLLocation)
	    }else{
		dir.mkdir()
	    }
	    File f = new File(commonCartridgeXMLLocation+"/"+programInstance.name)

	    f.mkdir()


	    if(generateXml.ccXmlLevel=="Program Level"){
		isbnTargetResourceList = Content.where{product.isbn == productInstance.isbn && searchable==true}.list(sort: "sortId")
		if(isbnTargetResourceList){
		    isbnTargetResourceList.eachWithIndex{resrc,idx->
			idx++
			def xml = commonCartridgeService.commonCartridge12IndividualXml(resrc,programInstance,productInstance)
			BufferedWriter writer

			File f1 = new File(commonCartridgeXMLLocation+"/"+programInstance.name+"/"+isbn)
			f1.mkdir()
			File f2 = new File(commonCartridgeXMLLocation+"/"+programInstance.name+"/"+isbn+"/res")
			f2.mkdir()
			writer = new BufferedWriter(new FileWriter(commonCartridgeXMLLocation+"/"+programInstance.name+"/"+isbn+"/res/resource_"+idx+"_blti.xml"))
			writer << builder.bind(xml)
			writer.close()

		    }
		}
	    }else
	    {

		def targetResourceList = Content.where{product.isbn == productInstance.isbn && searchable==true }.list(sort: "sortId")
		if(targetResourceList){
		    targetResourceList.each{resrc->
			def levelMap =levelsService.getFullLevelsMap(resrc)
			if(levelMap.top)
			{
			    def gradeResourceList=new ArrayList()
			    for(int i=0;i<levelMap.top.grades.grade.size();i++){
				def lgrade=levelMap.top.grades.grade[i]
				if(gradeTargetResourceMap.containsKey(lgrade))
				{
				    gradeResourceList=gradeTargetResourceMap.get(lgrade);
				    gradeResourceList.add(resrc)
				    gradeTargetResourceMap.put(lgrade,gradeResourceList)
				}else{
				    gradeResourceList = new ArrayList();
				    gradeResourceList.add(resrc);
				    gradeTargetResourceMap.put(lgrade,gradeResourceList);
				}


			    }

			}

		    }
		}
		/*File f0 = new File(commonCartridgeXMLLocation+"/"+programInstance.name+"/"+isbn)
		 f0.mkdir()*/
		if(gradeTargetResourceMap){
		    gradeTargetResourceMap.each{grade,resrclist->
			if(resrclist){
			    File f0 = new File(commonCartridgeXMLLocation+"/"+programInstance.name+"/Grade_"+grade)
			    f0.mkdir()
			    File f1 = new File(commonCartridgeXMLLocation+"/"+programInstance.name+"/Grade_"+grade+"/"+isbn)
			    f1.mkdir()
			    File f2 = new File(commonCartridgeXMLLocation+"/"+programInstance.name+"/Grade_"+grade+"/"+isbn+"/res")
			    f2.mkdir()
			    resrclist.eachWithIndex{resrc,idx1->
				idx1++
				def xml = commonCartridgeService.commonCartridge12IndividualXml(resrc,programInstance,productInstance)
				BufferedWriter writer
				writer = new BufferedWriter(new FileWriter(commonCartridgeXMLLocation+"/"+programInstance.name+"/Grade_"+grade+"/"+isbn+"/res/resource_"+idx1+"_blti.xml"))
				writer << builder.bind(xml)
				writer.close()
			    }

			}

		    }
		}
	    }


	}catch(Exception ex){
	    log.error "CommonCartridge12XmlGenerator : Found errors while generating CommonCartridge Individual XMLs "+ ex.getMessage()
	    return false
	}
	return true
    }


    /**
     * commonCartridge13manifestXml
     * @param programInstance
     * @param isbnValue
     * A Method which generates the HMOF/TC Common Cartridge 1.3 Individual Xml
     */
    def commonCartridge13manifestXml(Program programInstance,def isbnValue,GenerateXmls generateXmls) {

	def productInstance = Product.where{ isbn == isbnValue}.get()

	def isbn=productInstance.isbn
	def targetResourceList
	def isbnTargetResourceList=[]
	def gradeTargetResourceMap=new HashMap<String,String>();
	def builder = new StreamingMarkupBuilder()
	builder.encoding = 'UTF-8'
	ArrayList<String> items = new ArrayList<String>()
	def commonCartridgeXMLLocation =grailsApplication.config.getProperty('CommonCartridge13XMLFolder')

	try{

	    File dir = new File(commonCartridgeXMLLocation)
	    if(dir.exists()){
		deleteCCXmlsFolder(dir,programInstance.name)
		log.info("A folder is already exist in the path "+commonCartridgeXMLLocation)
	    }else{
		dir.mkdir()
	    }
	    File f = new File(commonCartridgeXMLLocation+"/"+programInstance.name)
	    f.mkdir()
	    if(generateXmls.ccXmlLevel=="Program Level"){
		isbnTargetResourceList = Content.where{product.isbn == productInstance.isbn && searchable==true}.list(sort: "sortId")
		//Build XML
		if(isbnTargetResourceList){
		    def xml = commonCartridgeService.commonCartridge13manifestXml(isbnTargetResourceList,programInstance,productInstance,generateXmls)
		    BufferedWriter writer
		    File f1 = new File(commonCartridgeXMLLocation+"/"+programInstance.name+"/"+isbn)
		    f1.mkdir()
		    writer = new BufferedWriter(new FileWriter(commonCartridgeXMLLocation+"/"+programInstance.name+"/"+isbn+"/imsmanifest.xml"))
		    writer << builder.bind(xml)
		    writer.close()
		}

	    }else
	    {
		targetResourceList = Content.where{product.isbn == productInstance.isbn && searchable==true }.list(sort: "sortId")
		if(targetResourceList){
		    targetResourceList.each{resrc->
			def levelMap =levelsService.getFullLevelsMap(resrc)
			if(levelMap.top)
			{
			    def gradeResourceList=new ArrayList()
			    for(int i=0;i<levelMap.top.grades.grade.size();i++){
				def lgrade=levelMap.top.grades.grade[i]
				if(gradeTargetResourceMap.containsKey(lgrade))
				{
				    gradeResourceList=gradeTargetResourceMap.get(lgrade);
				    gradeResourceList.add(resrc)
				    gradeTargetResourceMap.put(lgrade,gradeResourceList)
				}else{
				    gradeResourceList = new ArrayList();
				    gradeResourceList.add(resrc);
				    gradeTargetResourceMap.put(lgrade,gradeResourceList);
				}


			    }

			}

		    }
		}

		/*File f0 = new File(commonCartridgeXMLLocation+"/"+programInstance.name+"/"+isbn)
		 f0.mkdir()*/
		if(gradeTargetResourceMap){
		    gradeTargetResourceMap.each{grade,rscList->
			if(rscList){

			    def xml = commonCartridgeService.commonCartridge13manifestXml(rscList,programInstance,productInstance,generateXmls)
			    BufferedWriter writer
			    File f0 = new File(commonCartridgeXMLLocation+"/"+programInstance.name+"/Grade_"+grade)
			    f0.mkdir()
			    File f1 = new File(commonCartridgeXMLLocation+"/"+programInstance.name+"/Grade_"+grade+"/"+isbn)
			    f1.mkdir()
			    writer = new BufferedWriter(new FileWriter(commonCartridgeXMLLocation+"/"+programInstance.name+"/Grade_"+grade+"/"+isbn+"/imsmanifest.xml"))
			    writer << builder.bind(xml)
			    writer.close()
			}
		    }
		}

	    }

	}catch(Exception ex){
	    log.error "CommonCartridge13XmlGenerator : Found errors while generating CommonCartridge XMLs "+ ex.getMessage()
	    return false
	}

	return true
    }

    /**
     * generateExcel entry method	
     * @param programInstance
     * @param excelType
     * @return
     */
    def generateExcel(Program programInstance, def excelType) {

	def isbnValue = programInstance.products.isbn

	def productsExcelLocation
	def zipFile

	try{

	    def generateZipflag = false

	    if (excelType == 'EXCEL_PROGRAM_STRUCTURE'){

		log.info "Generating Program Structure for: " + programInstance

		generateZipflag = programStructureExcelGenerator( programInstance, excelType )
	    }

	    isbnValue.each {

		def isbn = it

		if(excelType=='EXCEL_MDS' || excelType == 'EXCEL_ED'){

		    log.info "Generating Excel for ISBN: " + isbn
		    generateZipflag = excelGenerator(programInstance, isbn, excelType)
		}
		else if (excelType == 'EXCEL_CORRELATIONS'){

		    log.info "Generating Correlations Excel for ISBN: " + isbn

		    generateZipflag = correlationExcelGenerator(programInstance, isbn)
		}

	    }
	    //Generate Excel ZIP
	    if(generateZipflag){

		log.info "Generating Excel Zip for: " + programInstance.products.isbn

		if(generateExcelZipFile(programInstance, excelType)) return true
		log.info "Successfully Generated Excel Zip"
	    }
	}catch(Exception ex){
	    log.error "Exception generating Excel: " + ex.getMessage()
	    return false
	}

    }

    /**
     * Generate Program Structure Excel
     * @param programInstance
     * @return
     */
    def programStructureExcelGenerator( def programInstance, def excelType ){

	try{

	    def gradeSpecificContent = contentService.getGradeSpecificContent( programInstance )           
	    excelGeneratorService.generateProgramStructure( programInstance, gradeSpecificContent, excelType )          	    
	    return true
	}catch(Exception ex){
	    log.error "Excel Program Structure Exception: " + ex.getMessage()
	    return false
	}
    }


    /**
     * Generate MDS or ED Excel	
     * @param programInstance
     * @param isbnValue
     * @param excelType
     * @return
     */
    def excelGenerator(Program programInstance, def isbnValue, def excelType)
    {
	def productInstance = Product.where{ isbn == isbnValue}.get()
	def targetResourceList = Content.where{product.isbn == productInstance.isbn}.list()
	try{

	    if(targetResourceList)
		excelGeneratorService.generateExcel(targetResourceList, programInstance, productInstance, excelType)
	    return true
	}catch(Exception ex){
	    log.error "Excel MDS Creation Exception: " + ex.getMessage()
	    return false
	}
    }


    /**
     * correlationExcelGenerator
     * @param programInstance
     * @param isbnValue
     * A Method which generates the HMOF/TCK6 correlations Excel Spreadsheet
     */
    def correlationExcelGenerator(Program programInstance, def isbnValue)
    {
	def productInstance = Product.where{ isbn == isbnValue}.get()
	def targetResourceList = Content.where{product.isbn == productInstance.isbn}.list()
	try{

	    if(targetResourceList)
		excelGeneratorService.generateCorrelationsExcel(targetResourceList,programInstance,productInstance)
	    return true
	}catch(Exception ex){
	    log.error "Excel Correlations Exception: " + ex.getMessage()
	    return false
	}
    }

    /**
     * generateExcelZipFile	
     * @param programInstance
     * @param excelType
     * @return
     */
    def generateExcelZipFile(Program programInstance, def excelType)
    {
	def productsExcelLocation
	def zipFile

	try{
	    FileOutputStream fos= null
	    ZipOutputStream zos = null
	    FileInputStream fis= null
	    // create byte buffer
	    byte[] buffer = new byte[1024]


	    if(excelType=='EXCEL_MDS')
	    {
		productsExcelLocation = grailsApplication.config.getProperty('MDSExcelFolder')
		zipFile = productsExcelLocation+"/Excel_" + programInstance.name+".zip"
	    }

	    else if(excelType=='EXCEL_ED')
	    {
		productsExcelLocation = grailsApplication.config.getProperty('EDExcelFolder')
		zipFile = productsExcelLocation+"/Excel_" +  programInstance.name+".zip"
	    }

	    else if (excelType=='EXCEL_CORRELATIONS')
	    {
		productsExcelLocation = grailsApplication.config.getProperty('CorrelationsExcelFolder')
		zipFile = productsExcelLocation+"/Excel_"+programInstance.name+".zip"
	    }

	    else if (excelType=='EXCEL_PROGRAM_STRUCTURE')
	    {
		productsExcelLocation = grailsApplication.config.getProperty('ProgramStructureExcelFolder')
		zipFile = productsExcelLocation+"/Excel_"+programInstance.name+".zip"
	    }

	    fos = new FileOutputStream(zipFile)
	    zos = new ZipOutputStream(fos)
	    int count=1
	    File folder = new File(productsExcelLocation+"/"+programInstance.name)
	    File[] listOfFiles = folder.listFiles()
	    for (int i = 0; i < listOfFiles.length; i++) {
		if (listOfFiles[i].isFile()) {
		    fis = new FileInputStream(listOfFiles[i])
		    zos.putNextEntry(new ZipEntry(listOfFiles[i].getName()))
		    int length
		    while ((length = fis.read(buffer)) > 0) {
			zos.write(buffer, 0, length)
		    }

		    zos.closeEntry()
		    // close the InputStream
		    fis.close()
		}
	    }
	    if(zos!=null)
		zos.close()

	    fos.close();

	    log.info "generateExcelZipFile : Delete the folder after Zip file generated"
	    if(folder.exists())
		deleteFolder(folder)
	    log.info "generateExcelZipFile : Deleted the folder"
	}catch(Exception ex){
	    log.error "generateExcelZipFile : Found errors while generating Zip file "+ ex.getMessage()
	    return false
	}

	return true
    }


    /**
     * deleteFolder
     * @param folder
     * A Method which deletes the generated the HMOF/TCK6  MDS/Planner/Cartridge temp files and Program folder
     */
    def deleteFolder(File folder)
    {
	if(folder && folder.exists()){
	    File[] files = folder.listFiles()
	    for (int i = 0; i < files.length; i++) {
		println files[i]
		if (files[i].isDirectory()) {
		    deleteFolder( FileUtils.forceDelete(files[i]))
		    //  deleteFolder(files[i])
		} else {
		    FileUtils.forceDelete(files[i])
		}
	    }

	    FileUtils.forceDelete(folder)
	}
    }

    /**
     * deleteFolder
     * @param folder
     * A Method which deletes the generated the HMOF/TCK6  MDS/Planner/Cartridge temp files and Program folder
     */
    def deleteCCXmlsFolder(File folder,def filename)
    {

	if(folder && folder.exists()){
	    File[] files = folder.listFiles()
	    for (int i = 0; i < files.length; i++) {
		println files[i]
		String fileName = files[i].getName()
		if(fileName.contains(filename) && fileName.endsWith(".zip")) {
		    FileUtils.forceDelete(files[i])
		}
	    }


	}
    }



    /**
     * tcStandardCorrelationsGenerator
     * @param programInstance
     * @param isbnValue
     * A Method which generates the TC Standard Correlations Generator xml
     */
    def tcStandardCorrelationsGenerator(Program programInstance,def isbnValue)
    {

	def productInstance = Product.where{ isbn == isbnValue}.get()
	def targetResourceList = Content.where{product.isbn == productInstance.isbn}.list()
	def builder = new StreamingMarkupBuilder()
	def isTargetResources=false
	builder.encoding = 'UTF-8'
	ArrayList<String> items = new ArrayList<String>()
	def productsXMLLocation =grailsApplication.config.getProperty('TCStndCorrelationsFolder')
	try{

	    if(targetResourceList){

		targetResourceList.each{resrc->
		    if(!isTargetResources && resrc){
			def resData=correlationMappingService.getTargetContents(resrc)
			if(resData.targetResources)
			{
			    isTargetResources=true
			}

		    }
		}
		if(isTargetResources){
		    File dir = new File(productsXMLLocation)
		    if(dir.exists()){
			log.info("A folder is already exist in the path "+productsXMLLocation)
		    }else{
			dir.mkdir()
		    }
		    File dir1 = new File(productsXMLLocation+programInstance.name)
		    dir1.mkdir()
		    File f1 = new File(productsXMLLocation+programInstance.name+"/hsp_correlations_"+productInstance.isbn+".xml")
		    //Build XML


		    def xml = standardTCCorrelationService.standardCorrXml(targetResourceList,programInstance,productInstance)
		    BufferedWriter writer = new BufferedWriter(new OutputStreamWriter(new FileOutputStream(productsXMLLocation+programInstance.name+"/hsp_correlations_"+productInstance.isbn+".xml"),"UTF-8"))
		    writer << builder.bind(xml)
		    writer.close()
		}
		else
		{
		    return false
		}
	    }
	}catch(Exception ex){
	    log.error "tcStandardCorrelationsGenerator : Found errors while generating TC Standard Correlations XMLs "+ ex.getMessage()
	    return false
	}
    }

}

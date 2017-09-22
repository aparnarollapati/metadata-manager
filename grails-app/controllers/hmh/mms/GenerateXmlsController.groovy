package hmh.mms

import static org.springframework.http.HttpStatus.*
import grails.transaction.Transactional
import java.text.*
import java.text.SimpleDateFormat;
import java.util.Date;
import grails.core.GrailsApplication

@Transactional(readOnly = true)
class GenerateXmlsController {

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def fileGeneratorService
    def springSecurityService
    GrailsApplication grailsApplication
    def correlationMappingService
    /**
     * method was changed to pass in a list of Programs as a way to get its list of Generate-XML instances
     * @param max
     * @return
     */
    def index(Integer max) {
	params.max = Math.min(max ?: 10, 100)
	//respond GenerateXmls.list(params), model:[generateXmlsCount: GenerateXmls.count()]
	respond Program.list(params), model: [programCount: Program.count()]
    }

    def show(GenerateXmls generateXmls) {
	respond generateXmls
    }

    @Transactional
    def save(GenerateXmls generateXmls) {

	def programInstance=Program.get(generateXmls.programsId)
	def jsondata = [:]

	fileGeneratorService.generateXMLs(programInstance,generateXmls)

	def generateXmlsInstance
	generateXmlsInstance=GenerateXmls.where{programsId==generateXmls.programsId && xmlType==generateXmls.xmlType}.get()

	SimpleDateFormat inputFormatter = new SimpleDateFormat("dd-M-yyyy HH:mm:ss a");
	String formattedDate = inputFormatter.format(new Date());


	if(!generateXmlsInstance)
	{
	    generateXmls.username=springSecurityService?.currentUser?.username
	    generateXmls.program=programInstance
	    generateXmls.lastUpdatedDate=formattedDate
	    generateXmls.save( flush:true,failOnError: true)
	    jsondata = [status: 200]
	    respond  jsondata
	}else
	{
	    generateXmlsInstance.username=springSecurityService?.currentUser?.username
	    generateXmlsInstance.lastUpdatedDate=formattedDate
	    if(generateXmls.ccXmlLevel)
	    {
		generateXmlsInstance.ccXmlLevel=generateXmls.ccXmlLevel
		generateXmlsInstance.isStandards=generateXmls.isStandards
		generateXmlsInstance.standardType=generateXmls.standardType
	    }
	    generateXmlsInstance.save flush:true
	    jsondata = [status: 200]
	    respond  jsondata
	}
	respond generateXmls.errors
    }

    @Transactional
    def update(GenerateXmls generateXmls) {
	if (generateXmls == null) {
	    transactionStatus.setRollbackOnly()
	    render status: NOT_FOUND
	    return
	}

	if (generateXmls.hasErrors()) {
	    transactionStatus.setRollbackOnly()
	    respond generateXmls.errors, view:'edit'
	    return
	}
	generateXmls.save flush:true
	respond generateXmls, [status: OK, view:"show"]
    }

    @Transactional
    def delete(GenerateXmls generateXmls) {
	if (generateXmls == null) {
	    transactionStatus.setRollbackOnly()
	    render status: NOT_FOUND
	    return
	}
	generateXmls.delete flush:true
	render status: NO_CONTENT
    }

    def DownloadFile()
    {
	def programId = request.getParameter("programId")
	def xmlType = request.getParameter("xmlId")
	def ccXmlLevel = request.getParameter("levels")
	def standardType = request.getParameter("standardType")
	def isStandards = request.getParameter("isStandard")

	File downloadFile
	def programInstance=Program.get(programId)
	def productsXMLLocation


	if(xmlType=='XML_MDS')
	{
	    productsXMLLocation =grailsApplication.config.getProperty('MDSXMLFolder')
	    downloadFile = new File(productsXMLLocation+"/MDS_"+programInstance.name+".zip")
	}else if(xmlType=='XML_PLANNER')
	{
	    productsXMLLocation =grailsApplication.config.getProperty('PlannerXMLFolder')
	    downloadFile = new File(productsXMLLocation+"/Planner_"+programInstance.name+".zip")
	}else if(xmlType=='XML_CC12')
	{
	    productsXMLLocation =grailsApplication.config.getProperty('CommonCartridge12XMLFolder')
	    // def generateXmlInstance=GenerateXmls.where{programsId==programInstance.id && xmlType== xmlType }.get()

	    if(ccXmlLevel!="Program Level"){

		if(isStandards=="Ignore Standards")
		{
		    downloadFile = new File(productsXMLLocation+"/CC_12_grades_"+programInstance.name+".zip")
		}else if(isStandards=="Include Standards" && standardType=="Generic Delivery")
		{
		    downloadFile = new File(productsXMLLocation+"/CC_12_grades_ABStandards_"+programInstance.name+".zip")

		}else if(isStandards=="Include Standards" && standardType=="Brainhoney Delivery")
		{
		    downloadFile = new File(productsXMLLocation+"/CC_12_grades_BrainHoney_"+programInstance.name+".zip")

		}

	    }else
	    {

		if(isStandards=="Ignore Standards")
		{
		    downloadFile = new File(productsXMLLocation+"/CC_12_"+programInstance.name+".zip")
		}else if(isStandards=="Include Standards" && standardType=="Generic Delivery")
		{
		    downloadFile = new File(productsXMLLocation+"/CC_12_ABStandards_"+programInstance.name+".zip")

		}else if(isStandards=="Include Standards" && standardType=="Brainhoney Delivery")
		{
		    downloadFile = new File(productsXMLLocation+"/CC_12_BrainHoney_"+programInstance.name+".zip")
		}

	    }
	}else if(xmlType=='XML_ALCHEMY')
	{
	    productsXMLLocation =grailsApplication.config.getProperty('AlchemyXMLFolder')
	    downloadFile = new File(productsXMLLocation+"/Alchemy_"+programInstance.name+".zip")
	}else if(xmlType=='XML_CC13')
	{
	    productsXMLLocation =grailsApplication.config.getProperty('CommonCartridge13XMLFolder')
	    //   def generateXmlInstance=GenerateXmls.where{programId==programInstance.id}.listOrderByLastUpdatedDate(max: 1, order: "desc")
	    if(ccXmlLevel!="Program Level")
	    {

		if(isStandards=="Ignore Standards")
		{
		    downloadFile = new File(productsXMLLocation+"/CC_13_grades_"+programInstance.name+".zip")
		}else if(isStandards=="Include Standards" && standardType=="Generic Delivery")
		{
		    downloadFile = new File(productsXMLLocation+"/CC_13_grades_ABStandards_"+programInstance.name+".zip")

		}else if(isStandards=="Include Standards" && standardType=="Brainhoney Delivery")
		{
		    downloadFile = new File(productsXMLLocation+"/CC_13_grades_BrainHoney_"+programInstance.name+".zip")

		}

	    }

	    else{
		if(isStandards=="Ignore Standards")
		{
		    downloadFile = new File(productsXMLLocation+"/CC_13_"+programInstance.name+".zip")
		}else if(isStandards=="Include Standards" && standardType=="Generic Delivery")
		{
		    downloadFile = new File(productsXMLLocation+"/CC_13_ABStandards_"+programInstance.name+".zip")

		}else if(isStandards=="Include Standards" && standardType=="Brainhoney Delivery")
		{
		    downloadFile = new File(productsXMLLocation+"/CC_13_BrainHoney_"+programInstance.name+".zip")
		}

	    }

	}else if(xmlType=='XML_CORRELATIONS')
	{
	    productsXMLLocation =grailsApplication.config.getProperty('TCStndCorrelationsFolder')
	    downloadFile = new File(productsXMLLocation+"/TCCorrelations_"+programInstance.name+".zip")
	}
	log.debug("downloadFile is:" + downloadFile)

	OutputStream myOut = null;
	FileInputStream fileInputStream = null;
	response.setContentType("application/zip");
	response.setHeader("Content-Disposition","attachment; filename=\"" + productsXMLLocation+"/"+programInstance.name +".zip" + "\"");
	response.setContentLength((int)downloadFile.length());


	myOut = response.getOutputStream();
	InputStream fIs = new BufferedInputStream(new FileInputStream(downloadFile));
	byte[] array=new byte[4096];
	for(int numberRead=fIs.read(array);numberRead!=-1;numberRead=fIs.read(array)){
	    myOut.write(array,0,numberRead);

	}
	fIs.close();

	myOut.flush();
	myOut.close();

    }

    def isCorrelationResource()
    {
	def jsondata = [:]
	def isbnValue
	def programId=request.getParameter("programId")
	def programInstance=Program.get(programId)

	if(programInstance.products)
	    isbnValue=programInstance.products.isbn

	isbnValue.each{
	    def strIsbn=it

	    def productInstance = Product.where{ isbn == strIsbn}.get()
	    def targetResourceList = Content.where{product.isbn == productInstance.isbn}.list()
	    if(targetResourceList){
		targetResourceList.each{resrc->
		    if(resrc){
			resrc.each{
			    def resData=correlationMappingService.getTargetContents(resrc)
			    if(resData.targetResources)
			    {
				jsondata = [correlationFlag: true]
				respond jsondata
			    }else
			    {
				jsondata = [correlationFlag: false]
				respond jsondata
			    }


			}
		    }
		}
	    }
	}

	jsondata = [correlationFlag: false]
	respond jsondata

    }

    /**
     * Check if resources exist
     * @return
     */
    def isResourcesExist()
    {

	def jsondata = [:]
	def programId = request.getParameter("programId")
	def xmlType = request.getParameter("xmlType")
	def programInstance = Program.get(programId)
	def isbnValue
	if(programInstance.products)
	    isbnValue = programInstance?.products?.isbn
	isbnValue.each{
	    def strIsbn = it
	    def productInstance = Product.where{ isbn == strIsbn}.get()

	    if(productInstance){

		def targetResourceList = Content.where{product.isbn == productInstance.isbn}.list()

		if(targetResourceList)
		{
		    jsondata = [resourceFlag: true]
		    respond jsondata
		}

	    }
	}


	jsondata = [resourceFlag: false]
	respond jsondata
    }

}

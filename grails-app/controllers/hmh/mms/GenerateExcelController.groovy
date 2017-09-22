package hmh.mms

import static org.springframework.http.HttpStatus.*
import grails.transaction.Transactional
import java.text.*
import java.text.SimpleDateFormat;
import java.util.Date;
import grails.core.GrailsApplication
import grails.rest.*
import grails.converters.*

class GenerateExcelController {

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    GrailsApplication grailsApplication
    def fileGeneratorService
    def springSecurityService
    def correlationMappingService
    def contentService

    /**
     * method was changed to pass in a list of Programs as a way to get its list of Generate-Excel instances
     * @param max
     * @return
     */
    def index(Integer max) {
	params.max = Math.min(max ?: 10, 100)
	respond Program.list(params), model: [programCount: Program.count()]
    }

    def show(GenerateExcel generateExcel) {
	respond generateExcel
    }

    @Transactional
    def save(GenerateExcel generateExcel) {

	def programInstance = Program.get(generateExcel.programsId)
	def jsondata = [:]

	if(programInstance.products)
	{

	    def createExcel = fileGeneratorService.generateExcel( programInstance, generateExcel.excelType )

	    if(createExcel)
	    {
		def generateExcelInstance = GenerateExcel.where{programsId == generateExcel.programsId && excelType==generateExcel.excelType}.get()
		SimpleDateFormat inputFormatter = new SimpleDateFormat("dd-M-yyyy HH:mm:ss a")
		String formattedDate = inputFormatter.format(new Date())

		if(!generateExcelInstance)
		{
		    generateExcel.username = springSecurityService?.currentUser?.username
		    generateExcel.program = programInstance
		    generateExcel.lastUpdatedDate=formattedDate
		    generateExcel.save( flush:true, failOnError: true)
		    jsondata = [status: 200]
		    respond  jsondata
		}else
		{
		    generateExcelInstance.username=springSecurityService?.currentUser?.username
		    generateExcelInstance.lastUpdatedDate=formattedDate
		    generateExcelInstance.save flush:true
		    jsondata = [status: 200]
		    respond  jsondata
		}
	    }
	}
	respond generateExcel.errors
    }

    @Transactional
    def update(GenerateExcel generateExcel) {
	if (generateExcel == null) {
	    transactionStatus.setRollbackOnly()
	    render status: NOT_FOUND
	    return
	}

	if (generateExcel.hasErrors()) {
	    transactionStatus.setRollbackOnly()
	    respond generateExcel.errors, view:'edit'
	    return
	}
	generateExcel.save flush:true
	respond generateExcel, [status: OK, view:"show"]
    }

    @Transactional
    def delete(GenerateExcel generateExcel) {
	if (generateExcel == null) {
	    transactionStatus.setRollbackOnly()
	    render status: NOT_FOUND
	    return
	}
	generateExcel.delete flush:true
	render status: NO_CONTENT
    }

    /**
     * download ZIP
     * @return
     */
    def downloadFile()
    {

	def programId = request.getParameter("programId")
	def excelType = request.getParameter("excelType")

	File downloadFile
	def programInstance=Program.get(programId)
	def productsExcelLocation

	if (excelType =='EXCEL_MDS'){

	    productsExcelLocation = grailsApplication.config.getProperty('MDSExcelFolder')

	} else if (excelType == 'EXCEL_CORRELATIONS'){

	    productsExcelLocation = grailsApplication.config.getProperty('CorrelationsExcelFolder')
	}
	else if (excelType =='EXCEL_ED'){

	    productsExcelLocation = grailsApplication.config.getProperty('EDExcelFolder')

	}
	else if (excelType =='EXCEL_PROGRAM_STRUCTURE'){

	    productsExcelLocation = grailsApplication.config.getProperty('ProgramStructureExcelFolder')

	}


	downloadFile = new File( productsExcelLocation + "/Excel_" + programInstance.name + ".zip" )

	log.info( "downloadFile is:" + downloadFile )

	OutputStream myOut = null
	FileInputStream fileInputStream = null
	response.setContentType("application/zip")
	response.setHeader("Content-Disposition","attachment; filename=\"" + productsExcelLocation + "/Excel_" + programInstance.name +".zip" + "\"")
	response.setContentLength((int)downloadFile.length())

	myOut = response.getOutputStream()
	InputStream fIs = new BufferedInputStream(new FileInputStream(downloadFile))
	byte[] array=new byte[4096]
	for(int numberRead=fIs.read(array);numberRead!=-1;numberRead=fIs.read(array)){
	    myOut.write(array, 0, numberRead)

	}

	fIs.close()
	myOut.flush()
	myOut.close()

    }


    /**
     * Check if resources exist
     * @return
     */
    def isResourcesExist()
    {

	def jsondata = [:]

	def programId = request.getParameter("programId")
	def excelType = request.getParameter("excelType")
	def programInstance = Program.get(programId)

	def isbnValue = programInstance?.products?.isbn
	if(excelType== 'EXCEL_PROGRAM_STRUCTURE')
	{
	    def gradeSpecificContent = contentService.getGradeSpecificContent( programInstance )
	    gradeSpecificContent.each{
		def fullContentList= it.value
		fullContentList.each{content->

		    if(content.lessonPlan){
			jsondata = [resourceFlag: true]
			respond jsondata
		    }

		}
	    }
	}else
	{

	    isbnValue.each{

		def strIsbn = it
		def productInstance = Product.where{ isbn == strIsbn}.get()

		if(productInstance){

		    def targetResourceList = Content.where{product.isbn == productInstance.isbn}.list()

		    if(targetResourceList)
		    {
			if(excelType == 'EXCEL_CORRELATIONS'){
			    targetResourceList.each{resrc->
				def resData = correlationMappingService.getTargetContents(resrc)
				if(resData.targetResources){

				    jsondata = [resourceFlag: true]
				    respond jsondata
				}
			    }
			}else {

			    jsondata = [resourceFlag: true]
			    respond jsondata

			}
		    }
		}
	    }

	}
	jsondata = [resourceFlag: false]
	respond jsondata
    }
}

package hmh.mms
import java.text.SimpleDateFormat;
import java.util.Date;
import java.text.*
import java.util.Date;
class SyncGenerateXmlsJob {

	def concurrent = true
	def group = "scheduled"
	def fileGeneratorService
	def springSecurityService
	/*static triggers = {
	 // simple repeatInterval: 60000l // execute job once in 5 seconds
	 //cron name: 'cronTrigger2', cronExpression: "0 0 3 * * ?"	//  Schedule for everynight at 1:00am
	 }*/

	def execute() {
		// execute job
		def programInstances=Program.list()
		//MDS XML syncup
		programInstances.each{
			def programInstance=Program.get(it.id)
			def resourceFlag=false
			def isbnValue
			def generateMDSXmlsInstance=GenerateXmls.where{programsId==programInstance.id && xmlType=="XML_MDS" }.get()
			if(generateMDSXmlsInstance){
				if(programInstance.products)
					isbnValue = programInstance?.products?.isbn
				isbnValue.each{
					def strIsbn = it
					def productInstance = Product.where{ isbn == strIsbn}.get()
					if(productInstance){
						def targetResourceList = Content.where{product.isbn == productInstance.isbn}.list()
						if(targetResourceList)
						{
							resourceFlag=true
						}
					}
				}
				if(resourceFlag){
					SimpleDateFormat inputFormatter = new SimpleDateFormat("dd-M-yyyy HH:mm:ss a");
					String formattedDate = inputFormatter.format(new Date());

					if(!generateMDSXmlsInstance)
					{
						new GenerateXmls(programsId:programInstance.id,xmlType : "XML_MDS",username: 'Admin',program: programInstance,lastUpdatedDate: formattedDate).save(failOnError: true)
					}else
					{
						generateMDSXmlsInstance.username='Admin'
						generateMDSXmlsInstance.lastUpdatedDate=formattedDate
						generateMDSXmlsInstance.save flush:true
					}
					if(generateMDSXmlsInstance)
						fileGeneratorService.generateXMLs(programInstance,generateMDSXmlsInstance)

				}
			}
		}

		//Planner XML syncup
		programInstances.each{
			def programInstance=Program.get(it.id)
			def resourceFlag=false
			def isbnValue
			def generateXmlsInstance=GenerateXmls.where{programsId==programInstance.id && xmlType=="XML_PLANNER" }.get()
			if(generateXmlsInstance){
				if(programInstance.products)
					isbnValue = programInstance?.products?.isbn

				isbnValue.each{
					def strIsbn = it
					def productInstance = Product.where{ isbn == strIsbn}.get()
					if(productInstance){
						def targetResourceList = Content.where{product.isbn == productInstance.isbn}.list()
						if(targetResourceList)			{
							resourceFlag=true
						}
					}
				}
				if(resourceFlag){
					SimpleDateFormat inputFormatter = new SimpleDateFormat("dd-M-yyyy HH:mm:ss a");
					String formattedDate = inputFormatter.format(new Date());
					if(!generateXmlsInstance)
					{
						new GenerateXmls(programsId:programInstance.id,xmlType : "XML_PLANNER",username: 'Admin',program: programInstance,lastUpdatedDate: formattedDate).save(failOnError: true)
					}else
					{
						generateXmlsInstance.username='Admin'
						generateXmlsInstance.lastUpdatedDate=formattedDate
						generateXmlsInstance.save flush:true
					}
					if(generateXmlsInstance)
						fileGeneratorService.generateXMLs(programInstance,generateXmlsInstance)
				}
			}
		}

		//Alchemy XML syncup
		programInstances.each{
			def programInstance=Program.get(it.id)
			def resourceFlag=false
			def isbnValue
			def generateXmlsInstance=GenerateXmls.where{programsId==programInstance.id && xmlType=="XML_ALCHEMY" }.get()
			if(generateXmlsInstance){
				if(programInstance.products)
					isbnValue = programInstance?.products?.isbn
				isbnValue.each{
					def strIsbn = it
					def productInstance = Product.where{ isbn == strIsbn}.get()
					if(productInstance){
						def targetResourceList = Content.where{product.isbn == productInstance.isbn}.list()
						if(targetResourceList)
						{
							resourceFlag=true
						}
					}
				}
				if(resourceFlag){
					SimpleDateFormat inputFormatter = new SimpleDateFormat("dd-M-yyyy HH:mm:ss a");
					String formattedDate = inputFormatter.format(new Date());
					if(!generateXmlsInstance)
					{
						new GenerateXmls(programsId:programInstance.id,xmlType : "XML_ALCHEMY",username: 'Admin',program: programInstance,lastUpdatedDate: formattedDate).save(failOnError: true)
					}else
					{
						generateXmlsInstance.username='Admin'
						generateXmlsInstance.lastUpdatedDate=formattedDate
						generateXmlsInstance.save flush:true
					}
					if(generateXmlsInstance)
						fileGeneratorService.generateXMLs(programInstance,generateXmlsInstance)
				}
			}
		}


		//XML_CORRELATIONS  syncup
		programInstances.each{
			def programInstance=Program.get(it.id)
			def resourceFlag=false
			def isbnValue
			def generateXmlsInstance=GenerateXmls.where{programsId==programInstance.id && xmlType=="XML_CORRELATIONS" }.get()
			if(generateXmlsInstance){
				if(programInstance.products)
					isbnValue = programInstance?.products?.isbn
				isbnValue.each{
					def strIsbn = it
					def productInstance = Product.where{ isbn == strIsbn}.get()
					if(productInstance){
						def targetResourceList = Content.where{product.isbn == productInstance.isbn}.list()
						if(targetResourceList)
						{
							resourceFlag=true
						}
					}
				}
				if(resourceFlag){
					SimpleDateFormat inputFormatter = new SimpleDateFormat("dd-M-yyyy HH:mm:ss a");
					String formattedDate = inputFormatter.format(new Date());
					if(!generateXmlsInstance)
					{
						new GenerateXmls(programsId:programInstance.id,xmlType : "XML_CORRELATIONS",username: 'Admin',program: programInstance,lastUpdatedDate: formattedDate).save(failOnError: true)
					}else
					{
						generateXmlsInstance.username='Admin'
						generateXmlsInstance.lastUpdatedDate=formattedDate
						generateXmlsInstance.save flush:true
					}
					if(generateXmlsInstance)
						fileGeneratorService.generateXMLs(programInstance,generateXmlsInstance)
				}
			}
		}


	}
}

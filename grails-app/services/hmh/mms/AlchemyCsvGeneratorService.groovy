package hmh.mms

import grails.core.GrailsApplication
import grails.transaction.Transactional


@Transactional
class AlchemyCsvGeneratorService {

    GrailsApplication grailsApplication
    def levelsService
    def correlationMappingService
    //Delimiter used in CSV file
    private static final String COMMA_DELIMITER = ","
    private static final String NEW_LINE_SEPARATOR = "\n"


    /**
     * Alchemy CSV Generator
     * @param programInstance
     * @param isbnValue
     * A Method which generates the TCK6 Alchemy csv
     */
    def alchemyBuildCSVGenerator(Program programInstance, def isbnValue) {

	def productInstance = Product.where{ isbn == isbnValue}.list()
	def targetResourceLists = Content.where{product.isbn == productInstance.isbn}.list()
	def targetResourceList = []
	def toolTypes = grailsApplication.config.getProperty('ExcludeAlchemyXmlToolType')	
	targetResourceLists.each{resrc->	   
           if(resrc.component.toolType){
	   if(!toolTypes.contains(String.valueOf(resrc.component.toolType)))
	      {
		  targetResourceList.add(resrc)
	      }
	  }
	}
	def builder = new groovy.xml.StreamingMarkupBuilder()
	builder.encoding = 'UTF-8'
	def alchemyXMLLocation = grailsApplication.config.getProperty('AlchemyXMLFolder')
	try{

	    FileWriter fileWriter

	    if(targetResourceList){
		fileWriter = new FileWriter(alchemyXMLLocation+"/"+programInstance.name+"/"+isbnValue+"/alchemy_import.csv")
		targetResourceList.eachWithIndex{ resrc, inx ->

		    inx++

		    if(resrc){
			def toolType=resrc.component.toolType
			def (isStudentAllow, resrcType, resrcUri ) = setVariablesBasedOnToolType(toolType, resrc)

			def levelMap = levelsService.getFullLevelsMap(resrc)
			def title = '"' + resrc.displayTitle.toString()+'"'
			fileWriter.append(productInstance[0].isbn)
			fileWriter.append(COMMA_DELIMITER)
			fileWriter.append(resrc.hmhId)
			fileWriter.append(COMMA_DELIMITER)
			fileWriter.append(isStudentAllow)
			fileWriter.append(COMMA_DELIMITER)
			fileWriter.append(resrc.component.component)
			fileWriter.append(COMMA_DELIMITER)
			fileWriter.append(title)
			fileWriter.append(COMMA_DELIMITER)
			fileWriter.append(resrcType)
			fileWriter.append(COMMA_DELIMITER)
			if(levelMap.top){
			    def grades = []
			    levelMap.top.grades.each{
				grades << it.grade
			    }
			    fileWriter.append(createPipeSeparatedList(grades))
			}
			fileWriter.append(COMMA_DELIMITER)
			fileWriter.append(String.valueOf(inx))
			fileWriter.append(COMMA_DELIMITER)
			fileWriter.append(resrcUri ?: "")
			fileWriter.append(NEW_LINE_SEPARATOR)
		    }
		}
		fileWriter.flush()
		fileWriter.close()
	    }

	}catch(Exception ex){
	    log.error "Errors found when generating Alchemy CSV file" + ex.getMessage()
	    return false
	}

	return true

    }


    /**
     * Helper method to create Pipe separated list
     * @param list
     * @return
     */
    def createPipeSeparatedList(def list){
	String pipeSeperatedList = list.join('|')
    }


    /**
     * Helper method to set common Variables
     * @param toolType
     * @param resrc
     * @return
     */
    def setVariablesBasedOnToolType(def toolType, def resrc){

	def isStudentAllow = ""
	def resrcType = ""
	def resrcUri = ""

	if(toolType==2 && resrc.schedulable ==false && resrc.assignable==false){
	    isStudentAllow=""
	    resrcType=""
	    resrcUri=""
	}else if(toolType==2)
	{
	    isStudentAllow="34"
	    resrcType="13"
	    resrcUri=""
	}
	else if(toolType==4)
	{
	    isStudentAllow="1"
	    resrcType="0"
	    resrcUri=""
	}else if(toolType==5)
	{
	    isStudentAllow="35"
	    resrcType="11"
	    resrcUri=resrc.uri
	}else if(toolType==6)
	{
	    isStudentAllow="1"
	    resrcType="11"
	    resrcUri=resrc.uri
	}else if(toolType==7)
	{
	    isStudentAllow="3"
	    resrcType="5"
	    resrcUri=resrc.uri
	}else if(toolType==8)
	{
	    isStudentAllow="3"
	    resrcType="6"
	    resrcUri=resrc.uri
	}else if(toolType==9)
	{
	    isStudentAllow="3"
	    resrcType="1"
	    resrcUri=resrc.uri
	}else if(toolType==10)
	{
	    isStudentAllow="3"
	    resrcType="2"
	    resrcUri=resrc.uri
	}else if(toolType==11)
	{
	    isStudentAllow="3"
	    resrcType="0"
	    resrcUri=resrc.uri
	}else if(toolType==12)
	{
	    isStudentAllow="3"
	    resrcType="12"
	    resrcUri=resrc.uri
	}else if(toolType==13)
	{
	    isStudentAllow="3"
	    resrcType="15"
	    resrcUri=resrc.uri
	}else if(toolType==16)
	{
	    isStudentAllow="36"
	    resrcType="12"
	    resrcUri=resrc.uri
	}else if(toolType==17)
	{
	    isStudentAllow="36"
	    resrcType="15"
	    resrcUri=resrc.uri
	}

	def resourceData=correlationMappingService.getTargetContents(resrc)
	StringBuffer strUri = new StringBuffer();
	def resrcUrl
	if(resrcUri && resrcUri.contains("||"))
	{
	    resrcUrl=resrcUri.split("\\|\\|")
	    strUri.append(resrcUrl[0])
	}else
	{
	    strUri.append(resrcUri)
	}
	
	if(resourceData.targetResources)
	{
	   resourceData.targetResources.each{	    
		strUri.append("||"+it.targetType+"="+it.content.hmhId)	
	    }
	}	
	return [isStudentAllow, resrcType, strUri]

    }


}

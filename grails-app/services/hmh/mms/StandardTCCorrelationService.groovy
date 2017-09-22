package hmh.mms

import grails.transaction.Transactional
import grails.util.Holders
import groovy.xml.StreamingMarkupBuilder
import groovy.xml.streamingmarkupsupport.BaseMarkupBuilder.Document


@Transactional
class StandardTCCorrelationService {

    def levelsService
    def correlationMappingService
    def mappingService
    /**
     * Build TC Standard Correlation XML
     * @param targetResourceList
     * @param programInstance
     * @param productInstance
     * @return
     */
    def standardCorrXml(targetResourceList, Program programInstance, Product productInstance) {

	try{
	    def xml = {
		mkp.xmlDeclaration()
		mkp.comment "Created by the Metadata Management System"
		hsp_correlations(xmlns:"http://xml.thinkcentral.com/pub/xml/hsp/correlations",'xmlns:xsi':"http://www.w3.org/2001/XMLSchema-instance",isbn:productInstance.isbn,'xsi:schemaLocation':"http://xml.thinkcentral.com/pub/xml/hsp/correlations http://xml.thinkcentral.com/pub/xml1_2_9/hsp_correlations.xsd") {

		    targetResourceList.each{resrc->

			if(resrc){
			 
			    def resourceData=correlationMappingService.getTargetContents(resrc)	
			    
			    if(resourceData.targetResources)
			    {
			
			       hsp_correlation(source_buid :resrc.hmhId,source_type:resourceData.sourceContents.sourceType){
				
				    resourceData. targetResources.each{
					target(target_type:it.targetType,target_id:it.content.hmhId)
				    }
				}
			    }


			}


		    }

		}
	    }
	    return xml

	}catch(Exception ex){

	    return false
	}
    }
}

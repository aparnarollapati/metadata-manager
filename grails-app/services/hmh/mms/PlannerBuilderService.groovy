package hmh.mms

import grails.transaction.Transactional
import grails.core.GrailsApplication
import grails.util.Holders
import groovy.xml.StreamingMarkupBuilder
import groovy.xml.streamingmarkupsupport.BaseMarkupBuilder.Document

@Transactional
class PlannerBuilderService {

	GrailsApplication grailsApplication
	def levelsService
	def mappingService

	/**
	 * Build the TC Planner XML
	 * @param targetResourceList
	 * @param programInstance
	 * @param productInstance
	 * @return xml String
	 */
	def plannerBuildXml(targetResourceList,Program programInstance,Product productInstance) {
		def isbn=productInstance.isbn
		def keywords = []

		try{
			def xml = {
				mkp.xmlDeclaration()
				if(targetResourceList){
					hsp_planner_content(
							isbn:isbn,
							tool_type:targetResourceList[0].component.toolType,
							is_eplanner:'false',
							xmlns:'http://xml.thinkcentral.com/pub/xml/hsp/plannerContent',
							'xmlns:xsi':'http://www.w3.org/2001/XMLSchema-instance',
							'xsi:schemaLocation':'http://xml.thinkcentral.com/pub/xml/hsp/plannerContent http://xml.thinkcentral.com/pub/xml1_2_7/hsp_plannercontent.xsd'
							){

								targetResourceList.eachWithIndex{resrc, index ->
									if(resrc!=null ){
										index++																		
										content_resource(id:resrc.hmhId, lang:resrc.language,index:index){
											title(resrc.displayTitle)
											uri(resrc.uri)
											stars_guid(resrc.hmhId)
											delegate.keywords{keyword("")}
											pacing(1)
											assignable(resrc.assignable)
											searchable(resrc.searchable)
											res_index(index)
											res_type(mappingService.getPlannerComponentType(resrc.component.componentType))
											media_type(mappingService.getMediaType(resrc.mediaType))
										}
									}
								}
							}
				}
			}
			return xml
		}catch(Exception ex){
			log.error ex.getMessage()
			return false
		}
	}
}

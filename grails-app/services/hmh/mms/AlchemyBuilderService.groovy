package hmh.mms

import grails.transaction.Transactional
import java.text.SimpleDateFormat;
import java.util.Date;
@Transactional
class AlchemyBuilderService {

    def alchemyBuildImportXml(targetResourceList,Program programInstance) {

	try{

	    SimpleDateFormat inputFormatter = new SimpleDateFormat("dd/M/yyyy HH:mm:ss a");
	    String formattedDate = inputFormatter.format(new Date());
	    def xml = {
		mkp.xmlDeclaration()
		alchemy_import(content_refs_specified:"true",created:formattedDate, import_order_specified:"true", title:"",version:"1.0")
		{
		    external_dependencies()
		    libraries{
			library(name:""){
			    library(name:""){
				library(name:"") {
				    library(name:"Course") {
					library(name:""){}
				    }
				}
			    }
			}
		    }
		    import_contents{
			lib_ref(libpath:""){
			    if(targetResourceList){
				targetResourceList.each{resrc->
				    item(name:resrc.hmhId,id:resrc.hmhId){
					description(resrc.meaningfulDescription)
					content_xml(contentID:resrc.hmhId)
				    }
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

    def alchemyBuildIndividualXml(def resourceHMHId) {

	try{

	    def xml = {
		mkp.xmlDeclaration()
		content(contentID:resourceHMHId,revision:"1",tag:"document", useTemplate:"EV.TEST.TEMPLATE",version:"2.0")
	    }

	    return xml
	}catch(Exception ex){
	    log.error ex.getMessage()
	    return false
	}

    }
}

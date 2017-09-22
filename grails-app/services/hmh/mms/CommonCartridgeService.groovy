package hmh.mms
import grails.transaction.Transactional
import java.util.ArrayList;
import java.util.List;

@Transactional
class CommonCartridgeService {


    def levelsService
    def mappingService
    def commonCartridgeStandardsService
    def commonCartridge12IndividualXml(Content resource,Program programInstance,Product productInstance) {



	try{
	    String Platform=productInstance.program.platform
	    def vendorCode
	    def platformUrl
	    if(Platform.equalsIgnoreCase("HMOF")) {

		platformUrl="http://my.hrw.com/HMOFLTIProviderServlet"
		vendorCode="hmhco.com"
	    }else if(Platform.equalsIgnoreCase("TCK6")) {
		platformUrl="http://www-k6.thinkcentral.com/ePC/toolprovider/ltivalidator"
		vendorCode="thinkcentral.com"
	    }
	    def displayTitle=resource.commonCartridgeTitle ?: resource.displayTitle
	    def xml = {
		mkp.xmlDeclaration()
		cartridge_basiclti_link('xsi:schemaLocation':"http://www.imsglobal.org/xsd/imslticc_v1p0 http://www.imsglobal.org/xsd/lti/ltiv1p0/imslticc_v1p0p1.xsd http://www.imsglobal.org/xsd/imsbasiclti_v1p0 http://www.imsglobal.org/xsd/lti/ltiv1p0/imsbasiclti_v1p0p1.xsd http://www.imsglobal.org/xsd/imslticm_v1p0 http://www.imsglobal.org/xsd/lti/ltiv1p0/imslticm_v1p0.xsd http://www.imsglobal.org/xsd/imslticp_v1p0 http://www.imsglobal.org/xsd/lti/ltiv1p0/imslticp_v1p0.xsd",xmlns:"http://www.imsglobal.org/xsd/imslticc_v1p0",'xmlns:blti':"http://www.imsglobal.org/xsd/imsbasiclti_v1p0",'xmlns:lticm':"http://www.imsglobal.org/xsd/imslticm_v1p0",'xmlns:lticp':"http://www.imsglobal.org/xsd/imslticp_v1p0",'xmlns:xsi':"http://www.w3.org/2001/XMLSchema-instance")
		{
		    'blti:title'(displayTitle)
		    'blti:description'()
		    'blti:custom'(){
			'lticm:property'(name:"resource_url",resource.uri)
			'lticm:property'(name:"resource_isbn",productInstance.isbn)
			'lticm:property'(name:"launch_point",productInstance.program.platform)
		    }
		    'blti:extensions'(platform:"itslearning.com"){
			'lticm:property'(name:"privacy_level","public")
		    }
		    'blti:launch_url'(platformUrl)
		    'blti:secure_launch_url'(platformUrl)
		    'blti:vendor'(){
			'lticp:code'(vendorCode)
			'lticp:name'("HMH")
		    }


		}
	    }
	}catch(Exception ex){
	    log.error ex.getMessage()
	    return false
	}

    }




    /**
     * A Method which generates the HMOF/TC Common Cartridge 1.2 Schema imsmanifest xml
     * @param targetResourceList
     * @param programInstance
     * @param productInstance
     * @return xml String
     */
    def commonCartridge12manifestXml(targetResourceList,Program programInstance,Product productInstance,GenerateXmls generateXmls) {

	try{

	    def finalMap=levelsMap(targetResourceList)
	    def segStrandMap=segStrandMap(targetResourceList)

	    def discipline=mappingService.getDisciplineCode(productInstance.program.discipline)
	    StringBuffer segstr=new StringBuffer()
	    StringBuffer levelstr=new StringBuffer()
	    StringBuffer str=new StringBuffer()
	    StringBuffer flevelstr=new StringBuffer()
	    StringBuffer slevelstr=new StringBuffer()
	    StringBuffer tlevelstr=new StringBuffer()
	    StringBuffer frlevelstr=new StringBuffer()
	    def programName=programInstance.name
	    programName=programName.replace(' ','_')
	    programName=programName.replace('(','')
	    programName=programName.replace(')','')
	    def programGrade=productInstance.grades.grade	 
	    programGrade=programGrade.toString().replaceAll("\\[|\\]", "").replaceAll(", ","_")
	   
	    def xml = {
		mkp.xmlDeclaration()
		manifest(identifier:"HMH_"+programInstance.state+"_"+programName+"_"+programInstance.copyrightYear+"_Grade_"+programGrade,'xsi:schemaLocation':"http://www.imsglobal.org/xsd/imsccv1p2/imscp_v1p1 http://www.imsglobal.org/profile/cc/ccv1p2/ccv1p2_imscp_v1p2_v1p0.xsd http://ltsc.ieee.org/xsd/imsccv1p2/LOM/resource http://www.imsglobal.org/profile/cc/ccv1p2/LOM/ccv1p2_lomresource_v1p0.xsd http://ltsc.ieee.org/xsd/imsccv1p2/LOM/manifest http://www.imsglobal.org/profile/cc/ccv1p2/LOM/ccv1p2_lommanifest_v1p0.xsd http://www.imsglobal.org/xsd/imsccv1p2/imscsmd_v1p0 http://www.imsglobal.org/profile/cc/ccv1p2/ccv1p2_imscsmd_v1p0.xsd", 'xmlns:xsi':"http://www.w3.org/2001/XMLSchema-instance",'xmlns:lom':"http://ltsc.ieee.org/xsd/imsccv1p2/LOM/resource",'xmlns:lomimscc':"http://ltsc.ieee.org/xsd/imsccv1p2/LOM/manifest",xmlns:"http://www.imsglobal.org/xsd/imsccv1p2/imscp_v1p1") {
		    metadata(){
			schema("IMS Common Cartridge")
			schemaversion("1.2.0")
			'lomimscc:lom'(){
			    'lomimscc:general'(){
				'lomimscc:identifier'(){
				    'lomimscc:catalog'("ISBN")
				    'lomimscc:entry'(programInstance.name)
				}
				'lomimscc:title'(){
				    'lomimscc:string'(language:"en-US",programInstance.name)
				}
				'lomimscc:description'(){
				    'lomimscc:string'(language:"en-US","Description")
				}
				'lomimscc:keyword'(){
				    'lomimscc:string'(language:"en-US","HMH")
				}
			    }

			}
		    }//Metadata


		    str.append("<organizations>")
		    str.append("<organization identifier='TOC1' structure='rooted-hierarchy'>")
		    str.append("<item identifier='root'>")
		    //if grade level resources based on segments and strands write to XML
		    if(segStrandMap){
			Iterator segsentries = segStrandMap.entrySet().iterator();
			while (segsentries.hasNext()) {
			    Map.Entry segentry = (Map.Entry) segsentries.next();
			    def segskey = segentry.getKey();
			    def segvalue = segentry.getValue();
			    if(segskey.contains("<i>") || segskey.contains('"')){
				
				segskey=segskey.replaceAll("<i>","").replaceAll("</i>","").replaceAll('"',"")
			    
			    }
			    
			    def strSeg="HMH_"+segskey.substring(0,2)+""+segskey.substring(segskey.length() - 2)
			    segstr.append("<item identifier='"+strSeg+"'><title>"+segskey+"</title>")
			    Iterator ssentries = segvalue.entrySet().iterator();
			    while (ssentries.hasNext()) {
				Map.Entry ssentry = (Map.Entry) ssentries.next();
				def sskey = ssentry.getKey();
				def resource = ssentry.getValue();
				def strStrand=sskey.substring(0,2)+""+sskey.substring(sskey.length() - 2)
				segstr.append("<item identifier='"+strSeg+"_"+strStrand+"'><title>"+sskey+"</title>")
				if(resource){
				    for(int i=0;i<resource.size();i++)
				    {
					def strhmhId="HMH_"+resource[i].hmhId
					def strresId="RESOURCE_"+resource[i].id+"_"+resource[i].hmhId
					def displayTitle=resource[i].commonCartridgeTitle?:resource[i].displayTitle
					segstr.append("<item identifier='"+strhmhId+"' identifierref='"+strresId+"'><title>"+displayTitle+"</title>")
					segstr.append("<metadata>"+mappingService.getCC12Resource(resource[i],programInstance,productInstance)+"</metadata>")
					segstr.append("</item>")

				    }

				}
				segstr.append("</item>")
			    }//strand
			    segstr.append("</item>")
			}//segmentMap
		    }

		    //if level resources based on levels,segments and strands write to XML
		    if(finalMap){
			Iterator entries = finalMap.entrySet().iterator();
			while (entries.hasNext()) {
			    Map.Entry entry = (Map.Entry) entries.next();
			    def key1 = entry.getKey();
			    def value1 = entry.getValue();
			    flevelstr=new StringBuffer()
			    slevelstr=new StringBuffer()
			    tlevelstr=new StringBuffer()
			    frlevelstr=new StringBuffer()
			    def lkey
			    for(int l=0;l<value1.size();l++){
				Iterator lentries = value1[l].entrySet().iterator();
				while (lentries.hasNext()) {
				    Map.Entry lentry = (Map.Entry) lentries.next();
				    lkey = lentry.getKey();
				    def lvalue = lentry.getValue();
				    Iterator lkentries = lvalue.entrySet().iterator();
				    while (lkentries.hasNext()) {
					Map.Entry lkentry = (Map.Entry) lkentries.next();
					def lkkey = lkentry.getKey();
					def lkvalue = lkentry.getValue();
					def levelTitle=lkkey.split("_@")

					def resHierarchy=levelTitle[0].substring(levelTitle[0].length() - 1)


					if(lkey==1){
					    def scopeTitle=productInstance.program.secondLevelScope+" "+resHierarchy+" : "+levelTitle[1]
					    flevelstr.append("<item identifier='"+levelTitle[0]+"'><title>"+scopeTitle+"</title>")
					}
					if(lkey==2)
					{
					    def scopeTitle=productInstance.program.thirdLevelScope+" "+resHierarchy+" : "+levelTitle[1]
					    slevelstr.append("<item identifier='"+levelTitle[0]+"'><title>"+scopeTitle+"</title>")
					}
					if(lkey==3)
					{
					    def scopeTitle=productInstance.program.fourthLevelScope+" "+resHierarchy+" : "+levelTitle[1]
					    tlevelstr.append("<item identifier='"+levelTitle[0]+"'><title>"+scopeTitle+"</title>")
					}
					if(lkey==4)
					{
					    def scopeTitle=productInstance.program.fifthLevelScope+" "+resHierarchy+" : "+levelTitle[1]
					    frlevelstr.append("<item identifier='"+levelTitle[0]+"'><title>"+scopeTitle+"</title>")
					}

					for(int s2=0;s2<lkvalue.size();s2++){
					    Iterator sentries = lkvalue[s2].entrySet().iterator();
					    while (sentries.hasNext()) {
						Map.Entry sentry = (Map.Entry) sentries.next();
						def skey = sentry.getKey();
						def svalue = sentry.getValue();
						def strSeg=skey.substring(0,2)+""+skey.substring(skey.length() - 2)

						if(lkey==1)
						    flevelstr.append("<item identifier='"+levelTitle[0]+"_"+strSeg+"'><title>"+skey+"</title>")
						if(lkey==2)
						    slevelstr.append("<item identifier='"+levelTitle[0]+"_"+strSeg+"'><title>"+skey+"</title>")
						if(lkey==3)
						    tlevelstr.append("<item identifier='"+levelTitle[0]+"_"+strSeg+"'><title>"+skey+"</title>")
						if(lkey==4)
						    frlevelstr.append("<item identifier='"+levelTitle[0]+"_"+strSeg+"'><title>"+skey+"</title>")

						Iterator ssentries = svalue.entrySet().iterator();
						while (ssentries.hasNext()) {
						    Map.Entry ssentry = (Map.Entry) ssentries.next();
						    def sskey = ssentry.getKey();
						    def resource = ssentry.getValue();
						    def strStrand=sskey.substring(0,2)+""+sskey.substring(sskey.length() - 2)
						    if(lkey==1)
							flevelstr.append("<item identifier='"+levelTitle[0]+"_"+strSeg+"_"+strStrand+"'><title>"+sskey+"</title>")
						    if(lkey==2)
							slevelstr.append("<item identifier='"+levelTitle[0]+"_"+strSeg+"_"+strStrand+"'><title>"+sskey+"</title>")
						    if(lkey==3)
							tlevelstr.append("<item identifier='"+levelTitle[0]+"_"+strSeg+"_"+strStrand+"'><title>"+sskey+"</title>")
						    if(lkey==4)
							frlevelstr.append("<item identifier='"+levelTitle[0]+"_"+strSeg+"_"+strStrand+"'><title>"+sskey+"</title>")

						    if(resource){
							for(int i=0;i<resource.size();i++)
							{
							    def strhmhId="HMH_"+resource[i].hmhId
							    def strresId="RESOURCE_"+resource[i].id+"_"+resource[i].hmhId
							    def displayTitle=resource[i].commonCartridgeTitle ?: resource[i].displayTitle
							    if(lkey==1){
								flevelstr.append("<item identifier='"+strhmhId+"' identifierref='"+strresId+"'><title>"+displayTitle+"</title>")
								flevelstr.append("<metadata>"+mappingService.getCC12Resource(resource[i],programInstance,productInstance)+"</metadata>")
								flevelstr.append("</item>")
							    }
							    if(lkey==2){
								slevelstr.append("<item identifier='"+strhmhId+"' identifierref='"+strresId+"'><title>"+displayTitle+"</title>")
								slevelstr.append("<metadata>"+mappingService.getCC12Resource(resource[i],programInstance,productInstance)+"</metadata>")
								slevelstr.append("</item>")
							    }
							    if(lkey==3){
								tlevelstr.append("<item identifier='"+strhmhId+"' identifierref='"+strresId+"'><title>"+displayTitle+"</title>")
								tlevelstr.append("<metadata>"+mappingService.getCC12Resource(resource[i],programInstance,productInstance)+"</metadata>")
								tlevelstr.append("</item>")
							    }
							    if(lkey==4){
								frlevelstr.append("<item identifier='"+strhmhId+"' identifierref='"+strresId+"'><title>"+displayTitle+"</title>")
								frlevelstr.append("<metadata>"+mappingService.getCC12Resource(resource[i],programInstance,productInstance)+"</metadata>")
								frlevelstr.append("</item>")
							    }
							}

						    }
						    if(lkey==1)
							flevelstr.append("</item>")
						    if(lkey==2)
							slevelstr.append("</item>")
						    if(lkey==3)
							tlevelstr.append("</item>")
						    if(lkey==4)
							frlevelstr.append("</item>")
						}//strand
						if(lkey==1)
						    flevelstr.append("</item>")
						if(lkey==2)
						    slevelstr.append("</item>")
						if(lkey==3)
						    tlevelstr.append("</item>")
						if(lkey==4)
						    frlevelstr.append("</item>")
					    }//segmentMap
					} //segmentStrandList

				    }//Levels
				}

				if(lkey==2)
				    slevelstr.append("</item>")
				if(lkey==3)
				    tlevelstr.append("</item>")
				if(lkey==4)
				    frlevelstr.append("</item>")

			    }
			    levelstr.append(flevelstr.toString())
			    levelstr.append(slevelstr.toString())
			    levelstr.append(tlevelstr.toString())
			    levelstr.append(frlevelstr.toString())
			    levelstr.append("</item>")

			}//levelsname

		    }//finalmap
		    str.append(segstr.toString())
		    str.append(levelstr.toString())
		    str.append("</item>")//item root
		    str.append("</organization>")//organization
		    str.append("</organizations>")//organizations
		    //print all the level Items

		    mkp.yieldUnescaped str.toString()
		    def abxmlData=null
		    def hmsixmlData
		    def hmsixmlAbGuidData
		    def abStandardsXmlMap=[:]
		    def hmsiStandardsXmlMap=[:]
		    def hmsiStandardsXmlAbGuidMap=[:]
		    //ANGUID/HMSI standards
		    if(generateXmls.isStandards=="Include Standards")
		    {
			def abGuidsSvnLink
			def hmsiSvnLink
			abGuidsSvnLink=programInstance.abStandard
			hmsiSvnLink=programInstance.hmsiStandard



			if(generateXmls.standardType=="Generic Delivery" && abGuidsSvnLink){
			    abxmlData=commonCartridgeStandardsService.parseStandardsXML(abGuidsSvnLink,"ABGUID")

			} else if(generateXmls.standardType=="Brainhoney Delivery" && hmsiSvnLink)
			{
			    hmsixmlData=commonCartridgeStandardsService.parseStandardsXML(hmsiSvnLink,"HMSI")
			}else if(generateXmls.standardType=="Generic Delivery" && hmsiSvnLink)
			{
			    hmsixmlAbGuidData=commonCartridgeStandardsService.parseStandardsXML(hmsiSvnLink,"HMSI")
			}

		    }
		    resources(){
			targetResourceList.eachWithIndex{resrc,idx ->
			    idx++
			    Set allStandards = resrc.standards.standard
			    if(generateXmls.isStandards=="Include Standards")
			    {

				if(abxmlData && allStandards){
				    abStandardsXmlMap=commonCartridgeStandardsService.getAbGuids(abxmlData,allStandards)
				}else if(hmsixmlData && allStandards){
				    hmsiStandardsXmlMap=commonCartridgeStandardsService.getHMSIHeirarchyId(hmsixmlData,allStandards)
				}
				else if(hmsixmlAbGuidData && allStandards){
				    hmsiStandardsXmlAbGuidMap=commonCartridgeStandardsService.getHMSIXmlAbGUID(hmsixmlAbGuidData,allStandards)
				}
			    }
			    resource(identifier:"RESOURCE_"+resrc.id+"_"+resrc.hmhId, type:"imsbasiclti_xmlv1p0"){
				metadata(){
				    'lom:lom'(){
					'lom:educational'(){
					    'lom:intendedEndUserRole'(){
						'lom:source'("IMSGLC_CC_Rolesv1p2")
						'lom:value'("Learner")
					    }
					}
				    }

				    //standards
				    if(generateXmls.isStandards=="Include Standards")
				    {


					if(abStandardsXmlMap.standardsXmlMap){
					    curriculumStandardsMetadataSet(xmlns:"http://www.imsglobal.org/xsd/imsccv1p2/imscsmd_v1p0"){
						curriculumStandardsMetadata(providerId:"HMH"){
						    setOfGUIDs(version:"1.0",region:abStandardsXmlMap.state){
							abStandardsXmlMap.standardsXmlMap.each{standard,abguid->
							    labelledGUID{
								label(standard)
								GUID(abguid)
							    }
							}
						    }
						}
					    }
					}else if(hmsiStandardsXmlMap.standardsXmlMap){
					    curriculumStandardsMetadataSet(xmlns:"http://www.imsglobal.org/xsd/imsccv1p2/imscsmd_v1p0"){
						curriculumStandardsMetadata(providerId:"HMH"){
						    setOfGUIDs(version:"1.0",region:hmsiStandardsXmlMap.state){
							hmsiStandardsXmlMap.standardsXmlMap.each{standard,abguid->
							    labelledGUID{
								label(standard)
								GUID("00000000-0000-0000-0000-0000"+abguid)
							    }
							}
						    }
						}
					    }
					}else if(hmsiStandardsXmlAbGuidMap.standardsXmlMap){
					    curriculumStandardsMetadataSet(xmlns:"http://www.imsglobal.org/xsd/imsccv1p2/imscsmd_v1p0"){
						curriculumStandardsMetadata(providerId:"HMH"){
						    setOfGUIDs(version:"1.0",region:hmsiStandardsXmlAbGuidMap.state){
							hmsiStandardsXmlAbGuidMap.standardsXmlMap.each{standard,abguid->
							    labelledGUID{
								label(standard)
								GUID(abguid)
							    }
							}
						    }
						}
					    }
					}
				    }
				}
				file(href:"res/resource_"+idx+"_blti.xml"){}
			    }//resource
			}
		    }//resources

		}//Manifest
	    }

	    return xml
	}catch(Exception ex){
	    log.error ex.getMessage()
	    return false
	}

    }
    /**
     * A Method which generates the HMOF/TC Common Cartridge 1.3 Schema imsmanifest xml
     * @param targetResourceList
     * @param programInstance
     * @param productInstance
     * @return xml String
     */
    def commonCartridge13manifestXml(targetResourceList,Program programInstance,Product productInstance,GenerateXmls generateXmls) {

	try{

	    def finalMap=levelsMap(targetResourceList)
	    def segStrandMap=segStrandMap(targetResourceList)
	    String Platform=productInstance.program.platform
	    def vendorCode
	    def platformUrl
	    if(Platform.equalsIgnoreCase("HMOF")) {

		platformUrl="http://my.hrw.com/HMOFLTIProviderServlet"
		vendorCode="hmhco.com"
	    }else if(Platform.equalsIgnoreCase("TCK6")) {
		platformUrl="http://www-k6.thinkcentral.com/ePC/toolprovider/ltivalidator"
		vendorCode="thinkcentral.com"
	    }
	    def discipline=mappingService.getDisciplineCode(productInstance.program.discipline)
	    StringBuffer segstr=new StringBuffer()
	    StringBuffer levelstr=new StringBuffer()
	    StringBuffer str=new StringBuffer()
	    StringBuffer flevelstr=new StringBuffer()
	    StringBuffer slevelstr=new StringBuffer()
	    StringBuffer tlevelstr=new StringBuffer()
	    StringBuffer frlevelstr=new StringBuffer()
	    def programName=programInstance.name
	    programName=programName.replace(' ','_')
	    programName=programName.replace('(','')
	    programName=programName.replace(')','')
	    def xml = {
		mkp.xmlDeclaration()
		manifest(identifier:"HMH_"+programName+"_Thin_1_3",xmlns:"http://www.imsglobal.org/xsd/imsccv1p3/imscp_v1p1",'xmlns:lomr':"http://ltsc.ieee.org/xsd/imsccv1p3/LOM/resource",'xmlns:lomm':"http://ltsc.ieee.org/xsd/imsccv1p3/LOM/manifest",'xmlns:lticc':"http://www.imsglobal.org/xsd/imslticc_v1p3",'xmlns:lomc':"http://ltsc.ieee.org/xsd/imsccv1p3/LOM/imscclti",'xmlns:blti':"http://www.imsglobal.org/xsd/imsbasiclti_v1p0",'xmlns:lticm':"http://www.imsglobal.org/xsd/imslticm_v1p0",'xmlns:lticp':"http://www.imsglobal.org/xsd/imslticp_v1p0",'xmlns:wl':"http://www.imsglobal.org/xsd/imsccv1p3/imswl_v1p3",'xmlns:csm':"http://www.imsglobal.org/xsd/imsccv1p3/imscsmd_v1p0",'xmlns:xsi':"http://www.w3.org/2001/XMLSchema-instance",'xsi:schemaLocation':"http://www.imsglobal.org/xsd/imsccv1p3/imscp_v1p1 http://www.imsglobal.org/profile/cc/ccv1p3/ccv1p3_imscp_v1p2_v1p0.xsd http://ltsc.ieee.org/xsd/imsccv1p3/LOM/resource http://www.imsglobal.org/profile/cc/ccv1p3/LOM/ccv1p3_lomresource_v1p0.xsd http://ltsc.ieee.org/xsd/imsccv1p3/LOM/manifest http://www.imsglobal.org/profile/cc/ccv1p3/LOM/ccv1p3_lommanifest_v1p0.xsd http://www.imsglobal.org/xsd/imsccv1p3/imscsmd_v1p0 http://www.imsglobal.org/profile/cc/ccv1p3/ccv1p3_imscsmd_v1p0.xsd http://www.imsglobal.org/xsd/imslticc_v1p3 http://www.imsglobal.org/xsd/lti/ltiv1p3/imslticc_v1p3.xsd http://ltsc.ieee.org/xsd/imsccv1p3/LOM/imscclti http://www.imsglobal.org/profile/cc/ccv1p3/LOM/ccv1p3_lomccltilink_v1p0.xsd http://www.imsglobal.org/xsd/imslticp_v1p0 http://www.imsglobal.org/xsd/lti/ltiv1p0/imslticp_v1p0.xsd http://www.imsglobal.org/xsd/imslticm_v1p0 http://www.imsglobal.org/xsd/lti/ltiv1p0/imslticm_v1p0.xsd http://www.imsglobal.org/xsd/imsbasiclti_v1p0 http://www.imsglobal.org/xsd/lti/ltiv1p0/imsbasiclti_v1p0p1.xsd http://www.imsglobal.org/xsd/imsccv1p3/imswl_v1p3 http://www.imsglobal.org/profile/cc/ccv1p3/ccv1p3_imswl_v1p3.xsd") {
		    metadata(){
			schema("IMS Thin Common Cartridge")
			schemaversion("1.3.0")
			'lomm:lom'(){
			    'lomm:general'(){
				'lomm:identifier'(){
				    'lomm:catalog'("ISBN")
				    'lomm:entry'(programInstance.name)
				}
				'lomm:title'(){
				    'lomm:string'(language:"en-US",programInstance.name)
				}
			    }
			    'lomm:rights'(){
				'lomm:copyrightAndOtherRestrictions'(){
				    'lomm:value'("yes")
				}
			    }
			    'lomm:lifeCycle'(){
				'lomm:contribute'(){
				    'lomm:role'(){
					'lomm:value'("publisher")
				    }
				    'lomm:entity'("Houghton Mifflin Harcourt")
				    'lomm:date'(){
					'lomm:dateTime'(productInstance.program.copyrightYear)
					'lomm:description'(){
					    'lomm:string'("Houghton Mifflin Harcourt")
					}
				    }
				}

			    }
			}

		    }//Metadata


		    str.append("<organizations>")
		    str.append("<organization identifier='TOC1' structure='rooted-hierarchy'>")
		    str.append("<item identifier='root'>")

		    //if grade level resources based on segments and strands write to XML
		    if(segStrandMap){
			Iterator segsentries = segStrandMap.entrySet().iterator();
			while (segsentries.hasNext()) {
			    Map.Entry segentry = (Map.Entry) segsentries.next();
			    def segskey = segentry.getKey();
			    def segvalue = segentry.getValue();
			    if(segskey.contains("<i>") || segskey.contains('"')){				
				segskey=segskey.replaceAll("<i>","").replaceAll("</i>","").replaceAll('"',"")			    
			    }
			    def strSeg="HMH_"+segskey.substring(0,2)+""+segskey.substring(segskey.length() - 2)
			    segstr.append("<item identifier='"+strSeg+"'><title>"+segskey+"</title>")
			    Iterator ssentries = segvalue.entrySet().iterator();
			    while (ssentries.hasNext()) {
				Map.Entry ssentry = (Map.Entry) ssentries.next();
				def sskey = ssentry.getKey();
				def resource = ssentry.getValue();
				def strStrand="HMH_"+sskey.substring(0,2)+""+sskey.substring(sskey.length() - 2)
				segstr.append("<item identifier='"+strStrand+"'><title>"+sskey+"</title>")
				if(resource){
				    for(int i=0;i<resource.size();i++)
				    {
					def strhmhId="HMH_"+resource[i].hmhId
					def strresId="RESOURCE_"+resource[i].id+"_"+resource[i].hmhId
					def displayTitle=resource[i].commonCartridgeTitle ?: resource[i].displayTitle
					segstr.append("<item identifier='"+strhmhId+"' identifierref='"+strresId+"'><title>"+displayTitle+"</title>")
					segstr.append("<metadata>"+mappingService.getCC13Resource(resource[i],programInstance,productInstance)+"</metadata>")
					segstr.append("</item>")

				    }

				}
				segstr.append("</item>")
			    }//strand
			    segstr.append("</item>")
			}//segmentMap
		    }

		    //if level resources based on levels,segments and strands write to XML
		    if(finalMap){
			Iterator entries = finalMap.entrySet().iterator();
			while (entries.hasNext()) {
			    Map.Entry entry = (Map.Entry) entries.next();
			    def key1 = entry.getKey();
			    def value1 = entry.getValue();
			    flevelstr=new StringBuffer()
			    slevelstr=new StringBuffer()
			    tlevelstr=new StringBuffer()
			    frlevelstr=new StringBuffer()
			    def lkey
			    for(int l=0;l<value1.size();l++){
				Iterator lentries = value1[l].entrySet().iterator();
				while (lentries.hasNext()) {
				    Map.Entry lentry = (Map.Entry) lentries.next();
				    lkey = lentry.getKey();
				    def lvalue = lentry.getValue();

				    Iterator lkentries = lvalue.entrySet().iterator();
				    while (lkentries.hasNext()) {
					Map.Entry lkentry = (Map.Entry) lkentries.next();
					def lkkey = lkentry.getKey();
					def lkvalue = lkentry.getValue();
					def levelTitle=lkkey.split("_@")

					def resHierarchy=levelTitle[0].substring(levelTitle[0].length() - 1)


					if(lkey==1){
					    def scopeTitle=productInstance.program.secondLevelScope+" "+resHierarchy+" : "+levelTitle[1]
					    flevelstr.append("<item identifier='"+levelTitle[0]+"'><title>"+scopeTitle+"</title>")
					}
					if(lkey==2)
					{
					    def scopeTitle=productInstance.program.thirdLevelScope+" "+resHierarchy+" : "+levelTitle[1]
					    slevelstr.append("<item identifier='"+levelTitle[0]+"'><title>"+scopeTitle+"</title>")
					}
					if(lkey==3)
					{
					    def scopeTitle=productInstance.program.fourthLevelScope+" "+resHierarchy+" : "+levelTitle[1]
					    tlevelstr.append("<item identifier='"+levelTitle[0]+"'><title>"+scopeTitle+"</title>")
					}
					if(lkey==4)
					{
					    def scopeTitle=productInstance.program.fifthLevelScope+" "+resHierarchy+" : "+levelTitle[1]
					    frlevelstr.append("<item identifier='"+levelTitle[0]+"'><title>"+scopeTitle+"</title>")
					}
					for(int s2=0;s2<lkvalue.size();s2++){
					    Iterator sentries = lkvalue[s2].entrySet().iterator();
					    while (sentries.hasNext()) {
						Map.Entry sentry = (Map.Entry) sentries.next();
						def skey = sentry.getKey();
						def svalue = sentry.getValue();
						def strSeg=skey.substring(0,2)+""+skey.substring(skey.length() - 2)
						if(lkey==1)
						    flevelstr.append("<item identifier='"+levelTitle[0]+"_"+strSeg+"'><title>"+skey+"</title>")
						if(lkey==2)
						    slevelstr.append("<item identifier='"+levelTitle[0]+"_"+strSeg+"'><title>"+skey+"</title>")
						if(lkey==3)
						    tlevelstr.append("<item identifier='"+levelTitle[0]+"_"+strSeg+"'><title>"+skey+"</title>")
						if(lkey==4)
						    frlevelstr.append("<item identifier='"+levelTitle[0]+"_"+strSeg+"'><title>"+skey+"</title>")
						Iterator ssentries = svalue.entrySet().iterator();
						while (ssentries.hasNext()) {
						    Map.Entry ssentry = (Map.Entry) ssentries.next();
						    def sskey = ssentry.getKey();
						    def resource = ssentry.getValue();
						    def strStrand=sskey.substring(0,2)+""+sskey.substring(sskey.length() - 2)
						    // str.append("<item identifier='"+levelTitle[0]+"_"+strStrand+"'><title>"+sskey+"</title>")
						    if(lkey==1)
							flevelstr.append("<item identifier='"+levelTitle[0]+"_"+strSeg+"_"+strStrand+"'><title>"+sskey+"</title>")
						    if(lkey==2)
							slevelstr.append("<item identifier='"+levelTitle[0]+"_"+strSeg+"_"+strStrand+"'><title>"+sskey+"</title>")
						    if(lkey==3)
							tlevelstr.append("<item identifier='"+levelTitle[0]+"_"+strSeg+"_"+strStrand+"'><title>"+sskey+"</title>")
						    if(lkey==4)
							frlevelstr.append("<item identifier='"+levelTitle[0]+"_"+strSeg+"_"+strStrand+"'><title>"+sskey+"</title>")


						    if(resource){
							for(int i=0;i<resource.size();i++)
							{
							    def strhmhId="HMH_"+resource[i].hmhId
							    def strresId="RESOURCE_"+resource[i].id+"_"+resource[i].hmhId
							    def displayTitle=resource[i].commonCartridgeTitle ?: resource[i].displayTitle
							    if(lkey==1){
								flevelstr.append("<item identifier='"+strhmhId+"' identifierref='"+strresId+"'><title>"+displayTitle+"</title>")
								flevelstr.append("<metadata>"+mappingService.getCC13Resource(resource[i],programInstance,productInstance)+"</metadata>")
								flevelstr.append("</item>")
							    }
							    if(lkey==2){
								slevelstr.append("<item identifier='"+strhmhId+"' identifierref='"+strresId+"'><title>"+displayTitle+"</title>")
								slevelstr.append("<metadata>"+mappingService.getCC13Resource(resource[i],programInstance,productInstance)+"</metadata>")
								slevelstr.append("</item>")
							    }
							    if(lkey==3){
								tlevelstr.append("<item identifier='"+strhmhId+"' identifierref='"+strresId+"'><title>"+displayTitle+"</title>")
								tlevelstr.append("<metadata>"+mappingService.getCC13Resource(resource[i],programInstance,productInstance)+"</metadata>")
								tlevelstr.append("</item>")
							    }
							    if(lkey==4){
								frlevelstr.append("<item identifier='"+strhmhId+"' identifierref='"+strresId+"'><title>"+displayTitle+"</title>")
								frlevelstr.append("<metadata>"+mappingService.getCC13Resource(resource[i],programInstance,productInstance)+"</metadata>")
								frlevelstr.append("</item>")
							    }
							}

						    }
						    if(lkey==1)
							flevelstr.append("</item>")
						    if(lkey==2)
							slevelstr.append("</item>")
						    if(lkey==3)
							tlevelstr.append("</item>")
						    if(lkey==4)
							frlevelstr.append("</item>")
						}//strand
						if(lkey==1)
						    flevelstr.append("</item>")
						if(lkey==2)
						    slevelstr.append("</item>")
						if(lkey==3)
						    tlevelstr.append("</item>")
						if(lkey==4)
						    frlevelstr.append("</item>")
					    }//segmentMap
					} //segmentStrandList


				    }//Levels


				}

				if(lkey==2)
				    slevelstr.append("</item>")
				if(lkey==3)
				    tlevelstr.append("</item>")
				if(lkey==4)
				    frlevelstr.append("</item>")

			    }
			    levelstr.append(flevelstr.toString())
			    levelstr.append(slevelstr.toString())
			    levelstr.append(tlevelstr.toString())
			    levelstr.append(frlevelstr.toString())
			    levelstr.append("</item>")

			}//levelsname

		    }//finalmap
		    str.append(segstr.toString())
		    str.append(levelstr.toString())
		    str.append("</item>")//item root
		    str.append("</organization>")//organization
		    str.append("</organizations>")//organizations
		    //print all the level Items
		    mkp.yieldUnescaped str.toString()

		    resources(){
			targetResourceList.eachWithIndex{resrc,idx->

			    def userRole
			    if (resrc.seFacing){
				userRole='Learner';
			    }else{
				userRole='Instructor';
			    }
			    def levelMap =levelsService.getFullLevelsMap(resrc)
			    def grades=levelMap.top.grades.grade
			    Collections.sort(grades);
			    def lowGrade=grades.get(0);
			    Collections.reverse(grades);
			    def topGrade=grades.get(0);
			    resource(identifier:"RESOURCE_"+resrc.id+"_"+resrc.hmhId, type:"imsbasiclti_xmlv1p3"){
				metadata(){
				    'lomr:lom'(){
					'lomr:educational'(){
					    'lomr:intendedEndUserRole'(){
						'lomr:source'("IMSGLC_CC_Rolesv1p2")
						'lomr:value'(userRole)
					    }
					    if(grades.size()>=1){
						'lomr:typicalAgeRange'(){
						    'lomr:string'(lowGrade+' to '+topGrade)
						}
					    }
					    if(userRole=="Learner"){
						'lomr:intendedEndUserRole'(){
						    'lomr:source'("ThinCC_Access_Permission_Vocab")
						    'lomr:value'("student")
						}
						'lomr:intendedEndUserRole'(){
						    'lomr:source'("IMSGLC_CC_Rolesv1p2")
						    'lomr:value'("Learner")
						}

					    }
					    'lomr:intendedEndUserRole'(){
						'lomr:source'("IMSGLC_CC_Rolesv1p2")
						'lomr:value'("Instructor")
					    }
					    'lomr:intendedEndUserRole'(){
						'lomr:source'("ThinCC_UseType_Vocab")
						'lomr:value'("primary")
					    }
					    'lomr:intendedEndUserRole'(){
						'lomr:source'("ThinCC_Visibility_Vocab")
						'lomr:value'("public")
					    }
					    'lomr:learningResourceType'(){
						'lomr:value'(userRole)
					    }
					}
					'lomr:technical'(){
					    'lomr:installationRemarks'(){
						'lomr:string'(platformUrl)
					    }
					    'lomr:location'(resrc.uri)
					}
				    }//lom

				    //Standards
				    //ANGUID/HMSI standards
				    if(generateXmls.isStandards=="Include Standards")
				    {
					def abGuidsSvnLink
					def hmsiSvnLink
					abGuidsSvnLink=programInstance.abStandard
					hmsiSvnLink=programInstance.hmsiStandard
					def abxmlData
					def hmsixmlData
					def hmsixmlAbGuidData
					if(generateXmls.standardType=="Generic Delivery" && abGuidsSvnLink){
					    abxmlData=commonCartridgeStandardsService.parseStandardsXML(abGuidsSvnLink,"ABGUID")
					} else if(generateXmls.standardType=="Brainhoney Delivery" && hmsiSvnLink)
					{
					    hmsixmlData=commonCartridgeStandardsService.parseStandardsXML(hmsiSvnLink,"HMSI")
					}else if(generateXmls.standardType=="Generic Delivery" && hmsiSvnLink)
					{
					    hmsixmlAbGuidData=commonCartridgeStandardsService.parseStandardsXML(hmsiSvnLink,"HMSI")
					}
					Set allStandards = resrc.standards.standard

					def abStandardsXmlMap=[:]
					def hmsiStandardsXmlMap=[:]
					def hmsiStandardsXmlAbGuidMap=[:]
					if(abxmlData && allStandards){
					    abStandardsXmlMap=commonCartridgeStandardsService.getAbGuids(abxmlData,allStandards)
					}else if(hmsixmlData && allStandards){
					    hmsiStandardsXmlMap=commonCartridgeStandardsService.getHMSIHeirarchyId(hmsixmlData,allStandards)
					}
					else if(hmsixmlAbGuidData && allStandards){
					    hmsiStandardsXmlAbGuidMap=commonCartridgeStandardsService.getHMSIXmlAbGUID(hmsixmlAbGuidData,allStandards)
					}

					//standards
					if(abStandardsXmlMap.standardsXmlMap){
					    'csm:curriculumStandardsMetadataSet'(){
						'csm:curriculumStandardsMetadata'(providerId:"HMH"){
						    'csm:setOfGUIDs'(version:"1.0",region:abStandardsXmlMap.state){
							abStandardsXmlMap.standardsXmlMap.each{standard,abguid->
							    'csm:labelledGUID'{
								'csm:label'(standard)
								'csm:GUID'(abguid)
							    }
							}
						    }
						}
					    }
					}else if(hmsiStandardsXmlMap.standardsXmlMap){
					    'csm:curriculumStandardsMetadataSet'(){
						'csm:curriculumStandardsMetadata'(providerId:"HMH"){
						    'csm:setOfGUIDs'(version:"1.0",region:hmsiStandardsXmlMap.state){
							hmsiStandardsXmlMap.standardsXmlMap.each{standard,abguid->
							    'csm:labelledGUID'{
								'csm:label'(standard)
								'csm:GUID'("00000000-0000-0000-0000-0000"+abguid)
							    }
							}
						    }
						}
					    }
					}else if(hmsiStandardsXmlAbGuidMap.standardsXmlMap){
					    'csm:curriculumStandardsMetadataSet'(){
						'csm:curriculumStandardsMetadata'(providerId:"HMH"){
						    'csm:setOfGUIDs'(version:"1.0",region:hmsiStandardsXmlAbGuidMap.state){
							hmsiStandardsXmlAbGuidMap.standardsXmlMap.each{standard,abguid->
							    'csm:labelledGUID'{
								'csm:label'(standard)
								'csm:GUID'(abguid)
							    }
							}
						    }
						}
					    }
					}
				    }

				}//metadata
				def rdisplayTitle=resrc.commonCartridgeTitle ?: resrc.displayTitle
				'lticc:cartridge_basiclti_link'(){
				    'blti:title'(rdisplayTitle)
				    'blti:description'(resrc.displayTitle)
				    'blti:custom'(){
					'lticm:property'(name:"resource_url",resrc.uri)
					'lticm:property'(name:"resource_isbn",productInstance.isbn)
				    }
				    'blti:launch_url'(platformUrl)
				    'blti:vendor'(){
					'lticp:code'(vendorCode)
					'lticp:name'("Houghton Mifflin Harcourt")
				    }
				    'lticc:metadata'(){
					'lomc:lom'(){
					    'lomc:general'(){
						'lomc:identifier'(){
						    'lomc:entry'(resrc.hmhId)
						}
					    }
					}
				    }
				}

			    }//resource
			}
		    }//resources
		}//Manifest
	    }
	    return xml
	}catch(Exception ex){
	    log.error ex.getMessage()
	    return false
	}

    }
    /**
     * A Method which forms the Map to get the segments,strands,content based on the Levels 
     * @return finalMap Map
     */

    def levelsMap(targetResourceList)
    {
	HashMap<String, HashMap<String,String>> segStrandMap = new HashMap<String,HashMap<String,String>>();
	HashMap<String,String> strandMap =  new HashMap<String,String>();
	ArrayList rsrcList = new ArrayList();
	HashMap<String,ArrayList<HashMap<String, HashMap<String,String>>>> levelsMap = new HashMap<String,ArrayList<HashMap<String,HashMap<String,String>>>>();
	Map finalMap = new HashMap();

	def intLevel
	def nonLevelFlag=true
	targetResourceList.each{resrc->

	    def levelMap =levelsService.getFullLevelsMap(resrc)
	    def strSegment=resrc.segment.title
	    def strStrand=resrc.strand.title
	    List valueList = new ArrayList();
	    if(levelMap.fifth){
		intLevel="HMH_"+levelMap.second.hierarchy+"_"+levelMap.third.hierarchy+"_"+levelMap.fourth.hierarchy+"_"+levelMap.fifth.hierarchy+"_@"+levelMap.fifth.title
		nonLevelFlag=false
	    }else if(levelMap.fourth){
		intLevel="HMH_"+levelMap.second.hierarchy+"_"+levelMap.third.hierarchy+"_"+levelMap.fourth.hierarchy+"_@"+levelMap.fourth.title
		nonLevelFlag=false
	    } else if(levelMap.third){
		intLevel="HMH_"+levelMap.second.hierarchy+"_"+levelMap.third.hierarchy+"_@"+levelMap.third.title
		nonLevelFlag=false
	    }else if(levelMap.second){
		intLevel="HMH_"+levelMap.second.hierarchy+"_@"+levelMap.second.title
		nonLevelFlag=false
	    }else if(levelMap.top){
		nonLevelFlag=true
	    }

	    if(!nonLevelFlag){
		if(levelsMap.containsKey(intLevel))
		{
		    segStrandMap =  levelsMap.get(intLevel);

		    if(segStrandMap.containsKey(strSegment))
		    {
			strandMap =  segStrandMap.get(strSegment);

			if(strandMap.containsKey(strStrand))
			{
			    rsrcList=strandMap.get(strStrand);
			    rsrcList.add(resrc)
			    strandMap.put(strStrand,rsrcList)
			}else{
			    rsrcList = new ArrayList();
			    rsrcList.add(resrc);
			    strandMap.put(strStrand,rsrcList);
			}
			valueList = new ArrayList();
			valueList.add(segStrandMap)
			levelsMap.put(intLevel,valueList)

		    }else
		    {
			strandMap =  new HashMap<String,String>();
			rsrcList = new ArrayList();
			rsrcList.add(resrc);
			strandMap.put(strStrand,rsrcList);
			segStrandMap.put(strSegment,strandMap)
			valueList = new ArrayList();
			valueList.add(segStrandMap)
			levelsMap.put(intLevel,valueList)
		    }

		}else{

		    segStrandMap=new HashMap<String,HashMap<String,String>>();
		    strandMap =  new HashMap<String,String>();
		    rsrcList = new ArrayList();
		    rsrcList.add(resrc);
		    strandMap.put(strStrand,rsrcList);
		    segStrandMap.put(strSegment,strandMap)
		    valueList = new ArrayList();
		    valueList.add(segStrandMap)
		    levelsMap.put(intLevel,valueList)

		}
	    }
	}
	Map map = new HashMap();
	if(levelsMap){
	    levelsMap.each{key,value->
		if(key.contains("_")){
		    def str=key.split("_")
		    map.put(key, str[0]+"_"+str[1]);
		}
	    }
	    Set parentLevelList = new HashSet(map.values());
	    Map lmap = new HashMap();
	    def levels

	    for(Object valueList1 : map.keySet()) {
		levels=valueList1.split("_")
		if(levels.size()==3)
		    lmap.put(valueList1,1)
		if(levels.size()==4)
		    lmap.put(valueList1,2)
		if(levels.size()==5)
		    lmap.put(valueList1,3)
		if(levels.size()==6)
		    lmap.put(valueList1,4)
	    }


	    for(Object keyList : parentLevelList ){
		List innerList = new ArrayList();
		for(Object strValue : lmap.entrySet()) {
		    Map lmap1 = new TreeMap();
		    Map sStrandMap = new HashMap();
		    def lkkey = strValue.getValue();
		    def lkvalue = strValue.getKey();
		    if(lkvalue.toString().contains(keyList.toString())) {
			sStrandMap.put(lkvalue,levelsMap.get(lkvalue))
			lmap1.put(lkkey,sStrandMap)
			innerList.add(lmap1);
		    }

		}
		finalMap.put(keyList, innerList);
	    }
	}
	finalMap
    }

    /**
     * A Method which forms the Map to get the content based on the segments and strands
     * @return finalMap Map
     */

    def segStrandMap(targetResourceList)
    {
	HashMap<String, HashMap<String,String>> ssegStrandMap = new HashMap<String,HashMap<String,String>>();
	HashMap<String,String> sstrandMap =  new HashMap<String,String>();
	ArrayList srsrcList = new ArrayList();
	Map segStrandfinalMap = new HashMap();
	def intLevel=true
	targetResourceList.each{resrc->

	    def levelMap =levelsService.getFullLevelsMap(resrc)
	    def strSegment=resrc.segment.title
	    def strStrand=resrc.strand.title
	    if(levelMap.fifth)
		intLevel=false
	    else if(levelMap.fourth)
		intLevel=false
	    else if(levelMap.third)
		intLevel=false
	    else if(levelMap.second)
		intLevel=false
	    else if(levelMap.top)
		intLevel=true
	    if(intLevel){
		if(ssegStrandMap.containsKey(strSegment))
		{
		    sstrandMap =  ssegStrandMap.get(strSegment);
		    if(sstrandMap.containsKey(strStrand))
		    {
			srsrcList=sstrandMap.get(strStrand);
			srsrcList.add(resrc)
			sstrandMap.put(strStrand,srsrcList)
		    }else{
			srsrcList = new ArrayList();
			srsrcList.add(resrc);
			sstrandMap.put(strStrand,srsrcList);
		    }
		}else
		{
		    sstrandMap =  new HashMap<String,String>();
		    srsrcList = new ArrayList();
		    srsrcList.add(resrc);
		    sstrandMap.put(strStrand,srsrcList);
		    ssegStrandMap.put(strSegment,sstrandMap)
		}
	    }
	}

	ssegStrandMap
    }
}

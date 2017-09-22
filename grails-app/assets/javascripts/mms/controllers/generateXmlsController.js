//= wrapped

angular.module("mms").controller("GenerateXmlsController",GenerateXmlsController);

function GenerateXmlsController(GenerateXmls, $rootScope, ngNotify,$http,FileSaver, Blob,ngProgressFactory) {
	var vm = this;

	vm.errorCallback = function(response) {
		// Check out this for 404 etc  http://stackoverflow.com/questions/28171486/render-404-page-without-redirecting-in-angular-js
		var message = 'Error ' + response.status + ' (' + response.statusText + ') ';
		console.error(message);
		if(message.indexOf("undefined") != -1)
			ngNotify.set('New XML Generated Successfully', 'success');
		else			
			ngNotify.set("Errors found while generating Xml",'error');

	}
	var proPrograms =[];


	vm.generateXML = function(programId, xmlId,levels,isStandard,standardType,$event) {
		if(levels==undefined)
		{ levels="Program Level";}	
		if(isStandard==undefined)
		{ isStandard="Include Standards";}
		if(standardType==undefined)
		{ standardType="Generic Delivery";}
		var ngp="p_"+xmlId+"_"+programId;			  
		ngp = ngProgressFactory.createInstance();		
		var progId='ngProgress_'+xmlId+'_'+programId;	
		ngp.setParent(document.getElementById(progId));	
		ngp.setHeight("15px");
		ngp.setColor("Orange");
		ngp.start();	
		var plist = document.getElementById(progId);					    
		if (plist.hasChildNodes()) {  	    
			plist.removeChild(plist.childNodes[0]);	
		}
		var para = document.createElement("p");
		var node = document.createTextNode("In Progress");	 
		var geneId='generateEx_'+xmlId+"_"+programId;	
		document.getElementById(geneId).disabled = true;
		para.appendChild(node);	      
		document.getElementById(progId).appendChild(para);	 

		proPrograms.push(ngp);			
		new GenerateXmls({programsId:programId, xmlType:xmlId,ccXmlLevel:levels,isStandards:isStandard,standardType:standardType			
		}).$save(function(response) {	

			if(response.status==200){				
				var index=proPrograms.indexOf(ngp);					
				if(index!= -1)
				{						 
					ngp.complete();	
					var list = document.getElementById(progId);					    
					if (list.hasChildNodes()) {	
						list.removeChild(list.childNodes[0]);					    	
						var para1 = document.createElement("p");
						var t1 = document.createTextNode("Completed");

						para1.appendChild(t1);
						document.getElementById(progId).replaceChild(para1,para);
						document.getElementById(geneId).disabled = false;
					}	
					$event.preventDefault();
				}
				if(xmlId=='XML_MDS')
					ngNotify.set('New Program MDS Xml Generated Successfully', 'success');
				if(xmlId=='XML_PLANNER')
					ngNotify.set('New Program Planner Xml Generated Successfully', 'success');
				if(xmlId=='XML_CC12')
					ngNotify.set('New Program Common Cartrdige 1.2 Xml Generated Successfully', 'success');
				if(xmlId=='XML_ALCHEMY')
					ngNotify.set('New Program Alchemy Xml Generated Successfully', 'success');
				if(xmlId=='XML_CC13')
					ngNotify.set('New Program Common Cartrdige 1.3 Xml Generated Successfully', 'success');
				if(xmlId=='XML_CORRELATIONS')
					ngNotify.set('New TC Program Standard Correlations Xml Generated Successfully', 'success');
			}
			$rootScope.$broadcast("REFRESHGPROGRAMREQUIRED");
		}, vm.errorCallback);

	}

	vm.generateCorrelationXML = function(programId, xmlType,levels,isStandard,standardType,$event) {	

		$http.get(contextPath + '/generateXmls/isCorrelationResource?programId='+programId).success(function (data, status, headers, config) {
			if (data.correlationFlag){       
				alert("MMS has detected that there are manually added correlations within the Resource URLs and these will be removed.");
				vm.generateXML(programId, xmlType,levels,isStandard,standardType,$event)
			}else if(!data.correlationFlag)
			{
				ngNotify.set("This Program has no correlation resources to generate",'error'); 
			}
		}).error(function (data, status, headers, config) {
			alert("An error occurred While generating the Correlation Xml");
		});

	}

	vm.isResourcesExist = function(programId, xmlType,levels,isStandard,standardType,$event) {	

		$http.get(contextPath + '/generateXmls/isResourcesExist?programId='+programId+'&xmlType='+xmlType).success(function (data, status, headers, config) {

			if (!data.resourceFlag){       
				ngNotify.set("This Program has no resources to generate",'error'); 
			}
			else{
				vm.generateXML(programId, xmlType,levels,isStandard,standardType,$event)
			}

		}).error(function (data, status, headers, config) {
			alert("An error occurred While generating the Xml");
		});

	}

	vm.DownloadFile = function (programId,programName,xmlId,levels,isStandard,standardType) {	
		var fileName

		if(levels==undefined)
		{ levels="Program Level";}	
		if(isStandard==undefined)
		{ isStandard="Include Standards";}
		if(standardType==undefined)
		{ standardType="Generic Delivery";}

		if(xmlId=='XML_MDS')
		{
			fileName="MDS_"+programName+".zip";	
		}else if(xmlId=='XML_PLANNER')
		{
			fileName="Planner_"+programName+".zip";	
		}else if(xmlId=='XML_CC12')
		{
			if(levels!="Program Level"){			
				if(isStandard=="Ignore Standards")
				{
					fileName="CC_12_grades_"+programName+".zip";
				}else if(isStandard=="Include Standards")
				{
					if(standardType=="Generic Delivery")
					{
						fileName="CC_12_grades_ABStandards_"+programName+".zip";

					}else if(standardType=="Brainhoney Delivery")
					{
						fileName="CC_12_grades_BrainHoney_"+programName+".zip";					  				
					}
				}
			}
			else{

				if(isStandard=="Ignore Standards")
				{
					fileName="CC_12_"+programName+".zip";
				}else if(isStandard=="Include Standards" && standardType=="Generic Delivery")
				{
					fileName="CC_12_ABStandards_"+programName+".zip";

				}else if(isStandard=="Include Standards" && standardType=="Brainhoney Delivery")
				{
					fileName="CC_12_BrainHoney_"+programName+".zip";			  				
				}
			}



		}else if(xmlId=='XML_ALCHEMY')
		{
			fileName="Alchemy_"+programName+".zip";	
		}else if(xmlId=='XML_CC13')
		{ 
			if(levels!="Program Level")
			{

				if(isStandard=="Ignore Standards")
				{
					fileName="CC_13_grades_"+programName+".zip";
				}else if(isStandard=="Include Standards" && standardType=="Generic Delivery")
				{
					fileName="CC_13_grades_ABStandards_"+programName+".zip";

				}else if(isStandard=="Include Standards" && standardType=="Brainhoney Delivery")
				{
					fileName="CC_13_grades_BrainHoney_"+programName+".zip";					  				
				}		
			}
			else
			{			
				if(isStandard=="Ignore Standards")
				{
					fileName="CC_13_"+programName+".zip";
				}else if(isStandard=="Include Standards" && standardType=="Generic Delivery")
				{
					fileName="CC_13_ABStandards_"+programName+".zip";

				}else if(isStandard=="Include Standards" && standardType=="Brainhoney Delivery")
				{
					fileName="CC_13_BrainHoney_"+programName+".zip";				  				
				}
			}			
		}else if(xmlId=='XML_CORRELATIONS')
		{
			fileName="TCCorrelations_"+programName+".zip";	
		}
		$http.get(contextPath + '/generateXmls/DownloadFile?programId='+programId+'&xmlId='+xmlId+'&levels='+levels+'&isStandard='+isStandard+'&standardType='+standardType, {	                
			params: {},
			headers: {
				'Content-type': 'application/zip,charset=utf-8'	               
			},
			responseType: 'arraybuffer'
		}).success(function (data, status, headers, config) {	         
			if (status == 200) {      		                	 
				var file = new Blob([data],{type: 'application/zip,charset=utf-8'});
				FileSaver.saveAs(file, fileName);
			}
			else
				alert("File Not Found");
		}).error(function (data, status, headers, config) {	     
			alert("Errors found while downloading Zip File");      
		});
	}

	vm.list = function() {    	
		GenerateXmls.list(
				function(programs) {
					vm.programs = programs; 
					var getGrades =[]
					for(var i=0;i<programs.length;i++)
					{
						var grades =[]
						for(var p=0;p<programs[i].products.length;p++)
						{            	            	
							for(var g=0;g<programs[i].products[p].grades.length;g++)
							{            	

								grades.push(programs[i].products[p].grades[g].grade)
							}
						}
						grades.sort();
						var finalArr = [];
						for(var a = 0;a<grades.length;a++) {
							if(!(grades[a] === grades[a+1] || grades[a] === grades[a-1])) {
								finalArr.push(grades[a]);
							} 
						}                	
						getGrades.push(finalArr)
					}
					vm.getArrGrades=getGrades
				},
				vm.errorCallback
		);
	}
	vm.ccXmlLevel = [ {value: 'Program Level', text: 'Program Level'},
	                  {value: 'Grade Level', text: 'Grade Level'}
	];
	vm.isStandards = [{value: 'Include Standards', text: 'Include Standards'},
	                  {value: 'Ignore Standards', text: 'Ignore Standards'}];

	vm.standardType = [{value: 'Generic Delivery', text: 'Generic Delivery'},
	                   {value: 'Brainhoney Delivery', text: 'Brainhoney Delivery'}];
	vm.list();

	$rootScope.$on("REFRESHGPROGRAMREQUIRED", vm.list);


}

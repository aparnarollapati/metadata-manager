//= wrapped

angular
.module("mms")
.controller("GenerateExcelController", GenerateExcelController);

function GenerateExcelController(GenerateExcel, $rootScope, ngNotify, $http, FileSaver, Blob, ngProgressFactory) {
	var vm = this;


	vm.errorCallback = function(response) {
		// Check out this for 404 etc  http://stackoverflow.com/questions/28171486/render-404-page-without-redirecting-in-angular-js
		var message = 'Error ' + response.status + ' (' + response.statusText + ') ';
		console.error(message);
		if(message.indexOf("undefined") != -1)
			ngNotify.set('New Excel Generated Successfully', 'success');
		else
		{				
			ngNotify.set("Errors found while generating Excel",'error');
		}

	}

	var proPrograms = []	


	vm.generateExcel = function ( programId, $event, excelType ) {

		var progressBar="p_"+excelType+"_"+programId;

		progressBar = ngProgressFactory.createInstance();

		var progId='ngProgress_'+programId+'_'+excelType;

		progressBar.setParent(document.getElementById(progId));	

		var plist = document.getElementById(progId);					    
		if (plist.hasChildNodes()) {	  	    
			plist.removeChild(plist.childNodes[0]);	
		}

		var para = document.createElement("p");
		var node = document.createTextNode("In Progress");

		var geneId='generateEx_'+programId+'_'+excelType;	

		document.getElementById(geneId).disabled = true;
		para.appendChild(node);	      
		document.getElementById(progId).appendChild(para);


		progressBar.setHeight("15px");
		progressBar.setColor("Orange");
		progressBar.start();
		vm.programid=programId;
		proPrograms.push(progressBar);


		new GenerateExcel({ programsId: programId, excelType: excelType }).$save(function(response) {				
			$rootScope.$broadcast("REFRESHGPROGRAMREQUIRED");

			if(response.status==200){				
				var index=proPrograms.indexOf(progressBar);					
				if(index!= -1)
				{						 
					progressBar.complete();	
					var list = document.getElementById(progId);					    
					if (list.hasChildNodes()) {	
						list.removeChild(list.childNodes[0]);					    	
						var para1 = document.createElement("p");
						var t1 = document.createTextNode("Completed");
						document.getElementById(geneId).disabled = false;
						para1.appendChild(t1);
						document.getElementById(progId).replaceChild(para1,para);
					}	

					$event.preventDefault();
				}
				ngNotify.set('Excel Generated Successfully', 'success');
			}		
		}, vm.errorCallback);

	}


	vm.downloadFile = function (programId, programName, excelType) {	
		var fileName

		fileName = "Excel_"+programName+".zip";		
		$http.get(contextPath + '/generateExcel/downloadFile?programId='+programId+'&excelType='+excelType, {	                
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

	vm.isResourcesExist = function (programId, $event, excelType) {	
		$http.get(contextPath + '/generateExcel/isResourcesExist?programId='+programId+'&excelType='+excelType).success(function (data, status, headers, config) {
			if (data.resourceFlag){ 
				vm.generateExcel( programId, $event, excelType) 
			}			
			else if (excelType == 'EXCEL_CORRELATIONS') {
				ngNotify.set("This Program has no Correlations to generate",'error');
			}			
			else if (excelType == 'EXCEL_PROGRAM_STRUCTURE') {
			
				ngNotify.set("This Program has no Lesson Plans to generate",'error');
			}
			
			else { 
				ngNotify.set("This Program has no resources to generate",'error'); 
			}		

		}).error(function (data, status, headers, config) {
			ngNotify.set("An error occurred While checking the program contains resources",'error');	

		});

	}


	vm.list = function() {    	
		GenerateExcel.list(
				function(programs) {
					vm.programs = programs;			
				},
				vm.errorCallback
		);

	}
	vm.list();
	$rootScope.$on("REFRESHGPROGRAMREQUIRED", vm.list);
}

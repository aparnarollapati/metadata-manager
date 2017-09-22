//= wrapped

angular
.module("mms.correlations")
.controller("ContentTargetController", ContentTargetController);

function ContentTargetController(ContentTarget,Productdetails, $rootScope, ngNotify) {
	var vm = this;
	vm.targetcontent = [];
	vm.newProductTarget;
	vm.errorCallback = function(response) {

		// Check out this for 404 etc  http://stackoverflow.com/questions/28171486/render-404-page-without-redirecting-in-angular-js
		var message = 'Error ' + response.status + ' (' + response.statusText + ') ';

		if(response.status == 500)
		{
			message = 'Sorry, we couldn\'t delete your Target-Resource. ';
		} else if(response.status == 405)
		{
			message = 'Sorry, we couldn\'t delete your Target-Resource. ' + response.data; 
		} else if(response.status == 422)
		{
			if(response.data.total > 1)
			{
				message = 'Sorry, we couldn\'t save your Target-Resource. There were multiple errors.';

				angular.forEach(response.data._embedded.errors, function(value, key){
					console.log(key + ': ' + value.message);
					message += '  ' + value.message;
				});
			}else
			{
				message = 'Sorry, we couldn\'t save your Target-Resource.  ' + response.data.message;
			}
		}

		console.error(message);
		ngNotify.set(message, 'error');
	};
	vm.list = function() { 

		ContentTarget.list(
				function(targetcontent) {
					vm.targetcontent = content;
				},
				vm.errorCallback
		);

	};

	vm.addTargetContent = function(currentContentSource) {  
		var strId=vm.newProductTarget	
		var ptid=strId.split("-");
		new ContentTarget({content : vm.newContentTarget,targetType:vm.cTargetType, correlationTarget : {"id":ptid[0]} ,sourceResource :{"id":currentContentSource}}).$save(
				function(response) {
					$rootScope.$broadcast("REFRESHPROGRAMCRREQUIRED");
					ngNotify.set('New Correlation Target-Resource added!', 'success' );
					vm.targetcontent = '';                    
				},
				vm.errorCallback
		);    	
	};

	vm.addHmofTargetContent = function(currentContentSource,correlationSource) {
		new ContentTarget({content : vm.newContentTarget,targetType:'PMT', correlationTarget : {"id":correlationSource.correlationTargets[0].id} ,sourceResource :{"id":currentContentSource},sortId:vm.sortId}).$save(
				function(response) {
					$rootScope.$broadcast("REFRESHPROGRAMCRREQUIRED");
					ngNotify.set('New Correlation Target-Resource added!', 'success' );
					vm.targetcontent = '';                    
				},
				vm.errorCallback
		);    	
	};


	vm.targetProducts = {};
	vm.getTargetProducts= function(currentTargetProducts) {   

		for(var i=0;i<currentTargetProducts.length;i++){
			vm.targetProducts[currentTargetProducts[i].id]=currentTargetProducts[i].product;    		
		}

	}; 


	vm.delete = function(contentTarget) {
		var id = contentTarget.id;
		ContentTarget.delete({ id:id },contentTarget,
				function(response) {
			$rootScope.$broadcast("REFRESHPROGRAMCRREQUIRED");
			ngNotify.set('Correlation Target-Resource with name \"' + contentTarget.content.displayTitle + '\" deleted!', 'success');
			vm.targetcontent = ContentTarget.list();
		},
		vm.errorCallback
		);
	}

	vm.fullTargetResources = [];
	vm.getContentTargets = function() {	
		vm.fullTargetResources = [];
		var strId=vm.newProductTarget	
		var ptid=strId.split("-");
		Productdetails.get({id:ptid[1]}, function(fullTResources) { 
			vm.fullTargetResources = fullTResources;     
			if(vm.fullTargetResources.length==1)
				vm.newContentTarget =vm.fullTargetResources[0];
		},
		vm.errorCallback);
		 
	};

	vm.fullUTargetResources = [];
	vm.getUpdateContentTargets = function(productid,contentTargets) {	
		vm.fullUTargetResources = [];		
		var contentIds= []; 	
		for(var i=0;i<contentTargets.length;i++)
		{ 
			contentIds.push(contentTargets[i].content.id)   		
		} 		
		Productdetails.get({id:productid}, function(fullTResources) { 
				for(var i=0;i<fullTResources.content.length;i++)
				{
				 if(contentIds.indexOf(fullTResources.content[i][0]) === -1){    		
		    	     vm.fullUTargetResources.push(fullTResources.content[i]); 		    	    
				  }
				}
		},vm.errorCallback);
		 
	};

	
	vm.fullHMOFTargetResources = [];
	vm.getHMOFTargetContents = function(correlations,contentTargets) {	
		vm.fullHMOFTargetResources = [];
		var contentIds= []; 	
		for(var i=0;i<contentTargets.length;i++)
		{ 
			contentIds.push(contentTargets[i].content.id)   		
		} 		
		Productdetails.get({id:correlations.product.id}, function(fullTResources) { 		
			for(var i=0;i<fullTResources.content.length;i++)
			{
				if(contentIds.indexOf(fullTResources.content[i][0]) === -1)
				{    				
					if(fullTResources.content[i][2].component==correlations.correlationTargets[0].component.component){    	 			
						vm.fullHMOFTargetResources.push(fullTResources.content[i]);    		    	 		         	 			
					}	
				}
				else if(contentTargets==="")
				{
					if(fullTResources.content[i][2].component==correlations.correlationTargets[0].component.component){
						vm.fullHMOFTargetResources.push(fullTResources.content[i]);    		 
					}
				}
			}   
		  if(vm.fullHMOFTargetResources.length==1)
			vm.newContentTarget =vm.fullHMOFTargetResources[0];

		},
		vm.errorCallback);
		
		
	};

	vm.updateTCTSourceType = function( SourceTarget, sourceType) {
		var id = SourceTarget.id		
		SourceTarget.sourceType = sourceType		
        ContentTarget.update({ id:id }, SourceTarget, function(response) {			
			// This is required to update the component specs at the product
        	ngNotify.set('Correlation Target Resource with title \"' + SourceTarget.content.displayTitle + '\" was updated!', 'success');
			$rootScope.$broadcast("REFRESHPROGRAMCRREQUIRED");
			
		},vm.errorCallback);
		
	};
	vm.updateTCTargetResource = function( SourceTarget, content) {
		var id = SourceTarget.id		
		SourceTarget.content = content		
        ContentTarget.update({ id:id }, SourceTarget, function(response) {			
			// This is required to update the component specs at the product
        	ngNotify.set('Correlation Target Resource with title \"' + SourceTarget.content.displayTitle + '\" was updated!', 'success');
			$rootScope.$broadcast("REFRESHPROGRAMCRREQUIRED");
			
		},vm.errorCallback);
		
	};
	
	vm.targetTypes = [ {value: 'stars_standard', text: 'stars_standard'},
	                   {value: 'prescription', text: 'prescription'},
	                   {value: 'enrichment', text: 'enrichment'},
	                   {value: 'evaluate', text: 'evaluate'},
	                   {value: 'elaborate', text: 'elaborate'}];

}

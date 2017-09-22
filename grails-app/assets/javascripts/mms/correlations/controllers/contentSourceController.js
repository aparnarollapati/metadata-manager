//= wrapped

angular
    .module("mms.correlations")
    .controller("ContentSourceController", ContentSourceController);

function ContentSourceController(ContentSource,ContentTarget,Productdetails, $rootScope,ngNotify) {
    var vm = this;
    vm.content = [];
    vm.errorCallback = function(response) {

	    // Check out this for 404 etc  http://stackoverflow.com/questions/28171486/render-404-page-without-redirecting-in-angular-js
    	 var message = 'Error ' + response.status + ' (' + response.statusText + ') ';
         
    	 if(response.status == 500)
         {
        		message = 'Sorry, we couldn\'t delete your Resource. ';
         } else if(response.status == 405)
         {
         	message = 'Sorry, we couldn\'t delete your Resource. ' + response.data; 
         } else if(response.status == 422)
         {
         	if(response.data.total > 1)
         	{
         		message = 'Sorry, we couldn\'t save your Resource. There were multiple errors.';

         		angular.forEach(response.data._embedded.errors, function(value, key){
         			console.log(key + ': ' + value.message);
         			message += '  ' + value.message;
         		});
         	}else
         	{
         		message = 'Sorry, we couldn\'t save your Resource.  ' + response.data.message;
         	}
         }

        console.error(message);
        ngNotify.set(message, 'error');
    };
   vm.list = function() {  
	   
	ContentSource.list(
            function(content) {
                vm.content = content;
               
            },
            vm.errorCallback
        );
		  
    };
    
    vm.addContentSource = function(currentCorrelationSource) {  
    		new ContentSource({content : vm.newContentSource, correlation : currentCorrelationSource,sortId:vm.sortOrder,sourceType:vm.cSourceType=== undefined?'':vm.cSourceType}).$save(
    	            function(response) {
    	            	$rootScope.$broadcast("REFRESHPROGRAMCRREQUIRED");
    	                ngNotify.set('New Correlation Resource added!', 'success' );
                        vm.newContentSource = '';  
                        vm.sortOrder='';
    	            },
    	            vm.errorCallback
    	        );    	
    };
    vm.fullResources = [];

	//  Update the copy in the session
    vm.getContentSources = function(currentCSourceProductID) {
    	vm.fullResources = [];
    	var contentIds= []; 
		
	   	for(var i=0;i<currentCSourceProductID.contentSources.length;i++)
	 	{
    		contentIds.push(currentCSourceProductID.contentSources[i].content.id)	    		     		
	 	}	  
      	// Now call update passing in the ID first then the object you want
    	Productdetails.get({id:currentCSourceProductID.product.id}, function(fullCResources) {      		
    		  
    		
    		for(var i=0;i<fullCResources.content.length;i++)
    	 	{    
    			if(contentIds.indexOf(fullCResources.content[i][0]) === -1){    			
    	 		   	 			
    		         vm.fullResources.push(fullCResources.content[i]);  	 		         	 			
    				
    	     	}
    			else if(currentCSourceProductID.contentSources===[])
    			{
    				
        	 			
     		           vm.fullResources.push(fullCResources.content[i]);   
     	 		   }
    	 	
    	 	}
    		
    		
    		
        },
        vm.errorCallback);
    };
    vm.fullSResources= [];    
    
	vm.getHMOFContentSources = function(currentCSourceProductID) { 
		
		vm.fullSResources= [];   
		var contentIds= []; 
		
		   	for(var i=0;i<currentCSourceProductID.contentSources.length;i++)
		 	{
	    		contentIds.push(currentCSourceProductID.contentSources[i].content.id)	    		     		
		 	}	    	
		 
	   	Productdetails.get({id:currentCSourceProductID.product.id}, function(fullCResources) {
    		for(var i=0;i<fullCResources.content.length;i++)
    	 	{    
    			if(contentIds.indexOf(fullCResources.content[i][0]) === -1){
    			
    	 		if(fullCResources.content[i][2].component==currentCSourceProductID.component.component.toString()){    	 			
    		         vm.fullSResources.push(fullCResources.content[i]);       	 		         	 			
    			}	
    	 	}
    			else if(currentCSourceProductID.contentSources===[])
    			{
    				if(fullCResources.content[i][2].component==currentCSourceProductID.component.component.toString()){
        	 			
     		           vm.fullSResources.push(fullCResources.content[i]);   
     	 		     }
    			}
    	 	
    	 	}
        },
        vm.errorCallback);

	};	
	    
	vm.updateTCSourceType = function( SourceResource, sourceType) {
		var id = SourceResource.id		
        SourceResource.sourceType = sourceType		
        ContentSource.update({ id:id }, SourceResource, function(response) {			
			// This is required to update the component specs at the product
			$rootScope.$broadcast("REFRESHPROGRAMCRREQUIRED");
			ngNotify.set('Correlation Source Resource with ISBN \"' + SourceResource.content.displayTitle + '\" was updated!', 'success');
		},vm.errorCallback);
		
	};

	vm.updateTCSourceResource = function( SourceResource, content) {
		if(SourceResource.content.id!=content.id){
		if (window.confirm("Updating Source Resource will result in the deletion of all child objects. Do you want to proceed?")) {
			SourceResource.content = content		
		vm.updateSR(SourceResource);
		}
		
		}else
			{
			ngNotify.set('Correlation Product Source with ISBN \"' + SourceResource.content.displayTitle + '\" was not changed!', 'success');
			
			}
	};
	
	
	vm.updateSR = function(SourceResource) {
		var id = SourceResource.id		
		//deleting correlation targets and associated content targets	
		/*for (var j = 0; j < SourceResource.targetResources.length; j++){
		    var cid = SourceResource.targetResources[j].id; 	
		    ContentTarget.delete({ id:cid },SourceResource.targetResources[j],
	            function(response) {},vm.errorCallback);    	
		}*/
    	ContentSource.update({ id:id }, SourceResource, function(response) {			
			// This is required to update the component specs at the product
			
			ngNotify.set('Correlation Source Resource with title \"' + SourceResource.content.displayTitle + '\" was updated!', 'success');
			$rootScope.$broadcast("REFRESHPROGRAMCRREQUIRED");
    	},vm.errorCallback);
	};
  
    vm.delete = function(contentSource) {
		var id = contentSource.id;
		ContentSource.delete({ id:id },contentSource,
				function(response) {
		
			ngNotify.set('Correlation Resource with name \"' + contentSource.content.displayTitle + '\" deleted!', 'success');
			$rootScope.$broadcast("REFRESHPROGRAMCRREQUIRED");
			vm.contentSources = ContentSource.list();
		},
		vm.errorCallback
		);
	}
    
    vm.sourceTypes = [ {value: 'testitem', text: 'testitem'},
	                   {value: 'resource', text: 'resource'},
	                   {value: 'stars_standard', text: 'stars_standard'},
	                   {value: 'prescription', text: 'prescription'},
	                   {value: 'enrichment', text: 'enrichment'},
	                   {value: 'ise_lesson', text: 'ise_lesson'}];
}

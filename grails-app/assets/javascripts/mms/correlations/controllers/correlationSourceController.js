//= wrapped

angular
    .module("mms.correlations")
    .controller("CorrelationSourceController", CorrelationSourceController);

function CorrelationSourceController(CorrelationSource, CorrelationTarget,ContentSource,ProductComponents, $rootScope, ngNotify,$http) {
    var vm = this;
    vm.correlations = [];
    vm.errorCallback = function(response) {

	    // Check out this for 404 etc
		// http://stackoverflow.com/questions/28171486/render-404-page-without-redirecting-in-angular-js
    	 var message = 'Error ' + response.status + ' (' + response.statusText + ') ';
         
    	 if(response.status == 500)
         {
        		message = 'Sorry, we couldn\'t delete your Correlation Product Source. ';
         } else if(response.status == 405)
         {
         	message = 'Sorry, we couldn\'t delete your Correlation Product Source. ' + response.data; 
         } else if(response.status == 422)
         {
         	if(response.data.total > 1)
         	{
         		message = 'Sorry, we couldn\'t save your Correlation Product Source. There were multiple errors.';

         		angular.forEach(response.data._embedded.errors, function(value, key){
         			console.log(key + ': ' + value.message);
         			message += '  ' + value.message;
         		});
         	}else
         	{
         		message = 'Sorry, we couldn\'t save your Correlation Product Source.  ' + response.data.message;
         	}
         }

        console.error(message);
        ngNotify.set(message, 'error');
    };
   vm.list = function() {    	
	CorrelationSource.list(
            function(correlations) {
                vm.correlations = correlations;               
            },
            vm.errorCallback
        );
    };
	vm.currentCorrelationSourcesList = [];
	vm.getCurrentCorrelationSourcesList = function(currentFullProgramproducts) {     	
		vm.currentCorrelationSourcesList = [];       	
		CorrelationSource.list(
				function(correlations) {             
					vm.updateCurrentCorrelationSourcesList(correlations,currentFullProgramproducts)
				},
				vm.errorCallback
		);
	};
	// Update the list of top levels in the session to match the currentProgram
	vm.updateCurrentCorrelationSourcesList = function(correlations,currentFullProgramproducts) {
		// Changes the view that we get back from the programs list request
   		var products=currentFullProgramproducts
		var correlationSources=[];
		for (var j = 0; j < correlations.length; j++) {			
			correlationSources.push(correlations[j].product.id)
		}   	
		
		for (var i = 0; i < products.length; i++) {        	
			if (correlationSources.indexOf(products[i].id) === -1) {
				vm.currentCorrelationSourcesList.push(products[i]);
			}
		}

	};
	
	//Updating Correlation Sources
	vm.updateCorrelationSourcesList = [];
	vm.getUpdateCorrelationSourcesList = function(currentFullProgramproducts,currentCorrelationSource) {     	
		vm.updateCorrelationSourcesList = [];       	
		var products=currentFullProgramproducts		
		var correlationTargets=[];
		for (var tp = 0; tp < currentCorrelationSource.correlationTargets.length; tp++) {				
			correlationTargets.push(currentCorrelationSource.correlationTargets[tp].product.id)	
	     }
				
		for (var i = 0; i < products.length; i++) {        	
			if (correlationTargets.indexOf(products[i].id) === -1) {
				vm.updateCorrelationSourcesList.push(products[i]);
			}
		}
		
	};
		
    vm.addSourceProduct = function(currentProgram) { 
    	new CorrelationSource({product : vm.newCorrelationSources, program : currentProgram,component:vm.newSProductComponent=== undefined?'':vm.newSProductComponent}).$save(
    	            function(response) {
    	            	$rootScope.$broadcast("REFRESHPROGRAMCRREQUIRED");
    	                ngNotify.set('New Correlation Product Source added!', 'success' );
                        vm.newCorrelationSources = '';    
                        vm.newSProductComponent='';
    	            },
    	            vm.errorCallback
    	        );    	
    };
    vm.fullComponents = [];
    vm.getProductComponents = function(CorrSources) { 
    	vm.fullComponents=[]
    	CorrelationSource.list(
                function(correlations) {
                   
                    vm.getProductComponent(correlations)
                },
                vm.errorCallback
            );
        };
	// Update the copy in the session
    vm.getProductComponent = function(CorrSources) {   
    	vm.fullComponents=[]    
        var components=[]
    	for (var j = 0; j < CorrSources.length; j++) {
    		if(CorrSources[j].component!=undefined){
				components.push(CorrSources[j].component.component + ' (' + CorrSources[j].component.componentType + ') ' + 'H' + CorrSources[j].component.componentHierarchy + '-TT' + CorrSources[j].component.toolType); 
				}
	     }
    	
      	// Now call update passing in the ID first then the object you want
    	ProductComponents.get({id:vm.newCorrelationSources}, function(fullPComponents) {    		
    		for (var j = 0; j < fullPComponents.components.length; j++) {
    			if(fullPComponents.components[j].component!=undefined){   			
    				if(components.indexOf(fullPComponents.components[j].component + ' (' + fullPComponents.components[j].componentType + ') ' + 'H' + fullPComponents.components[j].componentHierarchy + '-TT' + fullPComponents.components[j].toolType) === -1){    	 			
       		         vm.fullComponents.push(fullPComponents.components[j]);       	 		         	 			
       			   }
    			 }
    			}
        
        },
        vm.errorCallback);
    };
	// Update the copy in the session
    vm.getUpdateProductComponent = function(CorrSources,cid) {
    	
    	vm.fullComponents=[]    
        var components=[]
    	for (var j = 0; j < CorrSources.length; j++) {
    		if(CorrSources[j].component!=undefined){
				components.push(CorrSources[j].component.component + ' (' + CorrSources[j].component.componentType + ') ' + 'H' + CorrSources[j].component.componentHierarchy + '-TT' + CorrSources[j].component.toolType); 
				}
	     }
    	
      	// Now call update passing in the ID first then the object you want
    	ProductComponents.get({id:cid}, function(fullPComponents) {
    		
    		for (var j = 0; j < fullPComponents.components.length; j++) {
    			if(fullPComponents.components[j].component!=undefined){   			
    				if(components.indexOf(fullPComponents.components[j].component + ' (' + fullPComponents.components[j].componentType + ') ' + 'H' + fullPComponents.components[j].componentHierarchy + '-TT' + fullPComponents.components[j].toolType) === -1){    	 			
       		         vm.fullComponents.push(fullPComponents.components[j]);       	 		         	 			
       			   }
    			 }
    			}
        
        },
        vm.errorCallback);
    };
	vm.updateTCSourceISBN = function( CorrSources, productId) {
		if(CorrSources.product.id!=productId.id){
		if (window.confirm("Updating Source Product will result in the deletion of all child objects. Do you want to proceed?")) {
		CorrSources.product = productId		
		vm.updateSourceISBN(CorrSources);
		}
		
		}else
			{
			ngNotify.set('Correlation Product Source with ISBN \"' + CorrSources.product.isbn + '\" was not changed!', 'success');
			
			}
	};
	vm.updateTCSourceComponent= function( CorrSources, componentId) {
		if(CorrSources.component.id!=componentId.id){
			if (window.confirm("Updating Source Product will result in the deletion of all child objects. Do you want to proceed?")) {
			CorrSources.component = componentId		
			vm.updateSourceISBN(CorrSources);
			}
			
			}else
				{
				ngNotify.set('Correlation Product Source with ISBN \"' + CorrSources.product.isbn + '\" was not changed!', 'success');
				
				}
		};
	

	vm.updateSourceISBN = function(CorrSources) {
		var id = CorrSources.id		
		//deleting correlation content sources 
  	   for (var c = 0; c < CorrSources.contentSources.length; c++) {
		    var cid = CorrSources.contentSources[c].id; 	    
		    ContentSource.delete({ id:cid },CorrSources.contentSources[c],
	            function(response) {},vm.errorCallback);    	
		}			
		//deleting correlation targets and associated content targets	
		for (var j = 0; j < CorrSources.correlationTargets.length; j++){
		    var tid = CorrSources.correlationTargets[j].id; 	    
		    CorrelationTarget.delete({ id:tid },CorrSources.correlationTargets[j],
	            function(response) {},vm.errorCallback);    	
		}
    	CorrelationSource.update({ id:id }, CorrSources, function(response) {			
			// This is required to update the component specs at the product
			$rootScope.$broadcast("REFRESHPROGRAMCRREQUIRED");
			ngNotify.set('Correlation Product Source with ISBN \"' + CorrSources.product.isbn + '\" was updated!', 'success');
		},
		vm.errorCallback);
	};
  

	
	
    vm.delete = function(correlationSource) {
		var id = correlationSource.id;
		CorrelationSource.delete({ id:id },correlationSource,
				function(response) {
			$rootScope.$broadcast("REFRESHPROGRAMCRREQUIRED");
			ngNotify.set('Correlation Product Source with name \"' + correlationSource.product.title + '\" deleted!', 'success');
			vm.correlations = CorrelationSource.list();
		},
		vm.errorCallback
		);
	}
}

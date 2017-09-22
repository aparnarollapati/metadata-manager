//= wrapped

angular
.module("mms.correlations")
.controller("CorrelationTargetController", CorrelationTargetController);

function CorrelationTargetController(CorrelationTarget,ContentTarget,Program,Product,ProductComponents, $rootScope, ngNotify,$http) {
	var vm = this;  

	vm.correlationTargets = [];
	vm.errorCallback = function(response) {

		// Check out this for 404 etc  http://stackoverflow.com/questions/28171486/render-404-page-without-redirecting-in-angular-js
		var message = 'Error ' + response.status + ' (' + response.statusText + ') ';

		if(response.status == 500)
		{
			message = 'Sorry, we couldn\'t delete your CorrelationTarget. ';
		} else if(response.status == 405)
		{
			message = 'Sorry, we couldn\'t delete your CorrelationTarget. ' + response.data; 
		} else if(response.status == 422)
		{
			if(response.data.total > 1)
			{
				message = 'Sorry, we couldn\'t save your CorrelationTarget. There were multiple errors.';

				angular.forEach(response.data._embedded.errors, function(value, key){
					console.log(key + ': ' + value.message);
					message += '  ' + value.message;
				});
			}else
			{
				message = 'Sorry, we couldn\'t save your CorrelationTarget.  ' + response.data.message;
			}
		}

		console.error(message);
		ngNotify.set(message, 'error');
	};

	vm.list = function() {    	
		CorrelationTarget.list(
				function(correlationTargets) {
					vm.correlationTargets = correlationTargets;

				},
				vm.errorCallback
		);
	};

	vm.getCurrentCorrelationTargetsList = function(correlationSource,currentProgramProducts) {  
		vm.newCorrelationTarget = '';  
		vm.currentCorrelationTagetsList = [];       	
		CorrelationTarget.list(
				function(correlationsTagets) {             
					vm.getCurrentCorrelationTargetList(correlationsTagets,correlationSource,currentProgramProducts)
				},
				vm.errorCallback
		);
	};


	//  Update the list of top levels in the session to match the currentProgram
	vm.getCurrentCorrelationTargetList = function(correlationsTagets,correlationSource,currentProgramProducts) {
		//  Changes the view that we get back from the programs list request

		var products=currentProgramProducts
		var correlationTargetList=[];
		vm.currentCorrelationTargetsList = [];
		for (var j = 0; j < correlationsTagets.length; j++) {        
			if(correlationsTagets[j].correlation.id==correlationSource.id ) {
				correlationTargetList.push(correlationsTagets[j].product.id)
			}
		}        

		for (var i = 0; i < products.length; i++) {   
			var allgrades=products[i].grades 

			if (correlationTargetList.indexOf(products[i].id) === -1 && correlationSource.product.id!=products[i].id ) { 				
				for (var g = 0; g <allgrades.length; g++){
					var grade=allgrades[g].grade

					if(correlationSource.product.grades.indexOf(grade) === -1){						
						if(vm.currentCorrelationTargetsList!=null && vm.currentCorrelationTargetsList.indexOf(products[i]) === -1){							
							vm.currentCorrelationTargetsList.push(products[i]);
						}else if(vm.currentCorrelationTargetsList==null)                         
						{
							vm.currentCorrelationTargetsList.push(products[i]);
						}
					}
				}
			}
		}

		if(vm.currentCorrelationTargetsList.length==1)
			vm.newCorrelationTarget =vm.currentCorrelationTargetsList[0];

	};



	vm.addTargetProduct = function(currentCorrelationSource) {    
		new CorrelationTarget({product : (vm.newCorrelationTarget === undefined || vm.newCorrelationTarget==="")?currentCorrelationSource.product.id:vm.newCorrelationTarget, correlation : currentCorrelationSource.id,component :vm.newTProductComponent === undefined?'':vm.newTProductComponent}).$save(
				function(response) {
					$rootScope.$broadcast("REFRESHPROGRAMCRREQUIRED");
					ngNotify.set('New Correlation Target Product added!', 'success' );
					vm.newCorrelationTarget = '';    
					vm.fullTComponents = [];
				},
				vm.errorCallback
		);    	
	};
	vm.fullTComponents = [];

	//  Update the copy in the session
	vm.getProductComponents = function(correlationSource) {
		vm.fullTComponents = [];
		// Now call update passing in the ID first then the object you want    
		ProductComponents.get({id:correlationSource.product.id}, function(fullPComponents) {			
			for(var i=0;i<fullPComponents.components.length;i++)
			{     			
				if(fullPComponents.components[i].id!=correlationSource.component.id){    	 			
					vm.fullTComponents.push(fullPComponents.components[i]);   
				}
			}    		
			if(vm.fullTComponents.length==1)
				vm.newTProductComponent =vm.fullTComponents[0];	
		},
		vm.errorCallback);

	};

	vm.updateTCTargetISBN = function( CorrTargets, productId) {
		if(CorrTargets.product.id!=productId.id){
			if (window.confirm("Updating Source Product delete all mapped child instances")) {
				CorrTargets.product = productId		
				vm.update(CorrTargets);
			}

		}else
		{
			ngNotify.set('Correlation Product Source with ISBN \"' + CorrTargets.product.isbn + '\" was not changed!', 'success');

		}
	};
	
	vm.updateTCTargetComponent= function( CorrTargets, componentId) {
		if(CorrTargets.component.id!=componentId.id){
			if (window.confirm("Updating Source Product will result in the deletion of all child objects. Do you want to proceed?")) {
				CorrTargets.component = componentId		
			vm.update(CorrTargets);
			}
			
			}else
				{
				ngNotify.set('Correlation Product Target with ISBN \"' + CorrTargets.product.isbn + '\" was not changed!', 'success');
				
				}
	};
	vm.update = function(CorrTargets) {
		var id = CorrTargets.id

	CorrelationTarget.update({ id:id }, CorrTargets, function(response) {			
		// This is required to update the component specs at the product
		$rootScope.$broadcast("REFRESHPROGRAMCRREQUIRED");
		ngNotify.set('Correlation Product Source with ISBN \"' + CorrTargets.product.isbn + '\" was updated!', 'success');
	},
	vm.errorCallback);

};
vm.delete = function(correlationTarget) {
	var id = correlationTarget.id; 
	CorrelationTarget.delete({ id:id },correlationTarget,
			function(response) {
		$rootScope.$broadcast("REFRESHPROGRAMCRREQUIRED");
		vm.fullTComponents = [];
		ngNotify.set('CorrelationTarget with title \"' + correlationTarget.product.title + '\" was deleted!', 'success');
		vm.correlationTargets = CorrelationTarget.list();
	},
	vm.errorCallback
	);
};


}

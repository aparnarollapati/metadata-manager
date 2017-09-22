//= wrapped
angular
.module("mms")
.controller("ComponentSpecController", ComponentSpecController);

function ComponentSpecController(ComponentSpec, $rootScope, ngNotify, DTOptionsBuilder, DTColumnDefBuilder) {

	var vm = this;

	vm.componentSpecs = [];	


	vm.dtOptions = DTOptionsBuilder.newOptions()
    .withOption('stateSave', false)
    .withOption('lengthMenu', [[10, 25, 50, 100, -1],[10, 25, 50, 100, "All"]])
    .withDisplayLength(25);
            
    
    vm.dtColumnDefs = [              
        DTColumnDefBuilder.newColumnDef(5).notSortable()
     ];
        

	vm.errorCallback = function(response) {
		
		var message = 'Error ' + response.status + ' (' + response.statusText + ') ';

		if(response.status == 500)
		{
			message = 'Sorry, we couldn\'t delete your component as it has resources still associated with it that must be deleted first.';
		} else if(response.status == 405)
		{
			message = 'Sorry, we couldn\'t delete your component as it has resources still associated with it that must be deleted first. ' + response.data; 
		} else if(response.status == 422)
		{       	
			if(response.data.total > 1)
			{
				message = 'Sorry, we couldn\'t save your component. There were multiple errors.';

				angular.forEach(response.data._embedded.errors, function(value, key){
					console.log(key + ': ' + value.message);
					message += '  ' + value.message;
				});
			}else
			{
				message = 'Sorry, we couldn\'t save your component.  ' + response.data.message;
			}
		}

		console.error(message);
		ngNotify.set(message, 'error');
	};

	vm.list = function() {

		ComponentSpec.list(
				function(componentSpecs) {
					vm.componentSpecs = componentSpecs;
				},
				vm.errorCallback
		);
	};

	vm.addComponentSpec = function(currentProgram) {

		new ComponentSpec({componentHierarchy : vm.componentHierarchy, component : vm.component, componentType : vm.componentType, categorization : vm.categorization, toolType : vm.toolType, program : {"id": currentProgram.id} }).$save(
				function(response) {
					$rootScope.$broadcast("REFRESHPROGRAMREQUIRED");
					ngNotify.set('New Component added!', 'success');

					vm.componentHierarchy = '';
					vm.component = '';
					vm.componentType = '';
					vm.categorization = '';
					vm.toolType = '';

				},
				vm.errorCallback
		);
	};
	
	vm.updateComponentComponent = function(componentSpec, componentSpecValue) {
		componentSpec.component = componentSpecValue
		vm.update(componentSpec);
	};

	vm.updateComponentHierarchy = function( componentSpec, hierarchy) {
		componentSpec.hierarchy = hierarchy
		vm.update(componentSpec);
	};
	vm.updateComponentComponentType = function( componentSpec, componentType) {
		componentSpec.componentType = componentType
		vm.update(componentSpec);
	};
	vm.updateComponentCategorization = function( componentSpec, categorization) {
		componentSpec.categorization = categorization
		vm.update(componentSpec);
	};
	vm.updateComponentToolType = function( componentSpec, toolType) {
		componentSpec.toolType = toolType
		vm.update(componentSpec);
	};


	vm.update = function(componentSpec) {

		var id = componentSpec.id
		// Now call update passing in the ID first then the object you are updating
		ComponentSpec.update({ id:id }, componentSpec, function(response) {
			ngNotify.set('Component with component \"' + componentSpec.component + '\" was updated!', 'success');
			//  This is required to update the component specs at the product level
			$rootScope.$broadcast("REFRESHPROGRAMREQUIRED");
		},
		vm.errorCallback);

	};

	vm.delete = function(componentSpec) {
		var id = componentSpec.id
		ComponentSpec.delete({ id:id },componentSpec,
				function(response) {
			ngNotify.set('Component with component \"' + componentSpec.component + '\" was deleted!', 'success');
			$rootScope.$broadcast("REFRESHPROGRAMREQUIRED");
		},
		vm.errorCallback
		);
	}

	// From http://dubconf.hmhpub.com:8080/display/PMT/TOOL+TYPE
	vm.toolTypeOptions = [
		{value: '', text: '', HMOF:'true', TCK6:'true'},
	    {value: 0, text: '0 THinkCentral Content', HMOF:'false', TCK6:'true'},
	    {value: 1, text: '1 SOAR', HMOF:'false', TCK6:'true'},
	    {value: 2, text: '2 MWS', HMOF:'true', TCK6:'true'},
      	{value: 3, text: '3 PMT', HMOF:'false', TCK6:'true'},
     	{value: 4, text: '4 HMOF Assessment', HMOF:'true', TCK6:'false'},
      	{value: 5, text: '5 HMOF External Links', HMOF:'true', TCK6:'false'},
      	{value: 6, text: '6 HMOF Static Content', HMOF:'true', TCK6:'false'},
      	{value: 7, text: '7 LSI - SSBI (PRE TEST- 5)', HMOF:'true', TCK6:'true'},
      	{value: 8, text: '8 LSI - SSBI (POST TEST - 6)', HMOF:'true', TCK6:'true'},
      	{value: 9, text: '9 LSI - CBI (PRE TEST- 1)', HMOF:'true', TCK6:'true'},
      	{value: 10, text: '10 LSI - CBI (POST TEST - 2)', HMOF:'true', TCK6:'true'},
      	{value: 11, text: '11 LSI - T&Q', HMOF:'true', TCK6:'true'},
      	{value: 12, text: '12 LSI - Homework', HMOF:'true', TCK6:'true'},
      	{value: 13, text: '13 LSI - W-A-E (new)', HMOF:'true', TCK6:'true'},
      	{value: 14, text: '14 LSI - ISE - Evaluate', HMOF:'true', TCK6:'true'},
      	{value: 15, text: '15 LSI - ISE - Elaborate', HMOF:'true', TCK6:'true'},
      	{value: 16, text: '16 Basic iSE/PMT integration (5 Es)', HMOF:'true', TCK6:'true'},
      	{value: 17, text: '17 WAE iSE/PMT integration (4 Es)', HMOF:'true', TCK6:'true'},
      	{value: 55, text: '55 Learnosity - T&Q', HMOF:'true', TCK6:'true'}
	 ];    
}
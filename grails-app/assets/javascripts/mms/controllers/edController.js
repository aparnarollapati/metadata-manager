//= wrapped
angular
.module("mms")
.controller("EdController", EdController);

function EdController(Ed, $rootScope, ngNotify) {

	var vm = this; 

	vm.ed = [];

	vm.errorCallback = function(response) {

		var message = 'Error ' + response.status + ' (' + response.statusText + ') ';

		if(response.status == 422)
		{			
			if(response.data.total > 1)
			{
				message = 'There were multiple errors.';

				angular.forEach(response.data._embedded.errors, function(value, key){
					console.log(key + ': ' + value.message);
					message += '  ' + value.message;
				});
			}else
			{
				message = 'Error  ' + response.data.message;
			}
		}

		console.error(message);
		ngNotify.set(message, 'error');
	};


	vm.list = function() {
			Ed.list(
			function(ed) {
				vm.ed = ed;
			}, vm.errorCallback
		);
	};


	vm.currentAddContent;

	vm.setCurrentAddContent = function(currentContent) {
		if (currentContent) {
			vm.currentAddContent = currentContent;    		
		} 
	}

	vm.addEdContent = function() {
		new Ed({ toolType : vm.newToolType, instructionalPurpose : vm.newInstructionalPurpose, productCategory : vm.newProductCategory, pedagogicalPurpose : vm.newPedagogicalPurpose, 
			mediaType : vm.newMediaType, component : vm.newComponent, instructionalPurposeHierarchy: vm.newInstructionalPurposeHierarchy, 
			pedagogicalPurposeHierarchy: vm.newPedagogicalPurposeHierarchy, componentHierarchy: vm.newComponentHierarchy, content : {"id": vm.currentAddContent.id} }).$save(
			function(response) {

				$rootScope.$broadcast("REFRESHFULLCONTENTREQUIRED");

				ngNotify.set('New Ed added!', 'success' );

				vm.newToolType = '';
				vm.newInstructionalPurpose = '';
				vm.newInstructionalPurposeHierarchy = '';				
				vm.newPedagogicalPurpose = '';
				vm.newPedagogicalPurposeHierarchy = '';
				vm.newMediaType = '';
				vm.newComponent = '';						
				vm.newComponentHierarchy = '';	
				vm.newProductCategory = '';			
			},
			vm.errorCallback
		);  
	};

	/*  Ed Updates */
	vm.updateToolType = function( ed, toolType) {
		ed.toolType = toolType
		vm.update(ed);
	};	

	vm.updateInstructionalPurpose = function( ed, instructionalPurpose) {
		ed.instructionalPurpose = instructionalPurpose
		vm.update(ed);
	};

	vm.updateInstructionalPurposeHierarchy = function( ed, instructionalPurposeHierarchy) {
		ed.instructionalPurposeHierarchy = instructionalPurposeHierarchy
		vm.update(ed);
	};

	vm.updateProductCategory = function( ed, productCategory) {
		ed.productCategory = productCategory
		vm.update(ed);
	};

	vm.updatePedagogicalPurpose = function( ed, pedagogicalPurpose) {
		ed.pedagogicalPurpose = pedagogicalPurpose
		vm.update(ed);
	};

	vm.updatePedagogicalPurposeHierarchy = function( ed, pedagogicalPurposeHierarchy) {
		ed.pedagogicalPurposeHierarchy = pedagogicalPurposeHierarchy
		vm.update(ed);
	};

	vm.updateMediaType = function( ed, mediaType) {
		ed.mediaType = mediaType
		vm.update(ed);
	};

	vm.updateComponent = function( ed, component) {
		ed.component = component
		vm.update(ed);
	};

	vm.updateComponentHierarchy = function( ed, componentHierarchy) {
		ed.componentHierarchy = componentHierarchy
		vm.update(ed);
	};	

	vm.update = function(ed) {

		var id = ed.id
		// Now call update passing in the ID first then the object you are updating
		Ed.update({ id:id }, ed, function(response) {
			ngNotify.set('Ed \"' + ed.toolType + '\" was updated!', 'success');
		},
		vm.errorCallback);

	};

	vm.findNodes = function () {};

	vm.visible = function (ed) {
		return !(vm.query && vm.query.length > 0
				&& ed.name.toUpperCase().indexOf(vm.query.toUpperCase()) == -1);
	};

	vm.delete = function(ed) {
			var id = ed.id;
			Ed.delete({ id:id },ed,
					function(response) {
				ngNotify.set('Ed \"' + ed.toolType + '\" was deleted!', 'success');

				$rootScope.$broadcast("REFRESHFULLCONTENTREQUIRED");

			},
			vm.errorCallback
		);
	};
}


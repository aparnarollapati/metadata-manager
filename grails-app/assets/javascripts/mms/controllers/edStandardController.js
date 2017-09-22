//= wrapped
angular
.module("mms")
.controller("EdStandardController", EdStandardController);

function EdStandardController(EdStandard, $rootScope, ngNotify, DTOptionsBuilder, DTColumnDefBuilder) {

	var vm = this;

	vm.edStandards = [];	


	vm.dtOptions = DTOptionsBuilder.newOptions()
    .withOption('stateSave', true)
    .withOption('lengthMenu', [[10, 25, 50, 100, -1],[10, 25, 50, 100, "All"]])
    .withDisplayLength(25);
            
    
    vm.dtColumnDefs = [              
        DTColumnDefBuilder.newColumnDef(2).notSortable()
    ];
        

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

		EdStandard.list(
				function(edStandards) {
					vm.edStandards = edStandards;
				},
				vm.errorCallback
		);
	};


	vm.currentAddContent;

	vm.setCurrentAddContent = function(currentContent) {
		if (currentContent) {
			vm.currentAddContent = currentContent;    		
		} 
	}

	vm.addEdStandard = function() {

		new EdStandard({ standard : vm.newStandard, standardSet : vm.newStandardSet,
			 content : {"id": vm.currentAddContent.id} }).$save(
			function(response) {

					$rootScope.$broadcast("REFRESHFULLCONTENTREQUIRED");
					ngNotify.set('New Ed Standard added!', 'success');

					vm.newStandard = '';
					vm.newStandardSet = '';
				},
				vm.errorCallback
		);
	};
	
	vm.updateStandard = function(edStandard, edStandardValue) {
		edStandard.standard = edStandardValue
		vm.update(edStandard);
	};

	vm.updateStandardSet = function( edStandard, standardSetValue) {
		edStandard.standardSet = {"id": standardSetValue.id}
		vm.update(edStandard);
		$rootScope.$broadcast("REFRESHFULLCONTENTREQUIRED");
	};

	vm.update = function(edStandard) {

		var id = edStandard.id		
		EdStandard.update({ id:id }, edStandard, function(response) {
			ngNotify.set('Standard \"' + edStandard.standard + '\" was updated!', 'success');
			
		},
		vm.errorCallback);

	};

	vm.delete = function(edStandard) {
		var id = edStandard.id
		EdStandard.delete({ id:id },edStandard,
				function(response) {
			ngNotify.set('Standard \"' + edStandard.standard + '\" was deleted!', 'success');
			$rootScope.$broadcast("REFRESHFULLCONTENTREQUIRED");
		},
		vm.errorCallback
		);
	}		
}
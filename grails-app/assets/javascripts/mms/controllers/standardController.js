//= wrapped
angular
.module("mms")
.controller("StandardController", StandardController);

function StandardController(Standard, $rootScope, ngNotify) {

	var vm = this;   

	vm.standards = [];

	vm.errorCallback = function(response) {
		
		var message = 'Error ' + response.status + ' (' + response.statusText + ') ';

		if(response.status == 422)
		{
			if(response.data.total > 1)
			{
				message = 'Sorry, we couldn\'t save your standard. There were multiple errors.';

				angular.forEach(response.data._embedded.errors, function(value, key){
					console.log(key + ': ' + value.message);
					message += '  ' + value.message;
				});
			}else
			{
				message = 'Sorry, we couldn\'t save your standard.  ' + response.data.message;
			}
		}

		console.error(message);
		ngNotify.set(message, 'error');
	};

	vm.list = function() {

		Standard.list(
				function(standards) {
					vm.standards = standards;
				},
				vm.errorCallback
		);
	};

	vm.addStandard = function(currentContent) {
		new Standard({standard : vm.newStandard,  content : {"id": currentContent.id}}).$save(
				function(response) {

					$rootScope.$broadcast("REFRESHFULLCONTENTREQUIRED");

					ngNotify.set('New Standard added!', 'success' );
					vm.newStandard = '';
				},
				vm.errorCallback
		);  
	};

	/*  Standard Updates */
	vm.updateStandard = function( standard, standardValue) {
		standard.standard = standardValue
		vm.update(standard);
	};

	vm.update = function(standard) {

		var id = standard.id
		// Now call update passing in the ID first then the object you are updating
		Standard.update({ id:id }, standard, function(response) {
			ngNotify.set('Standard with standard \"' + standard.standard + '\" was updated!', 'success');

		},
		vm.errorCallback);

	};

	vm.findNodes = function () {

	};

	vm.visible = function (standard) {
		return !(vm.query && vm.query.length > 0
				&& standard.name.toUpperCase().indexOf(vm.query.toUpperCase()) == -1);
	};

	vm.delete = function(standard) {
		var id = standard.id;
		Standard.delete({ id:id },standard,
				function(response) {
			ngNotify.set('Standard with standard \"' + standard.standard + '\" was deleted!', 'success');

			$rootScope.$broadcast("REFRESHFULLCONTENTREQUIRED");

		},
		vm.errorCallback
		);
	};

}
//= wrapped
angular
.module("mms")
.controller("StrandController", StrandController);

function StrandController(Strand, $rootScope, ngNotify) {

	var vm = this;  	

	vm.strands = [];
	vm.errorCallback = function(response) {

		var message = 'Error ' + response.status + ' (' + response.statusText + ') ';
		if(response.status == 500)
		{
			message = 'Sorry, we couldn\'t delete your strand as it has resources still associated with it that must be deleted first.';
		}else if(response.status == 405)
		{
			message = 'Sorry, we couldn\'t delete your strand as it has resources still associated with it that must be deleted first. ' + response.data; 
		}else if(response.status == 422)
		{			
			if(response.data.total > 1)
			{
				message = 'Sorry, we couldn\'t save your strand. There were multiple errors.';

				angular.forEach(response.data._embedded.errors, function(value, key){
					console.log(key + ': ' + value.message);
					message += '  ' + value.message;
				});
			}else
			{
				message = 'Sorry, we couldn\'t save your strand.  ' + response.data.message;
			}
		}

		console.error(message);
		ngNotify.set(message, 'error');
	};

	vm.list = function() {

		Strand.list(
				function(strands) {
					vm.strands = strands;
				},
				vm.errorCallback
		);
	};

	vm.addStrand = function(currentProgram) {

		new Strand({hierarchy : vm.newHierarchy, title : vm.newTitle, program : {"id": currentProgram.id} }).$save(
				function(response) {
					$rootScope.$broadcast("REFRESHPROGRAMREQUIRED");
					ngNotify.set('New Strand added!', 'success');

					vm.newHierarchy = '';
					vm.newTitle = '';

				},
				vm.errorCallback
		);
	};

	vm.updateTitle = function( strand, title) {
		strand.title = title
		vm.update(strand);
	};

	vm.updateHierarchy = function( strand, hierarchy) {
		strand.hierarchy = hierarchy
		vm.update(strand);
	};

	vm.update = function(strand) {

		var id = strand.id
		// Now call update passing in the ID first then the object you are updating
		Strand.update({ id:id }, strand, function(response) {
			ngNotify.set('Strand with title \"' + strand.title + '\" was updated!', 'success');
			//$rootScope.$broadcast("REFRESHPROGRAMREQUIRED");
		},
		vm.errorCallback);

	};


	vm.findNodes = function () {

	};

	vm.visible = function (strand) {
		return !(vm.query && vm.query.length > 0
				&& strand.name.toUpperCase().indexOf(vm.query.toUpperCase()) == -1);
	};

	vm.delete = function (strand) {
		var id = strand.id;
		Strand.delete({ id:id },strand,
				function(response) {
			ngNotify.set('Strand with title \"' + strand.title + '\" was deleted!', 'success');
			$rootScope.$broadcast("REFRESHPROGRAMREQUIRED");
		},
		vm.errorCallback
		);
	}
}
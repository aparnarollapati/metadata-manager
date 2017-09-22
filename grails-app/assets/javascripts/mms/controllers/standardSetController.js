//= wrapped
angular
.module("mms")
.controller("StandardSetController", StandardSetController);

function StandardSetController(StandardSet, $rootScope, ngNotify) {

	var vm = this;  	

	vm.StandardSets = [];
	vm.ssNameregex = '(.*?)\.(xml)$';	
	
	vm.errorCallback = function(response) {

		var message = 'Error ' + response.status + ' (' + response.statusText + ') ';
		if(response.status == 500)
		{
			message = 'Sorry, we couldn\'t delete your StandardSet as it has standard code still associated with it that must be deleted first.';
		}else if(response.status == 405)
		{
			message = 'Sorry, we couldn\'t delete your StandardSet as it has standard code still associated with it that must be deleted first. ' + response.data; 
		}else if(response.status == 422)
		{			
			if(response.data.total > 1)
			{
				message = 'Sorry, we couldn\'t save your StandardSet. There were multiple errors.';

				angular.forEach(response.data._embedded.errors, function(value, key){
					console.log(key + ': ' + value.message);
					message += '  ' + value.message;
				});
			}else
			{
				message = 'Sorry, we couldn\'t save your StandardSet.  ' + response.data.message;
			}
		}

		console.error(message);
		ngNotify.set(message, 'error');
	};

	vm.list = function() {

		StandardSet.list(
				function(StandardSets) {
					vm.StandardSets = StandardSets;
				},
				vm.errorCallback
		);
	};
	vm.addStandardSet = function(currentProgram) {

		new StandardSet({name : vm.newStandardSet,program : {"id": currentProgram.id} }).$save(
				function(response) {
					$rootScope.$broadcast("REFRESHPROGRAMREQUIRED");
					ngNotify.set('New StandardSet added!', 'success');
					vm.newStandardSet = '';	
				},
				vm.errorCallback
		);
	};
	vm.updateName = function(standardSet, name) {
		standardSet.name = name
		vm.update(standardSet);
	};
	vm.update = function(standardSet) {

		var id = standardSet.id


		// Now call update passing in the ID first then the object you are updating
		StandardSet.update({ id:id }, standardSet, function(response) {
			ngNotify.set('StandardSet with name \"' + standardSet.name + '\" was updated!', 'success');
			//$rootScope.$broadcast("REFRESHPROGRAMREQUIRED");
		},
		vm.errorCallback);

	};
	vm.visible = function (StandardSet) {
		return !(vm.query && vm.query.length > 0
				&& StandardSet.name.toUpperCase().indexOf(vm.query.toUpperCase()) == -1);
	};

	vm.delete = function (standardSet) {
		var id = standardSet.id;
		StandardSet.delete({ id:id },standardSet,
				function(response) {
			ngNotify.set('StandardSet with name \"' + standardSet.name + '\" was deleted!', 'success');
			$rootScope.$broadcast("REFRESHPROGRAMREQUIRED");
		},
		vm.errorCallback
		);
	}
}
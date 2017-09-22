//= wrapped
angular
.module("mms")
.controller("MyWriteSmartController", MyWriteSmartController);

function MyWriteSmartController(MyWriteSmart, $rootScope, ngNotify) {

	var vm = this;   

	vm.errorCallback = function(response) {
		
		var message = 'Error ' + response.status + ' (' + response.statusText + ') ';

		if(response.status == 422)
		{			
			if(response.data.total > 1)
			{
				message = 'Sorry, we couldn\'t save your myWriteSmart Guid. There were multiple errors.';

				angular.forEach(response.data._embedded.errors, function(value, key){
					console.log(key + ': ' + value.message);
					message += '  ' + value.message;
				});
			}else
			{
				message = 'Sorry, we couldn\'t save your myWriteSmart Guid.  ' + response.data.message;
			}
		}

		console.error(message);
		ngNotify.set(message, 'error');
	};

	vm.list = function() {

		MyWriteSmart.list(
				function(myWriteSmarts) {
					vm.myWriteSmarts = myWriteSmarts;
				},
				vm.errorCallback
		);
	};

	vm.addMyWriteSmart = function(currentContent) {
		new MyWriteSmart({guid : vm.newGuid,  content : {"id": currentContent.id} }).$save(
				function(response) {
					$rootScope.$broadcast("REFRESHFULLCONTENTREQUIRED");
					ngNotify.set('New myWriteSmart Guid added!', 'success' );
					vm.newGuid = '';
				},
				vm.errorCallback
		);  
	};

	/*  MyWriteSmart Updates */
	vm.updateGuid = function( myWriteSmart, guid) {
		myWriteSmart.guid = guid
		vm.update(myWriteSmart);
	};

	vm.update = function(myWriteSmart) {

		var id = myWriteSmart.id
		// Now call update passing in the ID first then the object you are updating
		MyWriteSmart.update({ id:id }, myWriteSmart, function(response) {
			ngNotify.set('The myWriteSmart GUID \"' + myWriteSmart.guid + '\" was updated!', 'success');
			//$rootScope.$broadcast("REFRESHPROGRAMREQUIRED");
		},
		vm.errorCallback);

	};

	vm.findNodes = function () {

	};

	vm.visible = function (myWriteSmart) {
		return !(vm.query && vm.query.length > 0
				&& myWriteSmart.name.toUpperCase().indexOf(vm.query.toUpperCase()) == -1);
	};

	vm.delete = function(myWriteSmart) {
		var id = myWriteSmart.id;
		MyWriteSmart.delete({ id:id },myWriteSmart,
				function(response) {
			ngNotify.set('The myWriteSmart GUID \"' + myWriteSmart.guid + '\" was deleted!', 'success');
			$rootScope.$broadcast("REFRESHFULLCONTENTREQUIRED");
		},
		vm.errorCallback
		);
	};
}
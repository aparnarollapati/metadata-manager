//= wrapped
angular
.module("mms")
.controller("CommonCartridgeKeywordController", CommonCartridgeKeywordController);

function CommonCartridgeKeywordController(CommonCartridgeKeyword, $rootScope, ngNotify) {

	var vm = this;   

	vm.errorCallback = function(response) {
		
		var message = 'Error ' + response.status + ' (' + response.statusText + ') ';

		if(response.status == 422)
		{            
			if(response.data.total > 1)
			{
				message = 'Sorry, we couldn\'t save your Common Cartridge Keyword. There were multiple errors.';

				angular.forEach(response.data._embedded.errors, function(value, key){
					console.log(key + ': ' + value.message);
					message += '  ' + value.message;
				});
			}else
			{
				message = 'Sorry, we couldn\'t save your Common Cartridge Keyword.  ' + response.data.message;
			}
		}

		console.error(message);
		ngNotify.set(message, 'error');
	};

	vm.list = function() {

		CommonCartridgeKeyword.list(
				function(commonCartridgeKeywords) {
					vm.commonCartridgeKeywords = commonCartridgeKeywords;
				},
				vm.errorCallback
		);
	};

	vm.addCommonCartridgeKeyword = function(currentContent) {
		new CommonCartridgeKeyword({keyword : vm.newKeyword,  content : {"id": currentContent.id} }).$save(
				function(response) {                 	
					$rootScope.$broadcast("REFRESHFULLCONTENTREQUIRED");
					ngNotify.set('New Common-Cartridge-Keyword added!', 'success' );
					vm.newKeyword = '';
				},
				vm.errorCallback
		);  
	};

	/*  Common Cartridge Keyword Updates */
	vm.updateKeyword = function(commonCartridgeKeyword, keyword) {
		commonCartridgeKeyword.keyword = keyword
		vm.update(commonCartridgeKeyword);
	};

	vm.update = function(commonCartridgeKeyword) {

		var id = commonCartridgeKeyword.id
		// Now call update passing in the ID first then the object you are updating
		CommonCartridgeKeyword.update({ id:id }, commonCartridgeKeyword, function(response) {
			ngNotify.set('Common Cartridge Keyword with Keyword \"' + commonCartridgeKeyword.keyword + '\" was updated!', 'success');
		},
		vm.errorCallback);

	};

	vm.findNodes = function () {

	};

	vm.visible = function (commonCartridgeKeyword) {
		return !(vm.query && vm.query.length > 0
				&& commonCartridgeKeyword.name.toUpperCase().indexOf(vm.query.toUpperCase()) == -1);
	};

	vm.delete = function(commonCartridgeKeyword) {
		var id = commonCartridgeKeyword.id;
		CommonCartridgeKeyword.delete({ id:id },commonCartridgeKeyword,
				function(response) {
			ngNotify.set('Common Cartridge Keyword with Keyword \"' + commonCartridgeKeyword.keyword + '\" was deleted!', 'success');               
			$rootScope.$broadcast("REFRESHFULLCONTENTREQUIRED");
		},
		vm.errorCallback
		);
	};
}
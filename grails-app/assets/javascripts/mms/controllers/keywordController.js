//= wrapped
angular
.module("mms")
.controller("KeywordController", KeywordController);

function KeywordController(Keyword, $rootScope, ngNotify) {

	var vm = this;   

	vm.keywords = [];

	vm.errorCallback = function(response) {
		
		var message = 'Error ' + response.status + ' (' + response.statusText + ') ';

		if(response.status == 422)
		{			
			if(response.data.total > 1)
			{
				message = 'Sorry, we couldn\'t save your keyword. There were multiple errors.';

				angular.forEach(response.data._embedded.errors, function(value, key){
					console.log(key + ': ' + value.message);
					message += '  ' + value.message;
				});
			}else
			{
				message = 'Sorry, we couldn\'t save your keyword.  ' + response.data.message;
			}
		}

		console.error(message);
		ngNotify.set(message, 'error');
	};

	vm.list = function() {

		Keyword.list(
				function(keywords) {
					vm.keywords = keywords;
				},
				vm.errorCallback
		);
	};

	vm.addKeyword = function(currentContent) {
		new Keyword({keyword : vm.newKeyword,  content : {"id": currentContent.id} }).$save(
				function(response) {
					$rootScope.$broadcast("REFRESHFULLCONTENTREQUIRED");
					vm.newKeyword = '';
				},
				vm.errorCallback
		);  
	};

	/*  Keyword Updates */
	vm.updateKeyword = function( keyword, keywordValue) {
		keyword.keyword = keywordValue
		vm.update(keyword);
	};

	vm.update = function(keyword) {

		var id = keyword.id
		// Now call update passing in the ID first then the object you are updating
		Keyword.update({ id:id }, keyword, function(response) {
			ngNotify.set('Keyword with keyword \"' + keyword.keyword + '\" was updated!', 'success');
		},
		vm.errorCallback);

	};

	vm.findNodes = function () {

	};

	vm.visible = function (keyword) {
		return !(vm.query && vm.query.length > 0
				&& keyword.name.toUpperCase().indexOf(vm.query.toUpperCase()) == -1);
	};

	vm.delete = function(keyword, level) {
		var id = keyword.id;
		Keyword.delete({ id:id },keyword,
				function(response) {
			ngNotify.set('Keyword with keyword \"' + keyword.keyword + '\" was deleted!', 'success');
			$rootScope.$broadcast("REFRESHFULLCONTENTREQUIRED");
		},
		vm.errorCallback
		);
	};

}
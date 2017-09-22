//= wrapped
//= require /angular/angular
//= require /angular/angular-resource
//= require_self
//= require_tree services
angular
.module("mms.fifthlevel")
.controller("FifthLevelController", FifthLevelController);

function FifthLevelController(FifthLevel, $rootScope, $scope, ngNotify) {

	var vm = this;   
	vm.fifthLevels = [];

	vm.errorCallback = function(response) {

		var message = 'Error ' + response.status + ' (' + response.statusText + ') ';

		if(response.status == 500)
		{
			message = 'Sorry, we couldn\'t delete your level. ';
		} else if(response.status == 405)
		{
			message = 'Sorry, we couldn\'t delete your level. ' + response.data; 
		} else if(response.status == 422)
		{         	
			if(response.data.total > 1)
			{
				message = 'Sorry, we couldn\'t save your level. There were multiple errors.';

				angular.forEach(response.data._embedded.errors, function(value, key){
					console.log(key + ': ' + value.message);
					message += '  ' + value.message;
				});
			}else
			{
				message = 'Sorry, we couldn\'t save your level.  ' + response.data.message;
			}
		}

		console.error(message);
		ngNotify.set(message, 'error');
	};

	vm.list = function() {

		FifthLevel.list(
				function(fifthLevels) {
					vm.fifthLevels = fifthLevels;
				},
				vm.errorCallback
		);
	};

	vm.addFifthLevel = function(currentFourthLevel) {
		new FifthLevel({fourthLevel : { "id":currentFourthLevel.id }, title : vm.newTitle, hierarchy : vm.newHierarchy}).$save(
				function(response) {
					$rootScope.$broadcast("REFRESHFULLFLREQUIRED");
					ngNotify.set('New FifthLevel added!', 'success' );

					vm.newHierarchy = '';
					vm.newTitle = '';
				},
				vm.errorCallback
		);

	};

	/*  FifthLevel */
	vm.updateTitle = function( fifthLevel, title) {
		fifthLevel.title = title
		vm.update(fifthLevel);
	};

	vm.updateHierarchy = function( fifthLevel, hierarchy) {
		fifthLevel.hierarchy = hierarchy
		vm.update(fifthLevel);
	};

	vm.update = function(fifthLevel) {

		var id = fifthLevel.id
		// Now call update passing in the ID first then the object you are updating
		FifthLevel.update({ id:id }, fifthLevel, function(response) {
			ngNotify.set('Level with title \"' + fifthLevel.title + '\" was updated!', 'success');
		},
		vm.errorCallback);

	};

	vm.findNodes = function () {

	};

	vm.visible = function (fifthLevel) {
		return !(vm.query && vm.query.length > 0
				&& fifthLevel.name.toUpperCase().indexOf(vm.query.toUpperCase()) == -1);
	};

	vm.fullFifthLevel = {};
	vm.currentFullFifthLevelId;
	//  Update the copy in the session
	vm.updateCurrentFifthLevel = function(fifthLevelId) {
		vm.currentFullFifthLevelId = fifthLevelId;
		console.log("vm.currentFullFifthLevelId "  + vm.currentFullFifthLevelId);
		vm.updateCurrentFullFifthLevel();
	};

	vm.updateCurrentFullFifthLevel = function() {
		console.log("vm.currentFullFifthLevelId "  + vm.currentFullFifthLevelId);

		// Now call update passing in the ID first then the object you want
		if(vm.currentFullFifthLevelId != null && !angular.isUndefined(vm.currentFullFifthLevelId)){

			console.log("Getting here " );
			FifthLevel.get({ id:vm.currentFullFifthLevelId}, function(fullFifthLevel) {

				vm.fullFifthLevel[vm.currentFullFifthLevelId] = fullFifthLevel;

			},
			vm.errorCallback);
		};
	};

	vm.delete = function(fifthLevel) {
		var id = fifthLevel.id;
		FifthLevel.delete({ id:id },fifthLevel,
				function(response) {
			ngNotify.set('Level with title \"' + fifthLevel.title + '\" was deleted!', 'success');
			$rootScope.$broadcast("REFRESHFULLFLREQUIRED");
		},
		vm.errorCallback
		);
	};
	$scope.$on("REFRESHFULLFILREQUIRED", vm.updateCurrentFullFifthLevel);
}
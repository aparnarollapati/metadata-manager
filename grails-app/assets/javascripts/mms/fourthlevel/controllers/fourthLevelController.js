//= wrapped
//= require /angular/angular
//= require /angular/angular-resource
//= require_self
//= require_tree services
angular
.module("mms.fourthlevel")
.controller("FourthLevelController", FourthLevelController);

function FourthLevelController(FourthLevel, $rootScope, $scope, ngNotify) {

	var vm = this;   
	vm.fourthLevels = [];

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

		FourthLevel.list(
				function(fourthLevels) {
					vm.fourthLevels = fourthLevels;
				},
				vm.errorCallback
		);
	};

	vm.addFourthLevel = function(currentThirdLevel) {
		new FourthLevel({thirdLevel : { "id":currentThirdLevel.id }, title : vm.newTitle, hierarchy : vm.newHierarchy}).$save(
				function(response) {
					$rootScope.$broadcast("REFRESHFULLTHLREQUIRED");
					ngNotify.set('New FourthLevel added!', 'success' );

					vm.newHierarchy = '';
					vm.newTitle = '';
				},
				vm.errorCallback
		);

	};

	/*  FourthLevel */
	vm.updateTitle = function( fourthLevel, title) {
		fourthLevel.title = title
		vm.update(fourthLevel);
	};

	vm.updateHierarchy = function( fourthLevel, hierarchy) {
		fourthLevel.hierarchy = hierarchy
		vm.update(fourthLevel);
	};

	vm.update = function(fourthLevel) {

		var id = fourthLevel.id
		// Now call update passing in the ID first then the object you are updating
		FourthLevel.update({ id:id }, fourthLevel, function(response) {
			ngNotify.set('Level with title \"' + fourthLevel.title + '\" was updated!', 'success');
		},
		vm.errorCallback);

	};

	vm.findNodes = function () {

	};

	vm.visible = function (fourthLevel) {
		return !(vm.query && vm.query.length > 0
				&& fourthLevel.name.toUpperCase().indexOf(vm.query.toUpperCase()) == -1);
	};

	vm.fullFourthLevel = {};
	vm.currentFullFourthLevelId;
	//  Update the copy in the session
	vm.updateCurrentFourthLevel = function(fourthLevelId) {
		vm.currentFullFourthLevelId = fourthLevelId;
		console.log("vm.currentFullFourthLevelId "  + vm.currentFullFourthLevelId);
		vm.updateCurrentFullFourthLevel();
	};

	vm.updateCurrentFullFourthLevel = function() {
		console.log("vm.currentFullFourthLevelId "  + vm.currentFullFourthLevelId);

		// Now call update passing in the ID first then the object you want
		if(vm.currentFullFourthLevelId != null && !angular.isUndefined(vm.currentFullFourthLevelId)){

			console.log("Getting here " );
			FourthLevel.get({ id:vm.currentFullFourthLevelId}, function(fullFourthLevel) {

				vm.fullFourthLevel[vm.currentFullFourthLevelId] = fullFourthLevel;

			},
			vm.errorCallback);
		};
	};

	vm.delete = function(fourthLevel) {
		var id = fourthLevel.id;
		FourthLevel.delete({ id:id },fourthLevel,
				function(response) {
			ngNotify.set('Level with title \"' + fourthLevel.title + '\" was deleted!', 'success');
			$rootScope.$broadcast("REFRESHFULLTHLREQUIRED");
		},
		vm.errorCallback
		);
	};

	$scope.$on("REFRESHFULLFLREQUIRED", vm.updateCurrentFullFourthLevel);
}
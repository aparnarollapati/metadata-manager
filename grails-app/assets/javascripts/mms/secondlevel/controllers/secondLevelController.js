//= wrapped
//= require /angular/angular
//= require /angular/angular-resource
//= require_self
//= require_tree services
angular
.module("mms.secondlevel")
.controller("SecondLevelController", SecondLevelController);

function SecondLevelController(SecondLevel, $rootScope, $scope, ngNotify) {

	var vm = this;   
	vm.secondLevels = [];

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

		SecondLevel.list(
				function(secondLevels) {
					vm.secondLevels = secondLevels;
				},
				vm.errorCallback
		);
	};

	vm.addSecondLevel = function(currentTopLevel) {
		new SecondLevel({topLevel : { "id":currentTopLevel.id }, title : vm.newTitle, hierarchy : vm.newHierarchy}).$save(
				function(response) {
					$rootScope.$broadcast("REFRESHPROGRAMTLREQUIRED");
					ngNotify.set('New SecondLevel added!', 'success' );

					vm.newHierarchy = '';
					vm.newTitle = '';
				},
				vm.errorCallback
		);

	};

	/*  SecondLevel */
	vm.updateTitle = function( secondLevel, title) {
		secondLevel.title = title
		vm.update(secondLevel);
	};

	vm.updateHierarchy = function( secondLevel, hierarchy) {
		secondLevel.hierarchy = hierarchy
		vm.update(secondLevel);
	};

	vm.update = function(secondLevel) {

		var id = secondLevel.id
		// Now call update passing in the ID first then the object you are updating
		SecondLevel.update({ id:id }, secondLevel, function(response) {
			ngNotify.set('Level with title \"' + secondLevel.title + '\" was updated!', 'success');
		},
		vm.errorCallback);

	};

	vm.findNodes = function () {

	};

	vm.visible = function (secondLevel) {
		return !(vm.query && vm.query.length > 0
				&& secondLevel.name.toUpperCase().indexOf(vm.query.toUpperCase()) == -1);
	};


	vm.fullSecondLevel = {};
	vm.currentFullSecondLevelId;
	//  Update the copy in the session
	vm.updateCurrentSecondLevel = function(secondLevelId) {
		vm.currentFullSecondLevelId = secondLevelId;
		vm.updateCurrentFullSecondLevel();
	};

	vm.updateCurrentFullSecondLevel = function() {
		console.log("vm.currentFullSecondLevelId "  + vm.currentFullSecondLevelId);

		// Now call update passing in the ID first then the object you want
		if(vm.currentFullSecondLevelId != null && !angular.isUndefined(vm.currentFullSecondLevelId)){
			SecondLevel.get({ id:vm.currentFullSecondLevelId}, function(fullSecondLevel) {

				vm.fullSecondLevel[vm.currentFullSecondLevelId] = fullSecondLevel;

			},
			vm.errorCallback);
		};
	};

	vm.delete = function(secondLevel) {
		var id = secondLevel.id;
		SecondLevel.delete({ id:id },secondLevel,
				function(response) {
			ngNotify.set('Level with title \"' + secondLevel.title + '\" was deleted!', 'success');
			$rootScope.$broadcast("REFRESHPROGRAMTLREQUIRED");
		},
		vm.errorCallback
		);
	};

	$scope.$on("REFRESHFULLSLREQUIRED", vm.updateCurrentFullSecondLevel);    
}
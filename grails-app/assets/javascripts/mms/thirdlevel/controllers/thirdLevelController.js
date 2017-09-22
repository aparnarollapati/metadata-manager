//= wrapped
//= require /angular/angular
//= require /angular/angular-resource
//= require_self
//= require_tree services
angular
.module("mms.thirdlevel")
.controller("ThirdLevelController", ThirdLevelController);

function ThirdLevelController(ThirdLevel, $rootScope, $scope, ngNotify) {

	var vm = this;   
	vm.thirdLevels = [];

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

		ThirdLevel.list(
				function(thirdLevels) {
					vm.thirdLevels = thirdLevels;
				},
				vm.errorCallback
		);
	};

	vm.addThirdLevel = function(currentSecondLevel) {
		new ThirdLevel({secondLevel : { "id":currentSecondLevel.id }, title : vm.newTitle, hierarchy : vm.newHierarchy}).$save(
				function(response) {
					$rootScope.$broadcast("REFRESHFULLSLREQUIRED");
					ngNotify.set('New ThirdLevel added!', 'success' );

					vm.newHierarchy = '';
					vm.newTitle = '';
				},
				vm.errorCallback
		);

	};

	/*  ThirdLevel */
	vm.updateTitle = function( thirdLevel, title) {
		thirdLevel.title = title
		vm.update(thirdLevel);
	};

	vm.updateHierarchy = function( thirdLevel, hierarchy) {
		thirdLevel.hierarchy = hierarchy
		vm.update(thirdLevel);
	};

	vm.update = function(thirdLevel) {

		var id = thirdLevel.id
		// Now call update passing in the ID first then the object you are updating
		ThirdLevel.update({ id:id }, thirdLevel, function(response) {
			ngNotify.set('Level with title \"' + thirdLevel.title + '\" was updated!', 'success');
		},
		vm.errorCallback);

	};

	vm.findNodes = function () {

	};

	vm.visible = function (thirdLevel) {
		return !(vm.query && vm.query.length > 0
				&& thirdLevel.name.toUpperCase().indexOf(vm.query.toUpperCase()) == -1);
	};  

	vm.fullThirdLevel = {};
	vm.currentFullThirdLevelId;
	//  Update the copy in the session
	vm.updateCurrentThirdLevel = function(thirdLevelId) {
		vm.currentFullThirdLevelId = thirdLevelId;
		console.log("vm.currentFullThirdLevelId "  + vm.currentFullThirdLevelId);
		vm.updateCurrentFullThirdLevel();
	};

	vm.updateCurrentFullThirdLevel = function() {
		console.log("vm.currentFullThirdLevelId "  + vm.currentFullThirdLevelId);

		// Now call update passing in the ID first then the object you want
		if(vm.currentFullThirdLevelId != null && !angular.isUndefined(vm.currentFullThirdLevelId)){

			console.log("Getting here " );
			ThirdLevel.get({ id:vm.currentFullThirdLevelId}, function(fullThirdLevel) {

				vm.fullThirdLevel[vm.currentFullThirdLevelId] = fullThirdLevel;

			},
			vm.errorCallback);
		};
	};

	vm.delete = function(thirdLevel) {
		var id = thirdLevel.id;
		ThirdLevel.delete({ id:id },thirdLevel,
				function(response) {
			ngNotify.set('Level with title \"' + thirdLevel.title + '\" was deleted!', 'success');
			$rootScope.$broadcast("REFRESHFULLSLREQUIRED");
		},
		vm.errorCallback
		);
	};

	$scope.$on("REFRESHFULLTHLREQUIRED", vm.updateCurrentFullThirdLevel);
}
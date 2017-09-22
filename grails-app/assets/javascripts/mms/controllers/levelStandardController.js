//= wrapped
angular
.module("mms")
.controller("LevelStandardController", LevelStandardController);

function LevelStandardController(LevelStandard, $rootScope, ngNotify) {

	var vm = this;   
	vm.levelStandards = [];

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

		LevelStandard.list(
				function(levelStandards) {
					vm.levelStandards = levelStandards;
				},
				vm.errorCallback
		);
	};

	vm.addLevelStandardTopLevel = function(currentTopLevel) {
		console.log("currentTopLevel.title : " + currentTopLevel.title);
		new LevelStandard({standard : vm.newStandard,  topLevel : {"id": currentTopLevel.id}}).$save(
				function(response) {
					$rootScope.$broadcast("REFRESHPROGRAMTLREQUIRED");
					ngNotify.set('New standard added at grade level!', 'success' );

					vm.newStandard = '';
				},
				vm.errorCallback
		);  
	};
	vm.addLevelStandardSecondLevel = function(currentSecondLevel) {
		console.log("currentSecondLevel.title : " + currentSecondLevel.title);
		new LevelStandard({standard : vm.newStandard,  secondLevel : {"id": currentSecondLevel.id}}).$save(
				function(response) {
					$rootScope.$broadcast("REFRESHFULLSLREQUIRED");
					ngNotify.set('New standard added at second-level!', 'success' );

					vm.newStandard = '';
				},
				vm.errorCallback
		);  
	};
	vm.addLevelStandardThirdLevel = function(currentThirdLevel) {
		console.log("currentThirdLevel.title : " + currentThirdLevel.title);
		new LevelStandard({standard : vm.newStandard,  thirdLevel : {"id": currentThirdLevel.id}}).$save(
				function(response) {
					$rootScope.$broadcast("REFRESHFULLTHLREQUIRED");
					ngNotify.set('New standard added at third-level!', 'success' );

					vm.newStandard = '';
				},
				vm.errorCallback
		);  
	};
	vm.addLevelStandardFourthLevel = function(currentFourthLevel) {
		console.log("currentFourthLevel.title : " + currentFourthLevel.title);
		new LevelStandard({standard : vm.newStandard,  fourthLevel : {"id": currentFourthLevel.id}}).$save(
				function(response) {
					$rootScope.$broadcast("REFRESHFULLFLREQUIRED");
					ngNotify.set('New standard added at fourth-level!', 'success' );

					vm.newStandard = '';
				},
				vm.errorCallback
		);  
	};
	vm.addLevelStandardFifthLevel = function(currentFifthLevel) {
		console.log("currentFifthLevel.title : " + currentFifthLevel.title);
		new LevelStandard({standard : vm.newStandard,  fifthLevel : {"id": currentFifthLevel.id}}).$save(
				function(response) {
					$rootScope.$broadcast("REFRESHFULLFILREQUIRED");
					ngNotify.set('New standard added at fifth-level!', 'success' );

					vm.newStandard = '';
				},
				vm.errorCallback
		);  
	};

	/*  LevelStandard Updates */
	vm.updateLevelStandard = function( levelStandard, levelStandardValue) {
		levelStandard.levelStandard = levelStandardValue
		vm.update(levelStandard);
	};

	vm.update = function(levelStandard) {

		var id = levelStandard.id
		// Now call update passing in the ID first then the object you are updating
		LevelStandard.update({ id:id }, levelStandard, function(response) {
			ngNotify.set('LevelStandard with standard \"' + levelStandard.standard + '\" was updated!', 'success');
		},
		vm.errorCallback);

	};

	vm.findNodes = function () {

	};

	vm.visible = function (levelStandard) {
		return !(vm.query && vm.query.length > 0
				&& levelStandard.name.toUpperCase().indexOf(vm.query.toUpperCase()) == -1);
	};

	vm.delete = function(levelStandard, level) {
		var id = levelStandard.id;
		LevelStandard.delete({ id:id },levelStandard,
				function(response) {
			ngNotify.set('LevelStandard with standard \"' + levelStandard.standard + '\" was deleted!', 'success');

			//  Need to check the current level & refresh that
			if(level == "toplevel")
				$rootScope.$broadcast("REFRESHPROGRAMTLREQUIRED");
			else if(level == "secondlevel")
				$rootScope.$broadcast("REFRESHFULLSLREQUIRED");
			else if(level == "thirdlevel")
				$rootScope.$broadcast("REFRESHFULLTHLREQUIRED");
			else if(level == "fourthlevel")
				$rootScope.$broadcast("REFRESHFULLFLREQUIRED");
			else if(level == "fifthlevel")
				$rootScope.$broadcast("REFRESHFULLFILREQUIRED");
		},
		vm.errorCallback
		);
	};

}
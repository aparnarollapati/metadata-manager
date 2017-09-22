//= wrapped
angular
.module("mms")
.controller("LevelKeywordController", LevelKeywordController);

function LevelKeywordController(LevelKeyword, $rootScope, ngNotify) {

	var vm = this;   
	vm.levelKeywords = [];

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

		LevelKeyword.list(
				function(levelKeywords) {
					vm.levelKeywords = levelKeywords;
				},
				vm.errorCallback
		);
	};

	vm.addLevelKeywordTopLevel = function(currentTopLevel) {
		console.log("currentTopLevel.title : " + currentTopLevel.title);
		new LevelKeyword({keyword : vm.newKeyword,  topLevel : {"id": currentTopLevel.id}}).$save(
				function(response) {
					$rootScope.$broadcast("REFRESHPROGRAMTLREQUIRED");
					ngNotify.set('New keyword added at grade level!', 'success' );

					vm.newKeyword = '';
				},
				vm.errorCallback
		);  
	};
	vm.addLevelKeywordSecondLevel = function(currentSecondLevel) {
		console.log("currentSecondLevel.title : " + currentSecondLevel.title);
		new LevelKeyword({keyword : vm.newKeyword,  secondLevel : {"id": currentSecondLevel.id}}).$save(
				function(response) {
					$rootScope.$broadcast("REFRESHFULLSLREQUIRED");
					ngNotify.set('New keyword added at second-level!', 'success' );

					vm.newKeyword = '';
				},
				vm.errorCallback
		);  
	};
	vm.addLevelKeywordThirdLevel = function(currentThirdLevel) {
		console.log("currentThirdLevel.title : " + currentThirdLevel.title);
		new LevelKeyword({keyword : vm.newKeyword,  thirdLevel : {"id": currentThirdLevel.id}}).$save(
				function(response) {
					$rootScope.$broadcast("REFRESHFULLTHLREQUIRED");
					ngNotify.set('New keyword added at third-level!', 'success' );

					vm.newKeyword = '';
				},
				vm.errorCallback
		);  
	};
	vm.addLevelKeywordFourthLevel = function(currentFourthLevel) {
		console.log("currentFourthLevel.title : " + currentFourthLevel.title);
		new LevelKeyword({keyword : vm.newKeyword,  fourthLevel : {"id": currentFourthLevel.id}}).$save(
				function(response) {
					$rootScope.$broadcast("REFRESHFULLFLREQUIRED");
					ngNotify.set('New keyword added at fourth-level!', 'success' );

					vm.newKeyword = '';
				},
				vm.errorCallback
		);  
	};
	vm.addLevelKeywordFifthLevel = function(currentFifthLevel) {
		console.log("currentFifthLevel.title : " + currentFifthLevel.title);
		new LevelKeyword({keyword : vm.newKeyword,  fifthLevel : {"id": currentFifthLevel.id}}).$save(
				function(response) {
					$rootScope.$broadcast("REFRESHFULLFILREQUIRED");
					ngNotify.set('New keyword added at fifth-level!', 'success' );

					vm.newKeyword = '';
				},
				vm.errorCallback
		);  
	};

	/*  LevelKeyword Updates */
	vm.updateLevelKeyword = function( levelKeyword, levelKeywordValue) {
		levelKeyword.levelKeyword = levelKeywordValue
		vm.update(levelKeyword);
	};

	vm.update = function(levelKeyword) {

		var id = levelKeyword.id
		// Now call update passing in the ID first then the object you are updating
		LevelKeyword.update({ id:id }, levelKeyword, function(response) {
			ngNotify.set('LevelKeyword with keyword \"' + levelKeyword.keyword + '\" was updated!', 'success');
		},
		vm.errorCallback);

	};

	vm.findNodes = function () {

	};

	vm.visible = function (levelKeyword) {
		return !(vm.query && vm.query.length > 0
				&& levelKeyword.name.toUpperCase().indexOf(vm.query.toUpperCase()) == -1);
	};

	vm.delete = function(levelKeyword, level) {
		var id = levelKeyword.id;
		LevelKeyword.delete({ id:id },levelKeyword,
				function(response) {
			ngNotify.set('LevelKeyword with keyword \"' + levelKeyword.keyword + '\" was deleted!', 'success');

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
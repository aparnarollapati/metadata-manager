//= wrapped
//= require /angular/angular
//= require /angular/angular-resource
//= require_self
//= require_tree services
angular
.module("mms.toplevel")
.controller("TopLevelController", TopLevelController);

function TopLevelController(TopLevel, $rootScope, ngNotify) {

	var vm = this;   

	vm.topLevels = [];

	vm.errorCallback = function(response) {

		var message = 'Error ' + response.status + ' (' + response.statusText + ') ';

		if(response.status == 500)
		{
			message = 'Sorry, we couldn\'t delete your grade. ';
		} else if(response.status == 405)
		{
			message = 'Sorry, we couldn\'t delete your grade. ' + response.data; 
		} else if(response.status == 422)
		{         	
			if(response.data.total > 1)
			{
				message = 'Sorry, we couldn\'t save your grade. There were multiple errors.';

				angular.forEach(response.data._embedded.errors, function(value, key){
					console.log(key + ': ' + value.message);
					message += '  ' + value.message;
				});
			}else
			{
				message = 'Sorry, we couldn\'t save your grade.  ' + response.data.message;
			}
		}

		console.error(message);
		ngNotify.set(message, 'error');
	};

	vm.list = function() {

		TopLevel.list(
				function(topLevels) {
					vm.topLevels = topLevels;
				},
				vm.errorCallback
		);
	};

	vm.addTopLevel = function(currentProgram) {

		if(vm.newGrades != ''){

			var gradeString = vm.newGrades + '';
			var newGradesJson = "[";

			var newGradesJsonList = gradeString.split(",");
			var arrayLength = newGradesJsonList.length;
			for (var i = 0; i < arrayLength; i++) {
				newGradesJson += "{\"grade\":\"" + newGradesJsonList[i] + "\"}";
				if(i < (arrayLength - 1))
				{
					newGradesJson += ",";
				}
			}
			newGradesJson += "]";	

			new TopLevel({title : vm.newTitle, grades : JSON.parse(newGradesJson), nonGradeLevel : vm.newNonGradeLevel, nonGradeTitle : vm.newNonGradeTitle, program : currentProgram.id }).$save(
					function(response) {
						$rootScope.$broadcast("REFRESHPROGRAMTLREQUIRED");
						ngNotify.set('New Grade added!', 'success' );

						vm.newTitle = '';
						vm.newGrades = '';
						vm.newNonGradeLevel = '';
						vm.newNonGradeTitle = '';
					},
					vm.errorCallback
			);
		}else
		{
			ngNotify.set(message, 'A product must have at least one grade assigned to it.', 'warn');
		}   
	};

	/*  TopLevel */
	vm.updateTitle = function( topLevel, title) {    	

		var topLevelUpdate = {"id": topLevel.id, "title": title};      
		vm.update(topLevelUpdate);
	};

	vm.updateNonGradeLevel = function( topLevel, nonGradeLevel) {    	

		var topLevelUpdate = {"id": topLevel.id, "nonGradeLevel": nonGradeLevel, "title": topLevel.title };      
		vm.update(topLevelUpdate);
	};

	vm.updateNonGradeTitle = function( topLevel, nonGradeTitle) {    	   

		var topLevelUpdate = {"id": topLevel.id, "nonGradeTitle": nonGradeTitle, "title": topLevel.title};    
		vm.update(topLevelUpdate);
	};   

	vm.updateCurrentGrades = function(topLevel, grade){

		// take existing grades and identify if new grade is a duplicate        
		var isGradeUnique = vm.isGradeUniqueToLevel(topLevel, grade); 

		if (isGradeUnique){

			var gradeMap = {};
			gradeMap["grade"] = grade; 

			console.log("Adding new Grade to Top-Level Instance");
			var topLevelUpdate = {"id": topLevel.id, "grades": [gradeMap], "title": topLevel.title};

			vm.update(topLevelUpdate); 
		}              
	};

	vm.isGradeUniqueToLevel = function(existingGrades, grade){        

		var gradeList = []
		var existingGradeList = existingGrades.grades.forEach(function(value, index, array){
			gradeList.push(value.grade)
		});

		if(gradeList.indexOf(grade) !== -1){
			console.log("Grade: " + grade + " is already used in this Top-Level instance");
			return false
		};

		return true

	};

	vm.update = function(topLevel) {

		var id = topLevel.id
		// Now call update passing in the ID first then the object you are updating
		TopLevel.update({ id:id }, topLevel, function(response) {
			ngNotify.set('Top-Level grade \"' + ((topLevel.title) && (topLevel.title) || ("id" + topLevel.id)) + '\"  was updated!', 'success');
			$rootScope.$broadcast("REFRESHPROGRAMTLREQUIRED");
		},
		vm.errorCallback);

	};

	vm.findNodes = function () {

	};

	vm.visible = function (topLevel) {
		return !(vm.query && vm.query.length > 0
				&& topLevel.name.toUpperCase().indexOf(vm.query.toUpperCase()) == -1);
	};

	vm.delete = function(topLevel) {
		var id = topLevel.id;
		TopLevel.delete({ id:id },topLevel,
				function(response) {
			ngNotify.set('Grade with title \"' + topLevel.title + '\" was deleted!', 'success');
			$rootScope.$broadcast("REFRESHPROGRAMTLREQUIRED");
		},
		vm.errorCallback
		);
	};
}
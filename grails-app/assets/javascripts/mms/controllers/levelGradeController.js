//= wrapped

angular
.module("mms")
.controller("LevelGradeController", LevelGradeController);

function LevelGradeController(LevelGrade, $rootScope, ngNotify) {

	var vm = this;   

	vm.grades = [];

	vm.errorCallback = function(response) {
		
		var message = 'Error ' + response.status + ' (' + response.statusText + ') ';

		if(response.status == 422)
		{         	
			if(response.data.total > 1)
			{
				message = 'Sorry, we couldn\'t save your Level-Grade. There were multiple errors.';

				angular.forEach(response.data._embedded.errors, function(value, key){
					console.log(key + ': ' + value.message);
					message += '  ' + value.message;
				});
			}else
			{
				message = 'Sorry, we couldn\'t save your Level-Grade.  ' + response.data.message;
			}
		}

		console.error(message);
		ngNotify.set(message, 'error');
	};     


	/*  Grade */
	vm.updateGradeGrade = function(grade, gradeValue) {
		grade.grade = gradeValue
		vm.update(grade);
	};

	vm.update = function(grade) {

		var id = grade.id
		// Now call update passing in the ID first then the object you are updating
		LevelGrade.update({ id:id }, grade, function(response) {
			ngNotify.set('Level-Grade with id \"' + grade.id + '\" was updated!', 'success');
		},
		vm.errorCallback);

	};

	vm.findNodes = function () {

	};

	vm.visible = function (grade) {
		return !(vm.query && vm.query.length > 0
				&& grade.name.toUpperCase().indexOf(vm.query.toUpperCase()) == -1);
	};

	vm.delete = function(grade) {
		var id = grade.id
		LevelGrade.delete({ id:id },grade,
				function(response) {

			//  grade.title will not always be set so use the id if it isn't 
			ngNotify.set('Level-Grade with id \"' + grade.id + '\" was deleted!', 'success');
			$rootScope.$broadcast("REFRESHPROGRAMREQUIRED");
		},
		vm.errorCallback
		);
	};

	//  The data for the grade select boxes
	vm.gradeOptions = [
	                   {value: 'PK', text: 'PK'},                    
	                   {value: 'K', text: 'K'},
	                   {value: '1', text: '1'},
	                   {value: '2', text: '2'},
	                   {value: '3', text: '3'},
	                   {value: '4', text: '4'},
	                   {value: '5', text: '5'},
	                   {value: '6', text: '6'},
	                   {value: '7', text: '7'},
	                   {value: '8', text: '8'},
	                   {value: '9', text: '9'},
	                   {value: '10', text: '10'},
	                   {value: '11', text: '11'},
	                   {value: '12', text: '12'},
	                   {value: '13', text: '13'},
	                   {value: 'PR', text: 'PR'}, 
	                   {value: 'TK', text: 'TK'},
	                   {value: 'PS', text: 'PS'},
	                   {value: 'AE', text: 'AE'},
	                   {value: 'UG', text: 'UG'},
	                   {value: 'Other', text: 'Other'}       
	                   ];  

}
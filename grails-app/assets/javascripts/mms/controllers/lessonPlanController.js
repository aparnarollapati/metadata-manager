//= wrapped
angular
.module("mms")
.controller("LessonPlanController", LessonPlanController);

function LessonPlanController(LessonPlan, $rootScope, ngNotify) {

	var vm = this;   

	vm.errorCallback = function(response) {
		
		var message = 'Error ' + response.status + ' (' + response.statusText + ') ';

		// console.log("request.method : " + request.method);
		if(response.status == 500)
		{
			message = 'Sorry, we couldn\'t delete your lesson plan as it has resources still associated with it that must be deleted first.';
		}else if(response.status == 405)
		{
			message = 'Sorry, we couldn\'t delete your lesson plan as it has resources still associated with it that must be deleted first. ' + response.data; 
		}else if(response.status == 422)
		{
			if(response.data.total > 1)
			{
				message = 'Sorry, we couldn\'t save your lesson plan. There were multiple errors.';

				angular.forEach(response.data._embedded.errors, function(value, key){
					console.log(key + ': ' + value.message);
					message += '  ' + value.message;
				});
			}else
			{
				message = 'Sorry, we couldn\'t save your lesson plan.  ' + response.data.message;
			}
		}

		console.error(message);
		ngNotify.set(message, 'error');
	}

	vm.list = function() {

		LessonPlan.list(
				function(lessonPlans) {
					vm.lessonPlans = lessonPlans;
				},
				vm.errorCallback
		);
	}

	vm.addLessonPlanTopLevel = function(levelItemId) {
		new LessonPlan({title : vm.newTitle, duration: vm.newDuration, sortId: vm.newSortId, lessonPlanId: vm.newLessonPlanId, topLevel : {"id": levelItemId}}).$save(
				function(response) {
					$rootScope.$broadcast("REFRESHPROGRAMTLREQUIRED");
					ngNotify.set('New Lesson Plan added to grade level!', 'success');

					vm.newLessonPlanId = '';
					vm.newTitle = '';
					vm.newDuration = '';
					vm.newSortId = '';

				},
				vm.errorCallback
		); 
	};
	vm.addLessonPlanSecondLevel = function(levelItemId) {
		new LessonPlan({title : vm.newTitle, duration: vm.newDuration, sortId: vm.newSortId, lessonPlanId: vm.newLessonPlanId, secondLevel : {"id": levelItemId}}).$save(
				function(response) {
					$rootScope.$broadcast("REFRESHFULLSLREQUIRED");
					ngNotify.set('New Lesson Plan added at second level!', 'success');

					vm.newLessonPlanId = '';
					vm.newTitle = '';
					vm.newDuration = '';
					vm.newSortId = '';
				},
				vm.errorCallback
		); 
	};
	vm.addLessonPlanThirdLevel = function(levelItemId) {
		new LessonPlan({title : vm.newTitle, duration: vm.newDuration, sortId: vm.newSortId, lessonPlanId: vm.newLessonPlanId, thirdLevel : {"id": levelItemId}}).$save(
				function(response) {
					$rootScope.$broadcast("REFRESHFULLTHLREQUIRED");
					ngNotify.set('New Lesson Plan added at third level!', 'success');

					vm.newLessonPlanId = '';
					vm.newTitle = '';
					vm.newDuration = '';
					vm.newSortId = '';
				},
				vm.errorCallback
		); 
	};
	vm.addLessonPlanFourthLevel = function(levelItemId) {
		new LessonPlan({title : vm.newTitle, duration: vm.newDuration, sortId: vm.newSortId, lessonPlanId: vm.newLessonPlanId, fourthLevel : {"id": levelItemId}}).$save(
				function(response) {
					$rootScope.$broadcast("REFRESHFULLFLREQUIRED");
					ngNotify.set('New Lesson Plan added at fourth level!', 'success');

					vm.newLessonPlanId = '';
					vm.newTitle = '';
					vm.newDuration = '';
					vm.newSortId = '';
				},
				vm.errorCallback
		); 
	};
	vm.addLessonPlanFifthLevel = function(levelItemId) {
		new LessonPlan({title : vm.newTitle, duration: vm.newDuration, sortId: vm.newSortId, lessonPlanId: vm.newLessonPlanId, fifthLevel : {"id": levelItemId}}).$save(
				function(response) {
					$rootScope.$broadcast("REFRESHFULLFILREQUIRED");
					ngNotify.set('New Lesson Plan added at fifth level!', 'success');

					vm.newLessonPlanId = '';
					vm.newTitle = '';
					vm.newDuration = '';
					vm.newSortId = '';
				},
				vm.errorCallback
		); 
	};

	vm.updateSortId = function(lessonPlan, sortId) {
		lessonPlan.sortId = sortId
		vm.updateLessonPlan(lessonPlan);
	}

	vm.updateTitle = function(lessonPlan, title) {
		lessonPlan.title = title
		vm.updateLessonPlan(lessonPlan);
	}

	vm.updateDuration = function(lessonPlan, duration) {
		lessonPlan.duration = duration
		vm.updateLessonPlan(lessonPlan);
	}

	vm.updateLessonPlanId = function(lessonPlan, lessonPlanId) {
		lessonPlan.lessonPlanId = lessonPlanId
		vm.updateLessonPlan(lessonPlan);
	}

	vm.update = function(lessonPlan, newLessonPlan) {

		angular.extend(lessonPlan, newLessonPlan);  	

		lessonPlan.$update(
				function(response) {
					//vm.list();
				},
				vm.errorCallback
		);
	}

	vm.updateLessonPlan = function(lessonPlan) {

		var id = lessonPlan.id
		LessonPlan.update({ id:id }, lessonPlan, function(response) {
			ngNotify.set('Lesson Plan \"' + lessonPlan.title + '\" was updated!', 'success');
			//$rootScope.$broadcast("REFRESHPROGRAMREQUIRED");
		},
		vm.errorCallback
		);
	}

	vm.delete = function(lessonPlan, level) {
		var id = lessonPlan.id
		LessonPlan.delete({ id:id }, lessonPlan,
				function(response) {
			ngNotify.set('Lesson Plan \"' + lessonPlan.title + '\" was deleted!', 'success');

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
	}
}
//= wrapped
angular
.module("mms")
.controller("InstructionalSegmentController", InstructionalSegmentController);

function InstructionalSegmentController(InstructionalSegment, InstructionalSegmentMapping, $rootScope, ngNotify) {

	var vm = this;  

	//  The data for the mapping select boxes used in segments_renderer and segment_renderer
	//  Only initialise these once
	$rootScope.instructionalSegmentMappingOptions;
	if(typeof $rootScope.instructionalSegmentMappingOptions === "undefined")
	{
		$rootScope.instructionalSegmentMappingOptions = InstructionalSegmentMapping.list();
	}

	vm.instructionalSegments = [];

	vm.errorCallback = function(response) {
		
		var message = 'Error ' + response.status + ' (' + response.statusText + ') ';

		if(response.status == 500)
		{
			message = 'Sorry, we couldn\'t delete your segment as it has resources still associated with it that must be deleted first.';
		}else if(response.status == 405)
		{
			message = 'Sorry, we couldn\'t delete your segment as it has resources still associated with it that must be deleted first. ' + response.data; 
		}else if(response.status == 422)
		{			
			if(response.data.total > 1)
			{
				message = 'Sorry, we couldn\'t save your instructional segment. There were multiple errors.';

				angular.forEach(response.data._embedded.errors, function(value, key){
					console.log(key + ': ' + value.message);
					message += '  ' + value.message;
				});
			}else
			{
				message = 'Sorry, we couldn\'t save your instructional segment.  ' + response.data.message;
			}
		}

		console.error(message);
		ngNotify.set(message, 'error');
	};

	vm.list = function() {

		InstructionalSegment.list(
				function(instructionalSegments) {
					vm.instructionalSegments = instructionalSegments;
				},
				vm.errorCallback
		);
	};

	vm.addInstructionalSegment = function(currentProgram) {

		new InstructionalSegment({hierarchy : vm.newHierarchy, title : vm.newTitle, program : {"id": currentProgram.id} }).$save(
				function(response) {
					$rootScope.$broadcast("REFRESHPROGRAMREQUIRED");
					ngNotify.set('New Instructional Segment added!', 'success' );

					vm.newHierarchy = '';
					vm.newTitle = '';
				},
				vm.errorCallback
		);
	};

	/*  InstructionalSegment */
	vm.updateTitle = function( instructionalSegment, title) {
		instructionalSegment.title = title

		vm.update(instructionalSegment);
	};

	vm.updateHierarchy = function( instructionalSegment, hierarchy) {
		instructionalSegment.hierarchy = hierarchy
		vm.update(instructionalSegment);
	};

	vm.update = function(instructionalSegment) {

		var id = instructionalSegment.id
		// Now call update passing in the ID first then the object you are updating
		InstructionalSegment.update({ id:id }, instructionalSegment, function(response) {
			ngNotify.set('Instructional segment with title \"' + instructionalSegment.title + '\" was updated!', 'success');
			//$rootScope.$broadcast("REFRESHPROGRAMREQUIRED");
		},
		vm.errorCallback);

	};


	vm.findNodes = function () {

	};

	vm.visible = function (instructionalSegment) {
		return !(vm.query && vm.query.length > 0
				&& instructionalSegment.name.toUpperCase().indexOf(vm.query.toUpperCase()) == -1);
	};

	vm.delete = function (instructionalSegment) {
		var id = instructionalSegment.id
		InstructionalSegment.delete({ id:id },instructionalSegment,
				function(response) {
			ngNotify.set('Instructional segment with title \"' + instructionalSegment.title + '\" was deleted!', 'success');
			$rootScope.$broadcast("REFRESHPROGRAMREQUIRED");
		},
		vm.errorCallback
		);
	}

}
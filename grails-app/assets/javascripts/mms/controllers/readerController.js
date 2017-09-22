//= wrapped
angular
.module("mms")
.controller("ReaderController", ReaderController);

function ReaderController(Reader, $rootScope, ngNotify) {

	var vm = this; 

	vm.readers = [];

	vm.errorCallback = function(response) {
		
		var message = 'Error ' + response.status + ' (' + response.statusText + ') ';

		if(response.status == 422)
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

		Reader.list(
				function(readers) {
					vm.readers = readers;
				},
				vm.errorCallback
		);
	};

	vm.currentAddContent;

	vm.setCurrentAddContent = function(currentContent) {
		if (currentContent) {
			vm.currentAddContent = currentContent;    		
		} 
	}

	vm.addReaderContent = function() {
		new Reader({isbn10 : vm.newIsbn10, isbn13 : vm.newIsbn13, readerLevel : vm.newReaderLevel, guidedReadingLevels : vm.newGuidedReadingLevels, draEdlLevel : vm.newDraEdlLevel, readingRecoveryLevels : vm.newReadingRecoveryLevels, readingSkills : vm.newReadingSkills, content : {"id": vm.currentAddContent.id} }).$save(
				function(response) {

					$rootScope.$broadcast("REFRESHFULLCONTENTREQUIRED");

					ngNotify.set('New Reader added!', 'success' );

					vm.newIsbn10 = '';
					vm.newIsbn13 = '';
					vm.newReaderLevel = '';
					vm.newGuidedReadingLevels = '';
					vm.newDraEdlLevel = '';
					vm.newReadingRecoveryLevels = '';
					vm.newReadingSkills = '';
				},
				vm.errorCallback
		);  
	};

	/*  Reader Updates */
	vm.updateISBN10 = function( reader, isbn10) {
		reader.isbn10 = isbn10
		vm.update(reader);
	};

	vm.updateISBN13 = function( reader, isbn13) {
		reader.isbn13 = isbn13
		vm.update(reader);
	};

	vm.updateReaderLevel = function( reader, readerLevel) {
		reader.readerLevel = readerLevel
		vm.update(reader);
	};

	vm.updateGuidedReadingLevels = function( reader, guidedReadingLevels) {
		reader.guidedReadingLevels = guidedReadingLevels
		vm.update(reader);
	};

	vm.updateDraEdlLevel = function( reader, draEdlLevel) {
		reader.draEdlLevel = draEdlLevel
		vm.update(reader);
	};

	vm.updateReadingRecoveryLevels = function( reader, readingRecoveryLevels) {
		reader.readingRecoveryLevels = readingRecoveryLevels
		vm.update(reader);
	};

	vm.updateReadingSkills = function( reader, readingSkills) {
		reader.readingSkills = readingSkills
		vm.update(reader);
	};

	vm.update = function(reader) {

		var id = reader.id
		// Now call update passing in the ID first then the object you are updating
		Reader.update({ id:id }, reader, function(response) {
			ngNotify.set('Reader with ISBN-13 \"' + reader.isbn13 + '\" was updated!', 'success');
		},
		vm.errorCallback);

	};

	vm.findNodes = function () {

	};

	vm.visible = function (reader) {
		return !(vm.query && vm.query.length > 0
				&& reader.name.toUpperCase().indexOf(vm.query.toUpperCase()) == -1);
	};

	vm.delete = function(reader) {
		var id = reader.id;
		Reader.delete({ id:id },reader,
				function(response) {
			ngNotify.set('Reader with ISBN-13 \"' + reader.isbn13 + '\" was deleted!', 'success');

			$rootScope.$broadcast("REFRESHFULLCONTENTREQUIRED");

		},
		vm.errorCallback
		);
	};

	//  Options for the select box for reader levels
	vm.readerLevelOptions = [{value: 'Above-Level', text: 'Above-Level'},
	                         {value: 'On-Level', text: 'On-Level'},
	                         {value: 'Below-Level', text: 'Below-Level'},
	                         {value: 'ELL', text: 'ELL'},
	                         {value: 'N/A', text: 'N/A'}];

}
//= wrapped

angular
.module("mms")
.controller("ContentController", ContentController);

function ContentController(Content, MediaTypeMapping, ResourceTypeMapping, $rootScope, $scope, ngNotify, DTOptionsBuilder, DTColumnDefBuilder) {

	var vm = this;
	vm.resourceTypeMappingOptions; 

	vm.errorHappened = false;

	vm.dtOptions = DTOptionsBuilder.newOptions()
    .withOption('stateSave', true)
    .withOption('lengthMenu', [[10, 25, 50, 100, -1],[10, 25, 50, 100, "All"]])
    .withDisplayLength(25);
    //.withPaginationType('full_numbers')
        
    
    vm.dtColumnDefs = [
        //DTColumnDefBuilder.newColumnDef(1).withTitle('new Title').notVisible(),
        DTColumnDefBuilder.newColumnDef(0).notSortable(),
        DTColumnDefBuilder.newColumnDef(1).notSortable(),
        DTColumnDefBuilder.newColumnDef(2).notSortable(),
        DTColumnDefBuilder.newColumnDef(3).notSortable(),
        DTColumnDefBuilder.newColumnDef(4).notSortable(),
        DTColumnDefBuilder.newColumnDef(5).notSortable(),        
        DTColumnDefBuilder.newColumnDef(6).notSortable(),
        DTColumnDefBuilder.newColumnDef(7).notSortable(),
        DTColumnDefBuilder.newColumnDef(8).notSortable(),
        DTColumnDefBuilder.newColumnDef(9).notSortable()
    ];

	//  Only initialise once
	$rootScope.mediaTypeMappingOptions;
	if(typeof $rootScope.mediaTypeMappingOptions === "undefined")
	{
		//  Used on the content (resource) objects
		$rootScope.mediaTypeMappingOptions = MediaTypeMapping.list();
	}	

	vm.getResourceTypeMappingOptions = function() {			

		if(angular.isUndefined(vm.resourceTypeMappingOptions)){

			vm.resourceTypeMappingOptions = ResourceTypeMapping.list();
			console.log("resourceTypeMappingOptions has been initialised");
		};			
	}	


	vm.errorCallback = function(response) {		

		var message = 'Error ' + response.status + ' (' + response.statusText + ') ';

		if(response.status == 422)
		{			
			if(response.data.total > 1)
			{
				message = 'Sorry, we couldn\'t save your resource. There were multiple errors.';

				angular.forEach(response.data._embedded.errors, function(value, key){
					console.log(key + ': ' + value.message);
					message += '  ' + value.message;
				});
			}else
			{
				message = 'Sorry, we couldn\'t save your resource.  ' + response.data.message;
			}
		}
		console.error(message);
		ngNotify.set(message, 'error');

	}

	vm.list = function() {

		Content.list(function(contents) {vm.contents = contents; }, 
				vm.errorCallback);
	}

	//  Default the checkboxes to checked for properties that default to true in the domain
	vm.content = { viewable : true,	searchable: true, schedulable: true	};

	vm.editContent = function(addNew, levelItem, clone) {

		vm.levelItem = levelItem; 
		if (!addNew && vm.fullContent[vm.currentFullContentId]) {

			if(clone){
				//  Clone Existing
				vm.content = angular.copy(vm.fullContent[vm.currentFullContentId]);
				vm.cleanClone();

			}else
			{
				//  Edit Existing
				vm.content = vm.fullContent[vm.currentFullContentId];
				vm.notClone();
				vm.errorHappened = false;
			}
		} else {
			//  Do not clear old if error occured
			if(!vm.errorHappened){
				vm.clear();
			}
		}
	}

	//  Clear the attributes that are unique 
	//  Clear the attributes that are only associated with the same level as clones are often moved to a different level
	vm.cleanClone = function() {
		vm.clone = true;

		//  The user needs to set these according to Steve
		vm.content.displayTitle = null;
		vm.content.meaningfulDescription = null;
		vm.content.commonCartridgeTitle = null;
		vm.content.uri = null;
		vm.content.lessonPlan = null;        

		//  These will be auto generated
		vm.content.id = null;
		vm.content.resourceId = null;
		vm.content.hmhId = null;
		vm.content.uniqueId = null;	   	
		vm.content.sortId = null;
	}

	vm.notClone = function() {
		vm.clone = false;
	}

	vm.clear = function() {
		vm.clone = false;
		vm.content = { viewable : true, searchable: true, schedulable: true };
	}

	vm.createOrEditContentTopLevel = function() {

		if (vm.content.id != null) {
			//  Update an existing content
			vm.updateContent(vm.content, 'toplevel');

		} else {
			//  Create a new content
			vm.addContentTopLevel();
		}
	}   
	vm.createOrEditContentSecondLevel = function() {
		if (vm.content.id != null) {
			//  Update an existing content
			vm.updateContent(vm.content, 'secondlevel');
		} else {
			//  Create a new content
			vm.addContentSecondLevel();
		}
	}   
	vm.createOrEditContentThirdLevel = function() {
		if (vm.content.id != null) {
			//  Update an existing content
			vm.updateContent(vm.content, 'thirdlevel');
		} else {
			//  Create a new content
			vm.addContentThirdLevel();
		}
	}   
	vm.createOrEditContentFourthLevel = function() {
		if (vm.content.id != null) {
			//  Update an existing content
			vm.updateContent(vm.content, 'fourthlevel');
		} else {
			//  Create a new content
			vm.addContentFourthLevel();
		}
	}   
	vm.createOrEditContentFifthLevel = function() {
		if (vm.content.id != null) {
			//  Update an existing content
			vm.updateContent(vm.content, 'fifthlevel');
		} else {
			//  Create a new content
			vm.addContentFifthLevel();
		}
	}   

	vm.update = function(content) {
		var id = content.id
		// Now call update passing in the ID first then the object you are updating
		Content.update({ id:id }, content, function(response) {
		},
		vm.errorCallback);

	};


	vm.disableSaveButton = function(){

		if( angular.isUndefined(vm.content.product) || angular.isUndefined(vm.content.strand) || 
		angular.isUndefined(vm.content.segment) || angular.isUndefined(vm.content.component) || 
		angular.isUndefined(vm.content.displayTitle) || vm.content.displayTitle == null  || 
		angular.isUndefined(vm.content.language) || angular.isUndefined(vm.content.mediaType) ){
			return true
		}

	};


	vm.setLessonPlan = function(lessonPlan){

		if(lessonPlan != null && !angular.isUndefined(lessonPlan)){ 	

			return {"id": lessonPlan.id};

		} else{ return []; }
	};

	vm.addContentTopLevel = function() {		

		new Content({product : {"id" : vm.content.product.id}, topLevel : {"id": vm.levelItem.id}, strand : {"id": vm.content.strand.id}, segment : {"id": vm.content.segment.id}, component : {"id": vm.content.component.id}, lessonPlan : vm.setLessonPlan(vm.content.lessonPlan), 
			hmhId : vm.content.hmhId, displayTitle: vm.content.displayTitle, commonCartridgeTitle: vm.content.commonCartridgeTitle, uri: vm.content.uri, reteach: vm.content.reteach, difInst : vm.content.difInst,
			meaningfulDescription : vm.content.meaningfulDescription, additionalText : vm.content.additionalText, viewable : vm.content.viewable, assignable : vm.content.assignable, 
			schedulable : vm.content.schedulable, searchable : vm.content.searchable, teacherManaged : vm.content.teacherManaged, iwbCompatible : vm.content.iwbCompatible, 
			seFacing : vm.content.seFacing, enrich : vm.content.enrich, mediaType : vm.content.mediaType, doneOwner : vm.content.doneOwner, textComplexity : vm.content.textComplexity, 
			freeplay : vm.content.freeplay, active : vm.content.active, persistent : vm.content.persistent, nonLocalResource : vm.content.nonLocalResource, resourcesPanelTe : vm.content.resourcesPanelTe, resourcesPanelSe : vm.content.resourcesPanelSe,
			downloadUrl : vm.content.downloadUrl, card : vm.content.card, parentId : vm.content.parentId, sortId : vm.content.sortId,
			author : vm.content.author, title : vm.content.title, genre : vm.content.genre, theme : vm.content.theme, productCategory : vm.content.productCategory, programTitle : vm.content.programTitle,
			programCard : vm.content.programCard, language : vm.content.language, frequency: vm.content.frequency, notes: vm.content.notes, itemId: vm.content.itemId, 
			strandNumber : vm.content.strandNumber, resourceType : vm.content.resourceType}).$save(
					function(response) {
						$rootScope.$broadcast("REFRESHPROGRAMTLREQUIRED");
						vm.errorHappened = false;
						ngNotify.set('New Resource added at grade level!', 'success');
					},						
					vm.errorCallback); 
		vm.errorHappened = true;

	};

	vm.addContentSecondLevel = function() {


		new Content({product : {"id" : vm.content.product.id}, secondLevel : {"id": vm.levelItem.id}, strand : {"id": vm.content.strand.id}, segment : {"id": vm.content.segment.id}, component : {"id": vm.content.component.id}, lessonPlan : vm.setLessonPlan(vm.content.lessonPlan), 
			hmhId : vm.content.hmhId, displayTitle: vm.content.displayTitle, commonCartridgeTitle: vm.content.commonCartridgeTitle, uri: vm.content.uri, reteach: vm.content.reteach, difInst : vm.content.difInst,
			meaningfulDescription : vm.content.meaningfulDescription, additionalText : vm.content.additionalText, viewable : vm.content.viewable, assignable : vm.content.assignable, 
			schedulable : vm.content.schedulable, searchable : vm.content.searchable, teacherManaged : vm.content.teacherManaged, iwbCompatible : vm.content.iwbCompatible, 
			seFacing : vm.content.seFacing, enrich : vm.content.enrich, mediaType : vm.content.mediaType, doneOwner : vm.content.doneOwner, textComplexity : vm.content.textComplexity, 
			freeplay : vm.content.freeplay, active : vm.content.active, persistent : vm.content.persistent, nonLocalResource : vm.content.nonLocalResource, resourcesPanelTe : vm.content.resourcesPanelTe, resourcesPanelSe : vm.content.resourcesPanelSe,
			downloadUrl : vm.content.downloadUrl, card : vm.content.card, parentId : vm.content.parentId, sortId : vm.content.sortId,
			author : vm.content.author, title : vm.content.title, genre : vm.content.genre, theme : vm.content.theme, productCategory : vm.content.productCategory, programTitle : vm.content.programTitle,
			programCard : vm.content.programCard, language : vm.content.language, frequency: vm.content.frequency, notes: vm.content.notes, itemId: vm.content.itemId, 
			strandNumber : vm.content.strandNumber, resourceType : vm.content.resourceType}).$save(
					function(response) {
						$rootScope.$broadcast("REFRESHFULLSLREQUIRED");
						vm.errorHappened = false;
						ngNotify.set('New Resource added at second-level!', 'success');
					},
					vm.errorCallback);
		vm.errorHappened = true; 		

	};

	vm.addContentThirdLevel = function() {


		new Content({product : {"id" : vm.content.product.id}, thirdLevel : {"id": vm.levelItem.id}, strand : {"id": vm.content.strand.id}, segment : {"id": vm.content.segment.id}, component : {"id": vm.content.component.id}, lessonPlan : vm.setLessonPlan(vm.content.lessonPlan), 
			hmhId : vm.content.hmhId, displayTitle: vm.content.displayTitle, commonCartridgeTitle: vm.content.commonCartridgeTitle, uri: vm.content.uri, reteach: vm.content.reteach, difInst : vm.content.difInst,
			meaningfulDescription : vm.content.meaningfulDescription, additionalText : vm.content.additionalText, viewable : vm.content.viewable, assignable : vm.content.assignable, 
			schedulable : vm.content.schedulable, searchable : vm.content.searchable, teacherManaged : vm.content.teacherManaged, iwbCompatible : vm.content.iwbCompatible, 
			seFacing : vm.content.seFacing, enrich : vm.content.enrich, mediaType : vm.content.mediaType, doneOwner : vm.content.doneOwner, textComplexity : vm.content.textComplexity, 
			freeplay : vm.content.freeplay, active : vm.content.active, persistent : vm.content.persistent, nonLocalResource : vm.content.nonLocalResource, resourcesPanelTe : vm.content.resourcesPanelTe, resourcesPanelSe : vm.content.resourcesPanelSe,
			downloadUrl : vm.content.downloadUrl, card : vm.content.card, parentId : vm.content.parentId, sortId : vm.content.sortId,
			author : vm.content.author, title : vm.content.title, genre : vm.content.genre, theme : vm.content.theme, productCategory : vm.content.productCategory, programTitle : vm.content.programTitle,
			programCard : vm.content.programCard, language : vm.content.language, frequency: vm.content.frequency, notes: vm.content.notes, itemId: vm.content.itemId, 
			strandNumber : vm.content.strandNumber, resourceType : vm.content.resourceType}).$save(
					function(response) {
						$rootScope.$broadcast("REFRESHFULLTHLREQUIRED");
						vm.errorHappened = false;
						ngNotify.set('New Resource added at third-level!', 'success');
					},
					vm.errorCallback); 
		vm.errorHappened = true;

	};

	vm.addContentFourthLevel = function() {

		new Content({product : {"id" : vm.content.product.id}, fourthLevel : {"id": vm.levelItem.id}, strand : {"id": vm.content.strand.id}, segment : {"id": vm.content.segment.id}, component : {"id": vm.content.component.id}, lessonPlan : vm.setLessonPlan(vm.content.lessonPlan), 
			hmhId : vm.content.hmhId, displayTitle: vm.content.displayTitle, commonCartridgeTitle: vm.content.commonCartridgeTitle, uri: vm.content.uri, reteach: vm.content.reteach, difInst : vm.content.difInst,
			meaningfulDescription : vm.content.meaningfulDescription, additionalText : vm.content.additionalText, viewable : vm.content.viewable, assignable : vm.content.assignable, 
			schedulable : vm.content.schedulable, searchable : vm.content.searchable, teacherManaged : vm.content.teacherManaged, iwbCompatible : vm.content.iwbCompatible, 
			seFacing : vm.content.seFacing, enrich : vm.content.enrich, mediaType : vm.content.mediaType, doneOwner : vm.content.doneOwner, textComplexity : vm.content.textComplexity, 
			freeplay : vm.content.freeplay, active : vm.content.active, persistent : vm.content.persistent, nonLocalResource : vm.content.nonLocalResource, resourcesPanelTe : vm.content.resourcesPanelTe, resourcesPanelSe : vm.content.resourcesPanelSe,
			downloadUrl : vm.content.downloadUrl, card : vm.content.card, parentId : vm.content.parentId, sortId : vm.content.sortId,
			author : vm.content.author, title : vm.content.title, genre : vm.content.genre, theme : vm.content.theme, productCategory : vm.content.productCategory, programTitle : vm.content.programTitle,
			programCard : vm.content.programCard, language : vm.content.language, frequency: vm.content.frequency, notes: vm.content.notes, itemId: vm.content.itemId,
			strandNumber : vm.content.strandNumber, resourceType : vm.content.resourceType}).$save(
					function(response) {
						$rootScope.$broadcast("REFRESHFULLFLREQUIRED");
						vm.errorHappened = false;
						ngNotify.set('New Resource added at fourth-level!', 'success');
					},
					vm.errorCallback); 
		vm.errorHappened = true;

	};

	vm.addContentFifthLevel = function() { 

		new Content({product : {"id" : vm.content.product.id}, fifthLevel : {"id": vm.levelItem.id}, strand : {"id": vm.content.strand.id}, segment : {"id": vm.content.segment.id}, component : {"id": vm.content.component.id}, lessonPlan : vm.setLessonPlan(vm.content.lessonPlan), 
			hmhId : vm.content.hmhId, displayTitle: vm.content.displayTitle, commonCartridgeTitle: vm.content.commonCartridgeTitle, uri: vm.content.uri, reteach: vm.content.reteach, difInst : vm.content.difInst,
			meaningfulDescription : vm.content.meaningfulDescription, additionalText : vm.content.additionalText, viewable : vm.content.viewable, assignable : vm.content.assignable, 
			schedulable : vm.content.schedulable, searchable : vm.content.searchable, teacherManaged : vm.content.teacherManaged, iwbCompatible : vm.content.iwbCompatible, 
			seFacing : vm.content.seFacing, enrich : vm.content.enrich, mediaType : vm.content.mediaType, doneOwner : vm.content.doneOwner, textComplexity : vm.content.textComplexity, 
			freeplay : vm.content.freeplay, active : vm.content.active, persistent : vm.content.persistent, nonLocalResource : vm.content.nonLocalResource, resourcesPanelTe : vm.content.resourcesPanelTe, resourcesPanelSe : vm.content.resourcesPanelSe,
			downloadUrl : vm.content.downloadUrl, card : vm.content.card, parentId : vm.content.parentId, sortId : vm.content.sortId,
			author : vm.content.author, title : vm.content.title, genre : vm.content.genre, theme : vm.content.theme, productCategory : vm.content.productCategory, programTitle : vm.content.programTitle,
			programCard : vm.content.programCard, language : vm.content.language, frequency: vm.content.frequency, notes: vm.content.notes, itemId: vm.content.itemId, 
			strandNumber : vm.content.strandNumber, resourceType : vm.content.resourceType}).$save(
					function(response) {
						$rootScope.$broadcast("REFRESHFULLFILREQUIRED");
						vm.errorHappened = false;
						ngNotify.set('New Resource added at fifth-level!', 'success');
					},
					vm.errorCallback);
		vm.errorHappened = true; 		
	};

	vm.updateSortId = function(content, sortId) {
		content.sortId = sortId
		vm.updateContent(content);
	}

	vm.updateTitle = function(content, title) {
		content.title = title
		vm.updateContent(content);
	}

	vm.updateDuration = function(content, duration) {
		content.duration = duration
		vm.updateContent(content);
	}

	vm.updateContentId = function(content, contentId) {
		content.contentId = contentId
		vm.updateContent(content);
	}

	vm.updateContent = function(content) {
		vm.updateContent(content, null);
	}

	vm.updateContent = function(content, level) {

		var id = content.id

		Content.update({ id:id }, content, function(response) {			
			if(level != null)
			{
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
			}

			vm.errorHappened = false;
			ngNotify.set('Resource with display title \"' + content.displayTitle + '\" was updated!', 'success');
		},
		vm.errorCallback
		);
	}

	vm.delete = function(content, level) {
		var id = content.id
		Content.delete({ id:id }, content,
				function(response) {
			ngNotify.set('Resource with display title \"' + content.displayTitle + '\" was deleted!', 'success');

			//  Need to check the current level & refresh that
			//$rootScope.$broadcast("REFRESHFULLCONTENTREQUIRED");
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


	//  Link the media type and the uri
	vm.setMediaType = function()
	{
		vm.content.mediaType = getMediaType(vm.content.uri.toLowerCase());
	}

	function getMediaType(uri) {

		var newMediaType;
		switch (true) {
		case /mp3/.test(uri):
			newMediaType = "Audio";
		break;
		case /pdf/.test(uri):
			newMediaType = "PDF";
		break;
		case /doc/.test(uri):
			newMediaType = "Editable File";
		break;
		case /flipchart/.test(uri):
			newMediaType = "IWB";
		break;
		case /pps|ppt/.test(uri):
			newMediaType = "Presentation";
		break;
		case /\.com|zip|MWSTeacherActivityLoader/.test(uri):
			newMediaType = "URL";
		break;
		case /brightcove|video/.test(uri):
			newMediaType = "Video";
		break;
		case /podcast/.test(uri):
			newMediaType = "Podcast";
		break;
		case /html|jsp/.test(uri):
			newMediaType = "HTML";
		break;
		default:
			newMediaType = "HTML";
		break;
		}
		return newMediaType;
	}

	// set Boolean defaults based on Component Object selection
	vm.setBooleanDefaults = function()
	{        
		if(!angular.isUndefined(vm.content.component))
			checkComponent(vm.content.component);
	}


	function checkComponent(componentInstance){		

		// Assignable and SeFacing
		var assignableAndSeFacingList = ["myWriteSmart", "Online Assessment", "Personal Math Trainer"];        
		if(assignableAndSeFacingList.indexOf(componentInstance.component ) > -1 | componentInstance.componentType === "Key Student Resource"){
			vm.content.assignable = true;
			vm.content.seFacing = true;
		}
		else{ 
			vm.content.assignable = false; 
			vm.content.seFacing = false; 
		}

		// Teacher Managed
		var teacherManagedList = ["Online Assessment", "Personal Math Trainer"];
		if(teacherManagedList.indexOf(componentInstance.component ) > -1){ 
			vm.content.teacherManaged = true;
		}
		else{
			vm.content.teacherManaged = false;
		}

		//Active persistent and done-owner
		if(componentInstance.component == "myWriteSmart"){
			vm.content.active = true;
			vm.content.persistent = true;
			vm.content.doneOwner = "S";
		}
		else{
			vm.content.active = false;
			vm.content.persistent = false;
			vm.content.doneOwner = "";
		}
	}

	vm.fullContent = {};
	vm.currentFullContentId;

	//  Update the copy in the session
	vm.updateCurrentFullContentId = function(promiseAction, contentId, levelItem) {

		vm.currentFullContentId = contentId;
		vm.updateCurrentFullContent(promiseAction, levelItem);
	};

	vm.updateCurrentFullContent = function() {
		vm.updateCurrentFullContent('', null)	
	};

	vm.updateCurrentFullContent = function(promiseAction, levelItem) {
		// Now call update passing in the ID first then the object you want
		if(vm.currentFullContentId != null && !angular.isUndefined(vm.currentFullContentId)){
			Content.get({ id:vm.currentFullContentId}, function(fullContent) {
				vm.fullContent[vm.currentFullContentId] = fullContent;

				//  Need to ensure that the content has been successfully retrieved from the async request before we try to edit or clone
				if(levelItem != null && promiseAction == 'edit')
				{
					//  Edit	
					vm.editContent(false, levelItem, false)
				}else if(levelItem != null && promiseAction == 'clone')
				{
					//  Clone
					vm.editContent(false, levelItem, true)
				}
			},
			vm.errorCallback);
		};
	};

	$scope.$on("REFRESHFULLCONTENTREQUIRED", vm.updateCurrentFullContent);
}
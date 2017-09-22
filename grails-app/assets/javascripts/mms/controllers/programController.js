//= wrapped
'use strict';

angular
.module("mms")
.controller("ProgramController", ProgramController);

function ProgramController(Program, StrandMapping, ComponentMapping, ComponentTypeMapping, CategorizationMapping, $rootScope, $scope, $timeout, $window, ngNotify) {

	var vm = this;  

	//  Trigger a login modal if necessary
	vm.programs;

	if(angular.isUndefined(vm.programs))
	{
		$window.sessionStorage.version = '1.0';
		vm.programs = Program.list();
	}


	//Mappings from the Mapping XML are stored and initialised
	vm.strandMappingOptions;
	vm.componentMappingOptions;
	vm.componentTypeMappingOptions;
	vm.categorizationMappingOptions;


	vm.getStrandMappingOptions = function() {

		if(angular.isUndefined(vm.strandMappingOptions)){

			vm.strandMappingOptions = StrandMapping.list();
			console.log("Strand Mapping is initialised");
		};			
	}


	vm.getComponentMappingOptions = function() {

		if(angular.isUndefined(vm.componentMappingOptions)){

			vm.componentMappingOptions = ComponentMapping.list();
			console.log("Component Mapping is initialised");
		};	

		if(angular.isUndefined(vm.componentTypeMappingOptions)){

			vm.componentTypeMappingOptions = ComponentTypeMapping.list();
			console.log("Component Type Mapping is initialised");
		};	

		if(angular.isUndefined(vm.categorizationMappingOptions)){

			vm.categorizationMappingOptions = CategorizationMapping.list();
			console.log("Categorization Mapping is initialised");
		};					
	}	


	//  We need to track in a model whether each level of the display accordion is expanded or not at any point in time.
	//  This is because the entire program model is refreshed each time we save a new element to it or delete one.  
	//  When the model is reloaded by angular we are losing the place that we are editing at the current time
	vm.accordian = {
			toggleProgramTab:[],
			toggleProgram:[],					
			toggleTL:[],
			toggleTopContentTable:[],
			toggleTopContentList:[],					
			toggleSecondL:[],
			toggleSecondContentTable:[],
			toggleSecondContentList:[],				
			toggleThirdL:[],
			toggleThirdContentTable:[],
			toggleThirdContentList:[],			
			toggleFourthL:[],
			toggleFourthContentTable:[],
			toggleFourthContentList:[],				
			toggleFifthL:[],
			toggleFifthContentTable:[],
			toggleFifthContentList:[]					
	};   

	vm.errorCallback = function(response) {

		// Check out this for 404 etc  http://stackoverflow.com/questions/28171486/render-404-page-without-redirecting-in-angular-js
		var message = 'Error ' + response.status + ' (' + response.statusText + ') ';

		if(response.status == 422)
		{			
			if(response.data.total > 1)
			{
				message = 'Sorry, we couldn\'t save your program. There were multiple errors.';

				angular.forEach(response.data._embedded.errors, function(value, key){
					console.log(key + ': ' + value.message);
					message += '  ' + value.message;
				});
			}else
			{
				message = 'Sorry, we couldn\'t save your program.  ' + response.data.message;
			}
		}

		console.error(message);
		ngNotify.set(message, 'error');
	}


	// we are setting model variables for the currentFullProgram so we need to be sure that no other program boxes or edit windows are open.
	vm.closeAllOtherPrograms = function(programItemId) {

		// if the User is editing a program form this will close it
		$('.editable-form').each(function(index,element) { $(element).data().$formController.$cancel();});

		//  Loop through all of the programs and make sure they are all closed
		for (var i = 1; i <= vm.programs.length; i++)
		{	
			if( i != programItemId && vm.accordian.toggleProgram[i] != undefined)
			{
				vm.accordian.toggleProgram[i] = false;
			}
		}
	};	

	vm.fullProgram = {};
	vm.currentFullProgramID;
	vm.currentFullProgram;
	vm.currentFullProgramHasContent = false;

	vm.updateCurrentProgram = function(currentProgramId) {
		$window.sessionStorage.version = '1.0';
		vm.currentFullProgramID = currentProgramId;
		vm.updateCurrentFullProgram();
	};

	//  Update the copy in the session
	vm.updateCurrentFullProgram = function() {

		// Now call update passing in the ID first then the object you want
		Program.get({ id:vm.currentFullProgramID}, function(fullProgram) {

			vm.currentFullProgram = fullProgram;

			vm.fullProgram[vm.currentFullProgramID] = fullProgram;

			//  We need to be certain that $resource has returned the current program and the currentFullProgram has updated before we run this method.
			//  Essentially we want this and the previous method calls to be synchronous and not asynchronous as any method calling $resource is by default.
			//  See here for info - https://seeofcode.wordpress.com/2015/06/07/angularjs-making-asynchronous-functions-run-synchronously/
			vm.updateCurrentFullProgramHasContent();

		},
		vm.errorCallback);
	};

	//  Determine if the program has content at any level and if it does do not allow to modify program code
	vm.updateCurrentFullProgramHasContent = function() {
		var hasContentAtAnyLevel = false;
		if(!hasContentAtAnyLevel && vm.currentFullProgram.topLevels != undefined)
		{
			for (var i=0; !hasContentAtAnyLevel && i < vm.currentFullProgram.topLevels.length; i++){
				if (vm.currentFullProgram.topLevels[i] != undefined && vm.currentFullProgram.topLevels[i].content[0] != undefined) {
					hasContentAtAnyLevel = true;
				}
			}
		}
		if(!hasContentAtAnyLevel && vm.currentFullProgram.secondLevels != undefined)
		{
			for (var i=0; !hasContentAtAnyLevel && i < vm.currentFullProgram.secondLevels.length; i++){
				if (vm.currentFullProgram.secondLevels[i] != undefined && vm.currentFullProgram.secondLevels[i].content[0] != undefined) {
					hasContentAtAnyLevel = true;
				}
			}
		}

		if(!hasContentAtAnyLevel && vm.currentFullProgram.thirdLevels != undefined)
		{
			for (var i=0; !hasContentAtAnyLevel && i < vm.currentFullProgram.thirdLevels.length; i++){
				if (vm.currentFullProgram.thirdLevels[i] != undefined && vm.currentFullProgram.thirdLevels[i].content[0] != undefined) {
					hasContentAtAnyLevel = true;
				}
			}
		}
		if(!hasContentAtAnyLevel && vm.currentFullProgram.fourthLevels != undefined)
		{
			for (var i=0; !hasContentAtAnyLevel && i < vm.currentFullProgram.fourthLevels.length; i++){
				if (vm.currentFullProgram.fourthLevels[i] != undefined && vm.currentFullProgram.fourthLevels[i].content[0] != undefined) {
					hasContentAtAnyLevel = true;
				}
			}
		}
		if(!hasContentAtAnyLevel && vm.currentFullProgram.fifthLevels != undefined)
		{
			for (var i=0; !hasContentAtAnyLevel && i < vm.currentFullProgram.fifthLevels.length; i++){
				if (vm.currentFullProgram.fifthLevels[i] != undefined && vm.currentFullProgram.fifthLevels[i].content[0] != undefined) {
					hasContentAtAnyLevel = true;
				}
			}
		}
		vm.currentFullProgramHasContent = hasContentAtAnyLevel;
	}

	vm.currentTopLevelsList = {};

	//  Update the list of top levels in the session to match the currentProgram
	vm.updateCurrentTopLevelsList = function() {
		//  Changes the view that we get back from the programs list request
		$window.sessionStorage.version = 'toplevelslist';
		Program.get({ id:vm.currentFullProgramID}, function(fullProgramTopLevelsList) { 
			vm.currentTopLevelsList[vm.currentFullProgramID] = fullProgramTopLevelsList;
		},
		vm.errorCallback);
	};

	// set explicit API Version on some Program Components. e.g. Strand
	vm.setSessionStorageVersion = function() {		
		$window.sessionStorage.version = '1.0';
	};

	vm.currentCorrelationsList = {};

	//  Update the list of top levels in the session to match the currentProgram
	vm.updateCurrentCorrelationsList = function() {
		//  Changes the view that we get back from the programs list request
		$window.sessionStorage.version = 'correlationslist';
		Program.get({ id:vm.currentFullProgramID}, function(fullProgramCorrelationsList) { 

			vm.currentCorrelationsList[vm.currentFullProgramID] = fullProgramCorrelationsList;    		

		},
		vm.errorCallback);
	};


	vm.checkList = function() {
		if(vm.programs == null || vm.programs[0] == null)
		{
			//  Refresh the list
			vm.programs = Program.list();
		}	
	}

	var _timeout;
	vm.programChangedMinimum = 3;

	vm.theProgramChanged = function() {

		if(_timeout) { // if there is already a timeout in process cancel it
			$timeout.cancel(_timeout);
		}
		_timeout = $timeout(function() {

			if (vm.newName && vm.newName.length >= vm.programChangedMinimum) 
				vm.onProgramNameChange()
				_timeout = null;

		}, 600);

	};	

	//  Default the program code based on the name
	vm.onProgramNameChange = function() {

		var programName = vm.newName.toLowerCase();

		if (programName.indexOf('journeys') > -1) {
			vm.newCode = "JY"; 
		}else if (programName.indexOf('fusion') > -1) {
			vm.newCode = "SCI"; 
		}else if (programName.indexOf('collection') > -1) {
			vm.newCode = "LT"; 
		}else if (programName.indexOf('gomath') > -1) {
			vm.newCode = "GM"; 
		}else if (programName.indexOf('senderos') > -1) {
			vm.newCode = "SN"; 
		}else if (programName.indexOf('social') > -1 && programName.indexOf('studies') > -1) {
			vm.newCode = "SS"; 
		}else if (programName.indexOf('high') > -1 && programName.indexOf('school') > -1 && programName.indexOf('math') > -1) {
			vm.newCode = "HSM"; 
		}else if (programName.indexOf('expression') > -1) {
			vm.newCode = "MX"; 
		}else if (programName.indexOf('escalate') > -1) {
			vm.newCode = "ESC"; 
		}else if (programName.indexOf('family') > -1 && programName.indexOf('engagement') > -1) {
			vm.newCode = "FE";
		}else if (programName.indexOf('high') > -1 && programName.indexOf('school') > -1 && programName.indexOf('science') > -1) {
			vm.newCode = "HSS"; 
		}else if (programName.indexOf('high') > -1 && programName.indexOf('school') > -1 && programName.indexOf('biology') > -1) {
			vm.newCode = "HSB"; 
		}else if (programName.indexOf('high') > -1 && programName.indexOf('school') > -1 && programName.indexOf('chemistry') > -1) {
			vm.newCode = "HSC";
		}else if (programName.indexOf('high') > -1 && programName.indexOf('school') > -1 && programName.indexOf('physics') > -1) {
			vm.newCode = "HSP"; 
		}else if (programName.indexOf('on') > -1 && programName.indexOf('our') > -1 && programName.indexOf('way') > -1) {
			vm.newCode = "OWE"; 
		}else if (programName.indexOf('avancemos') > -1) {
			vm.newCode = "AVN"; 
		}else{
			vm.generateTwoDigitProgramCode();	
		}
	}

	vm.generateTwoDigitProgramCode = function() {
		var theProgramName = vm.newName;
		vm.newCode = "HMH";
		var programNameCharacters = theProgramName.replace(/[^A-Za-z]/g, "");
		if ( programNameCharacters.length > 1 ){
			vm.newCode = programNameCharacters[0].toUpperCase() + programNameCharacters[programNameCharacters.length - 1].toUpperCase();
		}
	}

	vm.list = function() {
		Program.list(
				function(programs) {
					vm.programs = programs;
				},
				vm.errorCallback
		);
	}

	vm.addProgram = function() {

		new Program({name : vm.newName, code : vm.newCode, discipline: vm.newDiscipline, platform: vm.newPlatform, state : vm.newState, copyrightYear : vm.newCopyrightYear, standardSetName : vm.newStandardSetName, topLevelScope : vm.newTopLevelScope, secondLevelScope : vm.newSecondLevelScope, thirdLevelScope : vm.newThirdLevelScope, fourthLevelScope : vm.newFourthLevelScope, fifthLevelScope : vm.newFifthLevelScope,abStandard:vm.abStandard,hmsiStandard:vm.hmsiStandard }).$save(
				function(response) {
					ngNotify.set('New Program added!', 'success');
					vm.newName = '';
					vm.newCode = '';
					vm.newDiscipline = '';
					vm.newPlatform = '';
					vm.newState = '';
					vm.newCopyrightYear = '';
					vm.newStandardSetName = '';
					vm.newTopLevelScope = '';
					vm.newSecondLevelScope = 'Second Level Scope';
					vm.newThirdLevelScope = 'Third Level Scope';
					vm.newFourthLevelScope = 'Fourth Level Scope';
					vm.newFifthLevelScope = 'Fifth Level Scope';
					vm.abStandard='';
					vm.hmsiStandard='';
					vm.list();
				},
				vm.errorCallback
		);
	}


	vm.update = function(program) {

		angular.extend(program, { name: vm.currentFullProgram.name, code: vm.currentFullProgram.code, platform: vm.currentFullProgram.platform, topLevelScope: vm.currentFullProgram.topLevelScope, 
			discipline: vm.currentFullProgram.discipline, secondLevelScope: vm.currentFullProgram.secondLevelScope, copyrightYear: vm.currentFullProgram.copyrightYear, 
			thirdLevelScope: vm.currentFullProgram.thirdLevelScope, fourthLevelScope: vm.currentFullProgram.fourthLevelScope, state: vm.currentFullProgram.state, standardSetName: vm.currentFullProgram.standardSetName, fifthLevelScope: vm.currentFullProgram.fifthLevelScope,abStandard:vm.currentFullProgram.abStandard,hmsiStandard:vm.currentFullProgram.hmsiStandard  });

		program.$update(
				function(response) {
					vm.list();
					ngNotify.set('Program with name \"' + program.name + '\" was updated!', 'success');
				},
				vm.errorCallback
		);
	}

	vm.updateProgram = function(program) {
		angular.extend(program, program);
		program.$update(
				function(response) {
					vm.list();
					ngNotify.set('Program with name \"' + program.name + '\" was updated!', 'success');
				},
				vm.errorCallback
		);
	}

	vm.findNodes = function () {

	};

	vm.visible = function (program) {
		return !(vm.query && vm.query.length > 0
				&& program.name.toUpperCase().indexOf(vm.query.toUpperCase()) == -1);
	}

	vm.delete = function(program) {
		var id = program.id;
		Program.delete({ id:id },program,
				function(response) {
			ngNotify.set('Program with name \"' + program.name + '\" deleted!', 'success');
			vm.programs = Program.list();
		},
		vm.errorCallback
		);
	}


	//  The data for the program select boxes
	vm.platforms = [{value: 'HMOF', text: 'HMOF'},{value: 'TCK6', text: 'TCK6'}];

	vm.disciplines = [{value: 'Reading and Language Arts', text: 'Reading and Language Arts'},
	                  {value: 'Mathematics', text: 'Mathematics'},
	                  {value: 'Science and Health', text: 'Science and Health'},
	                  {value: 'Social Studies', text: 'Social Studies'},
	                  {value: 'World Languages', text: 'World Languages'},
	                  {value: 'Other', text: 'Other'}];

	vm.states = [{value: 'NA', text: 'National'},
	             {value: 'AL', text: 'Alabama'},
	             {value: 'AK', text: 'Alaska'},
	             {value: 'AZ', text: 'Arizona'},
	             {value: 'AR', text: 'Arkansas'},
	             {value: 'CA', text: 'California'},
	             {value: 'CO', text: 'Colorado'},
	             {value: 'CT', text: 'Connecticut'},
	             {value: 'DE', text: 'Delaware'},
	             {value: 'DC', text: 'District of Columbia'},
	             {value: 'FL', text: 'Florida'},
	             {value: 'GA', text: 'Georgia'},
	             {value: 'HI', text: 'Hawaii'},
	             {value: 'ID', text: 'Idaho'},
	             {value: 'IL', text: 'Illinois'},
	             {value: 'IN', text: 'Indiana'},
	             {value: 'IA', text: 'Iowa'},
	             {value: 'KS', text: 'Kansas'},
	             {value: 'KY', text: 'Kentucky'},
	             {value: 'LA', text: 'Louisiana'},
	             {value: 'ME', text: 'Maine'},
	             {value: 'MD', text: 'Maryland'},
	             {value: 'MA', text: 'Massachusetts'},
	             {value: 'MI', text: 'Michigan'},
	             {value: 'MN', text: 'Minnesota'},
	             {value: 'MS', text: 'Mississippi'},
	             {value: 'MO', text: 'Missouri'},
	             {value: 'MT', text: 'Montana'},
	             {value: 'NE', text: 'Nebraska'},
	             {value: 'NV', text: 'Nevada'},
	             {value: 'NH', text: 'New Hampshire'},
	             {value: 'NJ', text: 'New Jersey'},
	             {value: 'NM', text: 'New Mexico'},
	             {value: 'NY', text: 'New York'},
	             {value: 'NC', text: 'North Carolina'},
	             {value: 'ND', text: 'North Dakota'},
	             {value: 'OH', text: 'Ohio'},
	             {value: 'OK', text: 'Oklahoma'},
	             {value: 'OR', text: 'Oregon'},
	             {value: 'PA', text: 'Pennsylvania'},
	             {value: 'RI', text: 'Rhode Island'},
	             {value: 'SC', text: 'South Carolina'},
	             {value: 'SD', text: 'South Dakota'},
	             {value: 'TN', text: 'Tennessee'},
	             {value: 'TX', text: 'Texas'},
	             {value: 'UT', text: 'Utah'},
	             {value: 'VT', text: 'Vermont'},
	             {value: 'VA', text: 'Virginia'},
	             {value: 'WA', text: 'Washington'},
	             {value: 'WV', text: 'West Virginia'},
	             {value: 'WI', text: 'Wisconsin'},
	             {value: 'WY', text: 'Wyoming'}]

	vm.topLevelScopes = [{value: 'Grade', text: 'Grade'}];

	vm.secondLevelScopes = [{value: '', text: ''},
	                        {value: 'Volume', text: 'Volume'},
	                        {value: 'Book', text: 'Book'},
	                        {value: 'Unit', text: 'Unit'},
	                        {value: 'Collection', text: 'Collection'},
	                        {value: 'Theme', text: 'Theme'},
	                        {value: 'Module', text: 'Module'},
	                        {value: 'Chapter', text: 'Chapter'},
	                        {value: 'Section', text: 'Section'},
	                        {value: 'Lesson', text: 'Lesson'}];


	vm.thirdLevelScopes = [ {value: '', text: ''},
	                        {value: 'Chapter', text: 'Chapter'},
	                        {value: 'Lesson', text: 'Lesson'},
	                        {value: 'Module', text: 'Module'},
	                        {value: 'Week', text: 'Week'},
	                        {value: 'Selection', text: 'Selection'}];


	vm.fourthLevelScopes = [{value: '', text: ''},
	                        {value: 'Lesson', text: 'Lesson'},
	                        {value: 'Day', text: 'Day'},
	                        {value: 'Section', text: 'Section'},
	                        {value: 'Skill', text: 'Skill'}];

	vm.fifthLevelScopes = [{value: '', text: ''},
	                       {value: 'Day', text: 'Day'}];
	// From https://confluence.hmhco.com/pages/viewpage.action?spaceKey=HP&title=MDS+Root+Level+Metadata+for+Library+Card
	vm.cardOptions = [{value: '', text: ''},
	                  {value: '1', text: '1 Teacher Edition - Single volume'},
	                  {value: '2', text: '2 Student Edition - Single volume'},
	                  {value: '3', text: '3 ELA DLO'},
	                  {value: '4', text: '4 Teacher Resources'},
	                  {value: '5', text: '5 Ancillary eBook - Single volume'},
	                  {value: '6', text: '6 Notebook'},
	                  {value: '7', text: '7 PDF'},
	                  {value: '8', text: '8 RCE single volume'},
	                  {value: '9', text: '9 RCE multi volume'},
	                  {value: '10', text: '10 myWriteSmart'},
	                  {value: '11', text: '11 Other Assessment'},
	                  {value: '12', text: '12 URL'},
	                  {value: '13', text: '13 Video'},
	                  {value: '15', text: '15 Math DLO'},
	                  {value: '20', text: '20 Teacher Edition mulit-volume (for TC purposes)'},
	                  {value: '21', text: '21 Student Edition mulit-volume (for TC purposes)'},
	                  {value: '22', text: '22 Multi-volume PDF title'},
	                  {value: '23', text: '23 Multi-volume Ancillary eBook'},
	                  {value: '24', text: '24 Muti-volume video group'},
	                  ];    

	//  Used on the content (resource) objects
	vm.doneOwnerOptions = [{value: '', text: ''},{value: 'S', text: 'S'},{value: 'T', text: 'T'}];
	//  This looks like an ICU locale rather than an ISO language code
	vm.languageOptions = [{value: 'en-US', text: 'English (United States)'},{value: 'es-US', text: 'Spanish (United States)'},{value: 'es-419', text: 'Spanish (Latin American)'}];

	//  Triggered from all other controllers after an add or delete
	$scope.$on("REFRESHPROGRAMREQUIRED", vm.updateCurrentFullProgram);
	$scope.$on("REFRESHPROGRAMTLREQUIRED", vm.updateCurrentTopLevelsList);
	$scope.$on("REFRESHPROGRAMCRREQUIRED", vm.updateCurrentCorrelationsList);
}
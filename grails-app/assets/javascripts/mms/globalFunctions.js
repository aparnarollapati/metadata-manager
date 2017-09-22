/**
 * Contains functions that are added to the root AngularJs scope.
 */
angular.module('mms').run(function(editableOptions, ngNotify, $rootScope, $state, Auth, AUTH_EVENTS, FORM_EVENTS) {

	
	//  For Bootstrap
	editableOptions.theme = 'bs3';
	
    // ngNotify options
	ngNotify.config({
        duration: 2500,	// in milliseconds
    });
    

	// Register global transition start hook
	// Check if the user is logged in
	// and authorized to move onto the next state
	$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {	

	    var authorizedRoles = toState.data.authorizedRoles;

	    if(!Auth.isAuthenticated()){
	    	//console.log('Not Authenticated');
	    	// user is not logged in
	    	event.preventDefault();
	    	$rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
	    }else if (!Auth.isAuthorized(authorizedRoles)) {
	    	//console.log('Not Authorized');
	    	// user is not allowed
	    	event.preventDefault();
	    	$rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
	    }
	    
	});
	
	/* Sample code for the 1.0 Alpha release of ui-router that does not have the state events.
	 * Triggers, but without event.preventDefault it still proceeds to the unauthorised state.
	/*$transitions.onStart({ from: '*', to: '*' }, function($transition$) { // inject the Transition instance
	   var authorizedRoles = $transition$.to().data.authorizedRoles;
	   //console.log('authorizedRoles: ' + authorizedRoles);
	  // console.log('!Auth.isAuthorized(authorizedRoles): '+ !Auth.isAuthorized(authorizedRoles));
		    
	   if (!Auth.isAuthorized(authorizedRoles)) {
		    	
		   //event.preventDefault();
		   
		   if (Auth.isAuthenticated()) {
		       // user is not allowed
		       $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
		   } else {
		       // user is not logged in
		       $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
		   }
	   }
	
	  });*/
	
	$rootScope.logout = function(){
		Auth.logout();
	};

});
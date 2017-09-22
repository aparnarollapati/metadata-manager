'use strict';

angular.module('mms').
controller('ParentController', ['$scope', '$state', '$rootScope', '$uibModal', '$window', 'Auth', 'AUTH_EVENTS', 'FORM_EVENTS', 'USER_ROLES', 'ngNotify',
                                function($scope, $state, $rootScope, $uibModal, $window, Auth, AUTH_EVENTS, FORM_EVENTS, USER_ROLES, ngNotify){

	// this is the parent controller for all controllers.
	// Manages auth login functions and each controller
	// inherits from this controller	

	$scope.currentUser = null;
	$scope.userRoles = USER_ROLES;

	// If a session exists for current user (page was refreshed)
	// Log him in again and move to the dashboard
	if ((typeof $window.sessionStorage["currentUser"] != 'undefined') && (typeof $rootScope != 'undefined' && typeof $rootScope.currentUser == 'undefined')) {
		$rootScope.currentUser = angular.fromJson($window.sessionStorage["currentUser"]);
		$scope.currentUser = $rootScope.currentUser;
		$state.go('dashboard');
	}

	$scope.modalShown = false;

	var showLoginDialog = function() {

		if(!$rootScope.modalShown){
			$rootScope.modalShown = true;
			var modalInstance = $uibModal.open({
				templateUrl : 'login_modal.html',
				controller : "LoginController",
				backdrop : 'static'
			});

			modalInstance.result.then(function() {
				$rootScope.modalShown = false;
			});
		}
	};

	var setCurrentUser = function(){
		$scope.currentUser = $rootScope.currentUser;
	}

	var showNotAuthorized = function(){
		var message = "Sorry, you are not authorised to do this.  Please contact CustomDevelopment@hmhco.com to be granted access. ";
		ngNotify.set(message, 'warn');
	}

	var showNotAuthenticated = function(){
		var message = "Sorry, login failed.  Please check your email address and password and try again.  ";
		ngNotify.set(message, 'warn');
	}

	var showUnprocessableEntry = function(){
		var message = "Sorry, we couldn't save your form.  Please check your entries and try again.  ";
		ngNotify.set(message, 'warn');
	}

	$scope.isAuthenicated = Auth.isAuthenticated;
	$scope.isAuthorized = Auth.isAuthorized;

	//listen to events of unsuccessful logins, to run the login dialog
	$rootScope.$on(AUTH_EVENTS.notAuthorized, showNotAuthorized);
	$rootScope.$on(AUTH_EVENTS.notAuthenticated, showLoginDialog);
	$rootScope.$on(AUTH_EVENTS.sessionTimeout, showLoginDialog);
	$rootScope.$on(AUTH_EVENTS.logoutSuccess, showLoginDialog);
	$rootScope.$on(AUTH_EVENTS.loginSuccess, setCurrentUser);
	$rootScope.$on(AUTH_EVENTS.loginFailed, showNotAuthenticated);
	$rootScope.$on(FORM_EVENTS.unprocessableEntry, showUnprocessableEntry);

} ]);
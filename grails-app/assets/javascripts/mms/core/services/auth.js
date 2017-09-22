'use strict';

angular.module('mms.core')
.factory('Auth', [ '$http', '$rootScope', '$window', 'AUTH_EVENTS', 
                   function($http, $rootScope, $window, AUTH_EVENTS) {

	var authService = {};

	//the login function
	authService.login = function(user, success, error) {
		$http.post(contextPath + '/api/login', {
			username: user.username,
			password: user.password
		}).then(function successCallback(response) {

			var currentUser = response.data;

			//set the browser session, to avoid re-login on refresh
			$window.sessionStorage["currentUser"] = JSON.stringify(currentUser);
			$rootScope.currentUser = currentUser;

			$window.sessionStorage.token = currentUser.access_token;

			//fire event of successful login
			$rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
			//run success function
			success(currentUser);

		}, function errorCallback(response) {
			//console.log('Auth Fail Callback')
			// called asynchronously if an error occurs
			// or server returns response with an error status.
			$rootScope.$broadcast(AUTH_EVENTS.loginFailed);
			error();
		});
	};

	//check if the user is authenticated
	authService.isAuthenticated = function() {
		return !!$rootScope.currentUser;
	};

	/**check if the user is authorized to access the next route
	 *this function can be also used on element level
	 *e.g. <p ng-if="isAuthorized(authorizedRoles)">show this only to admins</p>
	 */
	authService.isAuthorized = function(authorizedRoles) {

		var isThisAuthorized = false;
		if (!angular.isArray(authorizedRoles)) {
			authorizedRoles = [authorizedRoles];
		}

		isThisAuthorized = (authService.isAuthenticated() && findOne(authorizedRoles, $rootScope.currentUser.roles));

		return isThisAuthorized;	
	};

	//log out the user and broadcast the logoutSuccess event
	authService.logout = function(){

		$window.sessionStorage.removeItem("token");
		$window.sessionStorage.removeItem("currentUser");
		$rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);	

	}

	/**
	 * @description determine if an array contains one or more items from another array.
	 * @param {array} haystack the array to search.
	 * @param {array} arr the array providing items to check for in the haystack.
	 * @return {boolean} true|false if haystack contains at least one item from arr.
	 */
	var findOne = function (haystack, arr) {

		var found = true;
		found =  arr.some(function (v) {
			return haystack.indexOf(v) >= 0;
		});

		return found;
	};

	return authService;
} ]);
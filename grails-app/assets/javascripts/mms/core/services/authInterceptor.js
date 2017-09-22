'use strict';
/**
 * This interceptor will make sure that, after each $http request
 * if the user doesn't have access to something runs the according
 * event, given the response status codes from the server. 
 */
angular.module('mms.core')
.factory('AuthInterceptor', [ '$rootScope', '$q', 'AUTH_EVENTS', 'FORM_EVENTS',
function($rootScope, $q, AUTH_EVENTS, FORM_EVENTS) {
	
	return {
		responseError : function(response) {
			$rootScope.$broadcast({
				401 : AUTH_EVENTS.notAuthenticated,
				403 : AUTH_EVENTS.notAuthorized,
				419 : AUTH_EVENTS.sessionTimeout,
				440 : AUTH_EVENTS.sessionTimeout,
				422 : FORM_EVENTS.unprocessableEntry
			}[response.status], response);
			return $q.reject(response);
		}
	};
} ]);
//= wrapped
//= require /angular/angular
//= require /angular/angular-resource
//= require_self
//= require_tree services

var noSessionIdUrls = [
    "uib/template",
    "template"
];

angular.module("mms.core", ["ngResource", "ngNotify"])
    .constant("contextPath", window.contextPath)    
    .config(config);



function config($httpProvider) {
    $httpProvider.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
    $httpProvider.interceptors.push(httpRequestInterceptor);
    /* Adding the auth interceptor here, to check every $http request*/
    $httpProvider.interceptors.push([
        '$injector',
        function ($injector) {
             return $injector.get('AuthInterceptor');
        }
    ]);	
}

// From https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith#Polyfill
// ECMAScript 6 is not yet supported by IE browser
if (!String.prototype.startsWith) {
	  String.prototype.startsWith = function(searchString, position) {
	    position = position || 0;
	    return this.indexOf(searchString, position) === position;
	  };
}

function httpRequestInterceptor(contextPath,  $window) {
    return {
        request: function (config) {
        	//  The template cache does not work with query parameters and is needed to load modals.  So do not intercept modals.
        	for(var i = 0; i < noSessionIdUrls.length; i++) {
                if(config.url.startsWith(noSessionIdUrls[i])) {
                    //console.log("Request interceptor: omitting bearer token for templates for modals");
                    return config;
                }
            }

            if (!config.url.indexOf("/") == 0 && contextPath) {
                config.url = contextPath + "/" + config.url;
            }
            config.headers = config.headers || {};
            if ($window.sessionStorage.token) {
            	config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
            }
            if(config.url.indexOf("api") !== -1);
            {
            	//  All API requests should explicitly request json only
            	config.headers.Accept = 'application/json';	
            	//config.headers['Accept-Version'] = '';
            	config.headers['Accept-Version'] = 'v1.0';
		    
				if ($window.sessionStorage.version) {
					//console.log("$window.sessionStorage.version:: " + $window.sessionStorage.version);
					config.headers['Accept-Version'] = 'v' + $window.sessionStorage.version;
				}    
		    
        	}
            return config;
        }
    };
}
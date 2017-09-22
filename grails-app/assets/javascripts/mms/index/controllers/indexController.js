'use strict';

//= wrapped
//= require /angular/angular
//= require /angular/angular-resource
//= require_self
//= require_tree services
angular
    .module("mms.index")    
    .controller("IndexController", IndexController);

function IndexController(applicationDataFactory,contextPath,$http,$timeout,$window) {
    var vm = this;
    var errmsg="Sorry, we were not able to find a user with that username and password." ;
    var sucmsg="User Login Successful." ;
    vm.contextPath = contextPath;

    applicationDataFactory.get().then(function(response) {
        vm.applicationData = response.data;
    });
    
   
    if (typeof(vm.authenticated) == "undefined" && typeof($window.sessionStorage.token) == "undefined")
	{    	
        vm.authenticated = false;    
    }else
    {   	
    	vm.authenticated = true;   	       	
    }
    vm.user = {};       
    
   vm.login = function() {
        vm.submitted = true;
        vm.errors = {};
        if(vm.user.userLoginForm.$invalid) {
            console.log('User Login Form is Invalid');
            return;
        }        
	console.log('In here');
        $http.post('/api/login', {
            username: vm.user.username,
            password: vm.user.password
        }).then(function (response) {
        	vm.authenticated = true;    	
            $window.sessionStorage.token = response.data.access_token;   
            
            console.log(sucmsg);                      
            $timeout(function () {
           	   vm.authenticated = false;
           	   $window.sessionStorage.clear();
           	  }, 1800000);
           
     /*       var user = {};
            if (typeof $window.sessionStorage.token !== 'undefined') {
                var encoded =  $window.sessionStorage.token.split('.')[1];
                user = JSON.parse(urlBase64Decode(encoded));
            }
            console.log( user);*/
           
            
        }).catch(function(response) {
        	vm.message=errmsg;
        	console.error(errmsg, response.status, response.data);
        	      
        })
        .finally(function() {
            console.log("finally User Login");
        });        
    }
   	   
/*   function urlBase64Decode(str) {
       var output = str.replace('-', '+').replace('_', '/');
       switch (output.length % 4) {
           case 0:
               break;
           case 2:
               output += '==';
               break;
           case 3:
               output += '=';
               break;
           default:
               throw 'Illegal base64url string!';
       }
       return window.atob(output);
   }
*/
      
	vm.logout = function() {
	     $http.put('/api/logout').then(function(data) {
	         vm.authenticated = false;
			 $window.sessionStorage.clear();
			
	        }, function(response) {
	         vm.authenticated = false;
			 $window.sessionStorage.clear();
			 
	        });
	}
	    
}
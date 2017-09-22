'use strict';
angular.module('mms')
.controller('LoginController', [ '$scope', '$state', '$uibModalInstance','Auth', 
                                 function($scope, $state, $uibModalInstance, Auth ) {
	$scope.credentials = {};
	$scope.loginForm = {};
	$scope.error = false;

	//  Allow to close modal
	$scope.cancel = function () {
		$uibModalInstance.close();
	};

	// When the login form is submitted from modal
	$scope.submit = function() {
		$scope.submitted = true;
		if (!$scope.loginForm.$invalid) {
			$scope.login($scope.credentials);
		} else {
			$scope.error = true;
			return;
		}
	};

	//Performs the login function, by sending a request to the server via the Auth service
	//  Closes the modal
	$scope.login = function(credentials) {
		$scope.error = false;
		Auth.login(credentials, function(user) {
			// success function
			$uibModalInstance.close();
			$state.go('dashboard');
		}, function(err) {
			//console.log('Login Fail')
			//console.log("error");
			$scope.error = true;
		});
	};

} ]);
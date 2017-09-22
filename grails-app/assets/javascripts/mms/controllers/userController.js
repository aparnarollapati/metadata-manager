//= wrapped

angular
.module("mms")
.controller("UserController", UserController)
.constant("contextPath", window.contextPath);

function UserController(User, $rootScope, $window, ngNotify) {
	
	var vm = this;

	vm.errorCallback = function(response) {
		var message = 'Error ' + response.status + ' (' + response.statusText + ') ';

		if(response.status == 422)
		{			
			if(response.data.total > 1)
			{
				message = 'Sorry, we couldn\'t save your user. There were multiple errors.';

				angular.forEach(response.data._embedded.errors, function(value, key){
					console.log(key + ': ' + value.message);
					message += '  ' + value.message;
				});
			}else
			{
				message = 'Sorry, we couldn\'t save your user.  ' + response.data.message;
			}
		}

		console.error(message);
		ngNotify.set(message, 'error');
	}


	vm.list = function() {
		User.list(
				function(users) {
					vm.users = users;               
				},
				vm.errorCallback
		);
	}

	vm.addUser = function() {    	
		new User({username : vm.username, password: vm.password, email: vm.email, roleid: vm.roleid}).$save(
				function(response) {
					ngNotify.set('New User added!', 'success');

					vm.username = '';
					vm.password = '';
					vm.email = '';
					vm.roleid = '';
					vm.list();
				},
				vm.errorCallback
		);
	}

	vm.updateUsername = function(user, username) {
		user.username = username
		vm.update(user);
	}

	vm.updatePassword = function(user, password) {

		user.password = password
		vm.update(user);
	}

	vm.updateEmail = function(user, email) {
		user.email = email
		vm.update(user);
	}

	vm.updateRoleid = function(user,roleid) { 

		user.roleid =  roleid
		vm.update(user);
	}

	vm.update = function(user) {
		user.$update(
				function(response) {
					vm.list();
					ngNotify.set('User updated successfully!', 'success');
				},
				vm.errorCallback
		);
	}

	vm.delete = function(User) {
		User.$delete(
				function(response) {
					vm.list();
				},
				vm.errorCallback
		);
	}

	if (typeof $window.sessionStorage.token != 'undefined') {
		//  If the token is stored in the session then accept it and initialise the list
		$rootScope.authenticated = true;
		vm.list();

	}        

}

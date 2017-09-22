//= wrapped
angular
.module("mms")
.controller("RoleController", RoleController);

function RoleController(Role) {
	var vm = this;  
	vm.rolelist = Role.list(); 

}

//= wrapped
angular
.module("mms.header")
.controller("HeaderController", HeaderController);

function HeaderController(applicationDataFactory, contextPath) {
	var vm = this;

	vm.contextPath = contextPath;

	applicationDataFactory.get().then(function(response) {
		vm.applicationData = response.data;
	});
}
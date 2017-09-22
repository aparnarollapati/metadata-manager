//= wrapped
angular
.module("mms")
.controller("ProductController", ProductController);

function ProductController(Product, Grade, $rootScope, ngNotify) {

	var vm = this;   

	vm.products = [];

	vm.currentProduct;

	vm.accordian = {
			toggleProductComponent:false
	};

	vm.errorCallback = function(response) {
		
		var message = 'Error ' + response.status + ' (' + response.statusText + ') ';

		if(response.status == 500)
		{
			message = 'Sorry, we couldn\'t delete your product as it has resources still associated with it that must be deleted first.';
		}else if(response.status == 405)
		{
			message = 'Sorry, we couldn\'t delete your product as it has resources still associated with it that must be deleted first. ' + response.data; 
		}else if(response.status == 422)
		{			
			if(response.data.total > 1)
			{
				message = 'Sorry, we couldn\'t save your product. There were multiple errors.';

				angular.forEach(response.data._embedded.errors, function(value, key){
					console.log(key + ': ' + value.message);
					message += '  ' + value.message;
				});
			}else
			{
				message = 'Sorry, we couldn\'t save your product.  ' + response.data.message;
			}
		}

		console.error(message);
		ngNotify.set(message, 'error');
	};

	vm.list = function() {

		Product.list(
				function(products) {
					vm.products = products;
				},
				vm.errorCallback
		);
	};

	vm.addProduct = function(currentProgram) {

		//  Don't add a new product without at least one grade
		if(vm.newGrades != ''){

			var gradesString = vm.newGrades + '';
			var newGradesJson = "[";

			var newGradesJsonList = gradesString.split(",");
			var arrayLength = newGradesJsonList.length;
			for (var i = 0; i < arrayLength; i++) {
				newGradesJson += "{\"grade\":\"" + newGradesJsonList[i] + "\"}";
				if(i < (arrayLength - 1))
				{
					newGradesJson += ",";
				}
			}
			newGradesJson += "]";	

			//  Just existing components selected
			//  Make a string of the new components if they have been selected
			var componentsString = vm.newComponents + '';

			var newComponentsJson = "[";

			var newComponentsJsonList = componentsString.split(",");

			var arrayLength = newComponentsJsonList.length;
			for (var i = 0;!angular.isUndefined(vm.newComponents) && vm.newComponents != "" && i < arrayLength; i++) {

				newComponentsJson += "{\"id\":" + newComponentsJsonList[i] + "}";
				if(i < (arrayLength - 1))
				{
					newComponentsJson += ",";
				}
			}

			//  Only add this in if the section is displayed - otherwise the user wont expect it to be submitted
			var newComponentJson;
			if(vm.accordian.toggleProductComponent && vm.newComponent)
			{
				if(!angular.isUndefined(vm.newComponents) && newComponentsJson != "[" && newComponentsJson != "")
					newComponentsJson += ","
						// Before we close off the array, check if we have a new component to add too
						newComponentJson = "{\"program\" : {\"id\":" + currentProgram.id + "},\"componentHierarchy\":" + vm.newComponentHierarchy + ", \"component\":\"" + vm.newComponent + "\", \"componentHierarchy\":" + vm.newComponentHierarchy + ", \"componentType\":\"" + vm.newComponentType + "\", \"categorization\":\"" + vm.newCategorization + "\", \"toolType\":" + vm.newToolType + "}";
			}
			if(newComponentJson)
			{
				newComponentsJson += newComponentJson;
			}
			newComponentsJson += "]";			

			//  Existing components selected or a mix of existing and a new component
			if(!angular.isUndefined(newComponentsJson) && newComponentsJson != "[]" && newComponentsJson != ""){
				vm.currentProduct = new Product({isbn : vm.newISBN, title : vm.newTitle, program : {"id": currentProgram.id}, grades : JSON.parse(newGradesJson), components : JSON.parse(newComponentsJson)});
			}else{
				//  No components
				vm.currentProduct = new Product({isbn : vm.newISBN, title : vm.newTitle, program : {"id": currentProgram.id}, grades : JSON.parse(newGradesJson)});
			}

			vm.currentProduct.$save(
					function(response) {
						$rootScope.$broadcast("REFRESHPROGRAMREQUIRED");
						ngNotify.set('New Product added!', 'success');

						vm.newISBN = '';
						vm.newTitle = '';
						vm.newGrades = '';
						vm.newComponents = '';
						vm.newComponentHierarchy = '';
						vm.newComponent = '';
						vm.newComponentType = '';
						vm.newCategorization = '';
						vm.newToolType = '';

					},
					vm.errorCallback
			);
		}else
		{
			ngNotify.set(message, 'A product must have at least one grade assigned to it.');
		}      
	};

	/*  Product */
	vm.updateTitle = function( product, title) {
		product.title = title
		vm.update(product);
	};

	vm.updateIsbn = function( product, isbn) {
		product.isbn = isbn
		vm.update(product);
	};

	vm.update = function(product) {

		var id = product.id
		// Now call update passing in the ID first then the object you are updating
		Product.update({ id:id }, product, function(response) {
			ngNotify.set('Product with title \"' + product.title + '\" was updated!', 'success');
			//  Required for a products components associateWithComponent
			$rootScope.$broadcast("REFRESHPROGRAMREQUIRED");
		},
		vm.errorCallback);

	};

	vm.findNodes = function () {

	};

	vm.visible = function (product) {
		return !(vm.query && vm.query.length > 0
				&& product.name.toUpperCase().indexOf(vm.query.toUpperCase()) == -1);
	};

	vm.disassociateFromComponent = function(product, componentSpec) {

		var index = product.components.indexOf(componentSpec);
		//  Remove the component at the desired index
		product.components.splice(index, 1);
		//  Save to DB
		vm.update(product);
	}

	vm.associateWithComponent = function(product) {

		//  Remove the component at the desired index
		product.components.push({"id" : vm.newComponent});

		//  Save to DB
		vm.update(product);
	}

	vm.delete = function(product) {
		var id = product.id
		Product.delete({ id:id },product,
				function(response) {
			ngNotify.set('Product with title \"' + product.title + '\" was deleted!', 'success');
			$rootScope.$broadcast("REFRESHPROGRAMREQUIRED");
		},
		vm.errorCallback
		);
	};
}
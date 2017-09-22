// fdescribe or fit used to trigger just one test suite or test in a test run
describe('productController', function() {
	var $controller, scope, httpBackend;
	
    beforeEach(module('mms', function() {
    }));
    
    beforeEach(inject(function(_$rootScope_,_$controller_, _$httpBackend_){
        $rootScope = _$rootScope_;
        $controller = _$controller_;
        scope = $rootScope.$new();
        httpBackend = _$httpBackend_;
      }));
    
    beforeEach(function(){
        $controller("ProductController as vm", {
                $scope: scope
            });
    });
    
   it('should exist', function() {
	   expect($controller).toEqual(jasmine.anything());
   });
   
   it('as vm should exist', function() {
	   expect(scope.vm).toEqual(jasmine.anything());
   });
   
   describe('before activation', function() {
	   it('should have empty product array', function(){
	       expect(scope.vm.products).toEqual(jasmine.anything());
	   });
	
	   it('should have empty product array length', function(){   
	       expect(scope.vm.products.length).toEqual(0);
	   });   
   });   
     
   describe('after activation', function() {   
	   var mockProductsResponse = [];
	   var mockProductResponse = null;
	   
	    beforeEach(function(){
	    	
	    	mockProductsResponse =  [
	    	                         {
	    	                             "isbn": "9787774567831",
	    	                             "title": "US History beg to 1877 - MS",
	    	                             "id": 1,
	    	                             "grades": [
	    	                               {
	    	                                 "id": 2,
	    	                                 "grade": "7",
	    	                                 "guiOrdering": 10
	    	                               },
	    	                               {
	    	                                 "id": 1,
	    	                                 "grade": "6",
	    	                                 "guiOrdering": 9
	    	                               },
	    	                               {
	    	                                 "id": 3,
	    	                                 "grade": "8",
	    	                                 "guiOrdering": 11
	    	                               }
	    	                             ],
	    	                             "components": [
	    	                               {
	    	                                 "id": 6,
	    	                                 "categorization": "Assessments",
	    	                                 "component": "Online Assessment",
	    	                                 "componentHierarchy": 7,
	    	                                 "componentType": "Assessment",
	    	                                 "product": {
	    	                                   "id": 1
	    	                                 },
	    	                                 "toolType": 55,
	    	                                 "productId": 1
	    	                               },
	    	                               {
	    	                                 "id": 12,
	    	                                 "categorization": "Assessments",
	    	                                 "component": "Additional Resources",
	    	                                 "componentHierarchy": 30,
	    	                                 "componentType": "Assessment",
	    	                                 "product": {
	    	                                   "id": 1
	    	                                 },
	    	                                 "toolType": 6,
	    	                                 "productId": 1
	    	                               },
	    	                               {
	    	                                 "id": 3,
	    	                                 "categorization": "Teaching Aids",
	    	                                 "component": "Additional Resources",
	    	                                 "componentHierarchy": 12,
	    	                                 "componentType": "Ancillary",
	    	                                 "product": {
	    	                                   "id": 1
	    	                                 },
	    	                                 "toolType": 6,
	    	                                 "productId": 1
	    	                               },
	    	                               {
	    	                                 "id": 5,
	    	                                 "categorization": "Teaching Aids",
	    	                                 "component": "Guided Reading Workbook",
	    	                                 "componentHierarchy": 4,
	    	                                 "componentType": "Ancillary",
	    	                                 "product": {
	    	                                   "id": 1
	    	                                 },
	    	                                 "toolType": 6,
	    	                                 "productId": 1
	    	                               },
	    	                               {
	    	                                 "id": 10,
	    	                                 "categorization": "Study Aids and Workbooks",
	    	                                 "component": "Additional Resources",
	    	                                 "componentHierarchy": 29,
	    	                                 "componentType": "Ancillary",
	    	                                 "product": {
	    	                                   "id": 1
	    	                                 },
	    	                                 "toolType": 6,
	    	                                 "productId": 1
	    	                               },
	    	                               {
	    	                                 "id": 1,
	    	                                 "categorization": "Core Components",
	    	                                 "component": "Teacher eBook",
	    	                                 "componentHierarchy": 1,
	    	                                 "componentType": "Key Teacher Resource",
	    	                                 "product": {
	    	                                   "id": 1
	    	                                 },
	    	                                 "toolType": 6,
	    	                                 "productId": 1
	    	                               },
	    	                               {
	    	                                 "id": 2,
	    	                                 "categorization": "Core Components",
	    	                                 "component": "Student eBook",
	    	                                 "componentHierarchy": 2,
	    	                                 "componentType": "Key Student Resource",
	    	                                 "product": {
	    	                                   "id": 1
	    	                                 },
	    	                                 "toolType": 6,
	    	                                 "productId": 1
	    	                               },
	    	                               {
	    	                                 "id": 11,
	    	                                 "categorization": "Interactive Content",
	    	                                 "component": "Multimedia Connections",
	    	                                 "componentHierarchy": 28,
	    	                                 "componentType": "Ancillary",
	    	                                 "product": {
	    	                                   "id": 1
	    	                                 },
	    	                                 "toolType": 6,
	    	                                 "productId": 1
	    	                               },
	    	                               {
	    	                                 "id": 4,
	    	                                 "categorization": "Assessments",
	    	                                 "component": "Online Assessment",
	    	                                 "componentHierarchy": 3,
	    	                                 "componentType": "Assessment",
	    	                                 "product": {
	    	                                   "id": 1
	    	                                 },
	    	                                 "toolType": 6,
	    	                                 "productId": 1
	    	                               },
	    	                               {
	    	                                 "id": 7,
	    	                                 "categorization": "Core Components",
	    	                                 "component": "Student Edition",
	    	                                 "componentHierarchy": 8,
	    	                                 "componentType": "Key Student Resource",
	    	                                 "product": {
	    	                                   "id": 1
	    	                                 },
	    	                                 "toolType": 6,
	    	                                 "productId": 1
	    	                               },
	    	                               {
	    	                                 "id": 9,
	    	                                 "categorization": "Interactive Content",
	    	                                 "component": "myWriteSmart",
	    	                                 "componentHierarchy": 10,
	    	                                 "componentType": "Ancillary",
	    	                                 "product": {
	    	                                   "id": 1
	    	                                 },
	    	                                 "toolType": 2,
	    	                                 "productId": 1
	    	                               },
	    	                               {
	    	                                 "id": 8,
	    	                                 "categorization": "Core Components",
	    	                                 "component": "Teacher Guide",
	    	                                 "componentHierarchy": 9,
	    	                                 "componentType": "Key Teacher Resource",
	    	                                 "product": {
	    	                                   "id": 1
	    	                                 },
	    	                                 "toolType": 6,
	    	                                 "productId": 1
	    	                               }
	    	                             ]
	    	                           }
	    	                         ];
	    	mockProgramresponse = {"id": 1};
	    	mockProductResponse = {
                    "isbn": "9787774567831",
                    "title": "US History beg to 1877 - MS",
                    "id": 1,
                    "grades": [
                      {
                        "id": 2,
                        "grade": "7",
                        "guiOrdering": 10
                      },
                      {
                        "id": 1,
                        "grade": "6",
                        "guiOrdering": 9
                      },
                      {
                        "id": 3,
                        "grade": "8",
                        "guiOrdering": 11
                      }
                    ],
                    "components": [
                      {
                        "id": 6,
                        "categorization": "Assessments",
                        "component": "Online Assessment",
                        "componentHierarchy": 7,
                        "componentType": "Assessment",
                        "product": {
                          "id": 1
                        },
                        "toolType": 55,
                        "productId": 1
                      },
                      {
                        "id": 12,
                        "categorization": "Assessments",
                        "component": "Additional Resources",
                        "componentHierarchy": 30,
                        "componentType": "Assessment",
                        "product": {
                          "id": 1
                        },
                        "toolType": 6,
                        "productId": 1
                      },
                      {
                        "id": 3,
                        "categorization": "Teaching Aids",
                        "component": "Additional Resources",
                        "componentHierarchy": 12,
                        "componentType": "Ancillary",
                        "product": {
                          "id": 1
                        },
                        "toolType": 6,
                        "productId": 1
                      },
                      {
                        "id": 5,
                        "categorization": "Teaching Aids",
                        "component": "Guided Reading Workbook",
                        "componentHierarchy": 4,
                        "componentType": "Ancillary",
                        "product": {
                          "id": 1
                        },
                        "toolType": 6,
                        "productId": 1
                      },
                      {
                        "id": 10,
                        "categorization": "Study Aids and Workbooks",
                        "component": "Additional Resources",
                        "componentHierarchy": 29,
                        "componentType": "Ancillary",
                        "product": {
                          "id": 1
                        },
                        "toolType": 6,
                        "productId": 1
                      },
                      {
                        "id": 1,
                        "categorization": "Core Components",
                        "component": "Teacher eBook",
                        "componentHierarchy": 1,
                        "componentType": "Key Teacher Resource",
                        "product": {
                          "id": 1
                        },
                        "toolType": 6,
                        "productId": 1
                      },
                      {
                        "id": 2,
                        "categorization": "Core Components",
                        "component": "Student eBook",
                        "componentHierarchy": 2,
                        "componentType": "Key Student Resource",
                        "product": {
                          "id": 1
                        },
                        "toolType": 6,
                        "productId": 1
                      },
                      {
                        "id": 11,
                        "categorization": "Interactive Content",
                        "component": "Multimedia Connections",
                        "componentHierarchy": 28,
                        "componentType": "Ancillary",
                        "product": {
                          "id": 1
                        },
                        "toolType": 6,
                        "productId": 1
                      },
                      {
                        "id": 4,
                        "categorization": "Assessments",
                        "component": "Online Assessment",
                        "componentHierarchy": 3,
                        "componentType": "Assessment",
                        "product": {
                          "id": 1
                        },
                        "toolType": 6,
                        "productId": 1
                      },
                      {
                        "id": 7,
                        "categorization": "Core Components",
                        "component": "Student Edition",
                        "componentHierarchy": 8,
                        "componentType": "Key Student Resource",
                        "product": {
                          "id": 1
                        },
                        "toolType": 6,
                        "productId": 1
                      },
                      {
                        "id": 9,
                        "categorization": "Interactive Content",
                        "component": "myWriteSmart",
                        "componentHierarchy": 10,
                        "componentType": "Ancillary",
                        "product": {
                          "id": 1
                        },
                        "toolType": 2,
                        "productId": 1
                      },
                      {
                        "id": 8,
                        "categorization": "Core Components",
                        "component": "Teacher Guide",
                        "componentHierarchy": 9,
                        "componentType": "Key Teacher Resource",
                        "product": {
                          "id": 1
                        },
                        "toolType": 6,
                        "productId": 1
                      }
                    ]
                  };
	    	
			httpBackend.when('GET', 'api/products?max=-1').respond(mockProductsResponse);  // This is also valid httpBackend.whenGET('api/products?max=-1').respond(productsList); or  //httpBackend.whenGET(/products/).respond(productsList);
			httpBackend.when('GET', 'api/products/1?max=-1').respond(mockProductResponse);
			httpBackend.when('PUT', 'api/products/1?max=-1').respond(mockProductResponse); 
			httpBackend.when('POST', 'api/products?max=-1').respond(mockProductResponse); 
			httpBackend.when('DELETE', 'api/products/1?max=-1').respond(mockProductResponse); 

	    });
	    
	   it('should respond success to a GET', function(){  
	       httpBackend.expect('GET', 'api/products?max=-1').respond(200, 'success');
	   });  	   
		   
	    it('should have a function to refresh the products list', function(){
	        expect(scope.vm.list).toBeDefined();
	    });
	    
	    it('should have mocked mockProductsResponse', function(){
	    	expect(mockProductsResponse.length).toBeGreaterThan(0);
	    });
	   
	   it('should not have empty product array', function(){  
	       
	   	   scope.vm.list();
	   	   httpBackend.flush();
	       expect(scope.vm.products.length).toBeGreaterThan(0);
	   });    

	   xit('should have products list that matches mock', function(){  
		   
		   scope.vm.list();
		   httpBackend.flush();
		   expect(scope.vm.products).toEqual(mockProductsResponse);
 
	   }).pend('Because the types returned are not the same.  To do with promises.  Need to understand this better.'); 
	   
	   it('should have products list with products that matches mock', function(){  
		   
		   scope.vm.list();
		   httpBackend.flush();
		   expect(scope.vm.products[0].isbn).toEqual("9787774567831");
		   expect(scope.vm.products[0].title).toEqual("US History beg to 1877 - MS");
		   
	   }); 
	   
	   xit('should add a product to the list', function(){  	   
		   scope.vm.addProduct(mockProgramResponse);
		   httpBackend.flush();
		   httpBackend.expect('POST', 'api/products?max=-1').respond(mockProductResponse); 
	   });
	   
	   it('should update a product isbn', function(){  
		   
		   scope.vm.updateIsbn(mockProductResponse, '9787774567831');
		   httpBackend.flush();
		   httpBackend.expect('PUT', 'api/products/1?max=-1').respond(mockProductResponse);
	   }); 
	   
	   it('should update a product title', function(){  
		   
		   scope.vm.updateTitle(mockProductResponse, 'US History beg to 1877 - MS');
		   httpBackend.flush();
		   httpBackend.expect('PUT', 'api/products/1?max=-1').respond(mockProductResponse);
	   }); 
	   
	   it('should delete a product from the list', function(){  
		   
		   scope.vm.delete(mockProductResponse);
		   httpBackend.flush();  
		   httpBackend.expect('DELETE', 'api/products/1?max=-1').respond(mockProductResponse); 
		   
	   }); 
   });  
   
});
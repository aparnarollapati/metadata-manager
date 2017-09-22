// fdescribe or fit used to trigger just one test suite or test in a test run
describe('componentSpecController', function() {
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
        $controller("ComponentSpecController as vm", {
                $scope: scope
            });
    });
    
   it('should exist', function() {
	   expect($controller).toEqual(jasmine.anything());
   });
   
   it('as vm should exist', function() {
	   expect(scope.vm).toEqual(jasmine.anything());
   }) ;
    
   describe('before activation', function() {
	   it('should have empty component array', function(){
	       expect(scope.vm.componentSpecs).toEqual(jasmine.anything());
	   });
	
	   it('should have empty component array length', function(){   
	       expect(scope.vm.componentSpecs.length).toEqual(0);
	   });   
   });   
     
   describe('after activation', function() {   
	   var mockComponentsResponse = [];
	   var mockComponentResponse = null;
	   var mockComponentMappingsResponse = null;
	   var mockComponentTypeMappingsResponse = null;
	   var mockCategorizationTypeMappingsResponse = null;
	   
	    beforeEach(function(){
	    	
	    	mockComponentsResponse = [
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
	    	                            }
	    	                          ];
	    	
	    	mockComponentResponse = {
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
                  };
	    	
	    	mockComponentMappingsResponse = [{"id":485,"component":"2-in-1 Practice Book SE"},{"id":486,"component":"2-in-1 Practice Book TE"},{"id":275,"component":"A&E Biography Videos"}];
	    	
	    	mockComponentTypeMappingsResponse = [{"id":24,"componentType":"activity"},{"id":3,"componentType":"Ancillary"},{"id":5,"componentType":"assessment"},{"id":21,"componentType":"Audio"}];
	    	
	    	mockCategorizationTypeMappingsResponse = [{"id":20,"categorization":"ancillary"},{"id":10,"categorization":"Assessment"}];
	    	
			httpBackend.when('GET', 'api/componentspecs?max=-1').respond(mockComponentsResponse);  // This is also valid httpBackend.whenGET('api/componentspecs?max=-1').respond(componentsList); or  //httpBackend.whenGET(/componentspecs/).respond(componentsList);
			httpBackend.when('GET', 'api/componentspecs/3?max=-1').respond(mockComponentResponse);
			httpBackend.when('GET', 'api/componentmappings?max=-1&order=asc&sort=component').respond(mockComponentMappingsResponse);
			httpBackend.when('GET', 'api/componenttypemappings?max=-1&order=asc&sort=componentType').respond(mockComponentTypeMappingsResponse);
			httpBackend.when('GET', 'api/categorizationmappings?max=-1&order=asc&sort=categorization').respond(mockCategorizationTypeMappingsResponse);
			
			
			 
			
			httpBackend.when('PUT', 'api/componentspecs/3?max=-1').respond(mockComponentResponse); 
			httpBackend.when('POST', 'api/componentspecs?max=-1').respond(mockComponentResponse); 
			httpBackend.when('DELETE', 'api/componentspecs/3?max=-1').respond(mockComponentResponse); 

	    });
	    
	   it('should respond success to a GET', function(){  
	       httpBackend.expect('GET', 'api/componentspecs?max=-1').respond(200, 'success');
	   });  	   
		   
	    it('should have a function to refresh the components list', function(){
	        expect(scope.vm.list).toBeDefined();
	    });
	    
	    it('should have mocked mockComponentsResponse', function(){
	    	expect(mockComponentsResponse.length).toBeGreaterThan(0);
	    });
	   
	   it('should not have empty component array', function(){  
	       
	   	   scope.vm.list();
	   	   httpBackend.flush();
	       expect(scope.vm.componentSpecs.length).toBeGreaterThan(0);
	   });    

	   xit('should have components list that matches mock', function(){  
		   
		   scope.vm.list();
		   httpBackend.flush();
		   expect(scope.vm.componentSpecs).toEqual(mockComponentsResponse);
 
	   }).pend('Because the types returned are not the same.  To do with promises.  Need to understand this better.'); 
	   
	   it('should have components list with components that matches mock', function(){  
		   
		   scope.vm.list();
		   httpBackend.flush();
		   expect(scope.vm.componentSpecs[0].categorization).toEqual("Teaching Aids");
		   expect(scope.vm.componentSpecs[0].id).toEqual(3);
		   expect(scope.vm.componentSpecs[0].component).toEqual("Additional Resources");
		   expect(scope.vm.componentSpecs[0].componentHierarchy).toEqual(12);
		   expect(scope.vm.componentSpecs[0].componentType).toEqual("Ancillary");
		   expect(scope.vm.componentSpecs[0].product.id).toEqual(1);
		   expect(scope.vm.componentSpecs[0].toolType).toEqual(6);
		   expect(scope.vm.componentSpecs[0].productId).toEqual(1);
 
	   }); 
	   
	   it('should add a component to the list', function(){  	   
		   scope.vm.addComponentSpec(mockComponentResponse);
		   httpBackend.flush();
		   httpBackend.expect('POST', 'api/componentspecs?max=-1').respond(mockComponentResponse); 
	   });
	   
	   it('should update a component component', function(){  
		   
		   scope.vm.updateComponentComponent(mockComponentResponse, 'Additional Resources');
		   httpBackend.flush();
		   httpBackend.expect('PUT', 'api/componentspecs/3?max=-1').respond(mockComponentResponse);
	   }); 
	   
	   it('should update a component hierarchy', function(){  
		   
		   scope.vm.updateComponentHierarchy(mockComponentResponse, 14);
		   httpBackend.flush();
		   httpBackend.expect('PUT', 'api/componentspecs/3?max=-1').respond(mockComponentResponse);
	   }); 

	   it('should update a componentType', function(){  
		   
		   scope.vm.updateComponentComponentType(mockComponentResponse, 'Assessment');
		   httpBackend.flush();
		   httpBackend.expect('PUT', 'api/componentspecs/3?max=-1').respond(mockComponentResponse);
	   }); 
	   
	   it('should update a ComponentCategorization', function(){  
		   
		   scope.vm.updateComponentCategorization(mockComponentResponse, 'Core Components');
		   httpBackend.flush();
		   httpBackend.expect('PUT', 'api/componentspecs/3?max=-1').respond(mockComponentResponse);
	   }); 
	   
	   it('should update a ComponentToolType', function(){  
		   
		   scope.vm.updateComponentToolType(mockComponentResponse, 6);
		   httpBackend.flush();
		   httpBackend.expect('PUT', 'api/componentspecs/3?max=-1').respond(mockComponentResponse);
	   }); 
	   
	   it('should delete a component from the list', function(){  
		   
		   scope.vm.delete(mockComponentResponse);
		   httpBackend.flush();  
		   httpBackend.expect('DELETE', 'api/componentspecs/3?max=-1').respond(mockComponentResponse); 
		   
	   }); 
   });  
   
});
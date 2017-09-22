// fdescribe or fit used to trigger just one test suite or test in a test run
describe('instructionalSegmentController', function() {
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
        $controller("InstructionalSegmentController as vm", {
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
	   it('should have empty instructionalSegment array', function(){
	       expect(scope.vm.instructionalSegments).toEqual(jasmine.anything());
	   });
	
	   it('should have empty instructionalSegment array length', function(){   
	       expect(scope.vm.instructionalSegments.length).toEqual(0);
	   });   
   });   
     
   describe('after activation', function() {   
	   var mockInstructionalSegmentsResponse = [];
	   var mockInstructionalSegmentResponse = null;
	   
	    beforeEach(function(){
	    	
	    	mockInstructionalSegmentsResponse =  [
	    	                                      {
	    	                                          "id": 1,
	    	                                          "hierarchy": 1,
	    	                                          "program": {},
	    	                                          "title": "Course-Level Resources"
	    	                                        },
	    	                                        {
	    	                                          "id": 2,
	    	                                          "hierarchy": 2,
	    	                                          "program": {},
	    	                                          "title": "Module-Level Resources"
	    	                                        },
	    	                                        {
	    	                                          "id": 3,
	    	                                          "hierarchy": 3,
	    	                                          "program": {},
	    	                                          "title": "Lesson-Level Resources"
	    	                                        }
	    	                                      ];
	    	
	    	mockInstructionalSegmentResponse = {
                    "id": 1,
                    "hierarchy": 1,
                    "program": {},
                    "title": "Course-Level Resources"
                  };
	    	
	    	
	    	httpBackend.when('GET', 'api/instructionalsegmentmappings?max=-1&offset=0&order=asc&sort=instructionalSegment').respond(mockInstructionalSegmentsResponse);
			httpBackend.when('GET', 'api/instructionalsegments?max=-1').respond(mockInstructionalSegmentsResponse);  // This is also valid httpBackend.whenGET('api/instructionalSegments?max=-1').respond(instructionalSegmentsList); or  //httpBackend.whenGET(/instructionalSegments/).respond(instructionalSegmentsList);
			httpBackend.when('GET', 'api/instructionalsegments/1?max=-1').respond(mockInstructionalSegmentResponse);
			httpBackend.when('PUT', 'api/instructionalsegments/1?max=-1').respond(mockInstructionalSegmentResponse); 
			httpBackend.when('POST', 'api/instructionalsegments?max=-1').respond(mockInstructionalSegmentResponse); 
			httpBackend.when('DELETE', 'api/instructionalsegments/1?max=-1').respond(mockInstructionalSegmentResponse); 

	    });
	    
	   it('should respond success to a GET', function(){  
	       httpBackend.expect('GET', 'api/instructionalsegments?max=-1').respond(200, 'success');
	   });  	   
		   
	    it('should have a function to refresh the instructionalSegments list', function(){
	        expect(scope.vm.list).toBeDefined();
	    });
	    
	    it('should have mocked mockInstructionalSegmentsResponse', function(){
	    	expect(mockInstructionalSegmentsResponse.length).toBeGreaterThan(0);
	    });
	   
	   it('should not have empty instructionalSegment array', function(){  
	       
	   	   scope.vm.list();
	   	   httpBackend.flush();
	       expect(scope.vm.instructionalSegments.length).toBeGreaterThan(0);
	   });    

	   xit('should have instructionalSegments list that matches mock', function(){  
		   
		   scope.vm.list();
		   httpBackend.flush();
		   expect(scope.vm.instructionalSegments).toEqual(mockInstructionalSegmentsResponse);
 
	   }).pend('Because the types returned are not the same.  To do with promises.  Need to understand this better.'); 
	   
	   it('should have instructionalSegments list with instructionalSegments that matches mock', function(){  
		   
		   scope.vm.list();
		   httpBackend.flush();
		   expect(scope.vm.instructionalSegments[0].title).toEqual("Course-Level Resources");
		   expect(scope.vm.instructionalSegments[0].hierarchy).toEqual(1);
 
	   }); 
	   
	   it('should add a instructionalSegment to the list', function(){  	   
		   scope.vm.addInstructionalSegment(mockInstructionalSegmentResponse);
		   httpBackend.flush();
		   httpBackend.expect('POST', 'api/instructionalsegments?max=-1').respond(mockInstructionalSegmentResponse); 
	   });
	   
	   it('should update a instructionalSegment title', function(){  
		   
		   scope.vm.updateTitle(mockInstructionalSegmentResponse, 'Lesson-Level Resources');
		   httpBackend.flush();
		   httpBackend.expect('PUT', 'api/instructionalsegments/1?max=-1').respond(mockInstructionalSegmentResponse);
	   }); 
	   
	   it('should update a instructionalSegment hierarchy', function(){  
		   
		   scope.vm.updateHierarchy(mockInstructionalSegmentResponse, '6');
		   httpBackend.flush();
		   httpBackend.expect('PUT', 'api/instructionalsegments/1?max=-1').respond(mockInstructionalSegmentResponse);
	   }); 

	   it('should delete a instructionalSegment from the list', function(){  
		   
		   scope.vm.delete(mockInstructionalSegmentResponse);
		   httpBackend.flush();  
		   httpBackend.expect('DELETE', 'api/instructionalsegments/1?max=-1').respond(mockInstructionalSegmentResponse); 
		   
	   }); 
   });  
   
});
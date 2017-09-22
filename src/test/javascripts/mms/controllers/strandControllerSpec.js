// fdescribe or fit used to trigger just one test suite or test in a test run
describe('strandController', function() {
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
        $controller("StrandController as vm", {
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
	   it('should have empty strand array', function(){
	       expect(scope.vm.strands).toEqual(jasmine.anything());
	   });
	
	   it('should have empty strand array length', function(){   
	       expect(scope.vm.strands.length).toEqual(0);
	   });   
   });   
     
   describe('after activation', function() {   
	   var mockStrandsResponse = [];
	   var mockStrandResponse = null;
	   
	    beforeEach(function(){
	    	
	    	mockStrandsResponse = [
									{
									    "id": 3,
									    "hierarchy": 4,
									    "program": {},
									    "title": "Reading Support"
									  },
	    	                          {
	    	                              "id": 4,
	    	                              "hierarchy": 5,
	    	                              "program": {},
	    	                              "title": "Assessment"
	    	                            },
	    	                            {
	    	                              "id": 5,
	    	                              "hierarchy": 6,
	    	                              "program": {},
	    	                              "title": "Teacher Resources"
	    	                            },
	    	                            {
	    	                              "id": 6,
	    	                              "hierarchy": 7,
	    	                              "program": {},
	    	                              "title": "References"
	    	                            },
	    	                            {
	    	                              "id": 7,
	    	                              "hierarchy": 9,
	    	                              "program": {},
	    	                              "title": "Additional Resources"
	    	                            },
	    	                            {
	    	                              "id": 1,
	    	                              "hierarchy": 1,
	    	                              "program": {},
	    	                              "title": "Core Instruction"
	    	                            },
	    	                            {
	    	                              "id": 2,
	    	                              "hierarchy": 2,
	    	                              "program": {},
	    	                              "title": "Writing Activities"
	    	                            },
	    	                            
	    	                          ];
	    	
	    	mockStrandResponse = {
                    "id": 3,
                    "hierarchy": 4,
                    "program": {},
                    "title": "Reading Support"
                  };
	    	
	    	httpBackend.when('GET', 'api/strandmappings?max=-1&order=asc&sort=strand').respond(mockStrandsResponse); 
			httpBackend.when('GET', 'api/strands?max=-1').respond(mockStrandsResponse);  // This is also valid httpBackend.whenGET('api/strands?max=-1').respond(strandsList); or  //httpBackend.whenGET(/strands/).respond(strandsList);
			httpBackend.when('GET', 'api/strands/3?max=-1').respond(mockStrandResponse);
			httpBackend.when('PUT', 'api/strands/3?max=-1').respond(mockStrandResponse); 
			httpBackend.when('POST', 'api/strands?max=-1').respond(mockStrandResponse); 
			httpBackend.when('DELETE', 'api/strands/3?max=-1').respond(mockStrandResponse); 

	    });
	    
	   it('should respond success to a GET', function(){  
	       httpBackend.expect('GET', 'api/strands?max=-1').respond(200, 'success');
	   });  	   
		   
	    it('should have a function to refresh the strands list', function(){
	        expect(scope.vm.list).toBeDefined();
	    });
	    
	    it('should have mocked mockStrandsResponse', function(){
	    	expect(mockStrandsResponse.length).toBeGreaterThan(0);
	    });
	   
	   it('should not have empty strand array', function(){  
	       
	   	   scope.vm.list();
	   	   httpBackend.flush();
	       expect(scope.vm.strands.length).toBeGreaterThan(0);
	   });    

	   xit('should have strands list that matches mock', function(){  
		   
		   scope.vm.list();
		   httpBackend.flush();
		   expect(scope.vm.strands).toEqual(mockStrandsResponse);
 
	   }).pend('Because the types returned are not the same.  To do with promises.  Need to understand this better.'); 
	   
	   it('should have strands list with strands that matches mock', function(){  
		   
		   scope.vm.list();
		   httpBackend.flush();
		   expect(scope.vm.strands[0].title).toEqual("Reading Support");
		   expect(scope.vm.strands[0].id).toEqual(3);
		   expect(scope.vm.strands[0].hierarchy).toEqual(4);
 
	   }); 
	   
	   it('should add a strand to the list', function(){  	   
		   scope.vm.addStrand(mockStrandResponse);
		   httpBackend.flush();
		   httpBackend.expect('POST', 'api/strands?max=-1').respond(mockStrandResponse); 
	   });
	   
	   it('should update a strand title', function(){  
		   
		   scope.vm.updateTitle(mockStrandResponse, '7');
		   httpBackend.flush();
		   httpBackend.expect('PUT', 'api/strands/3?max=-1').respond(mockStrandResponse);
	   }); 
	   
	   it('should delete a strand from the list', function(){  
		   
		   scope.vm.delete(mockStrandResponse);
		   httpBackend.flush();  
		   httpBackend.expect('DELETE', 'api/strands/3?max=-1').respond(mockStrandResponse); 
		   
	   }); 
   });  
   
});
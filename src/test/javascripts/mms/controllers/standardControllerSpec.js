// fdescribe or fit used to trigger just one test suite or test in a test run
describe('standardController', function() {
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
        $controller("StandardController as vm", {
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
	   it('should have empty standard array', function(){
	       expect(scope.vm.standards).toEqual(jasmine.anything());
	   });
	
	   it('should have empty standard array length', function(){   
	       expect(scope.vm.standards.length).toEqual(0);
	   });   
   });   
     
   describe('after activation', function() {   
	   var mockStandardsResponse = [];
	   var mockStandardResponse = null;
	   
	    beforeEach(function(){
	    	
	    	mockStandardsResponse =  [
	    	                          {
	    	                              "id": 27,
	    	                              "standard": "LAFS.68.WHST.3.9"
	    	                            },
	    	                            {
	    	                              "id": 28,
	    	                              "standard": "LAFS.68.WHST.4.10"
	    	                            },
	    	                            {
	    	                              "id": 20,
	    	                              "standard": "SS.8.A.1.2"
	    	                            },
	    	                            {
	    	                              "id": 24,
	    	                              "standard": "LAFS.68.RH.2.5"
	    	                            },
	    	                            {
	    	                              "id": 26,
	    	                              "standard": "LAFS.68.WHST.2.4"
	    	                            },
	    	                            {
	    	                              "id": 23,
	    	                              "standard": "LAFS.8.SL.1.2"
	    	                            },
	    	                            {
	    	                              "id": 29,
	    	                              "standard": "MAFS.K12.MP.1.1"
	    	                            },
	    	                            {
	    	                              "id": 25,
	    	                              "standard": "LAFS.68.RH.3.7"
	    	                            },
	    	                            {
	    	                              "id": 30,
	    	                              "standard": "MAFS.K12.MP.5.1"
	    	                            },
	    	                            {
	    	                              "id": 21,
	    	                              "standard": "ELD.K12.ELL.SS.1"
	    	                            },
	    	                            {
	    	                              "id": 22,
	    	                              "standard": "ELD.K12.ELL.SI.1"
	    	                            }
	    	                          ];
	    	
	    	mockStandardResponse = {
                    "id": 27,
                    "standard": "LAFS.68.WHST.3.9"
                  };
	    	
			httpBackend.when('GET', 'api/standards?max=-1').respond(mockStandardsResponse);  // This is also valid httpBackend.whenGET('api/standards?max=-1').respond(standardsList); or  //httpBackend.whenGET(/standards/).respond(standardsList);
			httpBackend.when('GET', 'api/standards/27?max=-1').respond(mockStandardResponse);
			httpBackend.when('PUT', 'api/standards/27?max=-1').respond(mockStandardResponse); 
			httpBackend.when('POST', 'api/standards?max=-1').respond(mockStandardResponse); 
			httpBackend.when('DELETE', 'api/standards/27?max=-1').respond(mockStandardResponse); 

	    });
	    
	   it('should respond success to a GET', function(){  
	       httpBackend.expect('GET', 'api/standards?max=-1').respond(200, 'success');
	   });  	   
		   
	    it('should have a function to refresh the standards list', function(){
	        expect(scope.vm.list).toBeDefined();
	    });
	    
	    it('should have mocked mockStandardsResponse', function(){
	    	expect(mockStandardsResponse.length).toBeGreaterThan(0);
	    });
	   
	   it('should not have empty standard array', function(){  
	       
	   	   scope.vm.list();
	   	   httpBackend.flush();
	       expect(scope.vm.standards.length).toBeGreaterThan(0);
	   });    

	   it('should have standards list with standards that matches mock', function(){  
		   
		   scope.vm.list();
		   httpBackend.flush();
		   expect(scope.vm.standards[0].standard).toEqual("LAFS.68.WHST.3.9");
		   expect(scope.vm.standards[0].id).toEqual(27);
 
	   }); 
	   
	   it('should add a standard to the list', function(){  	   
		   scope.vm.addStandard(mockStandardResponse);
		   httpBackend.flush();
		   httpBackend.expect('POST', 'api/standards?max=-1').respond(mockStandardResponse); 
	   });
	   
	   it('should update a standard', function(){  
		   
		   scope.vm.updateStandard(mockStandardResponse, 'ELD.K12.ELL.SI.1');
		   httpBackend.flush();
		   httpBackend.expect('PUT', 'api/standards/27?max=-1').respond(mockStandardResponse);
	   }); 
	   
	   it('should delete a standard from the list', function(){  
		   
		   scope.vm.delete(mockStandardResponse);
		   httpBackend.flush();  
		   httpBackend.expect('DELETE', 'api/standards/27?max=-1').respond(mockStandardResponse); 
		   
	   }); 
   });  
   
});
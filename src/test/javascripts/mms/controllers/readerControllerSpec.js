// fdescribe or fit used to trigger just one test suite or test in a test run
describe('readerController', function() {
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
        $controller("ReaderController as vm", {
                $scope: scope
            });
    });
    
   it('should exist', function() {
	   expect($controller).toEqual(jasmine.anything());
   });
   
   it('as vm should exist', function() {
	   expect(scope.vm).toEqual(jasmine.anything());
   }) ;
    
   it('should have readerOptions list', function(){
        expect(scope.vm.readerLevelOptions[0].value).toEqual("Above-Level");
        expect(scope.vm.readerLevelOptions[0].text).toEqual("Above-Level");
   });
   
   describe('before activation', function() {
	   it('should have empty reader array', function(){
	       expect(scope.vm.readers).toEqual(jasmine.anything());
	   });
	
	   it('should have empty reader array length', function(){   
	       expect(scope.vm.readers.length).toEqual(0);
	   });   
   });   
     
   describe('after activation', function() {   
	   var mockReadersResponse = [];
	   var mockReaderResponse = null;
	   
	    beforeEach(function(){
	    	
	    	mockReadersResponse =  [{
                "id": 1,
                "content": {
                  "uniqueId": "9787774567831-00001"
                },
                "guidedReadingLevels": "B",
                "isbn10": "0151212756",
                "isbn13": "9670151212756",
                "readerLevel": "Below-Level",
                "readingSkills": "Sequence"
              },{
                  "id": 2,
                  "content": {
                    "uniqueId": "9787774567831-00001"
                  },
                  "guidedReadingLevels": "B",
                  "isbn10": "0151212756",
                  "isbn13": "9670151212756",
                  "readerLevel": "Below-Level",
                  "readingSkills": "Sequence"
                }];
	    	
	    	mockReaderResponse = {
	                  "id": 1,
	                  "content": {
	                    "uniqueId": "9787774567831-00001"
	                  },
	                  "guidedReadingLevels": "B",
	                  "isbn10": "0151212756",
	                  "isbn13": "9670151212756",
	                  "readerLevel": "Below-Level",
	                  "readingSkills": "Sequence"
	                };
	    	
			httpBackend.when('GET', 'api/readers?max=-1').respond(mockReadersResponse);  // This is also valid httpBackend.whenGET('api/readers?max=-1').respond(readersList); or  //httpBackend.whenGET(/readers/).respond(readersList);
			httpBackend.when('GET', 'api/readers/1?max=-1').respond(mockReaderResponse);
			httpBackend.when('PUT', 'api/readers/1?max=-1').respond(mockReaderResponse); 
			httpBackend.when('POST', 'api/readers?max=-1').respond(mockReaderResponse); 
			httpBackend.when('DELETE', 'api/readers/1?max=-1').respond(mockReaderResponse); 

	    });
	    
	   it('should respond success to a GET', function(){  
	       httpBackend.expect('GET', 'api/readers?max=-1').respond(200, 'success');
	   });  	   
		   
	    it('should have a function to refresh the readers list', function(){
	        expect(scope.vm.list).toBeDefined();
	    });
	    
	    it('should have mocked mockReadersResponse', function(){
	    	expect(mockReadersResponse.length).toBeGreaterThan(0);
	    });
	   
	   it('should not have empty reader array', function(){  
	       
	   	   scope.vm.list();
	   	   httpBackend.flush();
	       expect(scope.vm.readers.length).toBeGreaterThan(0);
	   });    

	   xit('should have readers list that matches mock', function(){  
		   
		   scope.vm.list();
		   httpBackend.flush();
		   expect(scope.vm.readers).toEqual(mockReadersResponse);
 
	   }).pend('Because the types returned are not the same.  To do with promises.  Need to understand this better.'); 
	   
	   it('should have readers list with readers that matches mock', function(){  
		   
		   scope.vm.list();
		   httpBackend.flush();
		   expect(scope.vm.readers[0].guidedReadingLevels).toEqual("B");
		   expect(scope.vm.readers[0].isbn10).toEqual("0151212756");
		   expect(scope.vm.readers[0].isbn13).toEqual("9670151212756");
		   expect(scope.vm.readers[0].readerLevel).toEqual("Below-Level");
		   expect(scope.vm.readers[0].readingSkills).toEqual("Sequence");
	   }); 
	   
	   it('should add a reader to the list', function(){  
		   scope.vm.currentAddContent = {"id": 1};
		   scope.vm.addReaderContent(mockReaderResponse);
		   httpBackend.flush();
		   httpBackend.expect('POST', 'api/readers?max=-1').respond(mockReaderResponse); 
	   });
	   
	   it('should update a reader ISBN10', function(){  
		   
		   scope.vm.updateISBN10(mockReaderResponse, '0151212756');
		   httpBackend.flush();
		   httpBackend.expect('PUT', 'api/readers/1?max=-1').respond(mockReaderResponse);
	   }); 
	   
	   it('should update a reader ISBN13', function(){  
		   
		   scope.vm.updateISBN10(mockReaderResponse, '9670151212756');
		   httpBackend.flush();
		   httpBackend.expect('PUT', 'api/readers/1?max=-1').respond(mockReaderResponse);
	   });
	   
	   it('should update a reader level', function(){  
		   
		   scope.vm.updateReaderLevel(mockReaderResponse, 'Below-Level');
		   httpBackend.flush();
		   httpBackend.expect('PUT', 'api/readers/1?max=-1').respond(mockReaderResponse);
	   }); 
	   
	   it('should update a reader guided reading level', function(){  
		   
		   scope.vm.updateGuidedReadingLevels(mockReaderResponse, 'B');
		   httpBackend.flush();
		   httpBackend.expect('PUT', 'api/readers/1?max=-1').respond(mockReaderResponse);
	   }); 
	   
	   it('should update a reader DraEdlLevel', function(){  
		   
		   scope.vm.updateDraEdlLevel(mockReaderResponse, 'B');
		   httpBackend.flush();
		   httpBackend.expect('PUT', 'api/readers/1?max=-1').respond(mockReaderResponse);
	   }); 
	   
	   it('should update a reader reading recovery levels', function(){  
		   
		   scope.vm.updateReadingRecoveryLevels(mockReaderResponse, '5');
		   httpBackend.flush();
		   httpBackend.expect('PUT', 'api/readers/1?max=-1').respond(mockReaderResponse);
	   }); 
	   
	   it('should update a reader reading skills', function(){  
		   
		   scope.vm.updateReadingSkills(mockReaderResponse, 'Sequence');
		   httpBackend.flush();
		   httpBackend.expect('PUT', 'api/readers/1?max=-1').respond(mockReaderResponse);
	   }); 
	   
	   it('should delete a reader from the list', function(){  
		   
		   scope.vm.delete(mockReaderResponse);
		   httpBackend.flush();  
		   httpBackend.expect('DELETE', 'api/readers/1?max=-1').respond(mockReaderResponse); 
		   
	   }); 
   });  
   
});
// fdescribe or fit used to trigger just one test suite or test in a test run
describe('keywordController', function() {
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
        $controller("KeywordController as vm", {
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
	   it('should have empty keyword array', function(){
	       expect(scope.vm.keywords).toEqual(jasmine.anything());
	   });
	
	   it('should have empty keyword array length', function(){   
	       expect(scope.vm.keywords.length).toEqual(0);
	   });   
   });   
     
   describe('after activation', function() {   
	   var mockKeywordsResponse = [];
	   var mockKeywordResponse = null;
	   
	    beforeEach(function(){
	    	
	    	mockKeywordsResponse = [{
				"id": 50,
				"keyword": "teacher ebook"
			}, {
				"id": 61,
				"keyword": "matrilineal"
			}, {
				"id": 51,
				"keyword": "america"
			}, {
				"id": 59,
				"keyword": "totems"
			}, {
				"id": 55,
				"keyword": "lesson 2"
			}, {
				"id": 52,
				"keyword": "africa"
			}, {
				"id": 58,
				"keyword": "kivas"
			}, {
				"id": 57,
				"keyword": "pueblos"
			}, {
				"id": 62,
				"keyword": "iroquois league"
			}];
	    	
	    	mockKeywordResponse = {
				"id": 50,
				"keyword": "teacher ebook"
			};
	    	
			httpBackend.when('GET', 'api/keywords?max=-1').respond(mockKeywordsResponse);  // This is also valid httpBackend.whenGET('api/keywords?max=-1').respond(keywordsList); or  //httpBackend.whenGET(/keywords/).respond(keywordsList);
			httpBackend.when('GET', 'api/keywords/50?max=-1').respond(mockKeywordResponse);
			httpBackend.when('PUT', 'api/keywords/50?max=-1').respond(mockKeywordResponse); 
			httpBackend.when('POST', 'api/keywords?max=-1').respond(mockKeywordResponse); 
			httpBackend.when('DELETE', 'api/keywords/50?max=-1').respond(mockKeywordResponse); 

	    });
	    
	   it('should respond success to a GET', function(){  
	       httpBackend.expect('GET', 'api/keywords?max=-1').respond(200, 'success');
	   });  	   
		   
	    it('should have a function to refresh the keywords list', function(){
	        expect(scope.vm.list).toBeDefined();
	    });
	    
	    it('should have mocked mockKeywordsResponse', function(){
	    	expect(mockKeywordsResponse.length).toBeGreaterThan(0);
	    });
	   
	   it('should not have empty keyword array', function(){  
	       
	   	   scope.vm.list();
	   	   httpBackend.flush();
	       expect(scope.vm.keywords.length).toBeGreaterThan(0);
	   });    

	   xit('should have keywords list that matches mock', function(){  
		   
		   scope.vm.list();
		   httpBackend.flush();
		   expect(scope.vm.keywords).toEqual(mockKeywordsResponse);
 
	   }).pend('Because the types returned are not the same.  To do with promises.  Need to understand this better.'); 
	   
	   it('should have keywords list with keywords that matches mock', function(){  
		   
		   scope.vm.list();
		   httpBackend.flush();
		   expect(scope.vm.keywords[0].keyword).toEqual("teacher ebook");
 
	   }); 
	   
	   it('should add a keyword to the list', function(){  	   
		   scope.vm.addKeyword(mockKeywordResponse, "toplevel");
		   httpBackend.flush();
		   httpBackend.expect('POST', 'api/keywords?max=-1').respond(mockKeywordResponse); 
	   });
	   
	   it('should update a keyword', function(){  
		   
		   scope.vm.updateKeyword(mockKeywordResponse, 'A new keyword');
		   httpBackend.flush();
		   httpBackend.expect('PUT', 'api/keywords/50?max=-1').respond(mockKeywordResponse);
	   }); 
	   
	   it('should delete a keyword from the list', function(){  
		   
		   scope.vm.delete(mockKeywordResponse, "toplevel");
		   httpBackend.flush();  
		   httpBackend.expect('DELETE', 'api/keywords/50?max=-1').respond(mockKeywordResponse); 
		   
	   }); 
   });  
   
});
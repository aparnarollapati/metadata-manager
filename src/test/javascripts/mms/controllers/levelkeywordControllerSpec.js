// fdescribe or fit used to trigger just one test suite or test in a test run
describe('levelkeywordController', function() {
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
        $controller("LevelKeywordController as vm", {
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
	   it('should have empty levelkeyword array', function(){
	       expect(scope.vm.levelKeywords).toEqual(jasmine.anything());
	   });
	
	   it('should have empty levelkeyword array length', function(){   
	       expect(scope.vm.levelKeywords.length).toEqual(0);
	   });   
   });   
     
   describe('after activation', function() {   
	   var mockLevelkeywordsResponse = [];
	   var mockLevelkeywordResponse = null;
	   var mockToplevelResponse = null;

	    beforeEach(function(){
	    	
	    	mockLevelkeywordsResponse = [{
				"id": 50,
				"levelkeyword": "teacher ebook"
			}, {
				"id": 61,
				"levelkeyword": "matrilineal"
			}, {
				"id": 51,
				"levelkeyword": "america"
			}, {
				"id": 59,
				"levelkeyword": "totems"
			}, {
				"id": 55,
				"levelkeyword": "lesson 2"
			}, {
				"id": 52,
				"levelkeyword": "africa"
			}, {
				"id": 58,
				"levelkeyword": "kivas"
			}, {
				"id": 57,
				"levelkeyword": "pueblos"
			}, {
				"id": 62,
				"levelkeyword": "iroquois league"
			}];
	    	
	    	mockLevelkeywordResponse = {
				"id": 50,
				"levelkeyword": "teacher ebook"
			};
	    	
	    	mockToplevelResponse = {"id": 1,
                    "nonGradeLevel": "Course -",
                    "nonGradeTitle": "United States History, Beginnings to 1877",
                    "program": {},
                    "title": "United States History, Beginnings to 1877",
                    "content": [
                      {
                        "id": 9,
                        "active": false,
                        "assignable": false,
                        "component": {
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
                      }]
                      };
	    	
			httpBackend.when('GET', 'api/levelkeywords?max=-1').respond(mockLevelkeywordsResponse);  // This is also valid httpBackend.whenGET('api/levelkeywords?max=-1').respond(levelkeywordsList); or  //httpBackend.whenGET(/levelkeywords/).respond(levelkeywordsList);
			httpBackend.when('GET', 'api/levelkeywords/50?max=-1').respond(mockLevelkeywordResponse);
			httpBackend.when('PUT', 'api/levelkeywords/50?max=-1').respond(mockLevelkeywordResponse); 
			httpBackend.when('POST', 'api/levelkeywords?max=-1').respond(mockLevelkeywordResponse); 
			httpBackend.when('DELETE', 'api/levelkeywords/50?max=-1').respond(mockLevelkeywordResponse); 

	    });
	    
	   it('should respond success to a GET', function(){  
	       httpBackend.expect('GET', 'api/levelkeywords?max=-1').respond(200, 'success');
	   });  	   
		   
	    it('should have a function to refresh the levelkeywords list', function(){
	        expect(scope.vm.list).toBeDefined();
	    });
	    
	    it('should have mocked mockLevelkeywordsResponse', function(){
	    	expect(mockLevelkeywordsResponse.length).toBeGreaterThan(0);
	    });
	   
	   it('should not have empty levelkeyword array', function(){  
	       
	   	   scope.vm.list();
	   	   httpBackend.flush();
	       expect(scope.vm.levelKeywords.length).toBeGreaterThan(0);
	   });    

	   xit('should have levelkeywords list that matches mock', function(){  
		   
		   scope.vm.list();
		   httpBackend.flush();
		   expect(scope.vm.levelKeywords).toEqual(mockLevelkeywordsResponse);
 
	   }).pend('Because the types returned are not the same.  To do with promises.  Need to understand this better.'); 
	   
	   it('should have levelkeywords list with levelkeywords that matches mock', function(){  
		   
		   scope.vm.list();
		   httpBackend.flush();
		   expect(scope.vm.levelKeywords[0].levelkeyword).toEqual("teacher ebook");
 
	   }); 
	   
	   it('should add a levelkeyword to the list', function(){  	  
		   //  Need to add toplevel here
		   scope.vm.newKeyword = "A new keyword";
		   scope.vm.addLevelKeywordTopLevel(mockToplevelResponse);
		   httpBackend.flush();
		   httpBackend.expect('POST', 'api/levelkeywords?max=-1').respond(mockLevelkeywordResponse); 
	   });
	   
	   it('should update a levelkeyword', function(){  
		   
		   scope.vm.updateLevelKeyword(mockLevelkeywordResponse, 'A new levelkeyword');
		   httpBackend.flush();
		   httpBackend.expect('PUT', 'api/levelkeywords/50?max=-1').respond(mockLevelkeywordResponse);
	   }); 
	   
	   it('should delete a levelkeyword from the list', function(){  
		   
		   scope.vm.delete(mockLevelkeywordResponse);
		   httpBackend.flush();  
		   httpBackend.expect('DELETE', 'api/levelkeywords/50?max=-1').respond(mockLevelkeywordResponse); 
		   
	   }); 
   });  
   
});
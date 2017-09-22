// fdescribe or fit used to trigger just one test suite or test in a test run
describe('gradeController', function() {
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
        $controller("GradeController as vm", {
                $scope: scope
            });
    });
    
   it('should exist', function() {
	   expect($controller).toEqual(jasmine.anything());
   });
   
   it('as vm should exist', function() {
	   expect(scope.vm).toEqual(jasmine.anything());
   }) ;
    
   it('should have gradeOptions list', function(){
        expect(scope.vm.gradeOptions[0].value).toEqual("PK");
        expect(scope.vm.gradeOptions[0].text).toEqual("PK");
   });
   
   describe('before activation', function() {
	   it('should have empty grade array', function(){
	       expect(scope.vm.grades).toEqual(jasmine.anything());
	   });
	
	   it('should have empty grade array length', function(){   
	       expect(scope.vm.grades.length).toEqual(0);
	   });   
   });   
     
   describe('after activation', function() {   
	   var mockGradesResponse = [];
	   var mockGradeResponse = null;
	   
	    beforeEach(function(){
	    	
	    	mockGradesResponse =  [{"id": 3,
	    	                        "grade": "8",
	    	                        "guiOrdering": 11
	    	                       },
	    	                       {
	    	                        "id": 1,
	    	                        "grade": "6",
	    	                        "guiOrdering": 9
	    	                        },
	    	                        {
	    	                         "id": 2,
	    	                         "grade": "7",
	    	                         "guiOrdering": 10
	    	                        }];
	    	
	    	mockGradeResponse = {"id": 3,
                    "grade": "8",
                    "guiOrdering": 11
                   };
	    	
			httpBackend.when('GET', 'api/grades?max=-1').respond(mockGradesResponse);  // This is also valid httpBackend.whenGET('api/grades?max=-1').respond(gradesList); or  //httpBackend.whenGET(/grades/).respond(gradesList);
			httpBackend.when('GET', 'api/grades/3?max=-1').respond(mockGradeResponse);
			httpBackend.when('PUT', 'api/grades/3?max=-1').respond(mockGradeResponse); 
			httpBackend.when('POST', 'api/grades?max=-1').respond(mockGradeResponse); 
			httpBackend.when('DELETE', 'api/grades/3?max=-1').respond(mockGradeResponse); 

	    });
	    
	   it('should respond success to a GET', function(){  
	       httpBackend.expect('GET', 'api/grades?max=-1').respond(200, 'success');
	   });  	   
		   
	    it('should have a function to refresh the grades list', function(){
	        expect(scope.vm.list).toBeDefined();
	    });
	    
	    it('should have mocked mockGradesResponse', function(){
	    	expect(mockGradesResponse.length).toBeGreaterThan(0);
	    });
	   
	   it('should not have empty grade array', function(){  
	       
	   	   scope.vm.list();
	   	   httpBackend.flush();
	       expect(scope.vm.grades.length).toBeGreaterThan(0);
	   });    

	   xit('should have grades list that matches mock', function(){  
		   
		   scope.vm.list();
		   httpBackend.flush();
		   expect(scope.vm.grades).toEqual(mockGradesResponse);
 
	   }).pend('Because the types returned are not the same.  To do with promises.  Need to understand this better.'); 
	   
	   it('should have grades list with grades that matches mock', function(){  
		   
		   scope.vm.list();
		   httpBackend.flush();
		   expect(scope.vm.grades[0].grade).toEqual("8");
		   expect(scope.vm.grades[0].guiOrdering).toEqual(11);
 
	   }); 
	   
	   it('should add a grade to the list', function(){  	   
		   scope.vm.addGrade(mockGradeResponse);
		   httpBackend.flush();
		   httpBackend.expect('POST', 'api/grades?max=-1').respond(mockGradeResponse); 
	   });
	   
	   it('should update a grade', function(){  
		   
		   scope.vm.updateGradeGrade(mockGradeResponse, '7');
		   httpBackend.flush();
		   httpBackend.expect('PUT', 'api/grades/3?max=-1').respond(mockGradeResponse);
	   }); 
	   
	   it('should delete a grade from the list', function(){  
		   
		   scope.vm.delete(mockGradeResponse);
		   httpBackend.flush();  
		   httpBackend.expect('DELETE', 'api/grades/3?max=-1').respond(mockGradeResponse); 
		   
	   }); 
   });  
   
});
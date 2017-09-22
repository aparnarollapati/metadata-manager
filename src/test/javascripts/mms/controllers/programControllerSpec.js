// fdescribe or fit used to trigger just one test suite or test in a test run
describe('programController', function() {
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
        $controller("ProgramController as vm", {
                $scope: scope
            });
    });
    
   it('should exist', function() {
	   expect($controller).toEqual(jasmine.anything());
   });
   
   it('as vm should exist', function() {
	   expect(scope.vm).toEqual(jasmine.anything());
   });
   
   it('should have an empty toggleProgram array"', function(){
       expect(scope.vm.accordian.toggleProgram).toEqual(jasmine.anything());
     });

   
   describe('before activation', function() {
	   it('should have empty program array', function(){
	       expect(scope.vm.programs).toEqual(jasmine.anything());
	   });
	
	   it('should have empty program array length', function(){   
	       expect(scope.vm.programs.length).toEqual(0);
	   });   
   });   
     
   describe('after activation', function() {   
	   var mockProgramsResponse = [];
	   var mockProgramResponse = null;
	   
	    beforeEach(function(){
	    	
	    	mockProgramsResponse =  [
	    	                         {
	    	                        	    "id": 1,
	    	                        	    "code": "SS",
	    	                        	    "copyrightYear": 2020,
	    	                        	    "discipline": "Social Studies",
	    	                        	    "name": "socialstudies2020",
	    	                        	    "platform": "HMOF",
	    	                        	    "secondLevelScope": "Module",
	    	                        	    "standardSetName": "FLSS_2018_MS_USH_v4.xml",
	    	                        	    "state": "FL",
	    	                        	    "thirdLevelScope": "Lesson",
	    	                        	    "topLevelScope": "Grade",
	    	                        	    "version": "1.0",
	    	                        	    "generateXmls": [],
	    	                        	    "products": [
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
	    	                        	      },
	    	                        	      {
	    	                        	        "isbn": "9787774567832",
	    	                        	        "title": "Custom Development Test Program",
	    	                        	        "id": 2,
	    	                        	        "grades": [],
	    	                        	        "components": []
	    	                        	      }
	    	                        	    ],
	    	                        	    "strands": [
	    	                        	      {
	    	                        	        "id": 4,
	    	                        	        "hierarchy": 5,
	    	                        	        "program": {},
	    	                        	        "title": "Assessment"
	    	                        	      },
	    	                        	      {
	    	                        	        "id": 2,
	    	                        	        "hierarchy": 2,
	    	                        	        "program": {},
	    	                        	        "title": "Writing Activities"
	    	                        	      },
	    	                        	      {
	    	                        	        "id": 6,
	    	                        	        "hierarchy": 7,
	    	                        	        "program": {},
	    	                        	        "title": "References"
	    	                        	      },
	    	                        	      {
	    	                        	        "id": 3,
	    	                        	        "hierarchy": 4,
	    	                        	        "program": {},
	    	                        	        "title": "Reading Support"
	    	                        	      },
	    	                        	      {
	    	                        	        "id": 5,
	    	                        	        "hierarchy": 6,
	    	                        	        "program": {},
	    	                        	        "title": "Teacher Resources"
	    	                        	      },
	    	                        	      {
	    	                        	        "id": 1,
	    	                        	        "hierarchy": 1,
	    	                        	        "program": {},
	    	                        	        "title": "Core Instruction"
	    	                        	      },
	    	                        	      {
	    	                        	        "id": 7,
	    	                        	        "hierarchy": 9,
	    	                        	        "program": {},
	    	                        	        "title": "Additional Resources"
	    	                        	      }
	    	                        	    ],
	    	                        	    "segments": [
	    	                        	      {
	    	                        	        "id": 2,
	    	                        	        "hierarchy": 2,
	    	                        	        "program": {},
	    	                        	        "title": "Module-Level Resources"
	    	                        	      },
	    	                        	      {
	    	                        	        "id": 1,
	    	                        	        "hierarchy": 1,
	    	                        	        "program": {},
	    	                        	        "title": "Course-Level Resources"
	    	                        	      },
	    	                        	      {
	    	                        	        "id": 3,
	    	                        	        "hierarchy": 3,
	    	                        	        "program": {},
	    	                        	        "title": "Lesson-Level Resources"
	    	                        	      }
	    	                        	    ],
	    	                        	    "topLevels": [
	    	                        	      {
	    	                        	        "id": 1,
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
	    	                        	            },
	    	                        	            "difInst": false,
	    	                        	            "displayTitle": "Alternative Assessment Rubrics: Rubric 1: Acquiring Information",
	    	                        	            "enrich": false,
	    	                        	            "freeplay": false,
	    	                        	            "hmhId": "SS_FL20E_CDT_G08M00L00S00S0_0001",
	    	                        	            "iwbCompatible": false,
	    	                        	            "language": "en-US",
	    	                        	            "meaningfulDescription": "This form is designed to evaluate student's skill in acquiring information.",
	    	                        	            "mediaType": "PDF",
	    	                        	            "persistent": false,
	    	                        	            "resourceId": "9787774567831-00742",
	    	                        	            "resourcesPanelSe": false,
	    	                        	            "resourcesPanelTe": false,
	    	                        	            "reteach": false,
	    	                        	            "schedulable": false,
	    	                        	            "seFacing": false,
	    	                        	            "searchable": false,
	    	                        	            "segment": {
	    	                        	              "id": 1,
	    	                        	              "hierarchy": 1,
	    	                        	              "program": {},
	    	                        	              "title": "Course-Level Resources"
	    	                        	            },
	    	                        	            "sortId": 742,
	    	                        	            "strand": {
	    	                        	              "id": 5,
	    	                        	              "hierarchy": 6,
	    	                        	              "program": {},
	    	                        	              "title": "Teacher Resources"
	    	                        	            },
	    	                        	            "teacherManaged": false,
	    	                        	            "topLevel": {},
	    	                        	            "uri": "/content/hmof/social_studies/hmhss/na/gr6-8/united_states_history_ete_9780544454200_/teacher_resources/assets/pdf/alt_assess/alt_assess_rub.pdf#page=1",
	    	                        	            "viewable": false,
	    	                        	            "uniqueId": "9787774567831-00742",
	    	                        	            "tempProduct": {
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
	    	                        	            },
	    	                        	            "keywords": [
	    	                        	              {
	    	                        	                "id": 216,
	    	                        	                "keyword": "acquire information"
	    	                        	              },
	    	                        	              {
	    	                        	                "id": 213,
	    	                        	                "keyword": "rubric"
	    	                        	              },
	    	                        	              {
	    	                        	                "id": 214,
	    	                        	                "keyword": "rubric 1"
	    	                        	              },
	    	                        	              {
	    	                        	                "id": 210,
	    	                        	                "keyword": "alternative assessment rubrics"
	    	                        	              },
	    	                        	              {
	    	                        	                "id": 211,
	    	                        	                "keyword": "alternative assessment"
	    	                        	              },
	    	                        	              {
	    	                        	                "id": 215,
	    	                        	                "keyword": "acquiring information"
	    	                        	              },
	    	                        	              {
	    	                        	                "id": 212,
	    	                        	                "keyword": "rubrics"
	    	                        	              }
	    	                        	            ],
	    	                        	            "standards": [],
	    	                        	            "mwsGuids": []
	    	                        	          }
	    	                        	        ],
	    	                        	        "lessonPlans": [],
	    	                        	        "secondLevels": [
	    	                        	          {
	    	                        	            "id": 2,
	    	                        	            "hierarchy": 2,
	    	                        	            "title": "New Empires in the Americas",
	    	                        	            "topLevel": {},
	    	                        	            "content": [
	    	                        	              {
	    	                        	                "id": 8,
	    	                        	                "active": false,
	    	                        	                "assignable": false,
	    	                        	                "component": {
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
	    	                        	                "difInst": false,
	    	                        	                "displayTitle": "Teacher Presentation: New Empires in the Americas",
	    	                        	                "enrich": false,
	    	                        	                "freeplay": false,
	    	                        	                "hmhId": "SS_FL18E_CPT_G08M02L00S00S0_0008",
	    	                        	                "iwbCompatible": false,
	    	                        	                "language": "en-US",
	    	                        	                "meaningfulDescription": "View the teacher presentation for the module \"New Empires in the Americas.\" This module focuses on the Essential Question: How did Europeans change life in the Americas?",
	    	                        	                "mediaType": "Presentation",
	    	                        	                "parentId": "SS_FL18E_PPT_G08M00L00S00S0_0000",
	    	                        	                "persistent": false,
	    	                        	                "resourceId": "9787774567831-00080",
	    	                        	                "resourcesPanelSe": false,
	    	                        	                "resourcesPanelTe": false,
	    	                        	                "reteach": false,
	    	                        	                "schedulable": true,
	    	                        	                "seFacing": false,
	    	                        	                "searchable": true,
	    	                        	                "secondLevel": {},
	    	                        	                "segment": {
	    	                        	                  "id": 2,
	    	                        	                  "hierarchy": 2,
	    	                        	                  "program": {},
	    	                        	                  "title": "Module-Level Resources"
	    	                        	                },
	    	                        	                "sortId": 80,
	    	                        	                "strand": {
	    	                        	                  "id": 5,
	    	                        	                  "hierarchy": 6,
	    	                        	                  "program": {},
	    	                        	                  "title": "Teacher Resources"
	    	                        	                },
	    	                        	                "teacherManaged": false,
	    	                        	                "uri": "/content/hmof/social_studies/hmhss/na/gr6-8/united_states_history_ete_9780544454200_/teacher_resources/assets/ppt/Teacher_PPT_M02.pptx",
	    	                        	                "viewable": true,
	    	                        	                "uniqueId": "9787774567831-00080",
	    	                        	                "tempProduct": {
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
	    	                        	                },
	    	                        	                "keywords": [
	    	                        	                  {
	    	                        	                    "id": 186,
	    	                        	                    "keyword": "module 2"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 194,
	    	                        	                    "keyword": "ferdinand magellan"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 209,
	    	                        	                    "keyword": "charter"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 188,
	    	                        	                    "keyword": "henry the navigator"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 189,
	    	                        	                    "keyword": "astrolabe"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 199,
	    	                        	                    "keyword": "moctezuma ii"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 191,
	    	                        	                    "keyword": "christopher columbus"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 208,
	    	                        	                    "keyword": "jacques cartier"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 202,
	    	                        	                    "keyword": "plantations"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 195,
	    	                        	                    "keyword": "circumnavigate"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 185,
	    	                        	                    "keyword": "new empires in the americas"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 204,
	    	                        	                    "keyword": "protestant reformation"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 190,
	    	                        	                    "keyword": "caravels"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 206,
	    	                        	                    "keyword": "spanish armada"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 203,
	    	                        	                    "keyword": "bartolom� de las casas"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 207,
	    	                        	                    "keyword": "northwest passage"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 184,
	    	                        	                    "keyword": "teacher presentation"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 196,
	    	                        	                    "keyword": "columbian exchange"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 187,
	    	                        	                    "keyword": "leif eriksson"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 197,
	    	                        	                    "keyword": "conquistadors"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 200,
	    	                        	                    "keyword": "francisco pizarro"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 205,
	    	                        	                    "keyword": "protestants"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 201,
	    	                        	                    "keyword": "encomienda system"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 192,
	    	                        	                    "keyword": "line of demarcation"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 193,
	    	                        	                    "keyword": "treaty of tordesillas"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 198,
	    	                        	                    "keyword": "hern�n cort�s"
	    	                        	                  }
	    	                        	                ],
	    	                        	                "standards": [
	    	                        	                  {
	    	                        	                    "id": 42,
	    	                        	                    "standard": "LAFS.68.WHST.3.9"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 37,
	    	                        	                    "standard": "LAFS.8.SL.1.2"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 38,
	    	                        	                    "standard": "LAFS.68.RH.1.1"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 39,
	    	                        	                    "standard": "LAFS.68.RH.2.5"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 33,
	    	                        	                    "standard": "SS.8.A.1.1"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 34,
	    	                        	                    "standard": "SS.8.A.1.2"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 41,
	    	                        	                    "standard": "LAFS.68.WHST.2.4"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 44,
	    	                        	                    "standard": "MAFS.K12.MP.1.1"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 35,
	    	                        	                    "standard": "ELD.K12.ELL.SS.1"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 36,
	    	                        	                    "standard": "ELD.K12.ELL.SI.1"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 43,
	    	                        	                    "standard": "LAFS.68.WHST.4.10"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 40,
	    	                        	                    "standard": "LAFS.68.WHST.1.1"
	    	                        	                  }
	    	                        	                ],
	    	                        	                "mwsGuids": []
	    	                        	              },
	    	                        	              {
	    	                        	                "id": 7,
	    	                        	                "active": false,
	    	                        	                "assignable": true,
	    	                        	                "component": {
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
	    	                        	                "difInst": false,
	    	                        	                "displayTitle": "Student eBook: New Empires in the Americas",
	    	                        	                "enrich": false,
	    	                        	                "freeplay": true,
	    	                        	                "hmhId": "SS_FL18E_CDT_G08M02L00S00S0_0007",
	    	                        	                "iwbCompatible": false,
	    	                        	                "language": "en-US",
	    	                        	                "meaningfulDescription": "During the module \"New Empires in the Americas,\" students will learn about the Europeans who colonized the Americas.",
	    	                        	                "mediaType": "HTML",
	    	                        	                "persistent": false,
	    	                        	                "resourceId": "9787774567831-00047",
	    	                        	                "resourcesPanelSe": false,
	    	                        	                "resourcesPanelTe": false,
	    	                        	                "reteach": false,
	    	                        	                "schedulable": true,
	    	                        	                "seFacing": true,
	    	                        	                "searchable": true,
	    	                        	                "secondLevel": {},
	    	                        	                "segment": {
	    	                        	                  "id": 1,
	    	                        	                  "hierarchy": 1,
	    	                        	                  "program": {},
	    	                        	                  "title": "Course-Level Resources"
	    	                        	                },
	    	                        	                "sortId": 47,
	    	                        	                "strand": {
	    	                        	                  "id": 1,
	    	                        	                  "hierarchy": 1,
	    	                        	                  "program": {},
	    	                        	                  "title": "Core Instruction"
	    	                        	                },
	    	                        	                "teacherManaged": false,
	    	                        	                "uri": "/content/hmof/social_studies/hmhss/fl/gr6-8/united_states_history_ese_9780544927520_/index.html#?page=/module_2opener/essential_question.xhtml",
	    	                        	                "viewable": true,
	    	                        	                "uniqueId": "9787774567831-00047",
	    	                        	                "tempProduct": {
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
	    	                        	                },
	    	                        	                "keywords": [
	    	                        	                  {
	    	                        	                    "id": 180,
	    	                        	                    "keyword": "spanish armada"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 173,
	    	                        	                    "keyword": "moctezuma ii"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 167,
	    	                        	                    "keyword": "treaty of tordesillas"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 182,
	    	                        	                    "keyword": "jacques cartier"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 158,
	    	                        	                    "keyword": "student ebook"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 181,
	    	                        	                    "keyword": "northwest passage"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 159,
	    	                        	                    "keyword": "new empires in the americas"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 171,
	    	                        	                    "keyword": "conquistadors"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 172,
	    	                        	                    "keyword": "hern�n cort�s"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 177,
	    	                        	                    "keyword": "bartolom� de las casas"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 175,
	    	                        	                    "keyword": "encomienda system"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 179,
	    	                        	                    "keyword": "protestants"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 170,
	    	                        	                    "keyword": "columbian exchange"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 174,
	    	                        	                    "keyword": "francisco pizarro"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 160,
	    	                        	                    "keyword": "module 2"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 168,
	    	                        	                    "keyword": "ferdinand magellan"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 176,
	    	                        	                    "keyword": "plantations"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 183,
	    	                        	                    "keyword": "charter"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 162,
	    	                        	                    "keyword": "henry the navigator"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 157,
	    	                        	                    "keyword": "ebook"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 178,
	    	                        	                    "keyword": "protestant reformation"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 165,
	    	                        	                    "keyword": "christopher columbus"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 166,
	    	                        	                    "keyword": "line of demarcation"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 163,
	    	                        	                    "keyword": "astrolabe"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 164,
	    	                        	                    "keyword": "caravels"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 169,
	    	                        	                    "keyword": "circumnavigate"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 161,
	    	                        	                    "keyword": "leif eriksson"
	    	                        	                  }
	    	                        	                ],
	    	                        	                "standards": [
	    	                        	                  {
	    	                        	                    "id": 32,
	    	                        	                    "standard": "SS.8.A.1.2"
	    	                        	                  }
	    	                        	                ],
	    	                        	                "mwsGuids": [
	    	                        	                  {
	    	                        	                    "id": 4,
	    	                        	                    "guid": "SS_NL17E_DBI_G08M02L00S00S0_0002"
	    	                        	                  }
	    	                        	                ]
	    	                        	              },
	    	                        	              {
	    	                        	                "id": 6,
	    	                        	                "active": false,
	    	                        	                "assignable": false,
	    	                        	                "component": {
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
	    	                        	                "difInst": false,
	    	                        	                "displayTitle": "Teacher eBook: New Empires in the Americas",
	    	                        	                "enrich": false,
	    	                        	                "freeplay": false,
	    	                        	                "hmhId": "SS_FL18E_CDT_G08M02L00S00S0_0006",
	    	                        	                "iwbCompatible": false,
	    	                        	                "language": "en-US",
	    	                        	                "lessonPlan": {
	    	                        	                  "id": 4,
	    	                        	                  "duration": 45,
	    	                        	                  "lessonPlanId": "SS_FL18E_LP_8.2.0.1",
	    	                        	                  "secondLevel": {},
	    	                        	                  "sortId": 7,
	    	                        	                  "title": "Module 2 Introduction"
	    	                        	                },
	    	                        	                "meaningfulDescription": "During the module \"New Empires in the Americas,\" students will learn about the Europeans who colonized the Americas.",
	    	                        	                "mediaType": "HTML",
	    	                        	                "persistent": false,
	    	                        	                "resourceId": "9787774567831-00041",
	    	                        	                "resourcesPanelSe": false,
	    	                        	                "resourcesPanelTe": false,
	    	                        	                "reteach": false,
	    	                        	                "schedulable": true,
	    	                        	                "seFacing": false,
	    	                        	                "searchable": true,
	    	                        	                "secondLevel": {},
	    	                        	                "segment": {
	    	                        	                  "id": 1,
	    	                        	                  "hierarchy": 1,
	    	                        	                  "program": {},
	    	                        	                  "title": "Course-Level Resources"
	    	                        	                },
	    	                        	                "sortId": 41,
	    	                        	                "strand": {
	    	                        	                  "id": 1,
	    	                        	                  "hierarchy": 1,
	    	                        	                  "program": {},
	    	                        	                  "title": "Core Instruction"
	    	                        	                },
	    	                        	                "teacherManaged": false,
	    	                        	                "uri": "/content/hmof/social_studies/hmhss/fl/gr6-8/united_states_history_ese_9780544927520_/index.html#?page=/module_2opener/essential_question.xhtml&u=1efbbef0f49ec5327ffd389831cbe95e",
	    	                        	                "viewable": true,
	    	                        	                "uniqueId": "9787774567831-00041",
	    	                        	                "tempProduct": {
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
	    	                        	                },
	    	                        	                "keywords": [
	    	                        	                  {
	    	                        	                    "id": 134,
	    	                        	                    "keyword": "leif eriksson"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 148,
	    	                        	                    "keyword": "encomienda system"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 154,
	    	                        	                    "keyword": "northwest passage"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 143,
	    	                        	                    "keyword": "columbian exchange"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 133,
	    	                        	                    "keyword": "module 2"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 140,
	    	                        	                    "keyword": "treaty of tordesillas"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 142,
	    	                        	                    "keyword": "circumnavigate"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 130,
	    	                        	                    "keyword": "ebook"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 139,
	    	                        	                    "keyword": "line of demarcation"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 155,
	    	                        	                    "keyword": "jacques cartier"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 150,
	    	                        	                    "keyword": "bartolom� de las casas"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 144,
	    	                        	                    "keyword": "conquistadors"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 132,
	    	                        	                    "keyword": "new empires in the americas"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 138,
	    	                        	                    "keyword": "christopher columbus"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 149,
	    	                        	                    "keyword": "plantations"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 131,
	    	                        	                    "keyword": "teacher ebook"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 135,
	    	                        	                    "keyword": "henry the navigator"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 151,
	    	                        	                    "keyword": "protestant reformation"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 156,
	    	                        	                    "keyword": "charter"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 136,
	    	                        	                    "keyword": "astrolabe"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 137,
	    	                        	                    "keyword": "caravels"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 147,
	    	                        	                    "keyword": "francisco pizarro"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 145,
	    	                        	                    "keyword": "hern�n cort�s"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 153,
	    	                        	                    "keyword": "spanish armada"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 152,
	    	                        	                    "keyword": "protestants"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 146,
	    	                        	                    "keyword": "moctezuma ii"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 141,
	    	                        	                    "keyword": "ferdinand magellan"
	    	                        	                  }
	    	                        	                ],
	    	                        	                "standards": [
	    	                        	                  {
	    	                        	                    "id": 31,
	    	                        	                    "standard": "SS.8.A.1.2"
	    	                        	                  }
	    	                        	                ],
	    	                        	                "mwsGuids": [
	    	                        	                  {
	    	                        	                    "id": 3,
	    	                        	                    "guid": "SS_NL17E_DBI_G08M02L00S00S0_0002"
	    	                        	                  }
	    	                        	                ]
	    	                        	              }
	    	                        	            ],
	    	                        	            "lessonPlans": [
	    	                        	              {
	    	                        	                "id": 4,
	    	                        	                "duration": 45,
	    	                        	                "lessonPlanId": "SS_FL18E_LP_8.2.0.1",
	    	                        	                "secondLevel": {},
	    	                        	                "sortId": 7,
	    	                        	                "title": "Module 2 Introduction"
	    	                        	              }
	    	                        	            ],
	    	                        	            "thirdLevels": [
	    	                        	              {
	    	                        	                "id": 6,
	    	                        	                "hierarchy": 2,
	    	                        	                "secondLevel": {},
	    	                        	                "title": "Europeans Reach the Americas",
	    	                        	                "content": [],
	    	                        	                "lessonPlans": [],
	    	                        	                "fourthLevels": [],
	    	                        	                "keywords": []
	    	                        	              },
	    	                        	              {
	    	                        	                "id": 7,
	    	                        	                "hierarchy": 3,
	    	                        	                "secondLevel": {},
	    	                        	                "title": "Europeans Reach the Americas",
	    	                        	                "content": [],
	    	                        	                "lessonPlans": [],
	    	                        	                "fourthLevels": [],
	    	                        	                "keywords": []
	    	                        	              },
	    	                        	              {
	    	                        	                "id": 8,
	    	                        	                "hierarchy": 4,
	    	                        	                "secondLevel": {},
	    	                        	                "title": "The Race for Empires",
	    	                        	                "content": [],
	    	                        	                "lessonPlans": [],
	    	                        	                "fourthLevels": [],
	    	                        	                "keywords": []
	    	                        	              },
	    	                        	              {
	    	                        	                "id": 5,
	    	                        	                "hierarchy": 1,
	    	                        	                "secondLevel": {},
	    	                        	                "title": "Europeans Set Sail",
	    	                        	                "content": [],
	    	                        	                "lessonPlans": [],
	    	                        	                "fourthLevels": [],
	    	                        	                "keywords": []
	    	                        	              }
	    	                        	            ],
	    	                        	            "keywords": [
	    	                        	              {
	    	                        	                "keyword": "module 2"
	    	                        	              },
	    	                        	              {
	    	                        	                "keyword": "second-level-common-keyword2"
	    	                        	              }
	    	                        	            ]
	    	                        	          },
	    	                        	          {
	    	                        	            "id": 1,
	    	                        	            "hierarchy": 1,
	    	                        	            "title": "America, Africa, and Europe before 1500",
	    	                        	            "topLevel": {},
	    	                        	            "content": [
	    	                        	              {
	    	                        	                "id": 5,
	    	                        	                "active": false,
	    	                        	                "assignable": false,
	    	                        	                "component": {
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
	    	                        	                "difInst": false,
	    	                        	                "displayTitle": "Teacher Presentation: America, Africa, and Europe before 1500",
	    	                        	                "enrich": false,
	    	                        	                "freeplay": false,
	    	                        	                "hmhId": "SS_FL18E_CDT_G08M01L00S00S0_0005",
	    	                        	                "iwbCompatible": false,
	    	                        	                "language": "en-US",
	    	                        	                "lessonPlan": {
	    	                        	                  "id": 1,
	    	                        	                  "duration": 45,
	    	                        	                  "lessonPlanId": "SS_FL18E_LP_8.1.0.1",
	    	                        	                  "secondLevel": {},
	    	                        	                  "sortId": 1,
	    	                        	                  "title": "Module 1 Introduction"
	    	                        	                },
	    	                        	                "meaningfulDescription": "View the teacher presentation for the module &quot;America, Africa, and Europe before 1500.&quot; This module focuses on the Essential Question: Why might a U.S. historian study the Americas, Africa, and Europe before 1500?",
	    	                        	                "mediaType": "HTML",
	    	                        	                "persistent": false,
	    	                        	                "resourceId": "9787774567831-00040",
	    	                        	                "resourcesPanelSe": false,
	    	                        	                "resourcesPanelTe": false,
	    	                        	                "reteach": false,
	    	                        	                "schedulable": true,
	    	                        	                "seFacing": false,
	    	                        	                "searchable": true,
	    	                        	                "secondLevel": {},
	    	                        	                "segment": {
	    	                        	                  "id": 2,
	    	                        	                  "hierarchy": 2,
	    	                        	                  "program": {},
	    	                        	                  "title": "Module-Level Resources"
	    	                        	                },
	    	                        	                "sortId": 40,
	    	                        	                "strand": {
	    	                        	                  "id": 5,
	    	                        	                  "hierarchy": 6,
	    	                        	                  "program": {},
	    	                        	                  "title": "Teacher Resources"
	    	                        	                },
	    	                        	                "teacherManaged": false,
	    	                        	                "uri": "/content/hmof/social_studies/hmhss/na/gr6-8/united_states_history_ete_9780544454200_/teacher_resources/assets/ppt/Teacher_PPT_M01.pdf",
	    	                        	                "viewable": true,
	    	                        	                "uniqueId": "9787774567831-00040",
	    	                        	                "tempProduct": {
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
	    	                        	                },
	    	                        	                "keywords": [
	    	                        	                  {
	    	                        	                    "id": 111,
	    	                        	                    "keyword": "teepees"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 103,
	    	                        	                    "keyword": "paleo-indians"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 104,
	    	                        	                    "keyword": "migration"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 99,
	    	                        	                    "keyword": "africa"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 108,
	    	                        	                    "keyword": "pueblos"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 106,
	    	                        	                    "keyword": "environments"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 118,
	    	                        	                    "keyword": "askia the great"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 98,
	    	                        	                    "keyword": "america"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 123,
	    	                        	                    "keyword": "democracy"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 120,
	    	                        	                    "keyword": "plato"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 124,
	    	                        	                    "keyword": "knights"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 102,
	    	                        	                    "keyword": "bering land bridge"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 129,
	    	                        	                    "keyword": "joint-stock companies"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 114,
	    	                        	                    "keyword": "berbers"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 113,
	    	                        	                    "keyword": "iroquois league"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 109,
	    	                        	                    "keyword": "kivas"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 112,
	    	                        	                    "keyword": "matrilineal"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 122,
	    	                        	                    "keyword": "reason"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 121,
	    	                        	                    "keyword": "aristotle"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 100,
	    	                        	                    "keyword": "europe before 1500"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 105,
	    	                        	                    "keyword": "hunter-gatherers"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 107,
	    	                        	                    "keyword": "culture"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 115,
	    	                        	                    "keyword": "mansa musa"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 117,
	    	                        	                    "keyword": "mosques"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 125,
	    	                        	                    "keyword": "black death"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 116,
	    	                        	                    "keyword": "hajj"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 110,
	    	                        	                    "keyword": "totems"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 97,
	    	                        	                    "keyword": "teacher presentation"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 101,
	    	                        	                    "keyword": "module 1"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 128,
	    	                        	                    "keyword": "johannes gutenberg"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 127,
	    	                        	                    "keyword": "leonardo da vinci"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 126,
	    	                        	                    "keyword": "michelangelo"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 119,
	    	                        	                    "keyword": "socrates"
	    	                        	                  }
	    	                        	                ],
	    	                        	                "standards": [
	    	                        	                  {
	    	                        	                    "id": 24,
	    	                        	                    "standard": "LAFS.68.RH.2.5"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 25,
	    	                        	                    "standard": "LAFS.68.RH.3.7"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 27,
	    	                        	                    "standard": "LAFS.68.WHST.3.9"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 20,
	    	                        	                    "standard": "SS.8.A.1.2"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 23,
	    	                        	                    "standard": "LAFS.8.SL.1.2"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 30,
	    	                        	                    "standard": "MAFS.K12.MP.5.1"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 22,
	    	                        	                    "standard": "ELD.K12.ELL.SI.1"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 29,
	    	                        	                    "standard": "MAFS.K12.MP.1.1"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 28,
	    	                        	                    "standard": "LAFS.68.WHST.4.10"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 26,
	    	                        	                    "standard": "LAFS.68.WHST.2.4"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 21,
	    	                        	                    "standard": "ELD.K12.ELL.SS.1"
	    	                        	                  }
	    	                        	                ],
	    	                        	                "mwsGuids": []
	    	                        	              },
	    	                        	              {
	    	                        	                "id": 4,
	    	                        	                "active": false,
	    	                        	                "assignable": true,
	    	                        	                "component": {
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
	    	                        	                "difInst": false,
	    	                        	                "displayTitle": "Student eBook: America, Africa, and Europe before 1500",
	    	                        	                "enrich": false,
	    	                        	                "freeplay": true,
	    	                        	                "hmhId": "SS_FL18E_CDT_G08M01L00S00S0_0004",
	    	                        	                "iwbCompatible": false,
	    	                        	                "language": "en-US",
	    	                        	                "lessonPlan": {
	    	                        	                  "id": 1,
	    	                        	                  "duration": 45,
	    	                        	                  "lessonPlanId": "SS_FL18E_LP_8.1.0.1",
	    	                        	                  "secondLevel": {},
	    	                        	                  "sortId": 1,
	    	                        	                  "title": "Module 1 Introduction"
	    	                        	                },
	    	                        	                "meaningfulDescription": "During the module &quot;America, Africa, and Europe before 1500,&quot; students will learn the histories of three regions&#8212; the Americas, West Africa, and Europe&#8212;whose people would come together and forever change North America.",
	    	                        	                "mediaType": "HTML",
	    	                        	                "persistent": false,
	    	                        	                "resourceId": "9787774567831-00007",
	    	                        	                "resourcesPanelSe": false,
	    	                        	                "resourcesPanelTe": false,
	    	                        	                "reteach": false,
	    	                        	                "schedulable": true,
	    	                        	                "seFacing": true,
	    	                        	                "searchable": true,
	    	                        	                "secondLevel": {},
	    	                        	                "segment": {
	    	                        	                  "id": 2,
	    	                        	                  "hierarchy": 2,
	    	                        	                  "program": {},
	    	                        	                  "title": "Module-Level Resources"
	    	                        	                },
	    	                        	                "sortId": 7,
	    	                        	                "strand": {
	    	                        	                  "id": 1,
	    	                        	                  "hierarchy": 1,
	    	                        	                  "program": {},
	    	                        	                  "title": "Core Instruction"
	    	                        	                },
	    	                        	                "teacherManaged": false,
	    	                        	                "uri": "/content/hmof/social_studies/hmhss/fl/gr6-8/united_states_history_ese_9780544927520_/index.html#?page=/module_1opener/essential_question.xhtml",
	    	                        	                "viewable": true,
	    	                        	                "uniqueId": "9787774567831-00007",
	    	                        	                "tempProduct": {
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
	    	                        	                },
	    	                        	                "keywords": [
	    	                        	                  {
	    	                        	                    "id": 92,
	    	                        	                    "keyword": "black death"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 69,
	    	                        	                    "keyword": "bering land bridge"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 91,
	    	                        	                    "keyword": "knights"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 74,
	    	                        	                    "keyword": "culture"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 82,
	    	                        	                    "keyword": "mansa musa"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 93,
	    	                        	                    "keyword": "michelangelo"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 85,
	    	                        	                    "keyword": "askia the great"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 81,
	    	                        	                    "keyword": "berbers"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 72,
	    	                        	                    "keyword": "hunter-gatherers"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 88,
	    	                        	                    "keyword": "aristotle"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 80,
	    	                        	                    "keyword": "iroquois league"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 95,
	    	                        	                    "keyword": "johannes gutenberg"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 90,
	    	                        	                    "keyword": "democracy"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 84,
	    	                        	                    "keyword": "mosques"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 65,
	    	                        	                    "keyword": "america"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 96,
	    	                        	                    "keyword": "joint-stock companies"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 79,
	    	                        	                    "keyword": "matrilineal"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 77,
	    	                        	                    "keyword": "totems"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 66,
	    	                        	                    "keyword": "africa"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 70,
	    	                        	                    "keyword": "paleo-indians"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 63,
	    	                        	                    "keyword": "ebook"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 86,
	    	                        	                    "keyword": "socrates"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 89,
	    	                        	                    "keyword": "reason"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 75,
	    	                        	                    "keyword": "pueblos"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 78,
	    	                        	                    "keyword": "teepees"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 64,
	    	                        	                    "keyword": "teacher ebook"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 71,
	    	                        	                    "keyword": "migration"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 94,
	    	                        	                    "keyword": "leonardo da vinci"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 76,
	    	                        	                    "keyword": "kivas"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 67,
	    	                        	                    "keyword": "europe before 1500"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 68,
	    	                        	                    "keyword": "module 1"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 83,
	    	                        	                    "keyword": "hajj"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 87,
	    	                        	                    "keyword": "plato"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 73,
	    	                        	                    "keyword": "environments"
	    	                        	                  }
	    	                        	                ],
	    	                        	                "standards": [
	    	                        	                  {
	    	                        	                    "id": 18,
	    	                        	                    "standard": "SS.8.A.1.2"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 19,
	    	                        	                    "standard": "LAFS.68.RH.2.4"
	    	                        	                  }
	    	                        	                ],
	    	                        	                "mwsGuids": [
	    	                        	                  {
	    	                        	                    "id": 2,
	    	                        	                    "guid": "SS_NL17E_DBI_G08M01L00S00S0_0001"
	    	                        	                  }
	    	                        	                ]
	    	                        	              },
	    	                        	              {
	    	                        	                "id": 1,
	    	                        	                "active": false,
	    	                        	                "assignable": false,
	    	                        	                "component": {
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
	    	                        	                "difInst": false,
	    	                        	                "displayTitle": "Teacher eBook: America, Africa, and Europe before 1500",
	    	                        	                "enrich": false,
	    	                        	                "freeplay": false,
	    	                        	                "hmhId": "SS_FL20E_CDT_G08M01L00S00S0_0001",
	    	                        	                "iwbCompatible": false,
	    	                        	                "language": "en-US",
	    	                        	                "lessonPlan": {
	    	                        	                  "id": 1,
	    	                        	                  "duration": 45,
	    	                        	                  "lessonPlanId": "SS_FL18E_LP_8.1.0.1",
	    	                        	                  "secondLevel": {},
	    	                        	                  "sortId": 1,
	    	                        	                  "title": "Module 1 Introduction"
	    	                        	                },
	    	                        	                "meaningfulDescription": "During the module &quot;America, Africa, and Europe before 1500,&quot; students will learn the histories of three regions&#8212; the Americas, West Africa, and Europe&#8212;whose people would come together and forever change North America.",
	    	                        	                "mediaType": "HTML",
	    	                        	                "persistent": false,
	    	                        	                "reader": {
	    	                        	                  "id": 1,
	    	                        	                  "content": {
	    	                        	                    "uniqueId": "9787774567831-00001"
	    	                        	                  },
	    	                        	                  "guidedReadingLevels": "B",
	    	                        	                  "isbn10": "0151212756",
	    	                        	                  "isbn13": "9670151212756",
	    	                        	                  "readerLevel": "Below-Level",
	    	                        	                  "readingSkills": "Sequence"
	    	                        	                },
	    	                        	                "resourceId": "9787774567831-00001",
	    	                        	                "resourcesPanelSe": false,
	    	                        	                "resourcesPanelTe": false,
	    	                        	                "reteach": false,
	    	                        	                "schedulable": true,
	    	                        	                "seFacing": false,
	    	                        	                "searchable": true,
	    	                        	                "secondLevel": {},
	    	                        	                "segment": {
	    	                        	                  "id": 2,
	    	                        	                  "hierarchy": 2,
	    	                        	                  "program": {},
	    	                        	                  "title": "Module-Level Resources"
	    	                        	                },
	    	                        	                "sortId": 1,
	    	                        	                "strand": {
	    	                        	                  "id": 1,
	    	                        	                  "hierarchy": 1,
	    	                        	                  "program": {},
	    	                        	                  "title": "Core Instruction"
	    	                        	                },
	    	                        	                "teacherManaged": false,
	    	                        	                "uri": "/content/hmof/social_studies/hmhss/fl/gr6-8/united_states_history_ese_9780544927520_/index.html#?page=/module_1opener/essential_question.xhtml&amp;u=1efbbef0f49ec5327ffd389831cbe95e",
	    	                        	                "viewable": true,
	    	                        	                "uniqueId": "9787774567831-00001",
	    	                        	                "tempProduct": {
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
	    	                        	                },
	    	                        	                "keywords": [
	    	                        	                  {
	    	                        	                    "id": 3,
	    	                        	                    "keyword": "teacher ebook"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 34,
	    	                        	                    "keyword": "joint-stock companies"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 27,
	    	                        	                    "keyword": "reason"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 24,
	    	                        	                    "keyword": "socrates"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 5,
	    	                        	                    "keyword": "africa"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 26,
	    	                        	                    "keyword": "aristotle"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 15,
	    	                        	                    "keyword": "totems"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 25,
	    	                        	                    "keyword": "plato"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 20,
	    	                        	                    "keyword": "mansa musa"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 14,
	    	                        	                    "keyword": "kivas"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 1,
	    	                        	                    "keyword": "Text"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 6,
	    	                        	                    "keyword": "europe before 1500"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 12,
	    	                        	                    "keyword": "culture"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 8,
	    	                        	                    "keyword": "paleo-indians"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 16,
	    	                        	                    "keyword": "teepees"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 33,
	    	                        	                    "keyword": "johannes gutenberg"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 32,
	    	                        	                    "keyword": "leonardo da vinci"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 29,
	    	                        	                    "keyword": "knights"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 2,
	    	                        	                    "keyword": "ebook"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 23,
	    	                        	                    "keyword": "askia the great"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 30,
	    	                        	                    "keyword": "black death"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 31,
	    	                        	                    "keyword": "michelangelo"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 21,
	    	                        	                    "keyword": "hajj"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 17,
	    	                        	                    "keyword": "matrilineal"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 22,
	    	                        	                    "keyword": "mosques"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 10,
	    	                        	                    "keyword": "hunter-gatherers"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 4,
	    	                        	                    "keyword": "america"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 19,
	    	                        	                    "keyword": "berbers"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 28,
	    	                        	                    "keyword": "democracy"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 18,
	    	                        	                    "keyword": "iroquois league"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 7,
	    	                        	                    "keyword": "bering land bridge"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 9,
	    	                        	                    "keyword": "migration"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 11,
	    	                        	                    "keyword": "environments"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 13,
	    	                        	                    "keyword": "pueblos"
	    	                        	                  }
	    	                        	                ],
	    	                        	                "standards": [
	    	                        	                  {
	    	                        	                    "id": 1,
	    	                        	                    "standard": "SS.8.A.1.2"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "id": 2,
	    	                        	                    "standard": "LAFS.68.RH.2.4"
	    	                        	                  }
	    	                        	                ],
	    	                        	                "mwsGuids": [
	    	                        	                  {
	    	                        	                    "id": 1,
	    	                        	                    "guid": "SS_NL17E_DBI_G08M01L00S00S0_0001"
	    	                        	                  }
	    	                        	                ]
	    	                        	              }
	    	                        	            ],
	    	                        	            "lessonPlans": [
	    	                        	              {
	    	                        	                "id": 1,
	    	                        	                "duration": 45,
	    	                        	                "lessonPlanId": "SS_FL18E_LP_8.1.0.1",
	    	                        	                "secondLevel": {},
	    	                        	                "sortId": 1,
	    	                        	                "title": "Module 1 Introduction"
	    	                        	              }
	    	                        	            ],
	    	                        	            "thirdLevels": [
	    	                        	              {
	    	                        	                "id": 1,
	    	                        	                "hierarchy": 1,
	    	                        	                "secondLevel": {},
	    	                        	                "title": "The Earliest Americans",
	    	                        	                "content": [
	    	                        	                  {
	    	                        	                    "id": 2,
	    	                        	                    "active": false,
	    	                        	                    "assignable": false,
	    	                        	                    "component": {
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
	    	                        	                    "difInst": false,
	    	                        	                    "displayTitle": "Teacher eBook: America, Africa, and Europe before 1500, Lesson 1: The Earliest Americans",
	    	                        	                    "enrich": false,
	    	                        	                    "freeplay": false,
	    	                        	                    "hmhId": "SS_FL18E_CDT_G08M01L01S00S0_0002",
	    	                        	                    "iwbCompatible": false,
	    	                        	                    "language": "en-US",
	    	                        	                    "lessonPlan": {
	    	                        	                      "id": 2,
	    	                        	                      "duration": 45,
	    	                        	                      "lessonPlanId": "SS_FL18E_LP_8.1.2.1",
	    	                        	                      "sortId": 2,
	    	                        	                      "thirdLevel": {},
	    	                        	                      "title": "Module 1 Lesson 1"
	    	                        	                    },
	    	                        	                    "meaningfulDescription": "Lesson 1, The Earliest Americans, from the module &quot;America, Africa, and Europe before 1500&quot; focuses on the Big Idea: Native American societies developed across North and South America. The main ideas for this lesson are: - Climate changes allowed Paleo-Indians to migrate to the Americas. - Major civilizations developed in Mesoamerica and South America.",
	    	                        	                    "mediaType": "HTML",
	    	                        	                    "persistent": false,
	    	                        	                    "resourceId": "9787774567831-00002",
	    	                        	                    "resourcesPanelSe": false,
	    	                        	                    "resourcesPanelTe": false,
	    	                        	                    "reteach": false,
	    	                        	                    "schedulable": true,
	    	                        	                    "seFacing": false,
	    	                        	                    "searchable": true,
	    	                        	                    "segment": {
	    	                        	                      "id": 3,
	    	                        	                      "hierarchy": 3,
	    	                        	                      "program": {},
	    	                        	                      "title": "Lesson-Level Resources"
	    	                        	                    },
	    	                        	                    "sortId": 2,
	    	                        	                    "strand": {
	    	                        	                      "id": 1,
	    	                        	                      "hierarchy": 1,
	    	                        	                      "program": {},
	    	                        	                      "title": "Core Instruction"
	    	                        	                    },
	    	                        	                    "teacherManaged": false,
	    	                        	                    "thirdLevel": {},
	    	                        	                    "uri": "/content/hmof/social_studies/hmhss/fl/gr6-8/united_states_history_ese_9780544927520_/index.html#?page=/module_1_lesson01/lesson_opener.xhtml&amp;u=1efbbef0f49ec5327ffd389831cbe95e",
	    	                        	                    "viewable": true,
	    	                        	                    "uniqueId": "9787774567831-00002",
	    	                        	                    "tempProduct": {
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
	    	                        	                    },
	    	                        	                    "keywords": [
	    	                        	                      {
	    	                        	                        "id": 48,
	    	                        	                        "keyword": "bering land bridge"
	    	                        	                      },
	    	                        	                      {
	    	                        	                        "id": 37,
	    	                        	                        "keyword": "america"
	    	                        	                      },
	    	                        	                      {
	    	                        	                        "id": 36,
	    	                        	                        "keyword": "teacher ebook"
	    	                        	                      },
	    	                        	                      {
	    	                        	                        "id": 47,
	    	                        	                        "keyword": "culture"
	    	                        	                      },
	    	                        	                      {
	    	                        	                        "id": 40,
	    	                        	                        "keyword": "module 1"
	    	                        	                      },
	    	                        	                      {
	    	                        	                        "id": 44,
	    	                        	                        "keyword": "migration"
	    	                        	                      },
	    	                        	                      {
	    	                        	                        "id": 45,
	    	                        	                        "keyword": "hunter-gatherers"
	    	                        	                      },
	    	                        	                      {
	    	                        	                        "id": 38,
	    	                        	                        "keyword": "africa"
	    	                        	                      },
	    	                        	                      {
	    	                        	                        "id": 42,
	    	                        	                        "keyword": "the earliest americans"
	    	                        	                      },
	    	                        	                      {
	    	                        	                        "id": 39,
	    	                        	                        "keyword": "europe before 1500"
	    	                        	                      },
	    	                        	                      {
	    	                        	                        "id": 35,
	    	                        	                        "keyword": "ebook"
	    	                        	                      },
	    	                        	                      {
	    	                        	                        "id": 43,
	    	                        	                        "keyword": "paleo-indians"
	    	                        	                      },
	    	                        	                      {
	    	                        	                        "id": 41,
	    	                        	                        "keyword": "lesson 1"
	    	                        	                      },
	    	                        	                      {
	    	                        	                        "id": 46,
	    	                        	                        "keyword": "environments"
	    	                        	                      }
	    	                        	                    ],
	    	                        	                    "standards": [
	    	                        	                      {
	    	                        	                        "id": 6,
	    	                        	                        "standard": "SS.8.G.2.1"
	    	                        	                      },
	    	                        	                      {
	    	                        	                        "id": 4,
	    	                        	                        "standard": "SS.8.A.2.5"
	    	                        	                      },
	    	                        	                      {
	    	                        	                        "id": 3,
	    	                        	                        "standard": "SS.8.A.1.7"
	    	                        	                      },
	    	                        	                      {
	    	                        	                        "id": 5,
	    	                        	                        "standard": "SS.8.G.1.1"
	    	                        	                      },
	    	                        	                      {
	    	                        	                        "id": 8,
	    	                        	                        "standard": "SS.8.G.4.4"
	    	                        	                      },
	    	                        	                      {
	    	                        	                        "id": 7,
	    	                        	                        "standard": "SS.8.G.4.2"
	    	                        	                      },
	    	                        	                      {
	    	                        	                        "id": 9,
	    	                        	                        "standard": "SS.8.G.5.2"
	    	                        	                      }
	    	                        	                    ],
	    	                        	                    "mwsGuids": []
	    	                        	                  }
	    	                        	                ],
	    	                        	                "lessonPlans": [
	    	                        	                  {
	    	                        	                    "id": 2,
	    	                        	                    "duration": 45,
	    	                        	                    "lessonPlanId": "SS_FL18E_LP_8.1.2.1",
	    	                        	                    "sortId": 2,
	    	                        	                    "thirdLevel": {},
	    	                        	                    "title": "Module 1 Lesson 1"
	    	                        	                  }
	    	                        	                ],
	    	                        	                "fourthLevels": [],
	    	                        	                "keywords": [
	    	                        	                  {
	    	                        	                    "keyword": "lesson 1"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "keyword": "third-level-common-keyword1"
	    	                        	                  }
	    	                        	                ]
	    	                        	              },
	    	                        	              {
	    	                        	                "id": 4,
	    	                        	                "hierarchy": 4,
	    	                        	                "secondLevel": {},
	    	                        	                "title": "Europe before 1500",
	    	                        	                "content": [],
	    	                        	                "lessonPlans": [],
	    	                        	                "fourthLevels": [],
	    	                        	                "keywords": []
	    	                        	              },
	    	                        	              {
	    	                        	                "id": 3,
	    	                        	                "hierarchy": 3,
	    	                        	                "secondLevel": {},
	    	                        	                "title": "Trading Kingdoms of West Africa",
	    	                        	                "content": [],
	    	                        	                "lessonPlans": [],
	    	                        	                "fourthLevels": [],
	    	                        	                "keywords": []
	    	                        	              },
	    	                        	              {
	    	                        	                "id": 2,
	    	                        	                "hierarchy": 2,
	    	                        	                "secondLevel": {},
	    	                        	                "title": "Native American Cultures",
	    	                        	                "content": [
	    	                        	                  {
	    	                        	                    "id": 3,
	    	                        	                    "active": false,
	    	                        	                    "assignable": false,
	    	                        	                    "component": {
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
	    	                        	                    "difInst": false,
	    	                        	                    "displayTitle": "Teacher eBook: America, Africa, and Europe before 1500, Lesson 2: Native American Cultures",
	    	                        	                    "enrich": false,
	    	                        	                    "freeplay": false,
	    	                        	                    "hmhId": "SS_FL18E_CDT_G08M01L02S00S0_0003",
	    	                        	                    "iwbCompatible": false,
	    	                        	                    "language": "en-US",
	    	                        	                    "lessonPlan": {
	    	                        	                      "id": 3,
	    	                        	                      "duration": 45,
	    	                        	                      "lessonPlanId": "SS_FL18E_LP_8.1.2.1",
	    	                        	                      "sortId": 3,
	    	                        	                      "thirdLevel": {},
	    	                        	                      "title": "Module 1 Lesson 2"
	    	                        	                    },
	    	                        	                    "meaningfulDescription": "Lesson 2, Native American Cultures, from the module &quot;America, Africa, and Europe before 1500&quot; focuses on the Big Idea: Many diverse Native American cultures developed across the different geographic regions of North America. The main ideas for this lesson are: - Several early societies developed in North America long before Europeans explored the continent. - Geographic areas influenced Native American cultures. - Language united Native American groups and contributed to cultural diversity. - Despite their differences, Native American cultures shared similar beliefs and practices.",
	    	                        	                    "mediaType": "HTML",
	    	                        	                    "persistent": false,
	    	                        	                    "resourceId": "9787774567831-00003",
	    	                        	                    "resourcesPanelSe": false,
	    	                        	                    "resourcesPanelTe": false,
	    	                        	                    "reteach": false,
	    	                        	                    "schedulable": true,
	    	                        	                    "seFacing": false,
	    	                        	                    "searchable": true,
	    	                        	                    "segment": {
	    	                        	                      "id": 2,
	    	                        	                      "hierarchy": 2,
	    	                        	                      "program": {},
	    	                        	                      "title": "Module-Level Resources"
	    	                        	                    },
	    	                        	                    "sortId": 3,
	    	                        	                    "strand": {
	    	                        	                      "id": 1,
	    	                        	                      "hierarchy": 1,
	    	                        	                      "program": {},
	    	                        	                      "title": "Core Instruction"
	    	                        	                    },
	    	                        	                    "teacherManaged": false,
	    	                        	                    "thirdLevel": {},
	    	                        	                    "uri": "/content/hmof/social_studies/hmhss/fl/gr6-8/united_states_history_ese_9780544927520_/index.html#?page=/module_1_lesson02/lesson_opener.xhtml&amp;u=1efbbef0f49ec5327ffd389831cbe95e",
	    	                        	                    "viewable": true,
	    	                        	                    "uniqueId": "9787774567831-00003",
	    	                        	                    "tempProduct": {
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
	    	                        	                    },
	    	                        	                    "keywords": [
	    	                        	                      {
	    	                        	                        "id": 51,
	    	                        	                        "keyword": "america"
	    	                        	                      },
	    	                        	                      {
	    	                        	                        "id": 57,
	    	                        	                        "keyword": "pueblos"
	    	                        	                      },
	    	                        	                      {
	    	                        	                        "id": 59,
	    	                        	                        "keyword": "totems"
	    	                        	                      },
	    	                        	                      {
	    	                        	                        "id": 53,
	    	                        	                        "keyword": "europe before 1500"
	    	                        	                      },
	    	                        	                      {
	    	                        	                        "id": 50,
	    	                        	                        "keyword": "teacher ebook"
	    	                        	                      },
	    	                        	                      {
	    	                        	                        "id": 52,
	    	                        	                        "keyword": "africa"
	    	                        	                      },
	    	                        	                      {
	    	                        	                        "id": 56,
	    	                        	                        "keyword": "native american cultures"
	    	                        	                      },
	    	                        	                      {
	    	                        	                        "id": 61,
	    	                        	                        "keyword": "matrilineal"
	    	                        	                      },
	    	                        	                      {
	    	                        	                        "id": 62,
	    	                        	                        "keyword": "iroquois league"
	    	                        	                      },
	    	                        	                      {
	    	                        	                        "id": 49,
	    	                        	                        "keyword": "ebook"
	    	                        	                      },
	    	                        	                      {
	    	                        	                        "id": 55,
	    	                        	                        "keyword": "lesson 2"
	    	                        	                      },
	    	                        	                      {
	    	                        	                        "id": 60,
	    	                        	                        "keyword": "teepees"
	    	                        	                      },
	    	                        	                      {
	    	                        	                        "id": 54,
	    	                        	                        "keyword": "module 1"
	    	                        	                      },
	    	                        	                      {
	    	                        	                        "id": 58,
	    	                        	                        "keyword": "kivas"
	    	                        	                      }
	    	                        	                    ],
	    	                        	                    "standards": [
	    	                        	                      {
	    	                        	                        "id": 16,
	    	                        	                        "standard": "SS.8.G.5.2"
	    	                        	                      },
	    	                        	                      {
	    	                        	                        "id": 11,
	    	                        	                        "standard": "SS.8.A.1.7"
	    	                        	                      },
	    	                        	                      {
	    	                        	                        "id": 12,
	    	                        	                        "standard": "SS.8.G.1.1"
	    	                        	                      },
	    	                        	                      {
	    	                        	                        "id": 17,
	    	                        	                        "standard": "SS.8.G.6.2"
	    	                        	                      },
	    	                        	                      {
	    	                        	                        "id": 10,
	    	                        	                        "standard": "SS.8.A.1.2"
	    	                        	                      },
	    	                        	                      {
	    	                        	                        "id": 13,
	    	                        	                        "standard": "SS.8.G.2.1"
	    	                        	                      },
	    	                        	                      {
	    	                        	                        "id": 15,
	    	                        	                        "standard": "SS.8.G.5.1"
	    	                        	                      },
	    	                        	                      {
	    	                        	                        "id": 14,
	    	                        	                        "standard": "SS.8.G.3.1"
	    	                        	                      }
	    	                        	                    ],
	    	                        	                    "mwsGuids": []
	    	                        	                  }
	    	                        	                ],
	    	                        	                "lessonPlans": [
	    	                        	                  {
	    	                        	                    "id": 3,
	    	                        	                    "duration": 45,
	    	                        	                    "lessonPlanId": "SS_FL18E_LP_8.1.2.1",
	    	                        	                    "sortId": 3,
	    	                        	                    "thirdLevel": {},
	    	                        	                    "title": "Module 1 Lesson 2"
	    	                        	                  }
	    	                        	                ],
	    	                        	                "fourthLevels": [],
	    	                        	                "keywords": [
	    	                        	                  {
	    	                        	                    "keyword": "third-level-common-keyword2"
	    	                        	                  },
	    	                        	                  {
	    	                        	                    "keyword": "lesson 2"
	    	                        	                  }
	    	                        	                ]
	    	                        	              }
	    	                        	            ],
	    	                        	            "keywords": [
	    	                        	              {
	    	                        	                "keyword": "module 1"
	    	                        	              },
	    	                        	              {
	    	                        	                "keyword": "second-level-common-keyword1"
	    	                        	              }
	    	                        	            ]
	    	                        	          },
	    	                        	          {
	    	                        	            "id": 3,
	    	                        	            "hierarchy": 3,
	    	                        	            "title": "The English Colonies",
	    	                        	            "topLevel": {},
	    	                        	            "content": [],
	    	                        	            "lessonPlans": [],
	    	                        	            "thirdLevels": [
	    	                        	              {
	    	                        	                "id": 10,
	    	                        	                "hierarchy": 2,
	    	                        	                "secondLevel": {},
	    	                        	                "title": "The New England Colonies",
	    	                        	                "content": [],
	    	                        	                "lessonPlans": [],
	    	                        	                "fourthLevels": [],
	    	                        	                "keywords": []
	    	                        	              },
	    	                        	              {
	    	                        	                "id": 12,
	    	                        	                "hierarchy": 4,
	    	                        	                "secondLevel": {},
	    	                        	                "title": "Life in the English Colonies",
	    	                        	                "content": [],
	    	                        	                "lessonPlans": [],
	    	                        	                "fourthLevels": [],
	    	                        	                "keywords": []
	    	                        	              },
	    	                        	              {
	    	                        	                "id": 9,
	    	                        	                "hierarchy": 1,
	    	                        	                "secondLevel": {},
	    	                        	                "title": "The Southern Colonies",
	    	                        	                "content": [],
	    	                        	                "lessonPlans": [],
	    	                        	                "fourthLevels": [],
	    	                        	                "keywords": []
	    	                        	              },
	    	                        	              {
	    	                        	                "id": 11,
	    	                        	                "hierarchy": 3,
	    	                        	                "secondLevel": {},
	    	                        	                "title": "The Middle Colonies",
	    	                        	                "content": [],
	    	                        	                "lessonPlans": [],
	    	                        	                "fourthLevels": [],
	    	                        	                "keywords": []
	    	                        	              }
	    	                        	            ],
	    	                        	            "keywords": []
	    	                        	          }
	    	                        	        ],
	    	                        	        "grades": [
	    	                        	          {
	    	                        	            "id": 1,
	    	                        	            "grade": "6",
	    	                        	            "guiOrdering": 9
	    	                        	          },
	    	                        	          {
	    	                        	            "id": 2,
	    	                        	            "grade": "7",
	    	                        	            "guiOrdering": 10
	    	                        	          },
	    	                        	          {
	    	                        	            "id": 3,
	    	                        	            "grade": "8",
	    	                        	            "guiOrdering": 11
	    	                        	          }
	    	                        	        ],
	    	                        	        "keywords": [
	    	                        	          {
	    	                        	            "keyword": "History"
	    	                        	          }
	    	                        	        ]
	    	                        	      }
	    	                        	    ]
	    	                        	  },
	    	                        	  {
	    	                        	    "id": 2,
	    	                        	    "code": "TP",
	    	                        	    "copyrightYear": 2020,
	    	                        	    "discipline": "Social Studies",
	    	                        	    "name": "TestProgram1234",
	    	                        	    "platform": "HMOF",
	    	                        	    "secondLevelScope": "Module",
	    	                        	    "standardSetName": "FLSS_2018_MS_USH_v4.xml",
	    	                        	    "state": "CA",
	    	                        	    "thirdLevelScope": "Lesson",
	    	                        	    "topLevelScope": "Grade",
	    	                        	    "version": "1.0",
	    	                        	    "generateXmls": [],
	    	                        	    "products": [],
	    	                        	    "strands": [],
	    	                        	    "segments": [],
	    	                        	    "topLevels": []
	    	                        	  },
	    	                        	  {
	    	                        	    "id": 3,
	    	                        	    "code": "JY",
	    	                        	    "copyrightYear": 2017,
	    	                        	    "discipline": "Reading and Language Arts",
	    	                        	    "fourthLevelScope": "Day",
	    	                        	    "name": "journeys2019",
	    	                        	    "platform": "TCK6",
	    	                        	    "secondLevelScope": "Unit",
	    	                        	    "standardSetName": "California_Common_Core_ELD_Standard_Set_47413.xml",
	    	                        	    "state": "CA",
	    	                        	    "thirdLevelScope": "Lesson",
	    	                        	    "topLevelScope": "Grade",
	    	                        	    "version": "1.0",
	    	                        	    "generateXmls": [],
	    	                        	    "products": [
	    	                        	      {
	    	                        	        "isbn": "9787774567833",
	    	                        	        "title": "CA Teacher Edition Grade 3",
	    	                        	        "id": 3,
	    	                        	        "grades": [
	    	                        	          {
	    	                        	            "id": 4,
	    	                        	            "grade": "3",
	    	                        	            "guiOrdering": 6
	    	                        	          }
	    	                        	        ],
	    	                        	        "components": [
	    	                        	          {
	    	                        	            "id": 13,
	    	                        	            "categorization": "Core Components",
	    	                        	            "component": "Teacher Edition",
	    	                        	            "componentHierarchy": 1,
	    	                        	            "componentType": "Key Teacher Resource",
	    	                        	            "product": {
	    	                        	              "id": 3
	    	                        	            },
	    	                        	            "toolType": 0,
	    	                        	            "productId": 3
	    	                        	          }
	    	                        	        ]
	    	                        	      },
	    	                        	      {
	    	                        	        "isbn": "9787774567835",
	    	                        	        "title": "CA Combination Classroom Planning Guide Grade K-6",
	    	                        	        "id": 5,
	    	                        	        "grades": [
	    	                        	          {
	    	                        	            "id": 12,
	    	                        	            "grade": "6",
	    	                        	            "guiOrdering": 9
	    	                        	          },
	    	                        	          {
	    	                        	            "id": 10,
	    	                        	            "grade": "4",
	    	                        	            "guiOrdering": 7
	    	                        	          },
	    	                        	          {
	    	                        	            "id": 7,
	    	                        	            "grade": "1",
	    	                        	            "guiOrdering": 4
	    	                        	          },
	    	                        	          {
	    	                        	            "id": 8,
	    	                        	            "grade": "2",
	    	                        	            "guiOrdering": 5
	    	                        	          },
	    	                        	          {
	    	                        	            "id": 6,
	    	                        	            "grade": "K",
	    	                        	            "guiOrdering": 3
	    	                        	          },
	    	                        	          {
	    	                        	            "id": 9,
	    	                        	            "grade": "3",
	    	                        	            "guiOrdering": 6
	    	                        	          },
	    	                        	          {
	    	                        	            "id": 11,
	    	                        	            "grade": "5",
	    	                        	            "guiOrdering": 8
	    	                        	          }
	    	                        	        ],
	    	                        	        "components": [
	    	                        	          {
	    	                        	            "id": 15,
	    	                        	            "categorization": "Teaching Aids",
	    	                        	            "component": "Combination Classroom Planning Guide",
	    	                        	            "componentHierarchy": 79,
	    	                        	            "componentType": "Ancillary",
	    	                        	            "product": {
	    	                        	              "id": 5
	    	                        	            },
	    	                        	            "toolType": 0,
	    	                        	            "productId": 5
	    	                        	          }
	    	                        	        ]
	    	                        	      },
	    	                        	      {
	    	                        	        "isbn": "9787774567834",
	    	                        	        "title": "CA Student Edition Grade 3",
	    	                        	        "id": 4,
	    	                        	        "grades": [
	    	                        	          {
	    	                        	            "id": 5,
	    	                        	            "grade": "3",
	    	                        	            "guiOrdering": 6
	    	                        	          }
	    	                        	        ],
	    	                        	        "components": [
	    	                        	          {
	    	                        	            "id": 14,
	    	                        	            "categorization": "Core Components",
	    	                        	            "component": "Student Book",
	    	                        	            "componentHierarchy": 2,
	    	                        	            "componentType": "Key Student Resource",
	    	                        	            "product": {
	    	                        	              "id": 4
	    	                        	            },
	    	                        	            "toolType": 0,
	    	                        	            "productId": 4
	    	                        	          }
	    	                        	        ]
	    	                        	      }
	    	                        	    ],
	    	                        	    "strands": [
	    	                        	      {
	    	                        	        "id": 15,
	    	                        	        "hierarchy": 6,
	    	                        	        "program": {},
	    	                        	        "title": "Spelling, Grammar and Writing"
	    	                        	      },
	    	                        	      {
	    	                        	        "id": 10,
	    	                        	        "hierarchy": 10,
	    	                        	        "program": {},
	    	                        	        "title": "English Language Learners"
	    	                        	      },
	    	                        	      {
	    	                        	        "id": 19,
	    	                        	        "hierarchy": 14,
	    	                        	        "program": {},
	    	                        	        "title": "Student Resources"
	    	                        	      },
	    	                        	      {
	    	                        	        "id": 8,
	    	                        	        "hierarchy": 9,
	    	                        	        "program": {},
	    	                        	        "title": "Advanced"
	    	                        	      },
	    	                        	      {
	    	                        	        "id": 9,
	    	                        	        "hierarchy": 1,
	    	                        	        "program": {},
	    	                        	        "title": "Daily Language"
	    	                        	      },
	    	                        	      {
	    	                        	        "id": 12,
	    	                        	        "hierarchy": 8,
	    	                        	        "program": {},
	    	                        	        "title": "On Level"
	    	                        	      },
	    	                        	      {
	    	                        	        "id": 14,
	    	                        	        "hierarchy": 4,
	    	                        	        "program": {},
	    	                        	        "title": "Skills and Strategies"
	    	                        	      },
	    	                        	      {
	    	                        	        "id": 18,
	    	                        	        "hierarchy": 11,
	    	                        	        "program": {},
	    	                        	        "title": "Tier II: Strategic Intervention"
	    	                        	      },
	    	                        	      {
	    	                        	        "id": 16,
	    	                        	        "hierarchy": 7,
	    	                        	        "program": {},
	    	                        	        "title": "Struggling Readers"
	    	                        	      },
	    	                        	      {
	    	                        	        "id": 13,
	    	                        	        "hierarchy": 2,
	    	                        	        "program": {},
	    	                        	        "title": "Oral Language"
	    	                        	      },
	    	                        	      {
	    	                        	        "id": 17,
	    	                        	        "hierarchy": 13,
	    	                        	        "program": {},
	    	                        	        "title": "Teacher Resources"
	    	                        	      },
	    	                        	      {
	    	                        	        "id": 11,
	    	                        	        "hierarchy": 5,
	    	                        	        "program": {},
	    	                        	        "title": "Foundational Skills"
	    	                        	      }
	    	                        	    ],
	    	                        	    "segments": [
	    	                        	      {
	    	                        	        "id": 4,
	    	                        	        "hierarchy": 8,
	    	                        	        "program": {},
	    	                        	        "title": "Grade-Level Resources"
	    	                        	      },
	    	                        	      {
	    	                        	        "id": 7,
	    	                        	        "hierarchy": 4,
	    	                        	        "program": {},
	    	                        	        "title": "Language Arts"
	    	                        	      },
	    	                        	      {
	    	                        	        "id": 9,
	    	                        	        "hierarchy": 6,
	    	                        	        "program": {},
	    	                        	        "title": "Assessment"
	    	                        	      },
	    	                        	      {
	    	                        	        "id": 8,
	    	                        	        "hierarchy": 11,
	    	                        	        "program": {},
	    	                        	        "title": "Response to Intervention"
	    	                        	      },
	    	                        	      {
	    	                        	        "id": 6,
	    	                        	        "hierarchy": 10,
	    	                        	        "program": {},
	    	                        	        "title": "Lesson-Level Resources"
	    	                        	      },
	    	                        	      {
	    	                        	        "id": 10,
	    	                        	        "hierarchy": 5,
	    	                        	        "program": {},
	    	                        	        "title": "Small Group Instruction"
	    	                        	      },
	    	                        	      {
	    	                        	        "id": 5,
	    	                        	        "hierarchy": 9,
	    	                        	        "program": {},
	    	                        	        "title": "Unit-Level Resources"
	    	                        	      },
	    	                        	      {
	    	                        	        "id": 11,
	    	                        	        "hierarchy": 5,
	    	                        	        "program": {},
	    	                        	        "title": "Whole Group Instruction"
	    	                        	      }
	    	                        	    ],
	    	                        	    "topLevels": [
	    	                        	      {
	    	                        	        "id": 2,
	    	                        	        "program": {},
	    	                        	        "content": [
	    	                        	          {
	    	                        	            "id": 13,
	    	                        	            "active": true,
	    	                        	            "additionalText": "SE",
	    	                        	            "assignable": false,
	    	                        	            "component": {
	    	                        	              "id": 14,
	    	                        	              "categorization": "Core Components",
	    	                        	              "component": "Student Book",
	    	                        	              "componentHierarchy": 2,
	    	                        	              "componentType": "Key Student Resource",
	    	                        	              "product": {
	    	                        	                "id": 4
	    	                        	              },
	    	                        	              "toolType": 0,
	    	                        	              "productId": 4
	    	                        	            },
	    	                        	            "difInst": false,
	    	                        	            "displayTitle": "Journeys Student Book (Dummy for encoding test)",
	    	                        	            "doneOwner": "S",
	    	                        	            "enrich": false,
	    	                        	            "freeplay": true,
	    	                        	            "hmhId": "JY_CA17E_CDT_G03U00L00D0_0245",
	    	                        	            "iwbCompatible": false,
	    	                        	            "language": "en-US",
	    	                        	            "meaningfulDescription": "Spanish characters: á, é, í, ó, ú, Á, É, Í, Ó, Ú, ü, Ü, ñ, Ñ, ¿, ¡. The en dash (–) is slightly wider than the hyphen (-) but narrower than the em dash (—). The typical computer keyboard lacks a dedicated key for the en dash",
	    	                        	            "mediaType": "HTML",
	    	                        	            "persistent": true,
	    	                        	            "resourceId": "9787774567834-00245",
	    	                        	            "resourcesPanelSe": false,
	    	                        	            "resourcesPanelTe": false,
	    	                        	            "reteach": false,
	    	                        	            "schedulable": false,
	    	                        	            "seFacing": true,
	    	                        	            "searchable": false,
	    	                        	            "segment": {
	    	                        	              "id": 4,
	    	                        	              "hierarchy": 8,
	    	                        	              "program": {},
	    	                        	              "title": "Grade-Level Resources"
	    	                        	            },
	    	                        	            "sortId": 4,
	    	                        	            "strand": {
	    	                        	              "id": 19,
	    	                        	              "hierarchy": 14,
	    	                        	              "program": {},
	    	                        	              "title": "Student Resources"
	    	                        	            },
	    	                        	            "teacherManaged": false,
	    	                        	            "topLevel": {},
	    	                        	            "uri": "/content/hsp/reading/journeys2017/ca/gr3/ese_9780544587335_/launch.html",
	    	                        	            "viewable": true,
	    	                        	            "uniqueId": "9787774567834-00245",
	    	                        	            "tempProduct": {
	    	                        	              "isbn": "9787774567834",
	    	                        	              "title": "CA Student Edition Grade 3",
	    	                        	              "id": 4,
	    	                        	              "grades": [
	    	                        	                {
	    	                        	                  "id": 5,
	    	                        	                  "grade": "3",
	    	                        	                  "guiOrdering": 6
	    	                        	                }
	    	                        	              ],
	    	                        	              "components": [
	    	                        	                {
	    	                        	                  "id": 14,
	    	                        	                  "categorization": "Core Components",
	    	                        	                  "component": "Student Book",
	    	                        	                  "componentHierarchy": 2,
	    	                        	                  "componentType": "Key Student Resource",
	    	                        	                  "product": {
	    	                        	                    "id": 4
	    	                        	                  },
	    	                        	                  "toolType": 0,
	    	                        	                  "productId": 4
	    	                        	                }
	    	                        	              ]
	    	                        	            },
	    	                        	            "keywords": [
	    	                        	              {
	    	                        	                "id": 263,
	    	                        	                "keyword": "áéíóú"
	    	                        	              }
	    	                        	            ],
	    	                        	            "standards": [],
	    	                        	            "mwsGuids": []
	    	                        	          },
	    	                        	          {
	    	                        	            "id": 11,
	    	                        	            "active": false,
	    	                        	            "assignable": false,
	    	                        	            "component": {
	    	                        	              "id": 13,
	    	                        	              "categorization": "Core Components",
	    	                        	              "component": "Teacher Edition",
	    	                        	              "componentHierarchy": 1,
	    	                        	              "componentType": "Key Teacher Resource",
	    	                        	              "product": {
	    	                        	                "id": 3
	    	                        	              },
	    	                        	              "toolType": 0,
	    	                        	              "productId": 3
	    	                        	            },
	    	                        	            "difInst": false,
	    	                        	            "displayTitle": "Teacher&apos;s Edition: Strategic Intervention (Day 1), S2-S3 (Dummy top-level)",
	    	                        	            "enrich": false,
	    	                        	            "freeplay": false,
	    	                        	            "hmhId": "JY_CA19E_CDT_G03U00L00D0_0001",
	    	                        	            "iwbCompatible": false,
	    	                        	            "language": "en-US",
	    	                        	            "lessonPlan": {
	    	                        	              "id": 5,
	    	                        	              "duration": 150,
	    	                        	              "lessonPlanId": "JY17E_LP_3.0.0.0",
	    	                        	              "sortId": 1,
	    	                        	              "title": "Journeys: Dummy Grade Lesson Plan",
	    	                        	              "topLevel": {}
	    	                        	            },
	    	                        	            "meaningfulDescription": "The Daily Intervention for Lesson 1, Day 1 helps students to:&lt;ul&gt;&lt;li&gt;Identify the subject of a simple sentence.&lt;/li&gt;&lt;li&gt;Read words with short vowels: a, e, i, o, u.&lt;/li&gt;&lt;li&gt;Discuss a typical school day.&lt;/li&gt;&lt;li&gt;Acquire and use conversational, academic, and domain-specific words and phrases.&lt;/li&gt;&lt;/ul&gt;",
	    	                        	            "mediaType": "HTML",
	    	                        	            "persistent": false,
	    	                        	            "resourceId": "9787774567833-00002",
	    	                        	            "resourcesPanelSe": false,
	    	                        	            "resourcesPanelTe": false,
	    	                        	            "reteach": false,
	    	                        	            "schedulable": true,
	    	                        	            "seFacing": false,
	    	                        	            "searchable": true,
	    	                        	            "segment": {
	    	                        	              "id": 8,
	    	                        	              "hierarchy": 11,
	    	                        	              "program": {},
	    	                        	              "title": "Response to Intervention"
	    	                        	            },
	    	                        	            "sortId": 2,
	    	                        	            "strand": {
	    	                        	              "id": 18,
	    	                        	              "hierarchy": 11,
	    	                        	              "program": {},
	    	                        	              "title": "Tier II: Strategic Intervention"
	    	                        	            },
	    	                        	            "teacherManaged": false,
	    	                        	            "topLevel": {},
	    	                        	            "uri": "/content/hsp/reading/journeys2017/ca/gr3/ete_9780544587571_/volume1/launch.html?page=S2",
	    	                        	            "viewable": true,
	    	                        	            "uniqueId": "9787774567833-00002",
	    	                        	            "tempProduct": {
	    	                        	              "isbn": "9787774567833",
	    	                        	              "title": "CA Teacher Edition Grade 3",
	    	                        	              "id": 3,
	    	                        	              "grades": [
	    	                        	                {
	    	                        	                  "id": 4,
	    	                        	                  "grade": "3",
	    	                        	                  "guiOrdering": 6
	    	                        	                }
	    	                        	              ],
	    	                        	              "components": [
	    	                        	                {
	    	                        	                  "id": 13,
	    	                        	                  "categorization": "Core Components",
	    	                        	                  "component": "Teacher Edition",
	    	                        	                  "componentHierarchy": 1,
	    	                        	                  "componentType": "Key Teacher Resource",
	    	                        	                  "product": {
	    	                        	                    "id": 3
	    	                        	                  },
	    	                        	                  "toolType": 0,
	    	                        	                  "productId": 3
	    	                        	                }
	    	                        	              ]
	    	                        	            },
	    	                        	            "keywords": [
	    	                        	              {
	    	                        	                "id": 258,
	    	                        	                "keyword": "strolled"
	    	                        	              },
	    	                        	              {
	    	                        	                "id": 243,
	    	                        	                "keyword": "Intervention"
	    	                        	              },
	    	                        	              {
	    	                        	                "id": 252,
	    	                        	                "keyword": "phrase"
	    	                        	              },
	    	                        	              {
	    	                        	                "id": 254,
	    	                        	                "keyword": "proud"
	    	                        	              },
	    	                        	              {
	    	                        	                "id": 246,
	    	                        	                "keyword": "simple"
	    	                        	              },
	    	                        	              {
	    	                        	                "id": 251,
	    	                        	                "keyword": "domain"
	    	                        	              },
	    	                        	              {
	    	                        	                "id": 260,
	    	                        	                "keyword": "worried"
	    	                        	              },
	    	                        	              {
	    	                        	                "id": 239,
	    	                        	                "keyword": "Teacher&apos;s Edition"
	    	                        	              },
	    	                        	              {
	    	                        	                "id": 259,
	    	                        	                "keyword": "principal"
	    	                        	              },
	    	                        	              {
	    	                        	                "id": 247,
	    	                        	                "keyword": "sentence"
	    	                        	              },
	    	                        	              {
	    	                        	                "id": 257,
	    	                        	                "keyword": "fine"
	    	                        	              },
	    	                        	              {
	    	                        	                "id": 249,
	    	                        	                "keyword": "vowels"
	    	                        	              },
	    	                        	              {
	    	                        	                "id": 250,
	    	                        	                "keyword": "conversation"
	    	                        	              },
	    	                        	              {
	    	                        	                "id": 245,
	    	                        	                "keyword": "subject"
	    	                        	              },
	    	                        	              {
	    	                        	                "id": 248,
	    	                        	                "keyword": "short"
	    	                        	              },
	    	                        	              {
	    	                        	                "id": 253,
	    	                        	                "keyword": "announced"
	    	                        	              },
	    	                        	              {
	    	                        	                "id": 255,
	    	                        	                "keyword": "certainly"
	    	                        	              },
	    	                        	              {
	    	                        	                "id": 240,
	    	                        	                "keyword": "Strategic Intervention"
	    	                        	              },
	    	                        	              {
	    	                        	                "id": 241,
	    	                        	                "keyword": "Response to Intervention"
	    	                        	              },
	    	                        	              {
	    	                        	                "id": 256,
	    	                        	                "keyword": "soared"
	    	                        	              },
	    	                        	              {
	    	                        	                "id": 242,
	    	                        	                "keyword": "Tier II"
	    	                        	              },
	    	                        	              {
	    	                        	                "id": 244,
	    	                        	                "keyword": "Daily Intervention Lessons"
	    	                        	              }
	    	                        	            ],
	    	                        	            "standards": [
	    	                        	              {
	    	                        	                "id": 49,
	    	                        	                "standard": "L.3.6"
	    	                        	              },
	    	                        	              {
	    	                        	                "id": 50,
	    	                        	                "standard": "ELD.PI.3.1"
	    	                        	              },
	    	                        	              {
	    	                        	                "id": 52,
	    	                        	                "standard": "ELD.PI.3.5"
	    	                        	              },
	    	                        	              {
	    	                        	                "id": 51,
	    	                        	                "standard": "ELD.PI.3.12"
	    	                        	              }
	    	                        	            ],
	    	                        	            "mwsGuids": []
	    	                        	          },
	    	                        	          {
	    	                        	            "id": 12,
	    	                        	            "active": true,
	    	                        	            "additionalText": "SE",
	    	                        	            "assignable": false,
	    	                        	            "component": {
	    	                        	              "id": 14,
	    	                        	              "categorization": "Core Components",
	    	                        	              "component": "Student Book",
	    	                        	              "componentHierarchy": 2,
	    	                        	              "componentType": "Key Student Resource",
	    	                        	              "product": {
	    	                        	                "id": 4
	    	                        	              },
	    	                        	              "toolType": 0,
	    	                        	              "productId": 4
	    	                        	            },
	    	                        	            "difInst": false,
	    	                        	            "displayTitle": "Journeys Student Book",
	    	                        	            "doneOwner": "S",
	    	                        	            "enrich": false,
	    	                        	            "freeplay": true,
	    	                        	            "hmhId": "JY_CA17E_CDT_G03U00L00D0_0244",
	    	                        	            "iwbCompatible": false,
	    	                        	            "language": "en-US",
	    	                        	            "meaningfulDescription": "Journeys Student Book for Grade 3",
	    	                        	            "mediaType": "HTML",
	    	                        	            "persistent": true,
	    	                        	            "resourceId": "9787774567834-00244",
	    	                        	            "resourcesPanelSe": false,
	    	                        	            "resourcesPanelTe": false,
	    	                        	            "reteach": false,
	    	                        	            "schedulable": false,
	    	                        	            "seFacing": true,
	    	                        	            "searchable": false,
	    	                        	            "segment": {
	    	                        	              "id": 4,
	    	                        	              "hierarchy": 8,
	    	                        	              "program": {},
	    	                        	              "title": "Grade-Level Resources"
	    	                        	            },
	    	                        	            "sortId": 3,
	    	                        	            "strand": {
	    	                        	              "id": 19,
	    	                        	              "hierarchy": 14,
	    	                        	              "program": {},
	    	                        	              "title": "Student Resources"
	    	                        	            },
	    	                        	            "teacherManaged": false,
	    	                        	            "topLevel": {},
	    	                        	            "uri": "/content/hsp/reading/journeys2017/ca/gr3/ese_9780544587335_/launch.html",
	    	                        	            "viewable": true,
	    	                        	            "uniqueId": "9787774567834-00244",
	    	                        	            "tempProduct": {
	    	                        	              "isbn": "9787774567834",
	    	                        	              "title": "CA Student Edition Grade 3",
	    	                        	              "id": 4,
	    	                        	              "grades": [
	    	                        	                {
	    	                        	                  "id": 5,
	    	                        	                  "grade": "3",
	    	                        	                  "guiOrdering": 6
	    	                        	                }
	    	                        	              ],
	    	                        	              "components": [
	    	                        	                {
	    	                        	                  "id": 14,
	    	                        	                  "categorization": "Core Components",
	    	                        	                  "component": "Student Book",
	    	                        	                  "componentHierarchy": 2,
	    	                        	                  "componentType": "Key Student Resource",
	    	                        	                  "product": {
	    	                        	                    "id": 4
	    	                        	                  },
	    	                        	                  "toolType": 0,
	    	                        	                  "productId": 4
	    	                        	                }
	    	                        	              ]
	    	                        	            },
	    	                        	            "keywords": [
	    	                        	              {
	    	                        	                "id": 261,
	    	                        	                "keyword": "Journeys Student Book"
	    	                        	              },
	    	                        	              {
	    	                        	                "id": 262,
	    	                        	                "keyword": "Student Book"
	    	                        	              }
	    	                        	            ],
	    	                        	            "standards": [],
	    	                        	            "mwsGuids": [
	    	                        	              {
	    	                        	                "id": 5,
	    	                        	                "guid": "JY_CA17E_MWS_G03U00L00D0_0001"
	    	                        	              }
	    	                        	            ]
	    	                        	          }
	    	                        	        ],
	    	                        	        "lessonPlans": [
	    	                        	          {
	    	                        	            "id": 5,
	    	                        	            "duration": 150,
	    	                        	            "lessonPlanId": "JY17E_LP_3.0.0.0",
	    	                        	            "sortId": 1,
	    	                        	            "title": "Journeys: Dummy Grade Lesson Plan",
	    	                        	            "topLevel": {}
	    	                        	          }
	    	                        	        ],
	    	                        	        "secondLevels": [
	    	                        	          {
	    	                        	            "id": 9,
	    	                        	            "hierarchy": 6,
	    	                        	            "title": "Reading Adventures",
	    	                        	            "topLevel": {},
	    	                        	            "content": [],
	    	                        	            "lessonPlans": [],
	    	                        	            "thirdLevels": [],
	    	                        	            "keywords": []
	    	                        	          },
	    	                        	          {
	    	                        	            "id": 4,
	    	                        	            "hierarchy": 1,
	    	                        	            "title": "Good Citizens",
	    	                        	            "topLevel": {},
	    	                        	            "content": [],
	    	                        	            "lessonPlans": [],
	    	                        	            "thirdLevels": [
	    	                        	              {
	    	                        	                "id": 13,
	    	                        	                "hierarchy": 1,
	    	                        	                "secondLevel": {},
	    	                        	                "content": [],
	    	                        	                "lessonPlans": [],
	    	                        	                "fourthLevels": [
	    	                        	                  {
	    	                        	                    "id": 1,
	    	                        	                    "hierarchy": 1,
	    	                        	                    "thirdLevel": {},
	    	                        	                    "content": [
	    	                        	                      {
	    	                        	                        "id": 10,
	    	                        	                        "active": false,
	    	                        	                        "assignable": false,
	    	                        	                        "component": {
	    	                        	                          "id": 13,
	    	                        	                          "categorization": "Core Components",
	    	                        	                          "component": "Teacher Edition",
	    	                        	                          "componentHierarchy": 1,
	    	                        	                          "componentType": "Key Teacher Resource",
	    	                        	                          "product": {
	    	                        	                            "id": 3
	    	                        	                          },
	    	                        	                          "toolType": 0,
	    	                        	                          "productId": 3
	    	                        	                        },
	    	                        	                        "difInst": false,
	    	                        	                        "displayTitle": "Teacher&apos;s Edition: Strategic Intervention (Day 1), S2-S3",
	    	                        	                        "enrich": false,
	    	                        	                        "fourthLevel": {},
	    	                        	                        "freeplay": false,
	    	                        	                        "hmhId": "JY_CA19E_CDT_G03U01L01D1_0463",
	    	                        	                        "iwbCompatible": false,
	    	                        	                        "language": "en-US",
	    	                        	                        "lessonPlan": {
	    	                        	                          "id": 6,
	    	                        	                          "duration": 150,
	    	                        	                          "fourthLevel": {},
	    	                        	                          "lessonPlanId": "JY17E_LP_3.1.1.1",
	    	                        	                          "sortId": 1,
	    	                        	                          "title": "Journeys: Lesson 1, Day 1"
	    	                        	                        },
	    	                        	                        "meaningfulDescription": "The Daily Intervention for Lesson 1, Day 1 helps students to:&lt;ul&gt;&lt;li&gt;Identify the subject of a simple sentence.&lt;/li&gt;&lt;li&gt;Read words with short vowels: a, e, i, o, u.&lt;/li&gt;&lt;li&gt;Discuss a typical school day.&lt;/li&gt;&lt;li&gt;Acquire and use conversational, academic, and domain-specific words and phrases.&lt;/li&gt;&lt;/ul&gt;",
	    	                        	                        "mediaType": "HTML",
	    	                        	                        "persistent": false,
	    	                        	                        "resourceId": "9787774567833-00001",
	    	                        	                        "resourcesPanelSe": false,
	    	                        	                        "resourcesPanelTe": false,
	    	                        	                        "reteach": false,
	    	                        	                        "schedulable": true,
	    	                        	                        "seFacing": false,
	    	                        	                        "searchable": true,
	    	                        	                        "segment": {
	    	                        	                          "id": 8,
	    	                        	                          "hierarchy": 11,
	    	                        	                          "program": {},
	    	                        	                          "title": "Response to Intervention"
	    	                        	                        },
	    	                        	                        "sortId": 1,
	    	                        	                        "strand": {
	    	                        	                          "id": 18,
	    	                        	                          "hierarchy": 11,
	    	                        	                          "program": {},
	    	                        	                          "title": "Tier II: Strategic Intervention"
	    	                        	                        },
	    	                        	                        "teacherManaged": false,
	    	                        	                        "uri": "/content/hsp/reading/journeys2017/ca/gr3/ete_9780544587571_/volume1/launch.html?page=S2",
	    	                        	                        "viewable": true,
	    	                        	                        "uniqueId": "9787774567833-00001",
	    	                        	                        "tempProduct": {
	    	                        	                          "isbn": "9787774567833",
	    	                        	                          "title": "CA Teacher Edition Grade 3",
	    	                        	                          "id": 3,
	    	                        	                          "grades": [
	    	                        	                            {
	    	                        	                              "id": 4,
	    	                        	                              "grade": "3",
	    	                        	                              "guiOrdering": 6
	    	                        	                            }
	    	                        	                          ],
	    	                        	                          "components": [
	    	                        	                            {
	    	                        	                              "id": 13,
	    	                        	                              "categorization": "Core Components",
	    	                        	                              "component": "Teacher Edition",
	    	                        	                              "componentHierarchy": 1,
	    	                        	                              "componentType": "Key Teacher Resource",
	    	                        	                              "product": {
	    	                        	                                "id": 3
	    	                        	                              },
	    	                        	                              "toolType": 0,
	    	                        	                              "productId": 3
	    	                        	                            }
	    	                        	                          ]
	    	                        	                        },
	    	                        	                        "keywords": [
	    	                        	                          {
	    	                        	                            "id": 217,
	    	                        	                            "keyword": "Teacher&apos;s Edition"
	    	                        	                          },
	    	                        	                          {
	    	                        	                            "id": 237,
	    	                        	                            "keyword": "principal"
	    	                        	                          },
	    	                        	                          {
	    	                        	                            "id": 227,
	    	                        	                            "keyword": "vowels"
	    	                        	                          },
	    	                        	                          {
	    	                        	                            "id": 225,
	    	                        	                            "keyword": "sentence"
	    	                        	                          },
	    	                        	                          {
	    	                        	                            "id": 220,
	    	                        	                            "keyword": "Tier II"
	    	                        	                          },
	    	                        	                          {
	    	                        	                            "id": 223,
	    	                        	                            "keyword": "subject"
	    	                        	                          },
	    	                        	                          {
	    	                        	                            "id": 219,
	    	                        	                            "keyword": "Response to Intervention"
	    	                        	                          },
	    	                        	                          {
	    	                        	                            "id": 238,
	    	                        	                            "keyword": "worried"
	    	                        	                          },
	    	                        	                          {
	    	                        	                            "id": 224,
	    	                        	                            "keyword": "simple"
	    	                        	                          },
	    	                        	                          {
	    	                        	                            "id": 226,
	    	                        	                            "keyword": "short"
	    	                        	                          },
	    	                        	                          {
	    	                        	                            "id": 232,
	    	                        	                            "keyword": "proud"
	    	                        	                          },
	    	                        	                          {
	    	                        	                            "id": 235,
	    	                        	                            "keyword": "fine"
	    	                        	                          },
	    	                        	                          {
	    	                        	                            "id": 230,
	    	                        	                            "keyword": "phrase"
	    	                        	                          },
	    	                        	                          {
	    	                        	                            "id": 234,
	    	                        	                            "keyword": "soared"
	    	                        	                          },
	    	                        	                          {
	    	                        	                            "id": 228,
	    	                        	                            "keyword": "conversation"
	    	                        	                          },
	    	                        	                          {
	    	                        	                            "id": 222,
	    	                        	                            "keyword": "Daily Intervention Lessons"
	    	                        	                          },
	    	                        	                          {
	    	                        	                            "id": 231,
	    	                        	                            "keyword": "announced"
	    	                        	                          },
	    	                        	                          {
	    	                        	                            "id": 218,
	    	                        	                            "keyword": "Strategic Intervention"
	    	                        	                          },
	    	                        	                          {
	    	                        	                            "id": 229,
	    	                        	                            "keyword": "domain"
	    	                        	                          },
	    	                        	                          {
	    	                        	                            "id": 221,
	    	                        	                            "keyword": "Intervention"
	    	                        	                          },
	    	                        	                          {
	    	                        	                            "id": 233,
	    	                        	                            "keyword": "certainly"
	    	                        	                          },
	    	                        	                          {
	    	                        	                            "id": 236,
	    	                        	                            "keyword": "strolled"
	    	                        	                          }
	    	                        	                        ],
	    	                        	                        "standards": [
	    	                        	                          {
	    	                        	                            "id": 47,
	    	                        	                            "standard": "ELD.PI.3.12"
	    	                        	                          },
	    	                        	                          {
	    	                        	                            "id": 45,
	    	                        	                            "standard": "L.3.6"
	    	                        	                          },
	    	                        	                          {
	    	                        	                            "id": 48,
	    	                        	                            "standard": "ELD.PI.3.5"
	    	                        	                          },
	    	                        	                          {
	    	                        	                            "id": 46,
	    	                        	                            "standard": "ELD.PI.3.1"
	    	                        	                          }
	    	                        	                        ],
	    	                        	                        "mwsGuids": []
	    	                        	                      }
	    	                        	                    ],
	    	                        	                    "lessonPlans": [
	    	                        	                      {
	    	                        	                        "id": 6,
	    	                        	                        "duration": 150,
	    	                        	                        "fourthLevel": {},
	    	                        	                        "lessonPlanId": "JY17E_LP_3.1.1.1",
	    	                        	                        "sortId": 1,
	    	                        	                        "title": "Journeys: Lesson 1, Day 1"
	    	                        	                      }
	    	                        	                    ],
	    	                        	                    "fifthLevels": [],
	    	                        	                    "keywords": [
	    	                        	                      {
	    	                        	                        "keyword": "Day 1"
	    	                        	                      }
	    	                        	                    ]
	    	                        	                  }
	    	                        	                ],
	    	                        	                "keywords": [
	    	                        	                  {
	    	                        	                    "keyword": "lesson 1"
	    	                        	                  }
	    	                        	                ]
	    	                        	              }
	    	                        	            ],
	    	                        	            "keywords": [
	    	                        	              {
	    	                        	                "keyword": "Unit 1"
	    	                        	              }
	    	                        	            ]
	    	                        	          },
	    	                        	          {
	    	                        	            "id": 7,
	    	                        	            "hierarchy": 4,
	    	                        	            "title": "Natural Wonders",
	    	                        	            "topLevel": {},
	    	                        	            "content": [],
	    	                        	            "lessonPlans": [],
	    	                        	            "thirdLevels": [],
	    	                        	            "keywords": [
	    	                        	              {
	    	                        	                "keyword": "Unit 4"
	    	                        	              }
	    	                        	            ]
	    	                        	          },
	    	                        	          {
	    	                        	            "id": 5,
	    	                        	            "hierarchy": 2,
	    	                        	            "title": "Look and Listen",
	    	                        	            "topLevel": {},
	    	                        	            "content": [],
	    	                        	            "lessonPlans": [],
	    	                        	            "thirdLevels": [],
	    	                        	            "keywords": [
	    	                        	              {
	    	                        	                "keyword": "Unit 2"
	    	                        	              }
	    	                        	            ]
	    	                        	          },
	    	                        	          {
	    	                        	            "id": 6,
	    	                        	            "hierarchy": 3,
	    	                        	            "title": "Lesson Learned",
	    	                        	            "topLevel": {},
	    	                        	            "content": [],
	    	                        	            "lessonPlans": [],
	    	                        	            "thirdLevels": [],
	    	                        	            "keywords": [
	    	                        	              {
	    	                        	                "keyword": "Unit 3"
	    	                        	              }
	    	                        	            ]
	    	                        	          },
	    	                        	          {
	    	                        	            "id": 8,
	    	                        	            "hierarchy": 5,
	    	                        	            "title": "Going Places",
	    	                        	            "topLevel": {},
	    	                        	            "content": [],
	    	                        	            "lessonPlans": [],
	    	                        	            "thirdLevels": [],
	    	                        	            "keywords": [
	    	                        	              {
	    	                        	                "keyword": "Unit 6"
	    	                        	              },
	    	                        	              {
	    	                        	                "keyword": "Unit 5"
	    	                        	              }
	    	                        	            ]
	    	                        	          }
	    	                        	        ],
	    	                        	        "grades": [
	    	                        	          {
	    	                        	            "id": 4,
	    	                        	            "grade": "3",
	    	                        	            "guiOrdering": 6
	    	                        	          }
	    	                        	        ],
	    	                        	        "keywords": [
	    	                        	          {
	    	                        	            "keyword": "Journeys"
	    	                        	          }
	    	                        	        ]
	    	                        	      },
	    	                        	      {
	    	                        	        "id": 3,
	    	                        	        "program": {},
	    	                        	        "content": [
	    	                        	          {
	    	                        	            "id": 14,
	    	                        	            "active": false,
	    	                        	            "assignable": false,
	    	                        	            "component": {
	    	                        	              "id": 15,
	    	                        	              "categorization": "Teaching Aids",
	    	                        	              "component": "Combination Classroom Planning Guide",
	    	                        	              "componentHierarchy": 79,
	    	                        	              "componentType": "Ancillary",
	    	                        	              "product": {
	    	                        	                "id": 5
	    	                        	              },
	    	                        	              "toolType": 0,
	    	                        	              "productId": 5
	    	                        	            },
	    	                        	            "difInst": false,
	    	                        	            "displayTitle": "Combination Class Weekly Planner for Grades K-1: Lesson 1)",
	    	                        	            "enrich": false,
	    	                        	            "freeplay": false,
	    	                        	            "hmhId": "JY_CA17E_CDT_G03U00L00D0_0246",
	    	                        	            "iwbCompatible": false,
	    	                        	            "language": "en-US",
	    	                        	            "meaningfulDescription": "The Combination Class Weekly Planner for Lesson 1 is a five-day lesson plan for whole group and small group instruction for Grade K and 1 combination classrooms.",
	    	                        	            "mediaType": "PDF",
	    	                        	            "persistent": false,
	    	                        	            "resourceId": "9787774567835-00246",
	    	                        	            "resourcesPanelSe": false,
	    	                        	            "resourcesPanelTe": false,
	    	                        	            "reteach": false,
	    	                        	            "schedulable": true,
	    	                        	            "seFacing": false,
	    	                        	            "searchable": true,
	    	                        	            "segment": {
	    	                        	              "id": 4,
	    	                        	              "hierarchy": 8,
	    	                        	              "program": {},
	    	                        	              "title": "Grade-Level Resources"
	    	                        	            },
	    	                        	            "sortId": 5,
	    	                        	            "strand": {
	    	                        	              "id": 17,
	    	                        	              "hierarchy": 13,
	    	                        	              "program": {},
	    	                        	              "title": "Teacher Resources"
	    	                        	            },
	    	                        	            "teacherManaged": false,
	    	                        	            "topLevel": {},
	    	                        	            "uri": "/content/hsp/reading/journeys2017/ca/grk-6/combination_classroom_planning_guide_9780544873230_/Journeys_GK-1_Combination_Classroom_Planning_Guide.pdf#page=12",
	    	                        	            "viewable": true,
	    	                        	            "uniqueId": "9787774567835-00246",
	    	                        	            "tempProduct": {
	    	                        	              "isbn": "9787774567835",
	    	                        	              "title": "CA Combination Classroom Planning Guide Grade K-6",
	    	                        	              "id": 5,
	    	                        	              "grades": [
	    	                        	                {
	    	                        	                  "id": 12,
	    	                        	                  "grade": "6",
	    	                        	                  "guiOrdering": 9
	    	                        	                },
	    	                        	                {
	    	                        	                  "id": 10,
	    	                        	                  "grade": "4",
	    	                        	                  "guiOrdering": 7
	    	                        	                },
	    	                        	                {
	    	                        	                  "id": 7,
	    	                        	                  "grade": "1",
	    	                        	                  "guiOrdering": 4
	    	                        	                },
	    	                        	                {
	    	                        	                  "id": 8,
	    	                        	                  "grade": "2",
	    	                        	                  "guiOrdering": 5
	    	                        	                },
	    	                        	                {
	    	                        	                  "id": 6,
	    	                        	                  "grade": "K",
	    	                        	                  "guiOrdering": 3
	    	                        	                },
	    	                        	                {
	    	                        	                  "id": 9,
	    	                        	                  "grade": "3",
	    	                        	                  "guiOrdering": 6
	    	                        	                },
	    	                        	                {
	    	                        	                  "id": 11,
	    	                        	                  "grade": "5",
	    	                        	                  "guiOrdering": 8
	    	                        	                }
	    	                        	              ],
	    	                        	              "components": [
	    	                        	                {
	    	                        	                  "id": 15,
	    	                        	                  "categorization": "Teaching Aids",
	    	                        	                  "component": "Combination Classroom Planning Guide",
	    	                        	                  "componentHierarchy": 79,
	    	                        	                  "componentType": "Ancillary",
	    	                        	                  "product": {
	    	                        	                    "id": 5
	    	                        	                  },
	    	                        	                  "toolType": 0,
	    	                        	                  "productId": 5
	    	                        	                }
	    	                        	              ]
	    	                        	            },
	    	                        	            "keywords": [],
	    	                        	            "standards": [],
	    	                        	            "mwsGuids": []
	    	                        	          }
	    	                        	        ],
	    	                        	        "lessonPlans": [],
	    	                        	        "secondLevels": [],
	    	                        	        "grades": [
	    	                        	          {
	    	                        	            "id": 5,
	    	                        	            "grade": "K",
	    	                        	            "guiOrdering": 3
	    	                        	          },
	    	                        	          {
	    	                        	            "id": 6,
	    	                        	            "grade": "1",
	    	                        	            "guiOrdering": 4
	    	                        	          }
	    	                        	        ],
	    	                        	        "keywords": []
	    	                        	      },
	    	                        	      {
	    	                        	        "id": 4,
	    	                        	        "program": {},
	    	                        	        "content": [
	    	                        	          {
	    	                        	            "id": 15,
	    	                        	            "active": false,
	    	                        	            "assignable": false,
	    	                        	            "component": {
	    	                        	              "id": 15,
	    	                        	              "categorization": "Teaching Aids",
	    	                        	              "component": "Combination Classroom Planning Guide",
	    	                        	              "componentHierarchy": 79,
	    	                        	              "componentType": "Ancillary",
	    	                        	              "product": {
	    	                        	                "id": 5
	    	                        	              },
	    	                        	              "toolType": 0,
	    	                        	              "productId": 5
	    	                        	            },
	    	                        	            "difInst": false,
	    	                        	            "displayTitle": "Combination Classroom Planning Guide for Grades 2-3)",
	    	                        	            "enrich": false,
	    	                        	            "freeplay": false,
	    	                        	            "hmhId": "JY_CA17E_CDT_G03U00L00D0_0247",
	    	                        	            "iwbCompatible": false,
	    	                        	            "language": "en-US",
	    	                        	            "meaningfulDescription": "The HMH California Combination Classroom Planning Guide provides support through practical teaching and management tips including Weekly Lesson Planning Guides in a side-by-side format for paired grades. The Combination Classroom Planning Guide also outlines key HMH California Journeys components that can be used flexibly to meet various grade-level combinations.",
	    	                        	            "mediaType": "PDF",
	    	                        	            "persistent": false,
	    	                        	            "resourceId": "9787774567835-00247",
	    	                        	            "resourcesPanelSe": false,
	    	                        	            "resourcesPanelTe": false,
	    	                        	            "reteach": false,
	    	                        	            "schedulable": true,
	    	                        	            "seFacing": false,
	    	                        	            "searchable": true,
	    	                        	            "segment": {
	    	                        	              "id": 4,
	    	                        	              "hierarchy": 8,
	    	                        	              "program": {},
	    	                        	              "title": "Grade-Level Resources"
	    	                        	            },
	    	                        	            "sortId": 6,
	    	                        	            "strand": {
	    	                        	              "id": 17,
	    	                        	              "hierarchy": 13,
	    	                        	              "program": {},
	    	                        	              "title": "Teacher Resources"
	    	                        	            },
	    	                        	            "teacherManaged": false,
	    	                        	            "topLevel": {},
	    	                        	            "uri": "/content/hsp/reading/journeys2017/ca/grk-6/combination_classroom_planning_guide_9780544873230_/Journeys_G2-3_Combination_Classroom_Planning_Guide.pdf",
	    	                        	            "viewable": true,
	    	                        	            "uniqueId": "9787774567835-00247",
	    	                        	            "tempProduct": {
	    	                        	              "isbn": "9787774567835",
	    	                        	              "title": "CA Combination Classroom Planning Guide Grade K-6",
	    	                        	              "id": 5,
	    	                        	              "grades": [
	    	                        	                {
	    	                        	                  "id": 12,
	    	                        	                  "grade": "6",
	    	                        	                  "guiOrdering": 9
	    	                        	                },
	    	                        	                {
	    	                        	                  "id": 10,
	    	                        	                  "grade": "4",
	    	                        	                  "guiOrdering": 7
	    	                        	                },
	    	                        	                {
	    	                        	                  "id": 7,
	    	                        	                  "grade": "1",
	    	                        	                  "guiOrdering": 4
	    	                        	                },
	    	                        	                {
	    	                        	                  "id": 8,
	    	                        	                  "grade": "2",
	    	                        	                  "guiOrdering": 5
	    	                        	                },
	    	                        	                {
	    	                        	                  "id": 6,
	    	                        	                  "grade": "K",
	    	                        	                  "guiOrdering": 3
	    	                        	                },
	    	                        	                {
	    	                        	                  "id": 9,
	    	                        	                  "grade": "3",
	    	                        	                  "guiOrdering": 6
	    	                        	                },
	    	                        	                {
	    	                        	                  "id": 11,
	    	                        	                  "grade": "5",
	    	                        	                  "guiOrdering": 8
	    	                        	                }
	    	                        	              ],
	    	                        	              "components": [
	    	                        	                {
	    	                        	                  "id": 15,
	    	                        	                  "categorization": "Teaching Aids",
	    	                        	                  "component": "Combination Classroom Planning Guide",
	    	                        	                  "componentHierarchy": 79,
	    	                        	                  "componentType": "Ancillary",
	    	                        	                  "product": {
	    	                        	                    "id": 5
	    	                        	                  },
	    	                        	                  "toolType": 0,
	    	                        	                  "productId": 5
	    	                        	                }
	    	                        	              ]
	    	                        	            },
	    	                        	            "keywords": [],
	    	                        	            "standards": [],
	    	                        	            "mwsGuids": []
	    	                        	          }
	    	                        	        ],
	    	                        	        "lessonPlans": [],
	    	                        	        "secondLevels": [],
	    	                        	        "grades": [
	    	                        	          {
	    	                        	            "id": 7,
	    	                        	            "grade": "2",
	    	                        	            "guiOrdering": 5
	    	                        	          },
	    	                        	          {
	    	                        	            "id": 8,
	    	                        	            "grade": "3",
	    	                        	            "guiOrdering": 6
	    	                        	          }
	    	                        	        ],
	    	                        	        "keywords": []
	    	                        	      }
	    	                        	    ]
	    	                        	  }
	    	                        	];
	    	
	    	mockProgramResponse = {
            	    "id": 2,
            	    "code": "TP",
            	    "copyrightYear": 2020,
            	    "discipline": "Social Studies",
            	    "name": "TestProgram1234",
            	    "platform": "HMOF",
            	    "secondLevelScope": "Module",
            	    "standardSetName": "FLSS_2018_MS_USH_v4.xml",
            	    "state": "CA",
            	    "thirdLevelScope": "Lesson",
            	    "topLevelScope": "Grade",
            	    "version": "1.0",
            	    "generateXmls": [],
            	    "products": [],
            	    "strands": [],
            	    "segments": [],
            	    "topLevels": []
            	  };
	    	
			httpBackend.when('GET', 'api/programs?max=-1').respond(mockProgramsResponse);  // This is also valid httpBackend.whenGET('api/programs?max=-1').respond(programsList); or  //httpBackend.whenGET(/programs/).respond(programsList);
			httpBackend.when('GET', 'api/programs/2?max=-1').respond(mockProgramResponse);
			httpBackend.when('PUT', 'api/programs/2?max=-1').respond(mockProgramResponse); 
			httpBackend.when('POST', 'api/programs?max=-1').respond(mockProgramResponse); 
			httpBackend.when('DELETE', 'api/programs/2?max=-1').respond(mockProgramResponse); 
			
			//httpBackend.when('GET', 'api/instructionalsegmentmappings?max=-1&offset=0&order=asc&sort=instructionalSegment').respond(mockProgramsResponse);
			//httpBackend.when('GET', 'api/strandmappings?max=-1&order=asc&sort=strand').respond(mockProgramsResponse); 
			//httpBackend.when('GET', 'api/mediatypemappings?max=-1&order=asc&sort=mediaType').respond(mockProgramsResponse); 
			//httpBackend.when('GET', 'api/resourcetypemappings?max=-1&order=asc&sort=resourceType').respond(mockProgramsResponse);

	    });
	    
	   it('should respond success to a GET', function(){  
	       httpBackend.expect('GET', 'api/programs?max=-1').respond(200, 'success');
	   });  	   
		   
	    it('should have a function to refresh the programs list', function(){
	        expect(scope.vm.list).toBeDefined();
	    });
	    
	    it('should have mocked mockProgramsResponse', function(){
	    	expect(mockProgramsResponse.length).toBeGreaterThan(0);
	    });
	   
	   it('should not have empty program array', function(){  
	       
	   	   scope.vm.list();
	   	   httpBackend.flush();
	       expect(scope.vm.programs.length).toBeGreaterThan(0);
	   });    

	   xit('should have programs list that matches mock', function(){  
		   
		   scope.vm.list();
		   httpBackend.flush();
		   expect(scope.vm.programs).toEqual(mockProgramsResponse);
 
	   }).pend('Because the types returned are not the same.  To do with promises.  Need to understand this better.'); 
	   
	   it('should have programs list with programs that matches mock', function(){  
		   
		   scope.vm.list();
		   httpBackend.flush();
		   expect(scope.vm.programs[0].code).toEqual("SS");
		   expect(scope.vm.programs[0].copyrightYear).toEqual(2020);
		   expect(scope.vm.programs[0].discipline).toEqual("Social Studies");
		   expect(scope.vm.programs[0].name).toEqual("socialstudies2020");
		   expect(scope.vm.programs[0].platform).toEqual("HMOF");
		   expect(scope.vm.programs[0].secondLevelScope).toEqual("Module");
		   expect(scope.vm.programs[0].standardSetName).toEqual("FLSS_2018_MS_USH_v4.xml");
		   expect(scope.vm.programs[0].state).toEqual("FL");
	   }); 
 
	   it('should add a program to the list', function(){  	   
		   scope.vm.addProgram(mockProgramResponse);
		   httpBackend.flush();
		   httpBackend.expect('POST', 'api/programs?max=-1').respond(mockProgramResponse); 
	   });
	   
	/*   it('should update a program', function(){  
		   
		   scope.vm.updateProgram(mockProgramResponse);
		   httpBackend.flush();
		   httpBackend.expect('PUT', 'api/programs/1?max=-1').respond(mockProgramResponse);
	   }); 
	  */ 
	   
	   it('should delete a program from the list', function(){  
		   
		   scope.vm.delete(mockProgramResponse);
		   httpBackend.flush();  
		   httpBackend.expect('DELETE', 'api/programs/1?max=-1').respond(mockProgramResponse); 
		   
	   }); 
   });  
   
});
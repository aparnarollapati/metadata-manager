// fdescribe or fit used to trigger just one test suite or test in a test run
describe('thirdlevelController', function() {
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
        $controller("ThirdLevelController as vm", {
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
	   it('should have empty thirdlevel array', function(){
	       expect(scope.vm.thirdLevels).toEqual(jasmine.anything());
	   });
	
	   it('should have empty thirdlevel array length', function(){   
	       expect(scope.vm.thirdLevels.length).toEqual(0);
	   });   
   });   
     
   describe('after activation', function() {   
	   var mockThirdlevelsResponse = [];
	   var mockThirdlevelResponse = null;
	   
	    beforeEach(function(){
	    	
	    	mockThirdlevelsResponse =  [{"id": 1,
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
	    	                                   "thirdLevel": {},
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
	    	                                       }
	    	                                     ]
	    	                                   },
	    	                                   "keywords": [
	    	                                     {
	    	                                       "id": 214,
	    	                                       "keyword": "rubric 1"
	    	                                     },
	    	                                     {
	    	                                       "id": 215,
	    	                                       "keyword": "acquiring information"
	    	                                     },
	    	                                     {
	    	                                       "id": 213,
	    	                                       "keyword": "rubric"
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
	    	                                       "id": 212,
	    	                                       "keyword": "rubrics"
	    	                                     },
	    	                                     {
	    	                                       "id": 216,
	    	                                       "keyword": "acquire information"
	    	                                     }
	    	                                   ],
	    	                                   "standards": [],
	    	                                   "mwsGuids": []
	    	                                 }
	    	                               ],
	    	                               "lessonPlans": [],
	    	                               "thirdLevels": [
	    	                                 {
	    	                                   "id": 1,
	    	                                   "hierarchy": 1,
	    	                                   "title": "America, Africa, and Europe before 1500",
	    	                                   "thirdLevel": {},
	    	                                   "content": [
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
	    	                                         "thirdLevel": {},
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
	    	                                       "thirdLevel": {},
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
	    	                                           }
	    	                                         ]
	    	                                       },
	    	                                       "keywords": [
	    	                                         {
	    	                                           "id": 64,
	    	                                           "keyword": "teacher ebook"
	    	                                         },
	    	                                         {
	    	                                           "id": 76,
	    	                                           "keyword": "kivas"
	    	                                         },
	    	                                         {
	    	                                           "id": 74,
	    	                                           "keyword": "culture"
	    	                                         },
	    	                                         {
	    	                                           "id": 75,
	    	                                           "keyword": "pueblos"
	    	                                         },
	    	                                         {
	    	                                           "id": 69,
	    	                                           "keyword": "bering land bridge"
	    	                                         },
	    	                                         {
	    	                                           "id": 86,
	    	                                           "keyword": "socrates"
	    	                                         },
	    	                                         {
	    	                                           "id": 95,
	    	                                           "keyword": "johannes gutenberg"
	    	                                         },
	    	                                         {
	    	                                           "id": 83,
	    	                                           "keyword": "hajj"
	    	                                         },
	    	                                         {
	    	                                           "id": 89,
	    	                                           "keyword": "reason"
	    	                                         },
	    	                                         {
	    	                                           "id": 72,
	    	                                           "keyword": "hunter-gatherers"
	    	                                         },
	    	                                         {
	    	                                           "id": 96,
	    	                                           "keyword": "joint-stock companies"
	    	                                         },
	    	                                         {
	    	                                           "id": 73,
	    	                                           "keyword": "environments"
	    	                                         },
	    	                                         {
	    	                                           "id": 80,
	    	                                           "keyword": "iroquois league"
	    	                                         },
	    	                                         {
	    	                                           "id": 85,
	    	                                           "keyword": "askia the great"
	    	                                         },
	    	                                         {
	    	                                           "id": 67,
	    	                                           "keyword": "europe before 1500"
	    	                                         },
	    	                                         {
	    	                                           "id": 93,
	    	                                           "keyword": "michelangelo"
	    	                                         },
	    	                                         {
	    	                                           "id": 81,
	    	                                           "keyword": "berbers"
	    	                                         },
	    	                                         {
	    	                                           "id": 70,
	    	                                           "keyword": "paleo-indians"
	    	                                         },
	    	                                         {
	    	                                           "id": 92,
	    	                                           "keyword": "black death"
	    	                                         },
	    	                                         {
	    	                                           "id": 68,
	    	                                           "keyword": "module 1"
	    	                                         },
	    	                                         {
	    	                                           "id": 84,
	    	                                           "keyword": "mosques"
	    	                                         },
	    	                                         {
	    	                                           "id": 78,
	    	                                           "keyword": "teepees"
	    	                                         },
	    	                                         {
	    	                                           "id": 63,
	    	                                           "keyword": "ebook"
	    	                                         },
	    	                                         {
	    	                                           "id": 91,
	    	                                           "keyword": "knights"
	    	                                         },
	    	                                         {
	    	                                           "id": 65,
	    	                                           "keyword": "america"
	    	                                         },
	    	                                         {
	    	                                           "id": 71,
	    	                                           "keyword": "migration"
	    	                                         },
	    	                                         {
	    	                                           "id": 88,
	    	                                           "keyword": "aristotle"
	    	                                         },
	    	                                         {
	    	                                           "id": 94,
	    	                                           "keyword": "leonardo da vinci"
	    	                                         },
	    	                                         {
	    	                                           "id": 77,
	    	                                           "keyword": "totems"
	    	                                         },
	    	                                         {
	    	                                           "id": 87,
	    	                                           "keyword": "plato"
	    	                                         },
	    	                                         {
	    	                                           "id": 82,
	    	                                           "keyword": "mansa musa"
	    	                                         },
	    	                                         {
	    	                                           "id": 66,
	    	                                           "keyword": "africa"
	    	                                         },
	    	                                         {
	    	                                           "id": 90,
	    	                                           "keyword": "democracy"
	    	                                         },
	    	                                         {
	    	                                           "id": 79,
	    	                                           "keyword": "matrilineal"
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
	    	                                         "thirdLevel": {},
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
	    	                                       "thirdLevel": {},
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
	    	                                           }
	    	                                         ]
	    	                                       },
	    	                                       "keywords": [
	    	                                         {
	    	                                           "id": 5,
	    	                                           "keyword": "africa"
	    	                                         },
	    	                                         {
	    	                                           "id": 10,
	    	                                           "keyword": "hunter-gatherers"
	    	                                         },
	    	                                         {
	    	                                           "id": 31,
	    	                                           "keyword": "michelangelo"
	    	                                         },
	    	                                         {
	    	                                           "id": 6,
	    	                                           "keyword": "europe before 1500"
	    	                                         },
	    	                                         {
	    	                                           "id": 15,
	    	                                           "keyword": "totems"
	    	                                         },
	    	                                         {
	    	                                           "id": 16,
	    	                                           "keyword": "teepees"
	    	                                         },
	    	                                         {
	    	                                           "id": 29,
	    	                                           "keyword": "knights"
	    	                                         },
	    	                                         {
	    	                                           "id": 22,
	    	                                           "keyword": "mosques"
	    	                                         },
	    	                                         {
	    	                                           "id": 1,
	    	                                           "keyword": "Text"
	    	                                         },
	    	                                         {
	    	                                           "id": 8,
	    	                                           "keyword": "paleo-indians"
	    	                                         },
	    	                                         {
	    	                                           "id": 18,
	    	                                           "keyword": "iroquois league"
	    	                                         },
	    	                                         {
	    	                                           "id": 28,
	    	                                           "keyword": "democracy"
	    	                                         },
	    	                                         {
	    	                                           "id": 12,
	    	                                           "keyword": "culture"
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
	    	                                           "id": 23,
	    	                                           "keyword": "askia the great"
	    	                                         },
	    	                                         {
	    	                                           "id": 9,
	    	                                           "keyword": "migration"
	    	                                         },
	    	                                         {
	    	                                           "id": 33,
	    	                                           "keyword": "johannes gutenberg"
	    	                                         },
	    	                                         {
	    	                                           "id": 26,
	    	                                           "keyword": "aristotle"
	    	                                         },
	    	                                         {
	    	                                           "id": 11,
	    	                                           "keyword": "environments"
	    	                                         },
	    	                                         {
	    	                                           "id": 2,
	    	                                           "keyword": "ebook"
	    	                                         },
	    	                                         {
	    	                                           "id": 13,
	    	                                           "keyword": "pueblos"
	    	                                         },
	    	                                         {
	    	                                           "id": 27,
	    	                                           "keyword": "reason"
	    	                                         },
	    	                                         {
	    	                                           "id": 4,
	    	                                           "keyword": "america"
	    	                                         },
	    	                                         {
	    	                                           "id": 17,
	    	                                           "keyword": "matrilineal"
	    	                                         },
	    	                                         {
	    	                                           "id": 21,
	    	                                           "keyword": "hajj"
	    	                                         },
	    	                                         {
	    	                                           "id": 3,
	    	                                           "keyword": "teacher ebook"
	    	                                         },
	    	                                         {
	    	                                           "id": 19,
	    	                                           "keyword": "berbers"
	    	                                         },
	    	                                         {
	    	                                           "id": 7,
	    	                                           "keyword": "bering land bridge"
	    	                                         },
	    	                                         {
	    	                                           "id": 32,
	    	                                           "keyword": "leonardo da vinci"
	    	                                         },
	    	                                         {
	    	                                           "id": 25,
	    	                                           "keyword": "plato"
	    	                                         },
	    	                                         {
	    	                                           "id": 30,
	    	                                           "keyword": "black death"
	    	                                         },
	    	                                         {
	    	                                           "id": 34,
	    	                                           "keyword": "joint-stock companies"
	    	                                         },
	    	                                         {
	    	                                           "id": 24,
	    	                                           "keyword": "socrates"
	    	                                         }
	    	                                       ],
	    	                                       "standards": [
	    	                                         {
	    	                                           "id": 2,
	    	                                           "standard": "LAFS.68.RH.2.4"
	    	                                         },
	    	                                         {
	    	                                           "id": 1,
	    	                                           "standard": "SS.8.A.1.2"
	    	                                         }
	    	                                       ],
	    	                                       "mwsGuids": [
	    	                                         {
	    	                                           "id": 1,
	    	                                           "guid": "SS_NL17E_DBI_G08M01L00S00S0_0001"
	    	                                         }
	    	                                       ]
	    	                                     },
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
	    	                                         "thirdLevel": {},
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
	    	                                       "thirdLevel": {},
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
	    	                                           }
	    	                                         ]
	    	                                       },
	    	                                       "keywords": [
	    	                                         {
	    	                                           "id": 120,
	    	                                           "keyword": "plato"
	    	                                         },
	    	                                         {
	    	                                           "id": 109,
	    	                                           "keyword": "kivas"
	    	                                         },
	    	                                         {
	    	                                           "id": 106,
	    	                                           "keyword": "environments"
	    	                                         },
	    	                                         {
	    	                                           "id": 126,
	    	                                           "keyword": "michelangelo"
	    	                                         },
	    	                                         {
	    	                                           "id": 97,
	    	                                           "keyword": "teacher presentation"
	    	                                         },
	    	                                         {
	    	                                           "id": 99,
	    	                                           "keyword": "africa"
	    	                                         },
	    	                                         {
	    	                                           "id": 127,
	    	                                           "keyword": "leonardo da vinci"
	    	                                         },
	    	                                         {
	    	                                           "id": 101,
	    	                                           "keyword": "module 1"
	    	                                         },
	    	                                         {
	    	                                           "id": 111,
	    	                                           "keyword": "teepees"
	    	                                         },
	    	                                         {
	    	                                           "id": 117,
	    	                                           "keyword": "mosques"
	    	                                         },
	    	                                         {
	    	                                           "id": 121,
	    	                                           "keyword": "aristotle"
	    	                                         },
	    	                                         {
	    	                                           "id": 104,
	    	                                           "keyword": "migration"
	    	                                         },
	    	                                         {
	    	                                           "id": 128,
	    	                                           "keyword": "johannes gutenberg"
	    	                                         },
	    	                                         {
	    	                                           "id": 118,
	    	                                           "keyword": "askia the great"
	    	                                         },
	    	                                         {
	    	                                           "id": 123,
	    	                                           "keyword": "democracy"
	    	                                         },
	    	                                         {
	    	                                           "id": 113,
	    	                                           "keyword": "iroquois league"
	    	                                         },
	    	                                         {
	    	                                           "id": 98,
	    	                                           "keyword": "america"
	    	                                         },
	    	                                         {
	    	                                           "id": 108,
	    	                                           "keyword": "pueblos"
	    	                                         },
	    	                                         {
	    	                                           "id": 103,
	    	                                           "keyword": "paleo-indians"
	    	                                         },
	    	                                         {
	    	                                           "id": 114,
	    	                                           "keyword": "berbers"
	    	                                         },
	    	                                         {
	    	                                           "id": 125,
	    	                                           "keyword": "black death"
	    	                                         },
	    	                                         {
	    	                                           "id": 102,
	    	                                           "keyword": "bering land bridge"
	    	                                         },
	    	                                         {
	    	                                           "id": 112,
	    	                                           "keyword": "matrilineal"
	    	                                         },
	    	                                         {
	    	                                           "id": 116,
	    	                                           "keyword": "hajj"
	    	                                         },
	    	                                         {
	    	                                           "id": 105,
	    	                                           "keyword": "hunter-gatherers"
	    	                                         },
	    	                                         {
	    	                                           "id": 100,
	    	                                           "keyword": "europe before 1500"
	    	                                         },
	    	                                         {
	    	                                           "id": 129,
	    	                                           "keyword": "joint-stock companies"
	    	                                         },
	    	                                         {
	    	                                           "id": 110,
	    	                                           "keyword": "totems"
	    	                                         },
	    	                                         {
	    	                                           "id": 107,
	    	                                           "keyword": "culture"
	    	                                         },
	    	                                         {
	    	                                           "id": 122,
	    	                                           "keyword": "reason"
	    	                                         },
	    	                                         {
	    	                                           "id": 124,
	    	                                           "keyword": "knights"
	    	                                         },
	    	                                         {
	    	                                           "id": 119,
	    	                                           "keyword": "socrates"
	    	                                         },
	    	                                         {
	    	                                           "id": 115,
	    	                                           "keyword": "mansa musa"
	    	                                         }
	    	                                       ],
	    	                                       "standards": [
	    	                                         {
	    	                                           "id": 27,
	    	                                           "standard": "LAFS.68.WHST.3.9"
	    	                                         },
	    	                                         {
	    	                                           "id": 24,
	    	                                           "standard": "LAFS.68.RH.2.5"
	    	                                         },
	    	                                         {
	    	                                           "id": 25,
	    	                                           "standard": "LAFS.68.RH.3.7"
	    	                                         },
	    	                                         {
	    	                                           "id": 23,
	    	                                           "standard": "LAFS.8.SL.1.2"
	    	                                         },
	    	                                         {
	    	                                           "id": 28,
	    	                                           "standard": "LAFS.68.WHST.4.10"
	    	                                         },
	    	                                         {
	    	                                           "id": 29,
	    	                                           "standard": "MAFS.K12.MP.1.1"
	    	                                         },
	    	                                         {
	    	                                           "id": 21,
	    	                                           "standard": "ELD.K12.ELL.SS.1"
	    	                                         },
	    	                                         {
	    	                                           "id": 26,
	    	                                           "standard": "LAFS.68.WHST.2.4"
	    	                                         },
	    	                                         {
	    	                                           "id": 22,
	    	                                           "standard": "ELD.K12.ELL.SI.1"
	    	                                         },
	    	                                         {
	    	                                           "id": 20,
	    	                                           "standard": "SS.8.A.1.2"
	    	                                         },
	    	                                         {
	    	                                           "id": 30,
	    	                                           "standard": "MAFS.K12.MP.5.1"
	    	                                         }
	    	                                       ],
	    	                                       "mwsGuids": []
	    	                                     }
	    	                                   ],
	    	                                   "lessonPlans": [
	    	                                     {
	    	                                       "id": 1,
	    	                                       "duration": 45,
	    	                                       "lessonPlanId": "SS_FL18E_LP_8.1.0.1",
	    	                                       "thirdLevel": {},
	    	                                       "sortId": 1,
	    	                                       "title": "Module 1 Introduction"
	    	                                     }
	    	                                   ],
	    	                                   "thirdLevels": [
	    	                                     {
	    	                                       "id": 1,
	    	                                       "hierarchy": 1,
	    	                                       "thirdLevel": {},
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
	    	                                               }
	    	                                             ]
	    	                                           },
	    	                                           "keywords": [
	    	                                             {
	    	                                               "id": 42,
	    	                                               "keyword": "the earliest americans"
	    	                                             },
	    	                                             {
	    	                                               "id": 39,
	    	                                               "keyword": "europe before 1500"
	    	                                             },
	    	                                             {
	    	                                               "id": 40,
	    	                                               "keyword": "module 1"
	    	                                             },
	    	                                             {
	    	                                               "id": 37,
	    	                                               "keyword": "america"
	    	                                             },
	    	                                             {
	    	                                               "id": 46,
	    	                                               "keyword": "environments"
	    	                                             }
	    	                                           ],
	    	                                           "standards": [
	    	                                             {
	    	                                               "id": 5,
	    	                                               "standard": "SS.8.G.1.1"
	    	                                             },
	    	                                             {
	    	                                               "id": 9,
	    	                                               "standard": "SS.8.G.5.2"
	    	                                             },
	    	                                             {
	    	                                               "id": 4,
	    	                                               "standard": "SS.8.A.2.5"
	    	                                             },
	    	                                             {
	    	                                               "id": 3,
	    	                                               "standard": "SS.8.A.1.7"
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
	    	                                       "thirdLevel": {},
	    	                                       "title": "Europe before 1500",
	    	                                       "content": [],
	    	                                       "lessonPlans": [],
	    	                                       "fourthLevels": [],
	    	                                       "keywords": []
	    	                                     },
	    	                                     {
	    	                                       "id": 3,
	    	                                       "hierarchy": 3,
	    	                                       "thirdLevel": {},
	    	                                       "title": "Trading Kingdoms of West Africa",
	    	                                       "content": [],
	    	                                       "lessonPlans": [],
	    	                                       "fourthLevels": [],
	    	                                       "keywords": []
	    	                                     },
	    	                                     {
	    	                                       "id": 2,
	    	                                       "hierarchy": 2,
	    	                                       "thirdLevel": {},
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
	    	                                               }
	    	                                             ]
	    	                                           },
	    	                                           "keywords": [
	    	                                             {
	    	                                               "id": 49,
	    	                                               "keyword": "ebook"
	    	                                             },
	    	                                             {
	    	                                               "id": 52,
	    	                                               "keyword": "africa"
	    	                                             },
	    	                                             {
	    	                                               "id": 61,
	    	                                               "keyword": "matrilineal"
	    	                                             }
	    	                                           ],
	    	                                           "standards": [
	    	                                             {
	    	                                               "id": 16,
	    	                                               "standard": "SS.8.G.5.2"
	    	                                             },
	    	                                             {
	    	                                               "id": 13,
	    	                                               "standard": "SS.8.G.2.1"
	    	                                             },
	    	                                             {
	    	                                               "id": 10,
	    	                                               "standard": "SS.8.A.1.2"
	    	                                             },
	    	                                             {
	    	                                               "id": 15,
	    	                                               "standard": "SS.8.G.5.1"
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
	    	                                       "keyword": "third-level-common-keyword1"
	    	                                     },
	    	                                     {
	    	                                       "keyword": "module 1"
	    	                                     }
	    	                                   ]
	    	                                 }]
	    									}];
	    	
	    	mockThirdlevelResponse = {"id": 1,
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
	    	
			httpBackend.when('GET', 'api/thirdlevels?max=-1').respond(mockThirdlevelsResponse);  // This is also valid httpBackend.whenGET('api/thirdlevels?max=-1').respond(thirdlevelsList); or  //httpBackend.whenGET(/thirdlevels/).respond(thirdlevelsList);
			httpBackend.when('GET', 'api/thirdlevels/1?max=-1').respond(mockThirdlevelResponse);
			httpBackend.when('PUT', 'api/thirdlevels/1?max=-1').respond(mockThirdlevelResponse); 
			httpBackend.when('POST', 'api/thirdlevels?max=-1').respond(mockThirdlevelResponse); 
			httpBackend.when('DELETE', 'api/thirdlevels/1?max=-1').respond(mockThirdlevelResponse); 

	    });
	    
	   it('should respond success to a GET', function(){  
	       httpBackend.expect('GET', 'api/thirdlevels?max=-1').respond(200, 'success');
	   });  	   
		   
	    it('should have a function to refresh the thirdlevels list', function(){
	        expect(scope.vm.list).toBeDefined();
	    });
	    
	    it('should have mocked mockThirdlevelsResponse', function(){
	    	expect(mockThirdlevelsResponse.length).toBeGreaterThan(0);
	    });
	   
	   it('should not have empty thirdlevel array', function(){  
	       
	   	   scope.vm.list();
	   	   httpBackend.flush();
	       expect(scope.vm.thirdLevels.length).toBeGreaterThan(0);
	   });    

	   xit('should have thirdlevels list that matches mock', function(){  
		   
		   scope.vm.list();
		   httpBackend.flush();
		   expect(scope.vm.thirdLevels).toEqual(mockThirdlevelsResponse);
 
	   }).pend('Because the types returned are not the same.  To do with promises.  Need to understand this better.'); 
	   
	   it('should have thirdlevels list with thirdlevels that matches mock', function(){  
		   
		   scope.vm.list();
		   httpBackend.flush();
		   expect(scope.vm.thirdLevels[0].id).toEqual(1);
		   expect(scope.vm.thirdLevels[0].nonGradeLevel).toEqual("Course -");
		   expect(scope.vm.thirdLevels[0].nonGradeTitle).toEqual("United States History, Beginnings to 1877");
		   expect(scope.vm.thirdLevels[0].title).toEqual("United States History, Beginnings to 1877");
		   expect(scope.vm.thirdLevels[0].content[0].id).toEqual(9);
		   
	   }); 
	   
	   it('should add a thirdlevel to the list', function(){  
		   scope.vm.newTitle = "A new title";
		   scope.vm.newHierarchy = 9;
		   scope.vm.addThirdLevel(mockThirdlevelResponse);
		   httpBackend.flush();
		   httpBackend.expect('POST', 'api/thirdlevels?max=-1').respond(mockThirdlevelResponse); 
	   });
	   
  
	   it('should update a thirdlevel title', function(){  
		   
		   scope.vm.updateTitle(mockThirdlevelResponse, 'A new title');
		   httpBackend.flush();
		   httpBackend.expect('PUT', 'api/thirdlevels/1?max=-1').respond(mockThirdlevelResponse);
	   }); 
	
	   it('should update a thirdlevel hierarchy', function(){  
		   
		   scope.vm.updateHierarchy(mockThirdlevelResponse, '7');
		   httpBackend.flush();
		   httpBackend.expect('PUT', 'api/thirdlevels/1?max=-1').respond(mockThirdlevelResponse);
	   }); 
	   
	   it('should delete a thirdlevel from the list', function(){  
		   
		   scope.vm.delete(mockThirdlevelResponse);
		   httpBackend.flush();  
		   httpBackend.expect('DELETE', 'api/thirdlevels/1?max=-1').respond(mockThirdlevelResponse); 
		   
	   }); 
   });  
   
});
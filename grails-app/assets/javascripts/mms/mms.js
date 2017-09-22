//= wrapped
//= require /pace/pace
//= require /jquery/jquery
//= require /datatables.net/jquery.dataTables
//= require /datatables.net-bs/dataTables.bootstrap
//= require /angular/angular
//= require /angular/ui-bootstrap-tpls
//= require /angular-datatables/angular-datatables
//= require /angular-xeditable/xeditable
//= require /ng-notify/ng-notify
//= require /ngprogress/ngprogress
//= require /angular-ui-tree/angular-ui-tree
//= require /angular-ui-router/angular-ui-router
//= require /angular-file-saver/angular-file-saver.bundle
//= require /bootstrap/js/bootstrap.min
//= require /mms/core/mms.core
//= require /mms/index/mms.index
//= require /mms/fifthlevel/mms.fifthlevel
//= require /mms/fourthlevel/mms.fourthlevel
//= require /mms/thirdlevel/mms.thirdlevel
//= require /mms/secondlevel/mms.secondlevel
//= require /mms/toplevel/mms.toplevel
//= require /mms/correlations/mms.correlations
//= require_self
//= require_tree domain
//= require_tree templates
//= require_tree services
//= require_tree directives
//= require_tree controllers
angular.module("mms", [
    "mms.core",
    "mms.index",
    "mms.fifthlevel",
    "mms.fourthlevel",
    "mms.thirdlevel",
    "mms.secondlevel",
    "mms.toplevel",
    "mms.header",
    "mms.login",
    "mms.correlations",
    "xeditable",
    "ngNotify",
    "ui.tree",
    "ui.router",
    "ui.bootstrap",
    "ngFileSaver",
    "datatables",
    "ngProgress"
]).constant('treeConfig', {  //  treeview configuration
    defaultCollapsed: true, //don't expand treeviews by default
    treeClass: 'angular-ui-tree',
    emptyTreeClass: 'angular-ui-tree-empty',
    hiddenClass: 'angular-ui-tree-hidden',
    nodesClass: 'angular-ui-tree-nodes',
    nodeClass: 'angular-ui-tree-node',
    handleClass: 'angular-ui-tree-handle',
    placeholderClass: 'angular-ui-tree-placeholder',
    dragClass: 'angular-ui-tree-drag',
    dragThreshold: 3,
    levelThreshold: 30,
}).filter('range', function () {
	// Used to generate the list of allowed copyright years
    return function (input) {
        var direction;
        
        var currentYear = new Date().getFullYear();
        
        var start = currentYear + 5;
        var end = currentYear - 8;    
        
        if(start===end) return [start];
        if (start === end) { return [start]; }

        direction = (start <= end) ? 1 : -1;

        while (start != end) {
            input.push(start);

            if (direction < 0 && start === end + 1) {
                input.push(end);
            }

            if (direction > 0 && start === end - 1) {
                input.push(end);
            }

            start += direction;
        }

        return input;
    };
}).filter('matchGrades', function() {
    return function( items, levelGrades ) {

        var filtered = [];
        var matched = false;
        angular.forEach(items, function(item) {
        	matched = false;
        	//  Check if any of the grades in the current level grade match those in the current product
        	//  Using native for loop for performance and so we can break
            if (typeof levelGrades != 'undefined') {
	        	for(var i = 0; !matched && i < levelGrades.length; i++){
	        		var levelGrade = levelGrades[i];
	            	for(var j = 0; !matched && j < item.grades.length; j++){
	            		
	            		var grade= item.grades[j];	 
				         if( levelGrade.grade === grade.grade ) {
		        			matched = true;
				          }; 
	        		};
	        	};
        	};
        	if(matched){
        		filtered.push(item);
        	}
        });
        return filtered;
      };
  }).filter('productTitle', function() {
      return function(product) {
    	  var gradesString = "( Level Grades ";
    	  
    	  //this didnt work orderByFilter(product.grades, guiOrdering, reverse)
    	  angular.forEach(product.grades, function(grade, index) {
    		  if(index > 0)
    			  gradesString += ", " + grade.grade;  
    		  else
    			  gradesString += "" + grade.grade;  
    	  });
    	  gradesString += " )";  
          return [product.isbn, product.title, gradesString].join(" ");
    };
  }).filter('topLevelTitle', function() {
      return function(topLevel) {
    	  var levelGradesString = "( Level Grades ";
    	  
    	  //this didnt work orderByFilter(product.grades, guiOrdering, reverse)
    	  angular.forEach(topLevel.grades, function(grade, index) {
    		  if(index > 0)
    			  levelGradesString += ", " + grade.grade;  
    		  else
    			  levelGradesString += "" + grade.grade;  
    	  });
    	  levelGradesString += " )";  
          return [topLevel.title, topLevel.nonGradeLevel,topLevel.nonGradeTitle, levelGradesString].join(" ");
    };
  });
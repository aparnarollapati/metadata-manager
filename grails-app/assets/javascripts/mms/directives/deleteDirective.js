//angular.module("mms.toplevel")
angular.module("mms")
	.directive('deleteConfirmClick', [ function(){
	        return {
	          priority: -1,
	          restrict: 'A',
	          link: function(scope, element, attrs){
	              element.bind('click', function(e){
	              var message = attrs.deleteConfirmClick? attrs.deleteConfirmClick : "Are you sure?";
	              // confirm() requires jQuery
	              if(message && !confirm(message)){
	                e.stopImmediatePropagation();
	                e.preventDefault();
	              }
	            });
	          }
	      }
	   }
	]);
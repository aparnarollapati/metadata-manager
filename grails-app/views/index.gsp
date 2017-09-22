<!DOCTYPE html>
<html>
	<head>
	    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" >
	    <meta http-equiv="Content-Type" content="text/xml; charset=UTF-8" >
	    <meta http-equiv="X-UA-Compatible" content="IE=edgec;">
	    <meta name="viewport" content="width=device-width, initial-scale=1.0">
	    
	    <link href='http://fonts.googleapis.com/css?family=Roboto:300,400,500,700,900' rel='stylesheet' type='text/css'>
	    
	    <title>Metadata Management System</title>
	        
	    <!-- Available in bower but not giving the same results -->
	    <asset:stylesheet src="vendor/fontawesome/css/font-awesome.css"/>
	    
	    <!--animate, bootstrap, xeditable, notify -->
	    <asset:stylesheet src="mms.css"/>
	    
	    <!-- LUNA STYLES probably not available via Bower -->
	    <asset:stylesheet src="pe-icons/pe-icon-7-stroke.css"/>
	    <asset:stylesheet src="pe-icons/helper.css"/>
	    <asset:stylesheet src="stroke-icons/style.css"/>
	    
	    <asset:stylesheet src="luna.css"/>
	    
	    <!-- Override some of the default styles -->
	    <asset:stylesheet src="custom.css"/>
	    
	    <asset:link rel="icon" href="favicon.ico" type="image/x-ico" />
	    
	    <script type="text/javascript">
	        window.contextPath = "${request.contextPath}";
	    </script>
	    
	</head>
	<body class="nav-toggle" ng-app="mms" ng-controller="ParentController as prCont">

	    <!-- Wrapper-->
	    <div class="wrapper">
	        <div ui-view></div>
	    </div>    
	    <!-- Angular JS scripts -->
	    <asset:javascript src="mms/mms.js" />
	    
	    <!-- Define the states available -->
		<asset:javascript src="mms/routing.js"/>
		
		<asset:javascript src="mms/globalFunctions.js"/>
		
		<!-- Luna bootstrap wrapper scripts, can be merged into mms if we want but clearer as a separate file for the moment -->
        <asset:javascript src="mms/luna.js" />      
	
	</body>
</html>
angular.module("mms")
/*Constants regarding user login defined here*/
.constant('USER_ROLES', {
	all : '*',
	ROLE_ADMIN : 'ROLE_ADMIN',
	ROLE_UIUSER : 'ROLE_UIUSER',
  ROLE_USER_ADMIN : 'ROLE_USER_ADMIN'
}).constant('AUTH_EVENTS', {
	loginSuccess : 'auth-login-success',
	loginFailed : 'auth-login-failed',
	logoutSuccess : 'auth-logout-success',
	sessionTimeout : 'auth-session-timeout',
	notAuthenticated : 'auth-not-authenticated',
	notAuthorized : 'auth-not-authorized'
}).constant('FORM_EVENTS', {
	unprocessableEntry : 'form-validate-failed'
})
.config(function ($stateProvider, $urlRouterProvider, USER_ROLES) {
  // Configure the routes and states
  $urlRouterProvider.otherwise(''); // home state, so it maps our application to this state by default
  $stateProvider
  
      .state('dashboard', {
        url: '',
        views: {
        	'': { templateUrl: 'main.html'},
        	'header@dashboard': { templateUrl: 'header.html' },
        	'body@dashboard': { templateUrl: 'program.html'},
        	'footer@dashboard': { templateUrl: 'footer.html' }
        },
        data: {
          authorizedRoles: [USER_ROLES.all, USER_ROLES.ROLE_ADMIN, USER_ROLES.ROLE_UIUSER, USER_ROLES.ROLE_USER_ADMIN]
        }
      })
      .state('admin', {
          url: '/admin',
          views: {
          	'': { templateUrl: 'main.html'},
          	'header@admin': { templateUrl: 'header.html' },
          	'body@admin': { templateUrl: 'users.html'},
          	'footer@admin': { templateUrl: 'footer.html' }
          },
      	  data: {
             authorizedRoles: [USER_ROLES.ROLE_ADMIN, USER_ROLES.ROLE_USER_ADMIN]
          }
        })     
        .state('generatexmls', {
            url: '/generatexmls',
            views: {
            	'': { templateUrl: 'main.html'},
            	'header@generatexmls': { templateUrl: 'header.html' },
            	'body@generatexmls': { templateUrl: 'generateXmls.html'},
            	'footer@generatexmls': { templateUrl: 'footer.html' }
            },
        	  data: {
               authorizedRoles: [USER_ROLES.all, USER_ROLES.ROLE_UIUSER, USER_ROLES.ROLE_ADMIN]
            }
        })
         .state('generateExcel', {
            url: '/generateExcel',
            views: {
            	'': { templateUrl: 'main.html'},
            	'header@generateExcel': { templateUrl: 'header.html' },
            	'body@generateExcel': { templateUrl: 'generateExcel.html'},
            	'footer@generateExcel': { templateUrl: 'footer.html' }
            },
        	  data: {
               authorizedRoles: [USER_ROLES.all, USER_ROLES.ROLE_UIUSER, USER_ROLES.ROLE_ADMIN]
            }
        });       
});
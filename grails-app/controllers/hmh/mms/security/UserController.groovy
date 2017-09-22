package hmh.mms.security

import static org.springframework.http.HttpStatus.*
import grails.plugin.springsecurity.annotation.Secured
import grails.transaction.Transactional

@Secured(["ROLE_ADMIN", "ROLE_USER_ADMIN"])
@Transactional(readOnly = true)
class UserController {

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond User.list(params), model:[userCount: User.count()]
    }

    def show(User user) {
        respond user
    }

    @Transactional
    def save(User user) {
        if (user == null) {
            transactionStatus.setRollbackOnly()
            render status: NOT_FOUND
            return
        }

        if (user.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond user.errors, view:'create'
            return
        }

        user.save flush:true
	    addRoles(user)
        respond user, [status: CREATED, view:"show"]
    }
	
    @Transactional
    def update(User user) {
        if (user == null) {
            transactionStatus.setRollbackOnly()
            render status: NOT_FOUND
            return
        }

        if (user.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond user.errors, view:'edit'
            return
        }

        user.save flush:true
		addRoles(user)
        respond user, [status: OK, view:"show"]
    }

    @Transactional
    def delete(User user) {

        if (user == null) {
            transactionStatus.setRollbackOnly()
            render status: NOT_FOUND
            return
        }
	    UserRole.removeAll(user)
        user.delete flush:true

        render status: NO_CONTENT
    }
	
	protected void addRoles(userInstance) {
	
		// Clear the user's current roles
		UserRole.removeAll(userInstance)		
		userInstance.roleid.each{
		    String roleId=it
		    if(!roleId.equals(','))
	            //  Note this needs to use the RoleConstants classes
		        UserRole.create userInstance, Role.findById(roleId), true
		}		
	}
}
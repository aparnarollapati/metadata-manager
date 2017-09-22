package hmh.mms

import static org.springframework.http.HttpStatus.*
import grails.transaction.Transactional
import grails.plugin.springsecurity.annotation.Secured
import hmh.mms.level.*

import hmh.mms._enums.*

@Transactional(readOnly = false)
class ProgramController {

	static responseFormats = ['json', 'xml']
	static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

	def index(Integer max) {
		params.max = Math.min(max ?: 10, 100)
		respond Program.list(params), model:[programCount: Program.count()]
	}

	def listPlatformNames() {
		PlatformNames.toJSON()
	}

	def show(Program program) {
		respond program
	}

	@Transactional
	def save(Program program) {
		if (program == null) {
			transactionStatus.setRollbackOnly()
			render status: NOT_FOUND
			return
		}

		if (program.hasErrors()) {
			transactionStatus.setRollbackOnly()
			respond program.errors, view:'create'
			return
		}

		program.save flush:true

		respond program, [status: CREATED, view:"show"]
	}

	@Transactional
	def update(Program program) {
		if (program == null) {
			transactionStatus.setRollbackOnly()
			render status: NOT_FOUND
			return
		}

		if (program.hasErrors()) {
			transactionStatus.setRollbackOnly()
			respond program.errors, view:'edit'
			return
		}

		program.save flush:true

		respond program, [status: OK, view:"show"]
	}

	@Transactional
	private deleteTopLevelsFirst(Program program){

		log.info"looking for top-level instances to delete..."

		def programTopLevel = program?.topLevels

		programTopLevel.each{
			log.info"deleting top-level ${it.id}..."
			def topLevelInstance = TopLevel.get(it.id)
			topLevelInstance.delete()
		}

	}

	@Transactional
	@Secured(['ROLE_ADMIN'])
	def delete(Program program) {

		if (program == null) {
			transactionStatus.setRollbackOnly()
			render status: NOT_FOUND
			return
		}

		// Ensure the resources dependencies are not deleted first
		deleteTopLevelsFirst(program)

		program.delete flush:true

		render status: NO_CONTENT
	}
}

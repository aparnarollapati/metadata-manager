package hmh.mms.correlation


import grails.rest.*
import grails.converters.*
import hmh.mms.Program

class CorrelationProgramController {

	def index(Integer max) {
		params.max = Math.min(max ?: 10, 100)
		respond Program.list(params), model:[programCount: Program.count()]
	}


	def show(Program program) {
		respond program
	}
}

package hmh.mms


import grails.rest.*
import grails.converters.*

class ErrorController {

	def internalServer() {

		def ex = request.exception.cause
		def body = new ErrorDetails(type: ex.class.name, message: ex.message)

		println "500 Error Type:" + body.type
		println "500 Error Message" + body.message

		log.error "500 Error Type: ${body.type}"
		log.error "500 Error Message: ${body.message}"

		respond  body

	}

	def notFound404(){

		log.error "404 Error"

		response.status = 404
		render([error: 404, message: "Not Found"] as JSON)

	}


}

class ErrorDetails{

	String type
	String message
}

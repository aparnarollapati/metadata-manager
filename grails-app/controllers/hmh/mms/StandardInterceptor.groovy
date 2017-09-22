package hmh.mms


class StandardInterceptor {

	StandardInterceptor() {


		match(controller:"standard", action:"save")

	}

	boolean before() {

		Standard.withTransaction { status ->

			def jsonRequest = request.JSON

			def standardsList = getStandardsList(jsonRequest.standard)

			standardsList.each{
				def standard = new Standard(content: jsonRequest.content, standard: it)

				if (standard.validate()) {
					standard.save()

				} else {
					println "The following Standard is not valid ${it}"
					status.setRollbackOnly()
					render(status: 422, 'message': "${it} is not a valid Standard Code! A standard must contain alphanumeric characters separated by periods or dashes")
					return
				}
			}

			false

		}
	}

	boolean after() { true }

	void afterView() {}


	/**
	 * Helper method to split up the Standards String by comma or semicolon
	 * @param standard
	 * @return
	 */
	def getStandardsList(def standard){

		Set splitStandard = standard.split(/(,|;)/).collect{it.trim()}

	}

}

package hmh.mms


class EdStandardInterceptor {


	EdStandardInterceptor() {


		match(controller:"edStandard", action:"save")

	}

	boolean before() {

		EdStandard.withTransaction { status ->

			def jsonRequest = request.JSON

			def standardsList = getStandardsList(jsonRequest.standard)
			def standardSetValue = jsonRequest.standardSet

			standardsList.each{
				def edStandard = new EdStandard( content: jsonRequest.content, standard: it, standardSet: standardSetValue )

				if (!edStandard.validate(['standard'])) {

					println "The following Standard is not valid ${it}"
					status.setRollbackOnly()
					render(status: 422, 'message': "${it} is not a valid Standard Code! A standard must contain alphanumeric characters separated by periods or dashes")
					return
				}

				if (!edStandard.validate(['standardSet'])) {

					println "Missing Standard Set association"
					status.setRollbackOnly()
					render(status: 422, 'message': "${it} must be associated to a Standard Set")
					return
				}

				edStandard.save()

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

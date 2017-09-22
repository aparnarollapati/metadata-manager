package hmh.mms.level


class LevelStandardInterceptor {


	LevelStandardInterceptor() {


		match(controller: "levelStandard", action:"save")

	}

	boolean before() {

		LevelStandard.withTransaction { status ->

			def jsonRequest = request.JSON
			def standardsList = getStandardsList(jsonRequest.standard)
			def levelKey = getRequestLevelKey(jsonRequest)

			standardsList.each{

				def standard

				if(levelKey == "topLevel"){
					standard = new LevelStandard(topLevel: jsonRequest.topLevel, standard: it)
				}else if (levelKey == "secondLevel"){
					standard = new LevelStandard(secondLevel: jsonRequest.secondLevel, standard: it)
				}else if (levelKey == "thirdLevel"){
					standard = new LevelStandard(thirdLevel: jsonRequest.thirdLevel, standard: it)
				}else if (levelKey == "fourthLevel"){
					standard = new LevelStandard(fourthLevel: jsonRequest.fourthLevel, standard: it)
				}else if (levelKey == "fifthLevel"){
					standard = new LevelStandard(fifthLevel: jsonRequest.fifthLevel, standard: it)
				}

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

	void afterView() {
		// no-op
	}



	/**
	 * Helper method to split up the Standards String by comma or semicolon
	 * @param standard
	 * @return
	 */
	def getStandardsList(def standard){

		Set splitStandard = standard.split(/(,|;)/).collect{it.trim()}
	}


	/**
	 * Helper method to identify the level associated with the request
	 * @param levelMap
	 * @return
	 */
	def getRequestLevelKey(def requestLevelMap){

		def levelMap = [:] << requestLevelMap
		levelMap.remove('standard')

		def levelType = levelMap.keySet() as String[]

		return levelType[0]

	}

}

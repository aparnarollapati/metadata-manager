package hmh.mms.level


class LevelKeywordInterceptor {

	def keywordService

	LevelKeywordInterceptor() {


		match(controller: "levelKeyword", action:"save")

	}


	boolean before() {

		LevelKeyword.withTransaction { status ->

			def jsonRequest = request.JSON
			def keywordList = keywordService.getKeywordList(jsonRequest.keyword)
			def levelKey = getRequestLevelKey(jsonRequest)

			keywordList.each{

				def keyword

				if(levelKey == "topLevel"){
					keyword = new LevelKeyword(topLevel: jsonRequest.topLevel, keyword: it)
				}else if (levelKey == "secondLevel"){
					keyword = new LevelKeyword(secondLevel: jsonRequest.secondLevel, keyword: it)
				}else if (levelKey == "thirdLevel"){
					keyword = new LevelKeyword(thirdLevel: jsonRequest.thirdLevel, keyword: it)
				}else if (levelKey == "fourthLevel"){
					keyword = new LevelKeyword(fourthLevel: jsonRequest.fourthLevel, keyword: it)
				}else if (levelKey == "fifthLevel"){
					keyword = new LevelKeyword(fifthLevel: jsonRequest.fifthLevel, keyword: it)
				}

				if (keyword.validate()) {
					keyword.save()

				} else {
					println "The following Keyword is not valid ${it}"
					status.setRollbackOnly()
					render(status: 422, 'message': "${it} is not a valid Keyword")
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
	 * Helper method to identify the level associated with the request
	 * @param levelMap
	 * @return
	 */
	def getRequestLevelKey(def requestLevelMap){

		def levelMap = [:] << requestLevelMap
		levelMap.remove('keyword')

		def levelType = levelMap.keySet() as String[]

		return levelType[0]

	}

}

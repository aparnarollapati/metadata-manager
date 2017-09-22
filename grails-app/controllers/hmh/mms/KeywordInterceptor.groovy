package hmh.mms


class KeywordInterceptor {

	def keywordService

	KeywordInterceptor() {


		match(controller:"keyword", action:"save")

	}

	boolean before() {

		Keyword.withTransaction { status ->

			def jsonRequest = request.JSON

			def keywordList = keywordService.getKeywordList(jsonRequest.keyword)

			keywordList.each{
				def keyword = new Keyword(content: jsonRequest.content, keyword: it)

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

}

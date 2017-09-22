package hmh.mms

class CommonCartridgeKeywordInterceptor {

	def keywordService

	CommonCartridgeKeywordInterceptor() {

		match(controller:"commonCartridgeKeyword", action:"save")

	}

	boolean before() {

		CommonCartridgeKeyword.withTransaction { status ->

			def jsonRequest = request.JSON

			def keywordList = keywordService.getKeywordList(jsonRequest.keyword)

			keywordList.each{

				def keyword = new CommonCartridgeKeyword(content: jsonRequest.content, keyword: it)

				if (keyword.validate()) {
					keyword.save()

				} else {
					println "The following Common-Cartridge-Keyword is not valid ${it}"
					status.setRollbackOnly()
					render(status: 422, 'message': "${it} is not a valid Common-Cartridge-Keyword")
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

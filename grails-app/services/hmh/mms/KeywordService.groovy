package hmh.mms

import grails.transaction.Transactional

@Transactional
class KeywordService {


	/**
	 * Identify Common Cartridge Keywords from a Content Instance	
	 * @param contentInstance
	 * @return
	 */
	def identifyCommonCartridgeKeywords(def contentInstance) {

		Set keywords = []

		keywords << contentInstance?.commonCartridgeKeywords?.keyword
		keywords << contentInstance?.product?.isbn

		keywords << contentInstance?.component?.component
		keywords << getLevelKewords(contentInstance)
		def displayTitlePart = getDisplayTitlePart(contentInstance)

		if(displayTitlePart){
			keywords << displayTitlePart
		}

		return keywords.flatten() - null

	}


	/**
	 * Return the display title not including the first instance of the component Name and first colon instance
	 * @return
	 */
	def getDisplayTitlePart(def contentInstance){

		def componentName = contentInstance?.component?.component
		def commonCartridgeDisplayTitle = contentInstance?.commonCartridgeTitle ?: contentInstance?.displayTitle


		def optionalMediaType = "PDF"
		// starts with zero or more whitespace, followed by the component-name, followed by zero or more spaces, an optional mediaType and ends with zero or more colons
		def componentNameVariation = ~/^[\s]*${componentName}[\s]*(${optionalMediaType})?[:$]*/

		def displayTitle = (commonCartridgeDisplayTitle - componentNameVariation).trim()

		if(displayTitle == commonCartridgeDisplayTitle && commonCartridgeDisplayTitle.contains(":") ){

			def everythingAfterFirstColon = ~/(?<=:).*/
			def everythingAfterFirstSpace = ~/(?<=\s).*/

			def firstWordInComponent = (componentName - everythingAfterFirstSpace).trim()

			def wordBeforeFirstColon = (commonCartridgeDisplayTitle - everythingAfterFirstColon).trim()
			def wordBeforeFirstColonDecoded = replaceHtmlEntityCodes(wordBeforeFirstColon)

			def wordBeforeFirstColonAndColon = ~/^[\s]*(${wordBeforeFirstColon}[:\s]*)/

			// check partial match
			if("${wordBeforeFirstColonDecoded}" =~ /${firstWordInComponent}/){
				displayTitle = (commonCartridgeDisplayTitle - wordBeforeFirstColonAndColon).trim()
			}
		}

		return displayTitle
	}


	/**
	 * replace HTML entity codes
	 * @param displayTitle
	 * @return
	 */
	def replaceHtmlEntityCodes(def wordToDecode){

		wordToDecode.replace("&apos;","'")
	}


	/**
	 * Get all Content Instances Level Titles and parent level titles
	 * @param contentInstance
	 * @return
	 */
	def getLevelKewords(def contentInstance){

		def levelKeywords = []
		def levelTitles = []
		def scopeInfo = []

		if (contentInstance.topLevel){
			levelTitles << (contentInstance.topLevel?.nonGradeTitle ? ((contentInstance.topLevel?.nonGradeLevel + " " + contentInstance.topLevel?.nonGradeTitle) -null).trim() : contentInstance.topLevel?.title)

		} else if (contentInstance.secondLevel){
			levelTitles << contentInstance.secondLevel?.title
			levelTitles << (contentInstance.secondLevel?.topLevel?.nonGradeTitle ? ((contentInstance.secondLevel?.topLevel?.nonGradeLevel + " " + contentInstance.secondLevel?.topLevel?.nonGradeTitle) -null).trim() : contentInstance.secondLevel?.topLevel?.title)
			scopeInfo << getSecondLevelScopeInfo(contentInstance)

		} else if (contentInstance.thirdLevel){
			levelTitles << contentInstance.thirdLevel?.title
			levelTitles << contentInstance.thirdLevel?.secondLevel?.title
			levelTitles << (contentInstance.thirdLevel?.secondLevel?.topLevel?.nonGradeTitle ? ((contentInstance.thirdLevel?.secondLevel?.topLevel?.nonGradeLevel + " " + contentInstance.thirdLevel?.secondLevel?.topLevel?.nonGradeTitle) -null).trim()  : contentInstance.thirdLevel?.secondLevel?.topLevel?.title)
			scopeInfo << getThirdLevelAndParentScopeInfo(contentInstance)

		} else if (contentInstance.fourthLevel){
			levelTitles << contentInstance.fourthLevel?.title
			levelTitles << contentInstance.fourthLevel?.thirdLevel?.title
			levelTitles << contentInstance.fourthLevel?.thirdLevel?.secondLevel?.title
			levelTitles << (contentInstance.fourthLevel?.thirdLevel?.secondLevel?.topLevel?.nonGradeTitle ? ((contentInstance.fourthLevel?.thirdLevel?.secondLevel?.topLevel?.nonGradeLevel + " " + contentInstance.fourthLevel?.thirdLevel?.secondLevel?.topLevel?.nonGradeTitle) -null).trim() : contentInstance.fourthLevel?.thirdLevel?.secondLevel?.topLevel?.title)
			scopeInfo << getFourthLevelAndParentScopeInfo(contentInstance)

		} else if (contentInstance.fifthLevel){
			levelTitles << contentInstance.fifthLevel?.title
			levelTitles << contentInstance.fifthLevel?.fourthLevel?.title
			levelTitles << contentInstance.fifthLevel?.fourthLevel?.thirdLevel?.title
			levelTitles << contentInstance.fifthLevel?.fourthLevel?.thirdLevel?.secondLevel?.title
			levelTitles << (contentInstance.fifthLevel?.fourthLevel?.thirdLevel?.secondLevel?.topLevel?.nonGradeTitle ? ((contentInstance.fifthLevel?.fourthLevel?.thirdLevel?.secondLevel?.topLevel?.nonGradeLevel + " " + contentInstance.fifthLevel?.fourthLevel?.thirdLevel?.secondLevel?.topLevel?.nonGradeTitle) -null).trim() : contentInstance.fifthLevel?.fourthLevel?.thirdLevel?.secondLevel?.topLevel?.title)
			scopeInfo << getFifthLevelAndParentScopeInfo(contentInstance)
		}

		return levelKeywords << levelTitles << scopeInfo

	}

	/**
	 * Get keywords associated with the second level
	 * @param contentInstance
	 * @return
	 */
	def getSecondLevelScopeInfo(def contentInstance){

		def scope = []

		scope << "${contentInstance.component?.program?.secondLevelScope} ${contentInstance.secondLevel?.hierarchy}"
	}


	/**
	 * 
	 * @return
	 */
	def isThirdLevelScopeLast(def contentInstance){
		if (contentInstance.component?.program?.fourthLevelScope){ return false }

		return true
	}


	/**
	 * 
	 * @param contentInstance
	 * @return
	 */
	def isFourthLevelScopeLast(def contentInstance){
		if (contentInstance.component?.program?.fifthLevelScope){ return false }

		return true
	}



	/**
	 * Get keywords associated with the third level and its parent levels
	 * @param contentInstance
	 * @return
	 */
	def getThirdLevelAndParentScopeInfo(def contentInstance){

		def scope = []

		def secondLevelInfo = "${contentInstance.component?.program?.secondLevelScope} ${contentInstance.thirdLevel?.secondLevel?.hierarchy}"
		def thirdLevelScope = contentInstance.component?.program?.thirdLevelScope
		def thirdLevelInfo = "${thirdLevelScope} ${contentInstance.thirdLevel?.hierarchy}"

		scope << secondLevelInfo
		scope << thirdLevelInfo

		return scope

	}


	/**
	 * Get keywords associated with the fourth level and its parent levels
	 * @param contentInstance
	 * @return
	 */
	def getFourthLevelAndParentScopeInfo(def contentInstance){

		def scope = []

		def thirdLevelScope = contentInstance.component?.program?.thirdLevelScope
		def fourthLevelScope = contentInstance.component?.program?.fourthLevelScope

		def secondLevelInfo = "${contentInstance.component?.program?.secondLevelScope} ${contentInstance.fourthLevel?.thirdLevel?.secondLevel?.hierarchy}"
		def thirdLevelInfo = "${thirdLevelScope} ${contentInstance.fourthLevel?.thirdLevel?.hierarchy}"
		def fourthLevelInfo = "${fourthLevelScope} ${contentInstance.fourthLevel?.hierarchy}"

		scope << secondLevelInfo
		scope << thirdLevelInfo
		scope << fourthLevelInfo

		return scope
	}


	/**
	 * Get keywords associated with the fifth level and its parent levels
	 * @param contentInstance
	 * @return
	 */
	def getFifthLevelAndParentScopeInfo(def contentInstance){

		def scope = []

		def thirdLevelScope = contentInstance.component?.program?.thirdLevelScope
		def fourthLevelScope = contentInstance.component?.program?.fourthLevelScope
		def fifthLevelScope = contentInstance.component?.program?.fifthLevelScope

		def secondLevelInfo =  "${contentInstance.component?.program?.secondLevelScope} ${contentInstance.fifthLevel?.fourthLevel?.thirdLevel?.secondLevel?.hierarchy}"
		def thirdLevelInfo = "${thirdLevelScope} ${contentInstance.fifthLevel?.fourthLevel?.thirdLevel?.hierarchy}"
		def fourthLevelInfo = "${fourthLevelScope} ${contentInstance.fifthLevel?.fourthLevel?.hierarchy}"
		def fifthLevelInfo =  "${fifthLevelScope} ${contentInstance.fifthLevel?.hierarchy}"

		scope << secondLevelInfo
		scope << thirdLevelInfo
		scope << fourthLevelInfo
		scope << fifthLevelInfo

		return scope
	}


	/**
	 * Helper method to split up the Keywords String by comma or semicolon used by the Interceptors
	 * @param keyword
	 * @return
	 */
	def getKeywordList(def keyword){

		// negative look-behind for a backslash followed by a comma (this is to escape the comma), a comma or a semicolon
		Set splitKeyword = keyword.split(/(?<!\\),|;/).collect{it.trim().replace('\\','')}

	}

}

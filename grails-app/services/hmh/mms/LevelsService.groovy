package hmh.mms


class LevelsService {

	/**
	 * Return a list of levels for each content Instance
	 * @param contentInstance
	 * @return
	 */
	def getFullLevelsMap(def contentInstance){


		def fifthLevelInstance = null
		def fourthLevelInstance = null
		def thirdLevelInstance = null
		def secondLevelInstance = null
		def topLevelInstance = null


		if(contentInstance.fifthLevel){
			fifthLevelInstance = contentInstance.fifthLevel
			fourthLevelInstance = contentInstance.fifthLevel.fourthLevel
			thirdLevelInstance = contentInstance.fifthLevel.fourthLevel.thirdLevel
			secondLevelInstance = contentInstance.fifthLevel.fourthLevel.thirdLevel.secondLevel
			topLevelInstance = contentInstance.fifthLevel.fourthLevel.thirdLevel.secondLevel.topLevel
		}else if(contentInstance.fourthLevel){

			fourthLevelInstance = contentInstance.fourthLevel
			thirdLevelInstance = contentInstance.fourthLevel.thirdLevel
			secondLevelInstance = contentInstance.fourthLevel.thirdLevel.secondLevel
			topLevelInstance = contentInstance.fourthLevel.thirdLevel.secondLevel.topLevel
		}else if(contentInstance.thirdLevel) {

			thirdLevelInstance = contentInstance.thirdLevel
			secondLevelInstance = contentInstance.thirdLevel.secondLevel
			topLevelInstance = contentInstance.thirdLevel.secondLevel.topLevel
		}else if (contentInstance.secondLevel) {

			secondLevelInstance = contentInstance.secondLevel
			topLevelInstance = contentInstance.secondLevel.topLevel
		}else if ( contentInstance.topLevel) {
			topLevelInstance = contentInstance.topLevel
		}


		def levelsMap = ["top":topLevelInstance, "second":secondLevelInstance, "third":thirdLevelInstance, "fourth":fourthLevelInstance, "fifth":fifthLevelInstance  ]
	}


	/**
	 * Get the topLevel for a Content-Resource
	 * @param contentInstance
	 * @return
	 */
	def getTopLevel(def contentInstance){

		def topLevel

		if(contentInstance.fifthLevel){
			topLevel = contentInstance.fifthLevel?.fourthLevel?.thirdLevel?.secondLevel?.topLevel
		}else if(contentInstance.fourthLevel){

			topLevel = contentInstance.fourthLevel?.thirdLevel?.secondLevel?.topLevel
		}else if(contentInstance.thirdLevel) {

			topLevel = contentInstance.thirdLevel?.secondLevel?.topLevel
		}else if (contentInstance.secondLevel) {

			topLevel = contentInstance.secondLevel?.topLevel
		}else if ( contentInstance.topLevel) {
			topLevel = contentInstance.topLevel
		}
	}



	/**
	 * Simple method that returns the scope and sequence for a Program
	 */
	def getScopeAndSequence(Program pid){
		if (pid){
			def scopeAndSequence = [:]
			scopeAndSequence << pid.properties.findAll{ key, value -> key =~ /LevelScope/ && value !=null }
		}
	}


	/**
	 * Derive the level number for a particular Second Level Type
	 * @return
	 */
	def getSecondLevelNumber(def programInstance){

		def levelNumber = 2

		def type = getSecondLevelType (programInstance)

		switch (type) {
			case "Volume": levelNumber = 1; break;
			case "Book": levelNumber = 1; break;
			case "Unit": levelNumber = 2; break;
			case "Collection": levelNumber = 2; break;
			case "Theme": levelNumber =2; break;
			case "Module": levelNumber = 3; break;
			case "Chapter": levelNumber = 3; break;
			case "Section": levelNumber = 4; break;
			case "Lesson": levelNumber = 5; break;

			default: levelNumber =  2;
		}
	}

	/**
	 * Derive the level number for a particular Third Level Type
	 * @return
	 */
	def getThirdLevelNumber(def programInstance){

		def levelNumber = 4

		def type = getThirdLevelType (programInstance)

		switch (type) {

			case "Chapter": levelNumber = 3; break;
			case "Lesson": levelNumber = 5; break;
			case "Week": levelNumber = 4; break;
			case "Selection": levelNumber = 5; break;
			case "Section": levelNumber = 4; break;
			case "Module": levelNumber = 3; break;

			default: levelNumber =  4;
		}
	}


	/**
	 * Derive the level number for a particular Fourth Level Type
	 * @return
	 */
	def getFourthLevelNumber(def programInstance){

		def levelNumber = 5

		def type = getFourthLevelType (programInstance)

		switch (type) {


			case "Lesson": levelNumber = 5; break;
			case "Day": levelNumber = 6; break;
			case "Section": levelNumber = 4; break;
			case "Skill": levelNumber = 6; break;

			default: levelNumber =  5;
		}
	}


	/**
	 * Derive the level number for a particular Fifth Level Type
	 * @return
	 */
	def getFifthLevelNumber(def programInstance){

		def levelNumber = 6

		def type = getFifthLevelType (programInstance)

		switch (type) {

			case "Day": levelNumber = 6; break;

			default: levelNumber =  6;
		}
	}

	/**
	 * Derive Second Level Scope for a particular Program
	 * @return
	 */
	def getSecondLevelType(def programInstance){

		def type = programInstance.secondLevelScope
	}

	/**
	 * Derive Third Level Scope for a particular Program
	 * @return
	 */
	def getThirdLevelType(def programInstance){

		def type = programInstance.thirdLevelScope
	}

	/**
	 * Derive Fourth Level Scope for a particular Program
	 * @return
	 */
	def getFourthLevelType(def programInstance){

		def type = programInstance.fourthLevelScope
	}

	/**
	 * Derive Fifth Level Scope for a particular Program
	 * @return
	 */
	def getFifthLevelType(def programInstance){

		def type = programInstance.fifthLevelScope
	}


	/**
	 * Get the Level Keywords for a Content-Resource
	 * @param contentInstance
	 * @return
	 */
	def getLevelKeywords(def contentInstance){

		def levelKeywords = []

		if(contentInstance.topLevel){
			levelKeywords = contentInstance.topLevel?.keywords?.keyword
		}else if(contentInstance.secondLevel){
			levelKeywords = contentInstance.secondLevel?.keywords?.keyword
		}else if(contentInstance.thirdLevel){
			levelKeywords = contentInstance.thirdLevel?.keywords?.keyword
		}else if(contentInstance.fourthLevel){
			levelKeywords = contentInstance.fourthLevel?.keywords?.keyword
		}else if(contentInstance.fifthLevel){
			levelKeywords = contentInstance.fifthLevel?.keywords?.keyword
		}

		levelKeywords
	}


	/**
	 * Get the Level Standards for a Content-Resource
	 * @param contentInstance
	 * @return
	 */
	def getLevelStandards(def contentInstance){

		Set levelStandards = []

		if(contentInstance.topLevel){
			levelStandards = contentInstance.topLevel?.standards?.standard
		}else if(contentInstance.secondLevel){
			levelStandards = contentInstance.secondLevel?.standards?.standard
		}else if(contentInstance.thirdLevel){
			levelStandards = contentInstance.thirdLevel?.standards?.standard
		}else if(contentInstance.fourthLevel){
			levelStandards = contentInstance.fourthLevel?.standards?.standard
		}else if(contentInstance.fifthLevel){
			levelStandards = contentInstance.fifthLevel?.standards?.standard
		}

		levelStandards
	}

}

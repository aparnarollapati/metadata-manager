package hmh.mms


import grails.transaction.Transactional

@Transactional
class ContentService {

    def levelsService



    /**
     * Return all the Content Instances for a particular Program
     * @param ProgramInstance
     * @return
     */
    def getProgramResources( def programInstance ){

	def programProducts = programInstance.products

	def contentInstances = Content.where{product in programProducts}.list()

    }



    /**
     * A map of a programs Grade specific content instance	
     * @param programInstance
     * @return
     */
    def getGradeSpecificContent( def programInstance ){

	def topLevels = programInstance.topLevels
	def contentMap = [:]

	topLevels.each{

	    def topLevelGradeInstance = it
	    def programResources = getProgramResources(programInstance)
	    def levelgrades=  topLevelGradeInstance.grades.grade
	    def contentList = []
	    programResources.each{
		
		def toplevelgrades= it.topLevel?.grades?.grade
		def secondlevelgrades=it.secondLevel?.topLevel?.grades?.grade
		def thirdlevelgrades=it.thirdLevel?.secondLevel?.topLevel?.grades?.grade
		def fourthlevelgrades=it.fourthLevel?.thirdLevel?.secondLevel?.topLevel?.grades?.grade
		def fifthlevelgrades= it.fifthLevel?.fourthLevel?.thirdLevel?.secondLevel?.topLevel?.grades?.grade		
		if(toplevelgrades==levelgrades || secondlevelgrades==levelgrades || thirdlevelgrades==levelgrades || fourthlevelgrades==levelgrades || fifthlevelgrades==levelgrades )
		{
		    if(contentMap.containsKey(topLevelGradeInstance.grades.grade))
		    {
			contentList=contentMap.get(topLevelGradeInstance.grades.grade);
			if(!contentList.contains(it)){
			    contentList.add(it)
			    contentMap << [(topLevelGradeInstance.grades.grade) :contentList]
			}

		    }else{
			contentList =[]
			contentList.add(it)
			contentMap << [(topLevelGradeInstance.grades.grade) :contentList]
		    }

		}

	    }


	}
	return contentMap
    }


    /**
     * Converts isbn10 to isbn13
     * @param isbn10
     * @return
     */
    def toIsbn13( String isbn10 ) {

	def normaliseIsbn10 = isbn10.replace("-", "")
	def isbn13 = "978" + normaliseIsbn10.substring(0,9)

	int digit
	int sum = 0
	for (int i = 0; i < isbn13.length(); i++) {
	    digit = ((i % 2 == 0) ? 1 : 3)
	    sum += ((((int) isbn13.charAt(i)) - 48) * digit)

	}

	sum = 10 - (sum % 10)
	isbn13 += sum

	return isbn13
    }
}

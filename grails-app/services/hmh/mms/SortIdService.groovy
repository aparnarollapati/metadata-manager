package hmh.mms

import grails.transaction.Transactional

@Transactional
class SortIdService {


	/**
	 * Auto-generate Sort-Id: check if any of the content at the same level has the same Lesson Plan, IS and Strand and Component Instance
	 * @param contentInstance
	 * @return
	 */
	def autogenerateSortId(def contentInstance){

		def contentAllSameDivisions = []
		def leaveFourSpaces = 4

		def contentAtSameLevelDivision = getTargetLevelsContent(contentInstance)

		contentAtSameLevelDivision.each{

			if (it.lessonPlan == contentInstance.lessonPlan && it.segment == contentInstance.segment && it.strand == contentInstance.strand && it.component?.component ==
			contentInstance.component?.component){
				contentAllSameDivisions << it
			}
		}

		if (contentAllSameDivisions){
			log.info "${contentAllSameDivisions.size} Resources share the same divisions"
			return contentAllSameDivisions?.sortId.max() + leaveFourSpaces

		} else{
			log.info "No other Resources share this division. Setting a Starting SortNumber..."
			return getStartingSortId(contentInstance)

		}
	}


	/**
	 * Get all Content Instances at a particular level and do not return the current content Instance
	 * @param contentInstance
	 * @return
	 */
	def getTargetLevelsContent(def contentInstance){

		def currentContentInstances = []

		if (contentInstance.topLevel){
			currentContentInstances = contentInstance.topLevel.content - contentInstance

		} else if (contentInstance.secondLevel){
			currentContentInstances = contentInstance.secondLevel.content - contentInstance

		} else if (contentInstance.thirdLevel){
			currentContentInstances = contentInstance.thirdLevel.content - contentInstance

		} else if (contentInstance.fourthLevel){
			currentContentInstances = contentInstance.fourthLevel.content - contentInstance

		} else if (contentInstance.fifthLevel){
			currentContentInstances = contentInstance.fifthLevel.content - contentInstance
		}

		return currentContentInstances
	}



	/**
	 * If this is the first resource in the division then multiply its componentHierarchy by startNumberMultipledBy local variable
	 * @param contentInstance
	 * @return
	 */
	def getStartingSortId(def contentInstance){

		def startNumberMultipledBy = 200
		def defaultHierarchy = 1
		int componentHierarchyValue = contentInstance?.component?.componentHierarchy ?: defaultHierarchy

		return componentHierarchyValue.multiply(startNumberMultipledBy)

	}


	/**
	 * Used for Custom validation: Check if the sortId is unique for all the content at the same Level within the same divisions
	 * @param contentInstance
	 * @return
	 */
	def isSortIdInUse(def contentInstance){

		def targetContentInstances = []
		def contentListAtSameLevel = getTargetLevelsContent(contentInstance)

		contentListAtSameLevel.each{

			if (it.lessonPlan == contentInstance.lessonPlan && it.segment == contentInstance.segment && it.strand == contentInstance.strand){
				targetContentInstances << it
			}
		}

		if (contentInstance.sortId in (targetContentInstances.sortId)){
			log.error "Existing content with the same Lesson-Plan, Instructional Segment and Strand instance already have this sortID: ${contentInstance.sortId} at this Level"
			return true
		}

		return false
	}

}

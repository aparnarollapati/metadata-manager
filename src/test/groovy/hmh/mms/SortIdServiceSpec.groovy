package hmh.mms

import grails.test.mixin.TestFor
import grails.test.mixin.Mock
import spock.lang.Specification
import hmh.mms.level.*

/**
 * See the API for {@link grails.test.mixin.services.ServiceUnitTestMixin} for usage instructions
 */
@TestFor(SortIdService)
@Mock([Content, ComponentSpec, TopLevel]) // mocking these Domains
class SortIdServiceSpec extends Specification {


	// autogenerateSortId
	@spock.lang.Unroll("Validate new Content with SortId: #expectedSortId is generated when existing content with the highest SortId: #contentSortId exists at all the same divisions")
	def "validate autogenerateSortId method for new Content at ALL the same Divisions as existing Content"(){

		given: "Mocked collaborators"
		def componentSpec = new ComponentSpec(component: "Teacher's Edition", componentHierarchy: 1)
		def lessonPlanInstance = new LessonPlan()
		def instructionalSegmentInstance =  new InstructionalSegment()
		def strandInstance = new Strand()
		def topLevelInstance = new TopLevel()

		and: "An existing content Instance"
		def contentInstanceThatAlreadyExists = new Content(displayTitle: "Content", sortId: contentSortId, component: componentSpec, lessonPlan: lessonPlanInstance, segment: instructionalSegmentInstance, strand: strandInstance)
		topLevelInstance.addToContent(contentInstanceThatAlreadyExists)

		and: "A new Content Instance that lives at all the same divisions"
		def contentInstance = new Content (displayTitle:  "Content", component: componentSpec, lessonPlan: lessonPlanInstance, segment: instructionalSegmentInstance, strand: strandInstance)
		topLevelInstance.addToContent(contentInstance)

		when: "autogenerateSortId Service method is called"
		def returnedSortId = service.autogenerateSortId(contentInstance)

		then: "The returned sort-id is expected #expectedSortId"
		returnedSortId == expectedSortId

		where:
		contentSortId			||expectedSortId
		200			            || 204
		204			            || 208
		208			            || 212
		402			    	    || 406
		4000			    	|| 4004
		0						|| 4
		99						|| 103
		-4						|| 0

	}


	// autogenerateSortId alternative
	@spock.lang.Unroll("validate new Content with SortId: #expectedSortId is generated when NO existing content exists at all the same divisions using component-hierarchy: #componentHierarchyValue")
	def "validate autogenerateSortId method for new Content at different divisions as existing Content"(){

		given: "Mocked collaborators"
		def componentSpecDifferent = new ComponentSpec(component: "Teacher's Edition", componentHierarchy: componentHierarchyValue)
		def componentSpec = new ComponentSpec(component: "Student's Edition", componentHierarchy: 6)
		def lessonPlanInstance = new LessonPlan()
		def instructionalSegmentInstance =  new InstructionalSegment()
		def strandInstance = new Strand()
		def topLevelInstance = new TopLevel()

		and: "An existing content Instance"
		def contentInstanceThatAlreadyExists = new Content(displayTitle: "Content", sortId: 20, component: componentSpec, lessonPlan: lessonPlanInstance, segment: instructionalSegmentInstance, strand: strandInstance)
		topLevelInstance.addToContent(contentInstanceThatAlreadyExists)

		and: "A new Content Instance that has a different Component Spec only"
		def contentInstance = new Content (displayTitle:  "Content", component: componentSpecDifferent, lessonPlan: lessonPlanInstance, segment: instructionalSegmentInstance, strand: strandInstance)
		topLevelInstance.addToContent(contentInstance)

		when: "autogenerateSortId Service method is called"
		def returnedSortId = service.autogenerateSortId(contentInstance)

		then: "The returned sort-id is expected #expectedSortId"
		returnedSortId == expectedSortId

		where:
		componentHierarchyValue 	||expectedSortId
		1		    				|| 200
		2							|| 400
		3							|| 600
		4							|| 800
		5							|| 1000
		0							|| 200
		35							|| 7000
		98							|| 19600
		99 							|| 19800

	}


	// getTargetLevelsContent
	def "validate getTargetLevelsContent method"(){

		given: "A new Top Level Instance with 3 Content instances"
		def topLevelInstance = new TopLevel()
		def contentInstance1 = new Content(displayTitle: "Content1_should_not_be_returned")
		def contentInstance2 = new Content(displayTitle: "Content2")
		def contentInstance3 = new Content(displayTitle: "Content3")

		and: "The 3 content Instances are associated to the topLevel Instance"
		topLevelInstance.addToContent(contentInstance1)
		topLevelInstance.addToContent(contentInstance2)
		topLevelInstance.addToContent(contentInstance3)

		when: "getTargetLevelsContent is called with ContentInstance1"
		def returnedContentInstances = service.getTargetLevelsContent(contentInstance1)

		then: "2 Content Instances are returned and not contentInstance1 object"
		returnedContentInstances.size() == 2
		returnedContentInstances[0].displayTitle != "Content1_should_not_be_returned"
		returnedContentInstances[1].displayTitle != "Content1_should_not_be_returned"

	}


	// getStartingSortId
	@spock.lang.Unroll("Validate Component-Hierarchy Value: #componentHierarchyValue results in the auto-generated Sort-Id: #expectedSortId")
	def "validate getStartingSortId method returns the expected base sortId"(){

		given: "A new mocked Component Spec"
		def componentSpec = new ComponentSpec(component: "Teacher's Edition", componentHierarchy: componentHierarchyValue)

		and: "A new mocked Content Instance that uses that component Spec"
		def contentInstance = new Content(component: componentSpec)

		when: "the getStartingSortId Service method is called"
		def returnedSortId = service.getStartingSortId(contentInstance)

		then: "The returned sort-id is expected #expectedSortId"
		returnedSortId == expectedSortId

		where:
		componentHierarchyValue	||expectedSortId
		1						|| 200
		2						|| 400
		3						|| 600
		4						|| 800
		5						|| 1000
		0						|| 200
		35						|| 7000
		98						|| 19600
		99 						|| 19800

	}


	//isSortIdInUse
	@spock.lang.Unroll("Validate 'isSortIdInUse' where new contents sortId is: #sortIdValue, and existing Content has #description, correctly returned #isSortIdInUseValue")
	def "validate isSortIdInUse method returns the expected boolean"(){

		given: "New mocked objects"
		def componentSpec = new ComponentSpec(component: "Student's Edition", componentHierarchy: 1)

		def lessonPlanInstance = new LessonPlan()
		def lessonPlanInstance2 = new LessonPlan()

		def instructionalSegmentInstance =  new InstructionalSegment()
		def instructionalSegmentInstance2 = new InstructionalSegment()

		def strandInstance = new Strand()
		def strandInstance2 = new Strand()

		def topLevelInstance = new TopLevel()
		def topLevelInstance2 = new TopLevel()

		and: "A new Content Instance"
		def contentInstance = new Content (displayTitle:  "Content", sortId: sortIdValue, component: componentSpec, lessonPlan: lessonPlanInstance, segment:
		instructionalSegmentInstance, strand: strandInstance)
		topLevelInstance.addToContent(contentInstance)

		and: "Existing content Instance at all the same divisions"
		def contentInstanceThatAlreadyExists = new Content(displayTitle: "Content", sortId: 200, component: componentSpec, lessonPlan: lessonPlanInstance, segment:
		instructionalSegmentInstance, strand: strandInstance)
		topLevelInstance.addToContent(contentInstanceThatAlreadyExists)

		and: "Existing content Instance that has a different Lesson Plan"
		def contentInstanceThatAlreadyExists2 = new Content(displayTitle: "Content", sortId: 400, component: componentSpec, lessonPlan: lessonPlanInstance2, segment:
		instructionalSegmentInstance, strand: strandInstance)
		topLevelInstance.addToContent(contentInstanceThatAlreadyExists2)

		and: "Existing content Instance that has a different Instructional Segemnt"
		def contentInstanceThatAlreadyExists3 = new Content(displayTitle: "Content", sortId: 600, component: componentSpec, lessonPlan: lessonPlanInstance, segment:
		instructionalSegmentInstance2, strand: strandInstance)
		topLevelInstance.addToContent(contentInstanceThatAlreadyExists3)

		and: "Existing content Instance that has a different Strand"
		def contentInstanceThatAlreadyExists4 = new Content(displayTitle: "Content", sortId: 800, component: componentSpec, lessonPlan: lessonPlanInstance, segment:
		instructionalSegmentInstance, strand: strandInstance2)
		topLevelInstance.addToContent(contentInstanceThatAlreadyExists4)

		and: "Existing content Instance that has a different Level Instance"
		def contentInstanceThatAlreadyExists5 = new Content(displayTitle: "Content", sortId: 1000, component: componentSpec, lessonPlan: lessonPlanInstance, segment:
		instructionalSegmentInstance, strand: strandInstance)
		topLevelInstance2.addToContent(contentInstanceThatAlreadyExists5)


		when: "the isSortIdInUse Service method is called"
		def returnedBoolean = service.isSortIdInUse(contentInstance)

		then: "The returned Boolean is expected #isSortIdInUseValue"
		returnedBoolean == isSortIdInUseValue

		where:
		description														|	sortIdValue		||	isSortIdInUseValue
		"the same SortId and belongs to all the Same Levels"			|	200				|| 	true
		"different SortId and belongs to all the Same Levels"			|	205				|| 	false
		"the same SortId and has different Lesson Plan"					|	400				|| 	false
		"the same SortId and has different Segment"						|	600				|| 	false
		"the same SortId and has different Strand"						|	800				|| 	false
		"the same SortId and has different Level"						|	1000			|| 	false

	}


}

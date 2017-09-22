package hmh.mms


import grails.test.mixin.integration.Integration
import grails.transaction.*
import spock.lang.*
import hmh.mms.level.*

@Integration
@Rollback
class ContentIntegrationSpec extends Specification {



	def "Adding duplicate hmhIDs causes a validation issue"(){

		given: "An existing Content Instance"
		def content1 = Content.where{id==1}.get()

		and: "Get an existing hmhId"
		def content2 = content1.properties['hmhId']

		and: "Create a new Content Instance"
		def duplicateContent = new Content( hmhId:content2 )


		when: "dupicate hmhId is validated"
		duplicateContent.validate()

		then: "The duplicate product failed validation due to non-unique hmhId"
		! duplicateContent.validate()
		duplicateContent.errors.hasFieldErrors('hmhId')
		duplicateContent.errors.getFieldError('hmhId')?.code == 'unique'

	}


	def "Testing Custom Validators SortId must be Unique per-Level and within the divisions of Lesson-Plan, IS and Strand"(){ // what the test does

		given: "An existing Content Instance that is bootstrapped"
		def content1 = Content.where{id==1}.get()

		and: "Get an existing sortId and level instance"
		def content2SortId = content1.properties['sortId']
		def secondLevelProperty = content1.properties['secondLevel']
		def segmentProperty = content1.properties['segment']
		def strandProperty = content1.properties['strand']
		def lessonPlanProperty = content1.properties['lessonPlan']

		and: "Create a new content Instance with the existing properties"
		def duplicateSortId = new Content( sortId:content2SortId, secondLevel:secondLevelProperty, segment:segmentProperty, strand:strandProperty, lessonPlan: lessonPlanProperty )

		when: "the new Content instance is validated" //stimulus phase "setting the scene"
		duplicateSortId.validate() // validate not saved


		then: "The duplicate content SortId failed validation due to sortId already in use at the second Level"
		! duplicateSortId.validate()
		duplicateSortId.errors.hasFieldErrors('sortId')
		duplicateSortId.errors.getFieldError('sortId')?.code == 'second-level.content.sortid.in.use'

	}


	def "Testing SortId can be re-used at a different level"(){ // what the test does

		given: "An existing Content Instance that is bootstrapped"
		def content1 = Content.where{id==1}.get()

		and: "Get an existing sortId and get a new level instance"
		def content2SortId = content1.properties['sortId']

		def thirdLevelInstance = ThirdLevel.where{id == 1}.get() //TODO improve getting this instance

		and: "Create a new content Instance with the existing sortId at the new level"
		def duplicateSortIdAtDifferentLevel = new Content( sortId:content2SortId, thirdLevel:thirdLevelInstance )

		when: "the new Content instance is validated" //stimulus phase "setting the scene"
		duplicateSortIdAtDifferentLevel.validate() // validate not saved

		then: "The duplicate content SortId is OK at a different level"
		!duplicateSortIdAtDifferentLevel.errors.hasFieldErrors('sortId')


	}


	def "Testing SortId can be re-used at the same level under a different Strand"(){ // what the test does

		given: "An existing Content Instance that is bootstrapped"
		def content1 = Content.where{id==1}.get()

		and: "Get an existing sortId and get a new level instance"
		def content2SortId = content1.properties['sortId']
		def secondLevelProperty = content1.properties['secondLevel']
		def segmentProperty = content1.properties['segment']

		def strandInstance = Strand.where{id == 5}.get() //TODO improve getting this instance

		and: "Create a new content Instance with the existing sortId at the new level"
		def duplicateSortIdAtDifferentLevel = new Content( sortId:content2SortId, secondLevel:secondLevelProperty, segment:segmentProperty, strand:strandInstance )

		when: "the new Content instance is validated" //stimulus phase "setting the scene"
		duplicateSortIdAtDifferentLevel.validate() // validate not saved

		then: "The duplicate content SortId is OK at a different level"
		!duplicateSortIdAtDifferentLevel.errors.hasFieldErrors('sortId')


	}

}

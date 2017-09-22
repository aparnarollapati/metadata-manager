package hmh.mms

import grails.test.mixin.TestFor
import spock.lang.Specification

/**
 * See the API for {@link grails.test.mixin.services.ServiceUnitTestMixin} for usage instructions
 */
@TestFor(MappingService)
class MappingServiceSpec extends Specification {


	//getGradeHierarchy
	@spock.lang.Unroll("validate '#grade' generates the expected Grade Hierarchy: #expectedGradeHierarchy")
	def "validate getGradeHierarchy method"(){

		given: "A Grade value or range"
		def gradeValue = grade

		when: "Guid-Service: getGradeNumber method is called"
		def returnedGrade = service.getGradeHierarchy(gradeValue)

		then: "The generated final Guid is expected"
		returnedGrade == expectedGradeHierarchy

		where:
		grade				||expectedGradeHierarchy
		["IT"]				|| 1
		["K"]				|| 5
		["3"]				|| 8
		["8"]				|| 13
		["10"]				|| 15
		["12"]				|| 17
		["6","7","8"]		|| 22
		["6","7","12"]		|| 22
		["6","PS","13"]		|| 22
		["IT", "PK"]		|| 22
		[]					|| 22
		["K","1","6"]		|| 22

	}



	//getMediaType
	@spock.lang.Unroll("validate '#mediaType' generates the expected Planner Media-Type: #expectedPlannerMapping")
	def "validate getMediaType method"(){

		given: "A Grade value or range"
		def mediaTypeValue = mediaType

		when: "Guid-Service: getGradeNumber method is called"
		def returnedMediaType = service.getMediaType(mediaTypeValue)

		then: "The generated final Guid is expected"
		returnedMediaType == expectedPlannerMapping

		where:
		mediaType				||expectedPlannerMapping
		"HTML"					|| "url"
		"Flash"					|| "url"
		"PDF"					|| "pdf"
		"Presentation"			|| "power point"
		"IWB"					|| "url"
		"Editable File"			|| "text file"
		"Video"					|| "url"
		"Audio"					|| "url"
		"URL"					|| "url"
		"Java"					|| "url"
		"Graphing Calculator"	|| "url"
		"Spark"					|| "url"
		"Unknown"				|| "url" // default


	}


	//getDisciplineCode
	@spock.lang.Unroll("validate '#disciplineLabel' generates the expected MDS DisciplineCode: #expectedMDSdisciplineCode")
	def "validate getDisciplineCode method"(){

		given: "A Discipline Label"
		def disciplineLabelValue = disciplineLabel

		when: "disciplineLabelValue passed to the getDisciplineCode method"
		def returnedDisciplineCode = service.getDisciplineCode(disciplineLabelValue)

		then: "The generated final disciplineCode is expected"
		returnedDisciplineCode == expectedMDSdisciplineCode

		where:
		disciplineLabel				||expectedMDSdisciplineCode
		"Reading and Language Arts"	|| "01"
		"Mathematics"				|| "02"
		"Science and Health"		|| "03"
		"Social Studies"			|| "04"
		"World Languages"			|| "05"
		"Other"			            || "10"
		"Unknown"					|| "10" // default


	}

	//getPlannerComponentType
	@spock.lang.Unroll("validate '#componentType' generates the expected Planner Component-Type: #expectedComponentType")
	def "validate getPlannerComponentType method"(){

		given: "A component Type"
		def componentTypeValue = componentType

		when: "ComponentTypeValue passed to the getComponentType method"
		def returnedComponentType = service.getPlannerComponentType(componentTypeValue)

		then: "The generated final ComponentType is expected"
		returnedComponentType == expectedComponentType

		where:
		componentType					||expectedComponentType
		"Key Student Resource"			|| "SE"
		"Key Teacher Resource"			|| "TE"
		"Intervention Resource"			|| "ancillary"
		"assessment"			        || "assessment"
		"Ancillary"						|| "ancillary"
		"interactive activity"			|| "online activity"
		"Reader"						|| "leveled reader"
		"Video"							|| "movie"
		"Lab"							|| "ancillary"
		"Website"						|| "online activity"
		"Presentation"	                || "ancillary"
		"Audio"							|| "ancillary"
		"resource"	                    || "resource"
		"ISE"							|| "online activity"
		"Unknown"						|| "ancillary" // default
		"ise_lesson (DLO enabled)"		|| "ise_lesson"
		"ise_lesson"					|| "ise_lesson"
		"ise_less"						|| "ancillary"

	}


	//getMdsComponentType
	@spock.lang.Unroll("validate '#componentType' generates the expected Planner Component-Type: #expectedComponentType")
	def "validate getMdsComponentType method"(){

		given: "A component Type"
		def componentTypeValue = componentType

		when: "ComponentTypeValue passed to the getComponentType method"
		def returnedComponentType = service.getMdsComponentType(componentTypeValue)

		then: "The generated final ComponentType is expected"
		returnedComponentType == expectedComponentType

		where:
		componentType					||expectedComponentType
		"Key Student Resource"			|| "Key Student Resource"
		"Key Teacher Resource"			|| "Key Teacher Resource"
		"ise_lesson (DLO enabled)"		|| "ISE"
		"ise_lesson"					|| "ISE"
		"ise_less"						|| "ise_less"
		"ISE"							|| "ISE"

	}


	// splitPmtUrl
	@spock.lang.Unroll("validate '#inputUrl' generates the expected MDS URL: #expectedMdsUrl")
	def "test splitting the url"(){

		given: "A URL that contains pmt"

		when: "splitPmtUrl is called"
		def returnedUrl = service.splitPmtUrl(inputUrl)

		then: "url = expectedUrl"
		returnedUrl == expectedMdsUrl

		where:
		inputUrl						|| expectedMdsUrl
		"#"								|| "#"
		""								|| ""
		"/content"						|| "/content"
		null 							|| ""

	}


	// splitPmtUrl
	def "test splitting a typical PMP URL"(){

		given: "A URL that does not contain pmt"
		def url = "/content/hmof/math/hsm/common/ite/n01.3/index.html?C=alg1&S=CA||PMT=cahs15alg1iytu1m1l2ye1||PMT=cahs15alg1iytu1m1l2ye2||PMT=cahs15alg1iytu1m1l2ye3||PMT=cahs15alg1iytu1m1l2ye4||PMT=cahs15alg1ihwu1m1l2ev1"
		def expectedurl = "/content/hmof/math/hsm/common/ite/n01.3/index.html?C=alg1&S=CA"

		when: "splitPmtUrl is called"
		def returnedUrl = service.splitPmtUrl(url)

		then: "url = expectedUrl"
		returnedUrl == expectedurl

	}


	// identifyPlatform
	@spock.lang.Unroll("validate '#platformNameValue' generates the expected Platform URL: #expectedPlatformUrl")
	def "test that the correct Platformurl is returned"(){

		given: "A platform Name"
		def platformName = platformNameValue


		when: "identifyPlatform Service method is called"
		def returnedUrl = service.identifyPlatform(platformName)

		then: "returned URL is expected"
		returnedUrl == expectedPlatformUrl

		where:
		platformNameValue				|| expectedPlatformUrl
		"TCK6"							|| "http://www-k6.thinkcentral.com"
		"HMOF"							|| "http://my.hrw.com"
		""								|| ""
		null 							|| ""

	}
}

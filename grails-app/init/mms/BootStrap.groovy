package mms
import hmh.mms.ComponentSpec
import hmh.mms.Content
import hmh.mms.Grade
import hmh.mms.Keyword
import hmh.mms.LessonPlan
import hmh.mms.Program
import hmh.mms.Product
import hmh.mms.InstructionalSegment
import hmh.mms.StandardSet
import hmh.mms.Strand
import hmh.mms.correlation.CorrelationSource
import hmh.mms.correlation.CorrelationTarget
import hmh.mms.correlation.ContentSource
import hmh.mms.correlation.ContentTarget
import hmh.mms.level.*
import hmh.mms.mapping.CategorizationMapping
import hmh.mms.mapping.ComponentMapping
import hmh.mms.mapping.ComponentTypeMapping
import hmh.mms.mapping.InstructionalSegmentMapping
import hmh.mms.mapping.MediaTypeMapping
import hmh.mms.mapping.StrandMapping
import hmh.mms.security.*
import hmh.mms.Reader
import hmh.mms.Ed
import grails.util.Environment


class BootStrap {

	def init = { servletContext ->

		createUsers()

		// If their are no program instances in the DB then bootstrap the core test data
		if( !Program.where{}.list() ){

			if (Environment.current == Environment.DEVELOPMENT || Environment.current == Environment.TEST || Environment.current == Environment.PRODUCTION || Environment.current.name == "nightly") {

				createMappingDomains()
				createHmofProgram()
				createTcProgram()

			}
		}
	}
	def destroy = {}


	/**
	 * bootstrap test Users
	 * @return
	 */
	def createUsers(){

		//Spring Security
		def adminRole = Role.findByAuthority('ROLE_ADMIN') ?: new Role(authority: 'ROLE_ADMIN').save(failOnError: true)
		def uiRole = Role.findByAuthority('ROLE_UIUSER') ?: new Role(authority: 'ROLE_UIUSER').save(failOnError: true)
		def userAdmin = Role.findByAuthority('ROLE_USER_ADMIN') ?: new Role(authority: 'ROLE_USER_ADMIN').save(failOnError: true)

		// Admin users
		def adminUser = User.findByUsername('Admin') ?: new User(username: 'Admin', password: 'spr1ngt1me',	email: 'CustomDevelopment@hmhco.com',	roleid: '1').save(failOnError: true)
		if (!adminUser.authorities.contains(adminRole)) {UserRole.create adminUser, adminRole}

		def adminUser2 = User.findByUsername('noconnor') ?: new User(username: 'noconnor',password: 'noconnor',email: 'niall.oconnor@hmhco.com',	roleid: '1').save(failOnError: true)
		if (!adminUser2.authorities.contains(adminRole)) {UserRole.create adminUser2, adminRole}

		def adminUser3 = User.findByUsername('arollapati') ?: new User(username: 'arollapati',password: 'Ji9ahhia',email: 'aparna.rollapati@cognizant.com',	roleid: '1').save(failOnError: true)
		if (!adminUser3.authorities.contains(adminRole)) {UserRole.create adminUser3, adminRole}

		def adminUser4 = User.findByUsername('etalbot') ?: new User(username: 'etalbot',password: 'etalbot',email: 'eleanor.talbot@hmhco.com',	roleid: '1').save(failOnError: true)
		if (!adminUser4.authorities.contains(adminRole)) {UserRole.create adminUser4, adminRole}

		def adminUser5 = User.findByUsername('idunn') ?: new User(username: 'idunn',password: 'idunn',email: 'ivan.dunn@hmhco.com',	roleid: '1').save(failOnError: true)
		if (!adminUser5.authorities.contains(adminRole)) {UserRole.create adminUser5, adminRole}

		// UI users
		def uiUser = User.findByUsername('uiuser') ?: new User(username: 'uiuser', password: 'uiuser',	email: 'aparna.rollapati@hmhco.com',	roleid: '2').save(failOnError: true)
		if (!uiUser.authorities.contains(uiRole)) {UserRole.create uiUser, uiRole}

		def stephenboyce = User.findByUsername('stephen.boyce@hmhco.com') ?: new User(username: 'stephen.boyce@hmhco.com', password: 'sboyce',	email: 'stephen.boyce@hmhco.com',	roleid: '2').save(failOnError: true)
		if (!stephenboyce.authorities.contains(uiRole)) {UserRole.create stephenboyce, uiRole}

		def frankanderson = User.findByUsername('frank.anderson@hmhco.com') ?: new User(username: 'frank.anderson@hmhco.com', password: 'fanderson',	email: 'frank.anderson@hmhco.com',	roleid: '2').save(failOnError: true)
		if (!frankanderson.authorities.contains(uiRole)) {UserRole.create frankanderson, uiRole}

		def amandasubbarao = User.findByUsername('amanda.subbarao@hmhco.com') ?: new User(username: 'amanda.subbarao@hmhco.com', password: 'asubbarao',	email: 'amanda.subbarao@hmhco.com',	roleid: '2').save(failOnError: true)
		if (!amandasubbarao.authorities.contains(uiRole)) {UserRole.create amandasubbarao, uiRole}

		//Support Ops Team <SupportOpsTeam@hmhco.com>
		def supportops = User.findByUsername('supportopsteam@hmhco.com') ?: new User(username: 'supportopsteam@hmhco.com', password: 'supportops',	email: 'supportopsteam@hmhco.com',	roleid: '2').save(failOnError: true)
		if (!supportops.authorities.contains(uiRole)) {UserRole.create supportops, uiRole}

		def meganorr = User.findByUsername('megan.orr@hmhco.com') ?: new User(username: 'megan.orr@hmhco.com', password: 'morr', email: 'megan.orr@hmhco.com',	roleid: '2').save(failOnError: true)
		if (!meganorr.authorities.contains(uiRole)) {UserRole.create meganorr, uiRole}

		def malindaweed = User.findByUsername('malinda.weed@hmhco.com') ?: new User(username: 'malinda.weed@hmhco.com', password: 'mweed', email: 'malinda.weed@hmhco.com', roleid: '2').save(failOnError: true)
		if (!malindaweed.authorities.contains(uiRole)) {UserRole.create malindaweed, uiRole}

		def erinflesch = User.findByUsername('erin.flesch@hmhco.com') ?: new User(username: 'erin.flesch@hmhco.com', password: 'eflesch', email: 'erin.flesch@hmhco.com',	roleid: '2').save(failOnError: true)
		if (!erinflesch.authorities.contains(uiRole)) {UserRole.create erinflesch, uiRole}

		def howardsweet = User.findByUsername('howard.sweet@hmhco.com') ?: new User(username: 'howard.sweet@hmhco.com', password: 'hsweet', email: 'howard.sweet@hmhco.com',	roleid: '2').save(failOnError: true)
		if (!howardsweet.authorities.contains(uiRole)) {UserRole.create howardsweet, uiRole}

		def gregbenton = User.findByUsername('greg.benton@hmhco.com') ?: new User(username: 'greg.benton@hmhco.com', password: 'gbenton', email: 'greg.benton@hmhco.com',	roleid: '2').save(failOnError: true)
		if (!gregbenton.authorities.contains(uiRole)) {UserRole.create gregbenton, uiRole}

		def ivandunn = User.findByUsername('idunn2') ?: new User(username: 'idunn2', password: 'idunn2', email: 'ivan.dunn2@hmhco.com',	roleid: '2').save(failOnError: true)
		if (!ivandunn.authorities.contains(uiRole)) {UserRole.create ivandunn, uiRole}
		
		def ivandunn3 = User.findByUsername('idunn3') ?: new User(username: 'idunn3', password: 'idunn3', email: 'ivan.dunn3@hmhco.com',	roleid: '3').save(failOnError: true)
		if (!ivandunn3.authorities.contains(userAdmin)) {UserRole.create ivandunn3, userAdmin}

	}

	/**
	 * Helper method to create stand-alone mapping file
	 * @return
	 */
	def createMappingDomains(){

		def mediaTypeMapping1 = new MediaTypeMapping ( "mediaType": "HTML" ).save(failOnError: true)
		def mediaTypeMapping2 = new MediaTypeMapping ( "mediaType": "PDF" ).save(failOnError: true)
		def mediaTypeMapping3 = new MediaTypeMapping ( "mediaType": "Presentation" ).save(failOnError: true)

		def instructionalSegmentMapping1 = new InstructionalSegmentMapping ("instructionalSegment": "Course-Level Resources").save(failOnError: true)
		def instructionalSegmentMapping2 = new InstructionalSegmentMapping ("instructionalSegment": "Module-Level Resources").save(failOnError: true)
		def instructionalSegmentMapping3 = new InstructionalSegmentMapping ("instructionalSegment": "Lesson-Level Resources").save(failOnError: true)

		def instructionalSegmentMapping4 = new InstructionalSegmentMapping ("instructionalSegment": "Unit-Level Resources").save(failOnError: true)
		def instructionalSegmentMapping5 = new InstructionalSegmentMapping ("instructionalSegment": "Language Arts").save(failOnError: true)
		def instructionalSegmentMapping6 = new InstructionalSegmentMapping ("instructionalSegment": "Response to Intervention").save(failOnError: true)
		def instructionalSegmentMapping7 = new InstructionalSegmentMapping ("instructionalSegment": "Assessment").save(failOnError: true)
		def instructionalSegmentMapping8 = new InstructionalSegmentMapping ("instructionalSegment": "Small Group Instruction").save(failOnError: true)
		def instructionalSegmentMapping9 = new InstructionalSegmentMapping ("instructionalSegment": "Whole Group Instruction").save(failOnError: true)
		def instructionalSegmentMapping10 = new InstructionalSegmentMapping ("instructionalSegment": "Grade-Level Resources").save(failOnError: true)

		def strandMapping1 = new StrandMapping ("strand": "Writing Activities").save(failOnError: true)
		def strandMapping2 = new StrandMapping ("strand": "Reading Support").save(failOnError: true)
		def strandMapping3 = new StrandMapping ("strand": "Assessment").save(failOnError: true)
		def strandMapping4 = new StrandMapping ("strand": "Teacher Resources").save(failOnError: true)
		def strandMapping5 = new StrandMapping ("strand": "References").save(failOnError: true)
		def strandMapping6 = new StrandMapping ("strand": "Additional Resources").save(failOnError: true)
		def strandMapping7 = new StrandMapping ("strand": "Core Instruction").save(failOnError: true)

		def strandMapping8 = new StrandMapping ("strand": "Advanced").save(failOnError: true)
		def strandMapping9 = new StrandMapping ("strand": "Daily Language").save(failOnError: true)
		def strandMapping10 = new StrandMapping ("strand": "English Language Learners").save(failOnError: true)
		def strandMapping11 = new StrandMapping ("strand": "Foundational Skills").save(failOnError: true)
		def strandMapping12 = new StrandMapping ("strand": "On Level").save(failOnError: true)
		def strandMapping13 = new StrandMapping ("strand": "Oral Language").save(failOnError: true)
		def strandMapping14 = new StrandMapping ("strand": "Skills and Strategies").save(failOnError: true)
		def strandMapping15 = new StrandMapping ("strand": "Spelling, Grammar and Writing").save(failOnError: true)
		def strandMapping16 = new StrandMapping ("strand": "Struggling Readers").save(failOnError: true)
		def strandMapping17 = new StrandMapping ("strand": "Tier II: Strategic Intervention").save(failOnError: true)
		def strandMapping18 = new StrandMapping ("strand": "Student Resources").save(failOnError: true)


		def componentMapping1 = new ComponentMapping ("component": "Teacher eBook").save(failOnError: true)
		def componentMapping2 = new ComponentMapping ("component": "Student eBook").save(failOnError: true)
		def componentMapping3 = new ComponentMapping ("component": "Additional Resources").save(failOnError: true)
		def componentMapping4 = new ComponentMapping ("component": "Online Assessment").save(failOnError: true)
		def componentMapping5 = new ComponentMapping ("component": "Guided Reading Workbook").save(failOnError: true)
		def componentMapping6 = new ComponentMapping ("component": "Student Edition").save(failOnError: true)
		def componentMapping7 = new ComponentMapping ("component": "Teacher Guide").save(failOnError: true)
		def componentMapping8 = new ComponentMapping ("component": "myWriteSmart").save(failOnError: true)
		def componentMapping9 = new ComponentMapping ("component": "Multimedia Connections").save(failOnError: true)

		def componentMapping10 = new ComponentMapping ("component": "Teacher Edition").save(failOnError: true)
		def componentMapping11 = new ComponentMapping ("component": "Student Book").save(failOnError: true)
		def componentMapping12 = new ComponentMapping ("component": "Combination Classroom Planning Guide").save(failOnError: true)

		def componentTypeMapping1 = new ComponentTypeMapping ("componentType": "Key Teacher Resource").save(failOnError: true)
		def componentTypeMapping2 = new ComponentTypeMapping ("componentType": "Key Student Resource").save(failOnError: true)
		def componentTypeMapping3 = new ComponentTypeMapping ("componentType": "Ancillary").save(failOnError: true)
		def componentTypeMapping4 = new ComponentTypeMapping ("componentType": "Assessment").save(failOnError: true)

		def categorizationMapping1 = new CategorizationMapping ("categorization": "Core Components").save(failOnError: true)
		def categorizationMapping2 = new CategorizationMapping ("categorization": "Teaching Aids").save(failOnError: true)
		def categorizationMapping3 = new CategorizationMapping ("categorization": "Assessments").save(failOnError: true)
		def categorizationMapping4 = new CategorizationMapping ("categorization": "Interactive Content").save(failOnError: true)
		def categorizationMapping5 = new CategorizationMapping ("categorization": "Study Aids and Workbooks").save(failOnError: true)


	}

	/**
	 * Bootstrap HMOF Program US History 1877 (2018)
	 * @return
	 */
	def createHmofProgram(){

		// Program with 2 products
		def program1 = new Program(name:"socialstudies2020", code: "SS", discipline:"Social Studies", state: "FL", copyrightYear: 2020, platform:"HMOF", topLevelScope: "Grade", "secondLevelScope": "Module", "thirdLevelScope": "Lesson", "fourthLevelScope": null, "fifthLevelScope": null,standardSetName:"FLSS_2018_MS_USH_v4.xml")


		// *** Component Specification ***:
		def componentSpec1 = new ComponentSpec("component":"Teacher eBook", "componentHierarchy": 1, "componentType": "Key Teacher Resource", "categorization": "Core Components", "toolType": 6 )
		def componentSpec2 = new ComponentSpec("component":"Student eBook", "componentHierarchy": 2, "componentType": "Key Student Resource", "categorization": "Core Components" , "toolType": 6 )
		def componentSpec3 = new ComponentSpec("component":"Additional Resources", "componentHierarchy": 12, "componentType": "Ancillary", "categorization": "Teaching Aids" , "toolType": 6 )
		def componentSpec4 = new ComponentSpec("component":"Online Assessment", "componentHierarchy":3 , "componentType": "Assessment", "categorization": "Assessments" , "toolType":6 )
		def componentSpec5 = new ComponentSpec("component":"Guided Reading Workbook", "componentHierarchy":4 , "componentType": "Ancillary", "categorization": "Teaching Aids" , "toolType": 6 )
		def componentSpec6 = new ComponentSpec("component":"Online Assessment", "componentHierarchy":7 , "componentType": "Assessment", "categorization": "Assessments" , "toolType":55 )
		def componentSpec7 = new ComponentSpec("component":"Student Edition", "componentHierarchy":8 , "componentType": "Key Student Resource", "categorization": "Core Components" , "toolType":6 )
		def componentSpec8 = new ComponentSpec("component":"Teacher Guide", "componentHierarchy":9 , "componentType": "Key Teacher Resource", "categorization": "Core Components" , "toolType":6 )
		def componentSpec9 = new ComponentSpec("component":"myWriteSmart", "componentHierarchy":10 , "componentType": "Ancillary", "categorization": "Interactive Content" , "toolType":2 )
		def componentSpec10 = new ComponentSpec("component":"Additional Resources", "componentHierarchy":29 , "componentType": "Ancillary", "categorization": "Study Aids and Workbooks" , "toolType":6 )
		def componentSpec11 = new ComponentSpec("component":"Multimedia Connections", "componentHierarchy":28 , "componentType": "Ancillary", "categorization": "Interactive Content" , "toolType":6 )
		def componentSpec12 = new ComponentSpec("component":"Additional Resources", "componentHierarchy":30 , "componentType": "Assessment", "categorization": "Assessments" , "toolType":6 )

		def product1 = new Product("isbn":9787774567831, title:"US History beg to 1877 - MS")
		def product2 = new Product("isbn":9787774567832, title:"Custom Development Test Product 2017")

		// *** Instructional Segment ***
		def segment1 = new InstructionalSegment("hierarchy":1, "title": "Course-Level Resources")
		def segment2 = new InstructionalSegment("hierarchy":2, "title": "Module-Level Resources")
		def segment3 = new InstructionalSegment("hierarchy":3, "title": "Lesson-Level Resources")

		// *** Strands ***
		def strand1 = new Strand("hierarchy":1, "title": "Core Instruction")
		def strand2 = new Strand("hierarchy":2, "title": "Writing Activities")
		def strand3 = new Strand("hierarchy":4, "title": "Reading Support")
		def strand4 = new Strand("hierarchy":5, "title": "Assessment")
		def strand5 = new Strand("hierarchy":6, "title": "Teacher Resources")
		def strand6 = new Strand("hierarchy":7, "title": "References")
		def strand7 = new Strand("hierarchy":9, "title": "Additional Resources")
		
		
		def edStandardSet = new StandardSet("name": "OneCMS_NRC_20759F6E-A258-11E2-8B4D-9E4F9DFF4B22_SCI_2020.xml" )
		def edStandardSet2 = new StandardSet("name": "TwoCMS_NRC_20759F6E-A258-11E2-8B4D-9E4F9DFF4B22_SCI_2022.xml" )

		program1.addToComponents(componentSpec1)
		program1.addToComponents(componentSpec2)
		program1.addToComponents(componentSpec3)
		program1.addToComponents(componentSpec4)
		program1.addToComponents(componentSpec5)
		program1.addToComponents(componentSpec6)
		program1.addToComponents(componentSpec7)
		program1.addToComponents(componentSpec8)
		program1.addToComponents(componentSpec9)
		program1.addToComponents(componentSpec10)
		program1.addToComponents(componentSpec11)
		program1.addToComponents(componentSpec12)
		
		
		program1.addToStandardSets(edStandardSet)
		program1.addToStandardSets(edStandardSet2)

		program1.addToProducts(product1)
		program1.addToProducts(product2)
		program1.save(failOnError: true)

		// Associate strand and IS to program
		program1.addToSegments(segment1)
		program1.addToSegments(segment2)
		program1.addToSegments(segment3)
		// strands
		program1.addToStrands(strand1)
		program1.addToStrands(strand2)
		program1.addToStrands(strand3)
		program1.addToStrands(strand4)
		program1.addToStrands(strand5)
		program1.addToStrands(strand6)
		program1.addToStrands(strand7)
		program1.save( failOnError: true )

		// grades
		product1.addToGrades(grade:"6")
		product1.addToGrades(grade:"7")
		product1.addToGrades(grade:"8")

		product2.addToGrades(grade:"12")

		// components
		product1.addToComponents(componentSpec1)
		product1.addToComponents(componentSpec2)
		product1.addToComponents(componentSpec3)
		product1.addToComponents(componentSpec4)
		product1.addToComponents(componentSpec5)
		product1.addToComponents(componentSpec6)
		product1.addToComponents(componentSpec7)
		product1.addToComponents(componentSpec8)
		product1.addToComponents(componentSpec9)
		product1.addToComponents(componentSpec10)
		product1.addToComponents(componentSpec11)
		product1.addToComponents(componentSpec12)

		product1.save(failOnError: true, flush:true)

		product2.addToComponents(componentSpec1)
		product2.save(failOnError: true, flush:true)


		// *** Simple levels ***
		def topLevel1 = new TopLevel("title": "United States History, Beginnings to 1877", nonGradeLevel: "Course -", nonGradeTitle: "United States History, Beginnings to 1877")
		topLevel1.addToGrades(grade:"6")
		topLevel1.addToGrades(grade:"7")
		topLevel1.addToGrades(grade:"8")

		topLevel1.addToKeywords(keyword: "History")

		topLevel1.addToStandards(standard: "TOP1.S.T.A.N.D.ARD") //common Standards


		// Add top-level Scope and Sequence to Program Instance
		program1.addToTopLevels(topLevel1).save( failOnError: true, flush: true )

		// Second Level Instances
		def secondLevel1 = new SecondLevel(topLevel: topLevel1, "hierarchy": 1, "title": "America, Africa, and Europe before 1500").save(failOnError: true, flush:true)
		secondLevel1.addToKeywords(keyword: "module 1").save(failOnError: true) //common keywords
		secondLevel1.addToStandards(standard: "S.T.A.N.D-ARD.1.5a").save(failOnError: true) //common Standards
		secondLevel1.addToStandards(standard: "S.T.A.N.D-ARD.1.5b").save(failOnError: true) //common Standards
		secondLevel1.addToKeywords(keyword: "second-level-common-keyword1").save(failOnError: true) //common keywords

		def secondLevel2 = new SecondLevel(topLevel: topLevel1, "hierarchy": 2, "title": "New Empires in the Americas").save(failOnError: true, flush: true)
		secondLevel2.addToKeywords(keyword: "module 2").save(failOnError: true) // common keywords
		secondLevel2.addToKeywords(keyword: "second-level-common-keyword2").save(failOnError: true) // common keywords

		def secondLevel3 = new SecondLevel(topLevel: topLevel1, "hierarchy": 3, "title": "The English Colonies").save(failOnError: true)

		// Third Level Instances
		def thirdLevel1a = new ThirdLevel(secondLevel: secondLevel1, "hierarchy": 1, "title": "The Earliest Americans").save(failOnError: true, flush:true)
		thirdLevel1a.addToKeywords(keyword: "lesson 1").save(failOnError: true) // common keywords
		thirdLevel1a.addToKeywords(keyword: "third-level-common-keyword1").save(failOnError: true) // common keywords

		def thirdLevel1b = new ThirdLevel(secondLevel: secondLevel1, "hierarchy": 2, "title": "Native American Cultures").save(failOnError: true)
		thirdLevel1b.addToKeywords(keyword: "lesson 2").save(failOnError: true) // common keywords
		thirdLevel1b.addToKeywords(keyword: "third-level-common-keyword2").save(failOnError: true) // common keywords

		def thirdLevel1c = new ThirdLevel(secondLevel: secondLevel1, "hierarchy": 3, "title": "Trading Kingdoms of West Africa").save(failOnError: true)
		def thirdLevel1d = new ThirdLevel(secondLevel: secondLevel1, "hierarchy": 4, "title": "Europe before 1500").save(failOnError: true)

		def thirdLevel2a = new ThirdLevel(secondLevel: secondLevel2, "hierarchy": 1, "title": "Europeans Set Sail").save(failOnError: true)
		def thirdLevel2b = new ThirdLevel(secondLevel: secondLevel2, "hierarchy": 2, "title": "Europeans Reach the Americas").save(failOnError: true)
		def thirdLevel2c = new ThirdLevel(secondLevel: secondLevel2, "hierarchy": 3, "title": "Europeans Reach the Americas").save(failOnError: true)
		def thirdLevel2d = new ThirdLevel(secondLevel: secondLevel2, "hierarchy": 4, "title": "The Race for Empires").save(failOnError: true)

		def thirdLevel3a = new ThirdLevel(secondLevel: secondLevel3, "hierarchy": 1, "title": "The Southern Colonies").save(failOnError: true)
		def thirdLevel3b = new ThirdLevel(secondLevel: secondLevel3, "hierarchy": 2, "title": "The New England Colonies").save(failOnError: true)
		def thirdLevel3c = new ThirdLevel(secondLevel: secondLevel3, "hierarchy": 3, "title": "The Middle Colonies").save(failOnError: true)
		def thirdLevel3d = new ThirdLevel(secondLevel: secondLevel3, "hierarchy": 4, "title": "Life in the English Colonies").save(failOnError: true)


		// *** Lesson Plan ***
		// Lesson Plan associated to content and levels - Workflow order to be decided
		def lessonPlan1 = new LessonPlan("lessonPlanId":"SS_FL18E_LP_8.1.0.1", "duration":45, "title": "Module 1 Introduction", sortId:1).save(failOnError: true)

		// Add Lesson Plan to Level
		secondLevel1.addToLessonPlans(lessonPlan1).save(failOnError: true) // Lesson Plan for Module 1


		def lessonPlan2 = new LessonPlan("lessonPlanId":"SS_FL18E_LP_8.1.2.1", "duration":45, "title": "Module 1 Lesson 1", sortId:2).save(failOnError: true)

		// Add Lesson Plan to Level
		thirdLevel1a.addToLessonPlans(lessonPlan2).save(failOnError: true) // Lesson Plan for Module 1 lesson 1

		def lessonPlan3 = new LessonPlan("lessonPlanId":"SS_FL18E_LP_8.1.2.2", "duration":45, "title": "Module 1 Lesson 2", sortId:3).save(failOnError: true)

		// Add Lesson Plan to Level
		thirdLevel1b.addToLessonPlans(lessonPlan3).save(failOnError: true) // Lesson Plan for Module 1 lesson 2


		def lessonPlan4 = new LessonPlan("lessonPlanId":"SS_FL18E_LP_8.2.0.1", "duration":45, "title": "Module 2 Introduction", sortId:7).save(failOnError: true)

		// Add Lesson Plan to Level
		secondLevel2.addToLessonPlans(lessonPlan4).save(failOnError: true) // Lesson Plan for Module 2

		// *** Content / Resources ***

		// Content with 35 keywords, 2 standards, one IS, one Strand, one Lesson Plan and most of the properties.
		def content1 = new Content( component: componentSpec1, product: product1, segment: segment2, strand: strand1, lessonPlan: lessonPlan1, resourceId: "9787774567831-00001", displayTitle: "Teacher eBook: America, Africa, and Europe before 1500", commonCartridgeTitle: "Teacher eBook: America, Africa, and Europe before 1500", uri: "/content/hmof/social_studies/hmhss/fl/gr6-8/united_states_history_ese_9780544927520_/index.html#?page=/module_1opener/essential_question.xhtml&amp;u=1efbbef0f49ec5327ffd389831cbe95e", toolType: 6, language: "en-US", reteach: false, difInst: false, hmhId:"SS_FL20E_CDT_G08M01L00S00S0_0001",
		meaningfulDescription:"", viewable: true, assignable: false, schedulable: true, searchable: true, teacherManaged: false, seFacing: false, enrich: false, mediaType: "HTML", freeplay: false, active: false, persistent: false,
		resourcesPanelTe: false, resourcesPanelSe: false, sortId: 200)
		content1.addToKeywords(keyword:"Text")
		content1.addToKeywords(keyword:"ebook")
		content1.addToKeywords(keyword:"teacher ebook")
		content1.addToKeywords(keyword:"america")
		content1.addToKeywords(keyword:"africa")
		content1.addToKeywords(keyword:"europe before 1500")
		content1.addToKeywords(keyword:"bering land bridge")
		content1.addToKeywords(keyword:"paleo-indians")
		content1.addToKeywords(keyword:"migration")
		content1.addToKeywords(keyword:"hunter-gatherers")
		content1.addToKeywords(keyword:"environments")
		content1.addToKeywords(keyword:"culture")
		content1.addToKeywords(keyword:"pueblos")
		content1.addToKeywords(keyword:"kivas")
		content1.addToKeywords(keyword:"totems")
		content1.addToKeywords(keyword:"teepees")
		content1.addToKeywords(keyword:"matrilineal")
		content1.addToKeywords(keyword:"iroquois league")
		content1.addToKeywords(keyword:"berbers")
		content1.addToKeywords(keyword:"mansa musa")
		content1.addToKeywords(keyword:"hajj")
		content1.addToKeywords(keyword:"mosques")
		content1.addToKeywords(keyword:"askia the great")
		content1.addToKeywords(keyword:"socrates")
		content1.addToKeywords(keyword:"plato")
		content1.addToKeywords(keyword:"aristotle")
		content1.addToKeywords(keyword:"reason")
		content1.addToKeywords(keyword:"democracy")
		content1.addToKeywords(keyword:"knights")
		content1.addToKeywords(keyword:"black death")
		content1.addToKeywords(keyword:"michelangelo")
		content1.addToKeywords(keyword:"leonardo da vinci")
		content1.addToKeywords(keyword:"johannes gutenberg")
		content1.addToKeywords(keyword:"joint-stock companies")

		content1.addToCommonCartridgeKeywords(keyword:"Common Cartridge Keyword")

		content1.addToStandards(standard:"SS.8.A.1.2")
		content1.addToStandards(standard:"LAFS.68.RH.2.4")		
		
		content1.addToEdStandards(standard:"ID.1.LAFS.68.RH.2.4", standardSet: edStandardSet)
		content1.addToEdStandards(standard:"ID.2.LAFS.68.RH.2.4", standardSet: edStandardSet)

		content1.addToMwsGuids(guid: "SS_NL17E_DBI_G08M01L00S00S0_0001")

		content1.save(failOnError: true)

		// *** Reader that is associated to 1 Content Instance only ***
		def reader1 = new Reader(content: content1, isbn10:'0151212756',isbn13: "9670151212756", readerLevel:'Below-Level', guidedReadingLevels:'B', draEdlLevel:null, readingRecoveryLevels:null, readingSkills:'Sequence').save(failOnError: true)
		
		// *** Ed ***
		def ed1 = new Ed(content: content1, toolType: 101, instructionalPurpose: "ELD", pedagogicalPurpose: "Teacher Support", productCategory: 8).save(failOnError: true)

		// Add Content to Level
		secondLevel1.addToContent(content1).save(failOnError: true)

		// Content2 with 14 keywords, 7 standards, one IS, one Strand, and most of properties
		def content2 = new Content(component: componentSpec1, product: product1, segment: segment3, strand: strand1, lessonPlan: lessonPlan2, resourceId: "9787774567831-00002", hmhId: "SS_FL18E_CDT_G08M01L01S00S0_0002", displayTitle: "Teacher eBook: America, Africa, and Europe before 1500, Lesson 1: The Earliest Americans", commonCartridgeTitle: "Teacher eBook: America, Africa, and Europe before 1500, Lesson 1: The Earliest Americans", uri: "/content/hmof/social_studies/hmhss/fl/gr6-8/united_states_history_ese_9780544927520_/index.html#?page=/module_1_lesson01/lesson_opener.xhtml&amp;u=1efbbef0f49ec5327ffd389831cbe95e", toolType: 6, language: "en-US", reteach: false, difInst: false,
		meaningfulDescription:"", viewable: true, assignable: false, schedulable: true, searchable: true, teacherManaged: false, seFacing: false, enrich: false,
		mediaType: "HTML", freeplay: false, active: false, persistent: false, resourcesPanelTe: false, resourcesPanelSe: false, sortId: 204)

		content2.addToKeywords(keyword:"ebook")
		content2.addToKeywords(keyword:"teacher ebook")
		content2.addToKeywords(keyword:"america")
		content2.addToKeywords(keyword:"africa")
		content2.addToKeywords(keyword:"europe before 1500")
		content2.addToKeywords(keyword:"module 1")
		content2.addToKeywords(keyword:"lesson 1")
		content2.addToKeywords(keyword:"the earliest americans")
		content2.addToKeywords(keyword:"paleo-indians")
		content2.addToKeywords(keyword:"migration")
		content2.addToKeywords(keyword:"hunter-gatherers")
		content2.addToKeywords(keyword:"environments")
		content2.addToKeywords(keyword:"culture")
		content2.addToKeywords(keyword:"bering land bridge")

		content2.addToStandards(standard:"SS.8.A.1.7")
		content2.addToStandards(standard:"SS.8.A.2.5")
		content2.addToStandards(standard:"SS.8.G.1.1")
		content2.addToStandards(standard:"SS.8.G.2.1")
		content2.addToStandards(standard:"SS.8.G.4.2")
		content2.addToStandards(standard:"SS.8.G.4.4")
		content2.addToStandards(standard:"SS.8.G.5.2")

		content2.save(failOnError: true)

		// Add Content to Level
		thirdLevel1a.addToContent(content2).save(failOnError: true)


		// Content3 with 14 keywords, 8 standards, one IS, one Strand, with most of properties
		def content3 = new Content(component: componentSpec1, product: product1, segment: segment2, strand: strand1, lessonPlan: lessonPlan3, resourceId: "9787774567831-00003", hmhId: "SS_FL18E_CDT_G08M01L02S00S0_0003", displayTitle: "Teacher eBook: America, Africa, and Europe before 1500, Lesson 2: Native American Cultures", commonCartridgeTitle: "Teacher eBook: America, Africa, and Europe before 1500, Native American Cultures", uri: "/content/hmof/social_studies/hmhss/fl/gr6-8/united_states_history_ese_9780544927520_/index.html#?page=/module_1_lesson02/lesson_opener.xhtml&amp;u=1efbbef0f49ec5327ffd389831cbe95e", toolType: 6, language: "en-US", reteach: false, difInst: false,
		meaningfulDescription:"",
		viewable: true, assignable: false, schedulable: true, searchable: true, teacherManaged: false, seFacing: false, enrich: false, mediaType: "HTML", freeplay: false, active: false, persistent: false, resourcesPanelTe: false, resourcesPanelSe: false, sortId: 208)

		content3.addToKeywords(keyword:"ebook")
		content3.addToKeywords(keyword:"teacher ebook")
		content3.addToKeywords(keyword:"america")
		content3.addToKeywords(keyword:"africa")
		content3.addToKeywords(keyword:"europe before 1500")
		content3.addToKeywords(keyword:"module 1")
		content3.addToKeywords(keyword:"lesson 2")
		content3.addToKeywords(keyword:"native american cultures")
		content3.addToKeywords(keyword:"pueblos")
		content3.addToKeywords(keyword:"kivas")
		content3.addToKeywords(keyword:"totems")
		content3.addToKeywords(keyword:"teepees")
		content3.addToKeywords(keyword:"matrilineal")
		content3.addToKeywords(keyword:"iroquois league")

		content3.addToStandards(standard:"SS.8.A.1.2")
		content3.addToStandards(standard:"SS.8.A.1.7")
		content3.addToStandards(standard:"SS.8.G.1.1")
		content3.addToStandards(standard:"SS.8.G.2.1")
		content3.addToStandards(standard:"SS.8.G.3.1")
		content3.addToStandards(standard:"SS.8.G.5.1")
		content3.addToStandards(standard:"SS.8.G.5.2")
		content3.addToStandards(standard:"SS.8.G.6.2")

		content3.save(failOnError: true)

		// Add Content to Level
		thirdLevel1b.addToContent(content3).save(failOnError: true)


		// content4 with 34 keywords, 2 standards, one IS, one Strand, and most of the properties
		def content4 = new Content(component: componentSpec2, product: product1, segment: segment2, strand: strand1, lessonPlan: lessonPlan1,  resourceId: "9787774567831-00007", hmhId: "SS_FL18E_CDT_G08M01L00S00S0_0004", displayTitle: "Student eBook: America, Africa, and Europe before 1500", commonCartridgeTitle: "Student eBook: America, Africa, and Europe before 1500", uri: "/content/hmof/social_studies/hmhss/fl/gr6-8/united_states_history_ese_9780544927520_/index.html#?page=/module_1opener/essential_question.xhtml", toolType: 6, language: "en-US", reteach: false, difInst: false,
		meaningfulDescription:"", viewable: true, assignable: true, schedulable: true, searchable: true, teacherManaged: false, seFacing: true, enrich: false,
		mediaType: "HTML", freeplay: true, active: false, persistent: false, resourcesPanelTe: false, resourcesPanelSe: false, sortId: 400)

		content4.addToKeywords(keyword:"ebook")
		content4.addToKeywords(keyword:"teacher ebook")
		content4.addToKeywords(keyword:"america")
		content4.addToKeywords(keyword:"africa")
		content4.addToKeywords(keyword:"europe before 1500")
		content4.addToKeywords(keyword:"module 1")
		content4.addToKeywords(keyword:"bering land bridge")
		content4.addToKeywords(keyword:"paleo-indians")
		content4.addToKeywords(keyword:"migration")
		content4.addToKeywords(keyword:"hunter-gatherers")
		content4.addToKeywords(keyword:"environments")
		content4.addToKeywords(keyword:"culture")
		content4.addToKeywords(keyword:"pueblos")
		content4.addToKeywords(keyword:"kivas")
		content4.addToKeywords(keyword:"totems")
		content4.addToKeywords(keyword:"teepees")
		content4.addToKeywords(keyword:"matrilineal")
		content4.addToKeywords(keyword:"iroquois league")
		content4.addToKeywords(keyword:"berbers")
		content4.addToKeywords(keyword:"mansa musa")
		content4.addToKeywords(keyword:"hajj")
		content4.addToKeywords(keyword:"mosques")
		content4.addToKeywords(keyword:"askia the great")
		content4.addToKeywords(keyword:"socrates")
		content4.addToKeywords(keyword:"plato")
		content4.addToKeywords(keyword:"aristotle")
		content4.addToKeywords(keyword:"reason")
		content4.addToKeywords(keyword:"democracy")
		content4.addToKeywords(keyword:"knights")
		content4.addToKeywords(keyword:"black death")
		content4.addToKeywords(keyword:"michelangelo")
		content4.addToKeywords(keyword:"leonardo da vinci")
		content4.addToKeywords(keyword:"johannes gutenberg")
		content4.addToKeywords(keyword:"joint-stock companies")

		content4.addToStandards(standard:"SS.8.A.1.2")
		content4.addToStandards(standard:"LAFS.68.RH.2.4")

		content4.addToMwsGuids(guid: "SS_NL17E_DBI_G08M01L00S00S0_0001")

		content4.save(failOnError: true)

		// Add Content to Level
		secondLevel1.addToContent(content4).save(failOnError: true)

		// content5 with 14 keywords, 8 standards, one IS, one Strand, most of the properties
		def content5 = new Content(component: componentSpec3, product: product1, segment: segment2, strand: strand5, lessonPlan: lessonPlan1, resourceId: "9787774567831-00040", hmhId: "SS_FL18E_CDT_G08M01L00S00S0_0005", displayTitle: "Teacher Presentation: America, Africa, and Europe before 1500", commonCartridgeTitle: "Teacher Presentation: America, Africa, and Europe before 1500", uri: "/content/hmof/social_studies/hmhss/na/gr6-8/united_states_history_ete_9780544454200_/teacher_resources/assets/ppt/Teacher_PPT_M01.pdf", toolType: 6, language: "en-US", reteach: false, difInst: false,
		meaningfulDescription:"", viewable: true, assignable: false, schedulable: true, searchable: true, teacherManaged: false, seFacing: false, enrich: false, mediaType: "HTML", freeplay: false, active: false, persistent: false,
		resourcesPanelTe: false, resourcesPanelSe: false, sortId: 2400)


		content5.addToKeywords(keyword:"teacher presentation")
		content5.addToKeywords(keyword:"america")
		content5.addToKeywords(keyword:"africa")
		content5.addToKeywords(keyword:"europe before 1500")
		content5.addToKeywords(keyword:"module 1")
		content5.addToKeywords(keyword:"bering land bridge")
		content5.addToKeywords(keyword:"paleo-indians")
		content5.addToKeywords(keyword:"migration")
		content5.addToKeywords(keyword:"hunter-gatherers")
		content5.addToKeywords(keyword:"environments")
		content5.addToKeywords(keyword:"culture")
		content5.addToKeywords(keyword:"pueblos")
		content5.addToKeywords(keyword:"kivas")
		content5.addToKeywords(keyword:"totems")
		content5.addToKeywords(keyword:"teepees")
		content5.addToKeywords(keyword:"matrilineal")
		content5.addToKeywords(keyword:"iroquois league")
		content5.addToKeywords(keyword:"berbers")
		content5.addToKeywords(keyword:"mansa musa")
		content5.addToKeywords(keyword:"hajj")
		content5.addToKeywords(keyword:"mosques")
		content5.addToKeywords(keyword:"askia the great")
		content5.addToKeywords(keyword:"socrates")
		content5.addToKeywords(keyword:"plato")
		content5.addToKeywords(keyword:"aristotle")
		content5.addToKeywords(keyword:"reason")
		content5.addToKeywords(keyword:"democracy")
		content5.addToKeywords(keyword:"knights")
		content5.addToKeywords(keyword:"black death")
		content5.addToKeywords(keyword:"michelangelo")
		content5.addToKeywords(keyword:"leonardo da vinci")
		content5.addToKeywords(keyword:"johannes gutenberg")
		content5.addToKeywords(keyword:"joint-stock companies")


		content5.addToStandards(standard:"SS.8.A.1.2")
		content5.addToStandards(standard:"ELD.K12.ELL.SS.1")
		content5.addToStandards(standard:"ELD.K12.ELL.SI.1")
		content5.addToStandards(standard:"LAFS.8.SL.1.2")
		content5.addToStandards(standard:"LAFS.68.RH.2.5")
		content5.addToStandards(standard:"LAFS.68.RH.3.7")
		content5.addToStandards(standard:"LAFS.68.WHST.2.4")
		content5.addToStandards(standard:"LAFS.68.WHST.3.9")
		content5.addToStandards(standard:"LAFS.68.WHST.4.10")
		content5.addToStandards(standard:"MAFS.K12.MP.1.1")
		content5.addToStandards(standard:"MAFS.K12.MP.5.1")
		content5.save(failOnError: true)

		// Add Content to Level
		secondLevel1.addToContent(content5).save(failOnError: true)

		// content6
		def content6 = new Content(component: componentSpec1, product: product1, segment: segment1, strand: strand1, lessonPlan: lessonPlan4, resourceId: "9787774567831-00041", hmhId: "SS_FL18E_CDT_G08M02L00S00S0_0006", displayTitle: "Teacher eBook: New Empires in the Americas", commonCartridgeTitle: "Teacher eBook: New Empires in the Americas", uri: "/content/hmof/social_studies/hmhss/fl/gr6-8/united_states_history_ese_9780544927520_/index.html#?page=/module_2opener/essential_question.xhtml&u=1efbbef0f49ec5327ffd389831cbe95e", toolType: 6, language: "en-US", reteach: false, difInst: false,
		meaningfulDescription:"", viewable: true, assignable: false, schedulable: true, searchable: true, teacherManaged: false, seFacing: false, enrich: false, mediaType: "HTML", freeplay: false, active: false, persistent: false,
		resourcesPanelTe: false, resourcesPanelSe: false, sortId: 41)


		content6.addToKeywords(keyword:"ebook")
		content6.addToKeywords(keyword:"teacher ebook")
		content6.addToKeywords(keyword:"new empires in the americas")
		content6.addToKeywords(keyword:"module 2")
		content6.addToKeywords(keyword:"leif eriksson")
		content6.addToKeywords(keyword:"henry the navigator")
		content6.addToKeywords(keyword:"astrolabe")
		content6.addToKeywords(keyword:"caravels")
		content6.addToKeywords(keyword:"christopher columbus")
		content6.addToKeywords(keyword:"line of demarcation")
		content6.addToKeywords(keyword:"treaty of tordesillas")
		content6.addToKeywords(keyword:"ferdinand magellan")
		content6.addToKeywords(keyword:"circumnavigate")
		content6.addToKeywords(keyword:"columbian exchange")
		content6.addToKeywords(keyword:"conquistadors")
		content6.addToKeywords(keyword:"hernï¿½n cortï¿½s")
		content6.addToKeywords(keyword:"moctezuma ii")
		content6.addToKeywords(keyword:"francisco pizarro")
		content6.addToKeywords(keyword:"encomienda system")
		content6.addToKeywords(keyword:"plantations")
		content6.addToKeywords(keyword:"bartolomï¿½ de las casas")
		content6.addToKeywords(keyword:"protestant reformation")
		content6.addToKeywords(keyword:"protestants")
		content6.addToKeywords(keyword:"spanish armada")
		content6.addToKeywords(keyword:"northwest passage")
		content6.addToKeywords(keyword:"jacques cartier")
		content6.addToKeywords(keyword:"charter")

		content6.addToStandards(standard:"SS.8.A.1.2")

		content6.addToMwsGuids(guid: "SS_NL17E_DBI_G08M02L00S00S0_0002")

		content6.save(failOnError: true)

		// Add Content to Level
		secondLevel2.addToContent(content6).save(failOnError: true)

		// content7
		def content7 = new Content(component: componentSpec2, product: product1, segment: segment1, strand: strand1, resourceId: "9787774567831-00047", hmhId: "SS_FL18E_CDT_G08M02L00S00S0_0007", displayTitle: "Student eBook: New Empires in the Americas", commonCartridgeTitle: "Student eBook: New Empires in the Americas", uri: "/content/hmof/social_studies/hmhss/fl/gr6-8/united_states_history_ese_9780544927520_/index.html#?page=/module_2opener/essential_question.xhtml", toolType: 6, language: "en-US", reteach: false, difInst: false,
		meaningfulDescription:"", viewable: true, assignable: true, schedulable: true, searchable: true, teacherManaged: false, seFacing: true, enrich: false, mediaType: "HTML", freeplay: true, active: false, persistent: false,
		resourcesPanelTe: false, resourcesPanelSe: false, sortId: 404)


		content7.addToKeywords(keyword:"ebook")
		content7.addToKeywords(keyword:"student ebook")
		content7.addToKeywords(keyword:"new empires in the americas")
		content7.addToKeywords(keyword:"module 2")
		content7.addToKeywords(keyword:"leif eriksson")
		content7.addToKeywords(keyword:"henry the navigator")
		content7.addToKeywords(keyword:"astrolabe")
		content7.addToKeywords(keyword:"caravels")
		content7.addToKeywords(keyword:"christopher columbus")
		content7.addToKeywords(keyword:"line of demarcation")
		content7.addToKeywords(keyword:"treaty of tordesillas")
		content7.addToKeywords(keyword:"ferdinand magellan")
		content7.addToKeywords(keyword:"circumnavigate")
		content7.addToKeywords(keyword:"columbian exchange")
		content7.addToKeywords(keyword:"conquistadors")
		content7.addToKeywords(keyword:"hernï¿½n cortï¿½s")
		content7.addToKeywords(keyword:"moctezuma ii")
		content7.addToKeywords(keyword:"francisco pizarro")
		content7.addToKeywords(keyword:"encomienda system")
		content7.addToKeywords(keyword:"plantations")
		content7.addToKeywords(keyword:"bartolomï¿½ de las casas")
		content7.addToKeywords(keyword:"protestant reformation")
		content7.addToKeywords(keyword:"protestants")
		content7.addToKeywords(keyword:"spanish armada")
		content7.addToKeywords(keyword:"northwest passage")
		content7.addToKeywords(keyword:"jacques cartier")
		content7.addToKeywords(keyword:"charter")

		content7.addToStandards(standard:"SS.8.A.1.2")

		content7.addToMwsGuids(guid: "SS_NL17E_DBI_G08M02L00S00S0_0002")


		content7.save(failOnError: true)

		// Add Content to Level
		secondLevel2.addToContent(content7).save(failOnError: true)


		// content8
		def content8 = new Content(component: componentSpec3, product: product1, segment: segment2, strand: strand5, resourceId: "9787774567831-00080", hmhId: "SS_FL18E_CPT_G08M02L00S00S0_0008", displayTitle: "Teacher Presentation: New Empires in the Americas", commonCartridgeTitle: "Teacher Presentation: New Empires in the Americas", uri: "/content/hmof/social_studies/hmhss/na/gr6-8/united_states_history_ete_9780544454200_/teacher_resources/assets/ppt/Teacher_PPT_M02.pptx", toolType: 6, language: "en-US", reteach: false, difInst: false,
		meaningfulDescription:"", viewable: true, assignable: false, schedulable: true, searchable: true, teacherManaged: false, seFacing: false, enrich: false, mediaType: "Presentation", freeplay: false, active: false, persistent: false,
		resourcesPanelTe: false, resourcesPanelSe: false, parentId: "SS_FL18E_PPT_G08M00L00S00S0_0000", sortId: 2404)


		content8.addToKeywords(keyword:"teacher presentation")
		content8.addToKeywords(keyword:"new empires in the americas")
		content8.addToKeywords(keyword:"module 2")
		content8.addToKeywords(keyword:"leif eriksson")
		content8.addToKeywords(keyword:"henry the navigator")
		content8.addToKeywords(keyword:"astrolabe")
		content8.addToKeywords(keyword:"caravels")
		content8.addToKeywords(keyword:"christopher columbus")
		content8.addToKeywords(keyword:"line of demarcation")
		content8.addToKeywords(keyword:"treaty of tordesillas")
		content8.addToKeywords(keyword:"ferdinand magellan")
		content8.addToKeywords(keyword:"circumnavigate")
		content8.addToKeywords(keyword:"columbian exchange")
		content8.addToKeywords(keyword:"conquistadors")
		content8.addToKeywords(keyword:"hernï¿½n cortï¿½s")
		content8.addToKeywords(keyword:"moctezuma ii")
		content8.addToKeywords(keyword:"francisco pizarro")
		content8.addToKeywords(keyword:"encomienda system")
		content8.addToKeywords(keyword:"plantations")
		content8.addToKeywords(keyword:"bartolomï¿½ de las casas")
		content8.addToKeywords(keyword:"protestant reformation")
		content8.addToKeywords(keyword:"protestants")
		content8.addToKeywords(keyword:"spanish armada")
		content8.addToKeywords(keyword:"northwest passage")
		content8.addToKeywords(keyword:"jacques cartier")
		content8.addToKeywords(keyword:"charter")

		content8.addToStandards(standard:"SS.8.A.1.1")
		content8.addToStandards(standard:"SS.8.A.1.2")
		content8.addToStandards(standard:"ELD.K12.ELL.SS.1")
		content8.addToStandards(standard:"ELD.K12.ELL.SI.1")
		content8.addToStandards(standard:"LAFS.8.SL.1.2")
		content8.addToStandards(standard:"LAFS.68.RH.1.1")
		content8.addToStandards(standard:"LAFS.68.RH.2.5")
		content8.addToStandards(standard:"LAFS.68.WHST.1.1")
		content8.addToStandards(standard:"LAFS.68.WHST.2.4")
		content8.addToStandards(standard:"LAFS.68.WHST.3.9")
		content8.addToStandards(standard:"LAFS.68.WHST.4.10")
		content8.addToStandards(standard:"MAFS.K12.MP.1.1")

		content8.save(failOnError: true, flush: true)

		// Add Content to Level
		secondLevel2.addToContent(content8).save(failOnError: true)


		// content 9
		def content9 = new Content(component: componentSpec12, product: product1, segment: segment1, strand: strand5, resourceId: "9787774567831-00742", displayTitle: "Alternative Assessment Rubrics: Rubric 1: Acquiring Information", commonCartridgeTitle: "Alternative Assessment Rubrics: Rubric 1: Acquiring Information", uri: "/content/hmof/social_studies/hmhss/na/gr6-8/united_states_history_ete_9780544454200_/teacher_resources/assets/pdf/alt_assess/alt_assess_rub.pdf#page=1", toolType: 6, language: "en-US", reteach: false, difInst: false, hmhId:"SS_FL20E_CDT_G08M00L00S00S0_0001",
		meaningfulDescription:"", viewable: false, assignable: false, schedulable: false, searchable: false, teacherManaged: false, seFacing: false, enrich: false, mediaType: "PDF", freeplay: false, active: false, persistent: false,
		resourcesPanelTe: false, resourcesPanelSe: false, sortId: 6000)

		content9.addToKeywords(keyword:"alternative assessment rubrics")
		content9.addToKeywords(keyword:"alternative assessment")
		content9.addToKeywords(keyword:"rubrics")
		content9.addToKeywords(keyword:"rubric")
		content9.addToKeywords(keyword:"rubric 1")
		content9.addToKeywords(keyword:"acquiring information")
		content9.addToKeywords(keyword:"acquire information")
		
		content9.addToEdStandards(standard:"ID.TOP1.LAFS.1", standardSet: edStandardSet)
		content9.addToEdStandards(standard:"ID.TOP2.LAFS.2", standardSet: edStandardSet)
		content9.addToEdStandards(standard:"ID.TOP3.LAFS.2", standardSet: edStandardSet2)

		content9.addToCommonCartridgeKeywords(keyword:"Top Level Common Cartridge Keyword")

		content9.save(failOnError: true, flush: true)

		// Add Content to Level
		topLevel1.addToContent(content9).save(failOnError: true)
		
		// HMOF Correlations	
		def correlationSourceHmof = new CorrelationSource(product: product1, component: componentSpec1)
		program1.addToCorrelations(correlationSourceHmof)
		program1.save( failOnError: true ) //Save and add to Program

		// Target Product is the same as Source for HMOF
		def correlationTargetHmof = new CorrelationTarget(product: product1, component: componentSpec2)
		correlationSourceHmof.addToTargets(correlationTargetHmof).save(failOnError: true)

	}

	/**
	 * Bootstrap A TC Program - Journeys2017 CA Grade 3
	 * @return
	 */
	def createTcProgram(){

		def tcProgram = new Program(name:"JourneysDemo", code:"JY", discipline:"Reading and Language Arts", state: "CA", copyrightYear: 2019, platform:"TCK6", topLevelScope: "Grade",
		"secondLevelScope": "Unit", "thirdLevelScope": "Lesson", "fourthLevelScope": "Day", "fifthLevelScope": null, standardSetName:"California_Common_Core_ELD_Standard_Set_47413.xml")


		def tcProduct1 = new Product("isbn":9787774567833, title:"CA Teacher Edition Grade 3")
		def tcProduct2 = new Product("isbn":9787774567834, title:"CA Student Edition Grade 3")
		def tcProduct3 = new Product("isbn":9787774567835, title:"CA Combination Classroom Planning Guide Grade K-6")

		// *** Instructional Segment ***
		def tcSegment1 = new InstructionalSegment("hierarchy":8, "title": "Grade-Level Resources")
		def tcSegment2 = new InstructionalSegment("hierarchy":9, "title": "Unit-Level Resources")
		def tcSegment3 = new InstructionalSegment("hierarchy":10, "title": "Lesson-Level Resources")
		def tcSegment4 = new InstructionalSegment("hierarchy":4, "title": "Language Arts")
		def tcSegment5 = new InstructionalSegment("hierarchy":11, "title": "Response to Intervention")
		def tcSegment6 = new InstructionalSegment("hierarchy":6, "title": "Assessment")
		def tcSegment7 = new InstructionalSegment("hierarchy":5, "title": "Small Group Instruction")
		def tcSegment8 = new InstructionalSegment("hierarchy":5, "title": "Whole Group Instruction")

		// *** Strands ***
		def tcStrand1 = new Strand("hierarchy":9, "title": "Advanced")
		def tcStrand2 = new Strand("hierarchy":1, "title": "Daily Language")
		def tcStrand3 = new Strand("hierarchy":10, "title": "English Language Learners")
		def tcStrand4 = new Strand("hierarchy":5, "title": "Foundational Skills")
		def tcStrand5 = new Strand("hierarchy":8, "title": "On Level")
		def tcStrand6 = new Strand("hierarchy":2, "title": "Oral Language")
		def tcStrand7 = new Strand("hierarchy":4, "title": "Skills and Strategies")
		def tcStrand8 = new Strand("hierarchy":6, "title": "Spelling, Grammar and Writing")
		def tcStrand9 = new Strand("hierarchy":7, "title": "Struggling Readers")
		def tcStrand10 = new Strand("hierarchy":13, "title": "Teacher Resources")
		def tcStrand11 = new Strand("hierarchy":11, "title": "Tier II: Strategic Intervention")
		def tcStrand12 = new Strand("hierarchy":14, "title": "Student Resources")

		// *** TC Component Specification ***:
		def tcComponentSpec1 = new ComponentSpec("component":"Teacher Edition", "componentHierarchy": 1, "componentType": "Key Teacher Resource", "categorization": "Core Components", "toolType": 0 )
		def tcComponentSpec2 = new ComponentSpec("component":"Student Book", "componentHierarchy": 2, "componentType": "Key Student Resource", "categorization": "Core Components", "toolType": 0 )
		def tcComponentSpec3 = new ComponentSpec("component":"Combination Classroom Planning Guide", "componentHierarchy": 79, "componentType": "Ancillary", "categorization": "Teaching Aids", "toolType": 0 )


		tcProgram.addToProducts(tcProduct1)
		tcProgram.addToProducts(tcProduct2)
		tcProgram.addToProducts(tcProduct3)
		tcProgram.save(failOnError: true)

		// Add Components to Program - Sprint 5
		tcProgram.addToComponents(tcComponentSpec1)
		tcProgram.addToComponents(tcComponentSpec2)
		tcProgram.addToComponents(tcComponentSpec3)


		// Associate tcStrand and IS to program
		tcProgram.addToSegments(tcSegment1)
		tcProgram.addToSegments(tcSegment2)
		tcProgram.addToSegments(tcSegment3)
		tcProgram.addToSegments(tcSegment4)
		tcProgram.addToSegments(tcSegment5)
		tcProgram.addToSegments(tcSegment6)
		tcProgram.addToSegments(tcSegment7)
		tcProgram.addToSegments(tcSegment8)

		// tcStrands
		tcProgram.addToStrands(tcStrand1)
		tcProgram.addToStrands(tcStrand2)
		tcProgram.addToStrands(tcStrand3)
		tcProgram.addToStrands(tcStrand4)
		tcProgram.addToStrands(tcStrand5)
		tcProgram.addToStrands(tcStrand6)
		tcProgram.addToStrands(tcStrand7)
		tcProgram.addToStrands(tcStrand8)
		tcProgram.addToStrands(tcStrand9)
		tcProgram.addToStrands(tcStrand8)
		tcProgram.addToStrands(tcStrand9)
		tcProgram.addToStrands(tcStrand10)
		tcProgram.addToStrands(tcStrand11)
		tcProgram.addToStrands(tcStrand12)
		tcProgram.save( failOnError: true )

		// grades
		tcProduct1.addToGrades(grade:"3")

		// components
		tcProduct1.addToComponents(tcComponentSpec1)

		tcProduct1.save(failOnError: true, flush:true)


		// grades
		tcProduct2.addToGrades(grade:"3")
		// components
		tcProduct2.addToComponents(tcComponentSpec2)
		tcProduct2.save(failOnError: true, flush:true)

		// grades
		tcProduct3.addToGrades(grade:"K")
		tcProduct3.addToGrades(grade:"1")
		tcProduct3.addToGrades(grade:"2")
		tcProduct3.addToGrades(grade:"3")
		tcProduct3.addToGrades(grade:"4")
		tcProduct3.addToGrades(grade:"5")
		tcProduct3.addToGrades(grade:"6")
		// components
		tcProduct3.addToComponents(tcComponentSpec3)
		tcProduct3.save(failOnError: true, flush:true)



		// *** Simple levels ***
		def tcTopLevel1 = new TopLevel("title": null, nonGradeLevel: null, nonGradeTitle: null)
		tcTopLevel1.addToGrades(grade:"3")
		tcTopLevel1.addToKeywords(keyword: "Journeys")

		//
		def tcTopLevel2 = new TopLevel("title": null, nonGradeLevel: null, nonGradeTitle: null)
		tcTopLevel2.addToGrades(grade:"K")
		tcTopLevel2.addToGrades(grade:"1")

		//
		def tcTopLevel3 = new TopLevel("title": null, nonGradeLevel: null, nonGradeTitle: null)
		tcTopLevel3.addToGrades(grade:"2")
		tcTopLevel3.addToGrades(grade:"3")


		// Add top-level Scope and Sequence to Program Instance
		tcProgram.addToTopLevels(tcTopLevel1).save( failOnError: true, flush: true )
		tcProgram.addToTopLevels(tcTopLevel2).save( failOnError: true, flush: true )
		tcProgram.addToTopLevels(tcTopLevel3).save( failOnError: true, flush: true )

		// Second Level Instances
		def tcSecondLevel1 = new SecondLevel(topLevel: tcTopLevel1, "hierarchy": 1, "title": "Good Citizens").save(failOnError: true, flush:true)
		tcSecondLevel1.addToKeywords(keyword: "Unit 1").save(failOnError: true) //common keywords

		def tcSecondLevel2 = new SecondLevel(topLevel: tcTopLevel1, "hierarchy": 2, "title": "Look and Listen").save(failOnError: true, flush: true)
		tcSecondLevel2.addToKeywords(keyword: "Unit 2").save(failOnError: true) // common keywords

		def tcSecondLevel3 = new SecondLevel(topLevel: tcTopLevel1, "hierarchy": 3, "title": "Lesson Learned").save(failOnError: true)
		tcSecondLevel3.addToKeywords(keyword: "Unit 3").save(failOnError: true) // common keywords

		def tcSecondLevel4 = new SecondLevel(topLevel: tcTopLevel1, "hierarchy": 4, "title": "Natural Wonders").save(failOnError: true)
		tcSecondLevel4.addToKeywords(keyword: "Unit 4").save(failOnError: true) // common keywords

		def tcSecondLevel5 = new SecondLevel(topLevel: tcTopLevel1, "hierarchy": 5, "title": "Going Places").save(failOnError: true)
		tcSecondLevel5.addToKeywords(keyword: "Unit 5").save(failOnError: true) // common keywords

		def tcSecondLevel6 = new SecondLevel(topLevel: tcTopLevel1, "hierarchy": 6, "title": "Reading Adventures").save(failOnError: true)
		tcSecondLevel5.addToKeywords(keyword: "Unit 6").save(failOnError: true) // common keywords


		// Third Level Instances
		def tcThirdLevel1a = new ThirdLevel(secondLevel: tcSecondLevel1, "hierarchy": 1, "title": null).save(failOnError: true, flush:true)
		tcThirdLevel1a.addToKeywords(keyword: "lesson 1").save(failOnError: true) // common keywords

		// Fourth Level Instances
		def tcFourthLevel1a = new FourthLevel(thirdLevel: tcThirdLevel1a, "hierarchy": 1, "title": null).save(failOnError: true, flush:true)
		tcFourthLevel1a.addToKeywords(keyword: "Day 1").save(failOnError: true) // common keywords

		// *** Lesson Plan ***
		def tcLessonPlan0 = new LessonPlan("lessonPlanId":"JY17E_LP_3.0.0.0", "duration":150, "title": "Journeys: Dummy Grade Lesson Plan", sortId:1).save(failOnError: true)
		def tcLessonPlan1 = new LessonPlan("lessonPlanId":"JY17E_LP_3.1.1.1", "duration":150, "title": "Journeys: Lesson 1, Day 1", sortId:1).save(failOnError: true)

		// Add Lesson Plan to Level
		tcTopLevel1.addToLessonPlans(tcLessonPlan0).save(failOnError: true)
		tcFourthLevel1a.addToLessonPlans(tcLessonPlan1).save(failOnError: true) // Lesson Plan for Unit 1

		// *** Content / Resources ***

		// Content
		def tcContent1 = new Content( component: tcComponentSpec1, product: tcProduct1, segment: tcSegment5, strand: tcStrand11, lessonPlan: tcLessonPlan1, resourceId: "9787774567833-00001", displayTitle: "Teacher&apos;s Edition: Strategic Intervention (Day 1), S2-S3", commonCartridgeTitle: "Teacher&apos;s Edition: Strategic Intervention",  uri: "/content/hsp/reading/journeys2017/ca/gr3/ete_9780544587571_/volume1/launch.html?page=S2", toolType: 0, language: "en-US", reteach: false, difInst: false, hmhId:"JY_CA19E_CDT_G03U01L01D1_0463",
		meaningfulDescription:"", viewable: true, assignable: false, schedulable: true, searchable: true, teacherManaged: false, seFacing: false, enrich: false, mediaType: "HTML", freeplay: false, active: false, persistent: false,
		resourcesPanelTe: false, resourcesPanelSe: false, sortId: 200,nonLocalResource: true)

		tcContent1.addToKeywords(keyword:"Teacher&apos;s Edition")
		tcContent1.addToKeywords(keyword:"Strategic Intervention")
		tcContent1.addToKeywords(keyword:"Response to Intervention")
		tcContent1.addToKeywords(keyword:"Tier II")
		tcContent1.addToKeywords(keyword:"Intervention")
		tcContent1.addToKeywords(keyword:"Daily Intervention Lessons")
		tcContent1.addToKeywords(keyword:"subject")
		tcContent1.addToKeywords(keyword:"simple")
		tcContent1.addToKeywords(keyword:"sentence")
		tcContent1.addToKeywords(keyword:"short")
		tcContent1.addToKeywords(keyword:"vowels")
		tcContent1.addToKeywords(keyword:"conversation")
		tcContent1.addToKeywords(keyword:"domain")
		tcContent1.addToKeywords(keyword:"phrase")
		tcContent1.addToKeywords(keyword:"announced")
		tcContent1.addToKeywords(keyword:"proud")
		tcContent1.addToKeywords(keyword:"certainly")
		tcContent1.addToKeywords(keyword:"soared")
		tcContent1.addToKeywords(keyword:"fine")
		tcContent1.addToKeywords(keyword:"strolled")
		tcContent1.addToKeywords(keyword:"principal")
		tcContent1.addToKeywords(keyword:"worried")

		tcContent1.addToStandards(standard:"L.3.6")
		tcContent1.addToStandards(standard:"ELD.PI.3.1")
		tcContent1.addToStandards(standard:"ELD.PI.3.12")
		tcContent1.addToStandards(standard:"ELD.PI.3.5")

		tcContent1.save(failOnError: true)


		// Add Content to Level
		tcFourthLevel1a.addToContent(tcContent1).save(failOnError: true)


		// Content
		def tcContent2 = new Content( component: tcComponentSpec1, , product: tcProduct1, segment: tcSegment5, strand: tcStrand11, lessonPlan: tcLessonPlan0, resourceId: "9787774567833-00002", displayTitle: "Teacher&apos;s Edition: Strategic Intervention (Day 1), S2-S3 (Dummy top-level)", commonCartridgeTitle: "Teacher&apos;s Edition: Strategic Intervention", uri: "/content/hsp/reading/journeys2017/ca/gr3/ete_9780544587571_/volume1/launch.html?page=S2", toolType: 0, language: "en-US", reteach: false, difInst: false, hmhId:"JY_CA19E_CDT_G03U00L00D0_0001",
		meaningfulDescription:"", viewable: true, assignable: false, schedulable: true, searchable: true, teacherManaged: false, seFacing: false, enrich: false, mediaType: "HTML", freeplay: false, active: false, persistent: false,
		resourcesPanelTe: false, resourcesPanelSe: false, sortId: 204)

		tcContent2.addToKeywords(keyword:"Teacher&apos;s Edition")
		tcContent2.addToKeywords(keyword:"Strategic Intervention")
		tcContent2.addToKeywords(keyword:"Response to Intervention")
		tcContent2.addToKeywords(keyword:"Tier II")
		tcContent2.addToKeywords(keyword:"Intervention")
		tcContent2.addToKeywords(keyword:"Daily Intervention Lessons")
		tcContent2.addToKeywords(keyword:"subject")
		tcContent2.addToKeywords(keyword:"simple")
		tcContent2.addToKeywords(keyword:"sentence")
		tcContent2.addToKeywords(keyword:"short")
		tcContent2.addToKeywords(keyword:"vowels")
		tcContent2.addToKeywords(keyword:"conversation")
		tcContent2.addToKeywords(keyword:"domain")
		tcContent2.addToKeywords(keyword:"phrase")
		tcContent2.addToKeywords(keyword:"announced")
		tcContent2.addToKeywords(keyword:"proud")
		tcContent2.addToKeywords(keyword:"certainly")
		tcContent2.addToKeywords(keyword:"soared")
		tcContent2.addToKeywords(keyword:"fine")
		tcContent2.addToKeywords(keyword:"strolled")
		tcContent2.addToKeywords(keyword:"principal")
		tcContent2.addToKeywords(keyword:"worried")

		tcContent2.addToStandards(standard:"L.3.6")
		tcContent2.addToStandards(standard:"ELD.PI.3.1")
		tcContent2.addToStandards(standard:"ELD.PI.3.12")
		tcContent2.addToStandards(standard:"ELD.PI.3.5")

		tcContent2.save(failOnError: true)

		tcTopLevel1.addToContent(tcContent2).save(failOnError: true)



		// Student Content - Product 2
		def tcContent3 = new Content( component: tcComponentSpec2, product: tcProduct2, segment: tcSegment1, strand: tcStrand12, resourceId: "9787774567834-00244", displayTitle: "Journeys Student Book", commonCartridgeTitle: "Journeys Student Book", uri: "/content/hsp/reading/journeys2017/ca/gr3/ese_9780544587335_/launch.html", toolType: 0, language: "en-US", reteach: false, difInst: false, hmhId:"JY_CA17E_CDT_G03U00L00D0_0244",
		meaningfulDescription:"", viewable: true, assignable: false, schedulable: false, searchable: false, teacherManaged: false, seFacing: true, enrich: false, mediaType: "HTML", freeplay: true, active: true, persistent: true,
		doneOwner:"S", additionalText: "SE", resourcesPanelTe: false, resourcesPanelSe: false, sortId: 400)

		tcContent3.addToKeywords(keyword:"Journeys Student Book")
		tcContent3.addToKeywords(keyword:"Student Book")

		tcContent3.addToMwsGuids(guid: "JY_CA17E_MWS_G03U00L00D0_0001")

		tcContent3.save(failOnError: true)
		tcTopLevel1.addToContent(tcContent3).save(failOnError: true)


		// Student Content 2 - Product 2
		def tcContent4 = new Content( component: tcComponentSpec2, product: tcProduct2, segment: tcSegment1, strand: tcStrand12, resourceId: "9787774567834-00245", displayTitle: "Journeys Student Book (Dummy for encoding test)", commonCartridgeTitle: "Journeys Student Book", uri: "/content/hsp/reading/journeys2017/ca/gr3/ese_9780544587335_/launch.html", toolType: 0, language: "en-US", reteach: false, difInst: false, hmhId:"JY_CA17E_CDT_G03U00L00D0_0245",
		meaningfulDescription:"", viewable: true, assignable: false, schedulable: false, searchable: false, teacherManaged: false, seFacing: true, enrich: false, mediaType: "HTML", freeplay: true, active: true, persistent: true,
		doneOwner:"S", additionalText: "SE", resourcesPanelTe: false, resourcesPanelSe: false, sortId: 404)

		tcContent4.addToKeywords(keyword:"Ã¡Ã©Ã­Ã³Ãº")

		tcContent4.save(failOnError: true)
		tcTopLevel1.addToContent(tcContent4).save(failOnError: true)


		// Product 3
		def tcContent5 = new Content( component: tcComponentSpec3 , product: tcProduct3, segment: tcSegment1, strand: tcStrand10, resourceId: "9787774567835-00246",
		displayTitle: "Combination Class Weekly Planner for Grades K-1: Lesson 1)", commonCartridgeTitle: "Combination Class Weekly Planner for Grades K-1",
		uri: "/content/hsp/reading/journeys2017/ca/grk-6/combination_classroom_planning_guide_9780544873230_/Journeys_GK-1_Combination_Classroom_Planning_Guide.pdf#page=12",
		toolType: 0, language: "en-US", reteach: false, difInst: false, hmhId:"JY_CA17E_CDT_G03U00L00D0_0246",
		meaningfulDescription:"", viewable: true, assignable: false, schedulable: true, searchable: true, teacherManaged: false, seFacing: false, enrich: false,
		mediaType: "PDF", freeplay: false, active: false, persistent: false, resourcesPanelTe: false, resourcesPanelSe: false, sortId: 15800)

		tcContent5.save(failOnError: true)
		tcTopLevel2.addToContent(tcContent5).save(failOnError: true)

		// Product 3
		def tcContent6 = new Content( component: tcComponentSpec3, product: tcProduct3, segment: tcSegment1, strand: tcStrand10, resourceId: "9787774567835-00247",
		displayTitle: "Combination Classroom Planning Guide for Grades 2-3", commonCartridgeTitle: "Combination Classroom Planning Guide for Grades 2-3",
		uri: "/content/hsp/reading/journeys2017/ca/grk-6/combination_classroom_planning_guide_9780544873230_/Journeys_G2-3_Combination_Classroom_Planning_Guide.pdf",
		toolType: 0, language: "en-US", reteach: false, difInst: false, hmhId:"JY_CA17E_CDT_G03U00L00D0_0247",
		meaningfulDescription:"", viewable: true, assignable: false, schedulable: true, searchable: true, teacherManaged: false, seFacing: false, enrich: false,
		mediaType: "PDF", freeplay: false, active: false, persistent: false, resourcesPanelTe: false, resourcesPanelSe: false, sortId: 15804)

		tcContent6.save(failOnError: true)
		tcTopLevel3.addToContent(tcContent6).save(failOnError: true)

		// Correlations

		// Step 1 select a source product and select 1 or more target products
		// Source Product = ("isbn":9787774567833, title:"CA Teacher Edition Grade 3")
		def correlationSource1 = new CorrelationSource(product: tcProduct1,sourceType: "ise_lesson")
		tcProgram.addToCorrelations(correlationSource1)
		tcProgram.save( failOnError: true ) //Save and add to Program

		// Target Product 1 = ("isbn":9787774567834, title:"CA Student Edition Grade 3")
		def correlationTarget1 = new CorrelationTarget(product: tcProduct2)
		correlationSource1.addToTargets(correlationTarget1).save(failOnError: true)

		// Target Product 2 = ("isbn":9787774567835, title:"CA Combination Classroom Planning Guide Grade K-6")
		def correlationTarget2 = new CorrelationTarget(product: tcProduct3)
		correlationSource1.addToTargets(correlationTarget2).save(failOnError: true)

		// Step 2 select a content-resource from the source product
		// Source Content = (displayTitle: "Teacher&apos;s Edition: Strategic Intervention (Day 1), S2-S3", hmhId:"JY_CA19E_CDT_G03U01L01D1_0463")
		def contentSource1 = new ContentSource(content: tcContent1, sourceType: "ise_lesson")
		correlationSource1.addToResources(contentSource1).save(failOnError: true)

		// step 3 select 1 or more resources from the target content and build association
		// Target Content1 = (displayTitle: "Journeys Student Book", hmhId:"JY_CA17E_CDT_G03U00L00D0_0244" )
		def contentTarget1 = new ContentTarget(content: tcContent3, targetType: "evaluate")		
		correlationTarget1.addToContentTarget(contentTarget1).save(failOnError: true)
		contentSource1.addToTargetResources(contentTarget1).save()

		// Target Content 2 = (displayTitle: "Journeys Student Book (Dummy for encoding test)", hmhId:"JY_CA17E_CDT_G03U00L00D0_0245" )
		def contentTarget2 = new ContentTarget(content: tcContent4, targetType: "elaborate")
		correlationTarget1.addToContentTarget(contentTarget2).save(failOnError: true)
		contentSource1.addToTargetResources(contentTarget2).save()
		
		// Target Content 3 = (displayTitle: "Combination Classroom Planning Guide for Grades 2-3")
		def contentTarget3 = new ContentTarget(content: tcContent6, targetType: "enrichment")
		correlationTarget2.addToContentTarget(contentTarget3).save(failOnError: true)
		contentSource1.addToTargetResources(contentTarget3).save()		


	}

}

package hmh.mms
import hmh.mms.level.*

class Content {

	// inject mapping service
	def mappingService
	def sortIdService

	String resourceId //Could be automated for new content but required for legacy
	String hmhId // same as GUID
	String displayTitle
	String commonCartridgeTitle
	String uri
	Boolean reteach = false
	Boolean difInst = false
	String meaningfulDescription
	String additionalText
	Boolean viewable = true
	Boolean assignable = false
	Boolean schedulable = false
	Boolean searchable = true
	Boolean teacherManaged = false
	Boolean iwbCompatible = false
	Boolean seFacing = false
	Boolean enrich = false
	String  mediaType
	Boolean freeplay = false
	Boolean active = false
	Boolean persistent = false
	String doneOwner
	String textComplexity
	Boolean resourcesPanelTe = false
	Boolean resourcesPanelSe = false
	String downloadUrl
	String card
	String parentId
	Integer sortId

	// Can exist outside a Reader instance
	String author
	String title
	String genre
	String theme

	// new HMHONE properties
	String productCategory
	String programTitle
	String programCard

	// Language may need to be set at a parent level
	String language

	// Legacy <=2013
	String resourceType // derived from mapping XML
	String frequency // e.g. LCO
	String notes // e.g. DPR, DPS or T1, T2
	Integer strandNumber = 0 // used in Resource XML, e.g. 56, typically set to zero in MDS
	Boolean nonLocalResource = false
	String itemId


	static constraints = {

		resourceId (nullable: true, unique: true)
		hmhId (minSize: 10, maxSize:32, unique: true)
		displayTitle (minSize: 1, maxSize:200)
		commonCartridgeTitle (nullable: true) // may be the same as displayTitle
		uri (nullable:true)

		reteach(nullable: false)
		difInst(nullable: false)
		meaningfulDescription (nullable:true, maxSize: 1000)
		additionalText (nullable:true, maxSize:500)

		viewable(nullable: false)
		assignable(nullable: false)
		schedulable(nullable: false)
		searchable(nullable: false)

		teacherManaged(nullable: false)
		iwbCompatible(nullable: false)

		seFacing(nullable: false)
		enrich(nullable: false)

		mediaType (blank: false, validator: { mediaTypeValue, contentInstance ->
			// if value is not in predefined mapping list
			if (!contentInstance.mappingService.isMediaTypeValueInList(mediaTypeValue)) {
				return 'value.not.in.predefined.list'
			}
		})

		freeplay (validator: { freeplayValue, contentInstance ->
			if (freeplayValue == true && contentInstance.seFacing == false){ return "sefacing.must.be.true" }})

		active (nullable: false, validator: { activeValue, contentInstance ->
			if (activeValue == true && contentInstance.doneOwner == null ){ return "doneowner.must.be.s_or_t" }
			if (activeValue == false && contentInstance.doneOwner != null){ return "doneowner.must.be.null" }
			if (activeValue == false && contentInstance.persistent == true){ return "persistent.must.be.false"}})

		persistent (nullable: false)

		doneOwner (nullable: true, inList: ["T", "S"])

		author (nullable: true)
		title (nullable: true)
		genre (nullable: true)
		theme (nullable: true)

		textComplexity (nullable: true) // example values: 40, 60, BR, 160

		resourcesPanelTe(nullable: false)
		resourcesPanelSe(nullable: false)

		card (nullable: true)
		parentId (nullable: true)
		downloadUrl (nullable: true)

		//sortId (nullable: true)

		sortId (nullable: false, validator: {sortIdValue, contentInstance ->
			// find the level the content exists, and validate that other content at this level does not have the same sortId
			if (contentInstance.topLevel !=null && contentInstance.sortIdService.isSortIdInUse(contentInstance)){return "top-level.content.sortid.in.use"}
			else if (contentInstance.secondLevel && contentInstance.sortIdService.isSortIdInUse(contentInstance)){return "second-level.content.sortid.in.use"}
			else if (contentInstance.thirdLevel && contentInstance.sortIdService.isSortIdInUse(contentInstance)){return "third-level.content.sortid.in.use"}
			else if (contentInstance.fourthLevel && contentInstance.sortIdService.isSortIdInUse(contentInstance)){return "fourth-level.content.sortid.in.use"}
			else if (contentInstance.fifthLevel && contentInstance.sortIdService.isSortIdInUse(contentInstance)){return "fifth-level.content.sortid.in.use"}
		})

		//HMHONE
		productCategory (nullable: true)
		programTitle (nullable: true)
		programCard (nullable: true)

		language (nullable: false)

		//legacy
		resourceType(nullable: true)
		frequency(nullable: true)
		notes(nullable: true)
		strandNumber(nullable: true)
		nonLocalResource(nullable: false)
		itemId (nullable: true)

		// *** Associations ***
		strand  (nullable: false)
		segment (nullable: false)

		//used to help auto-generate GUID if required
		component (nullable: false)

		// Not every resource becomes part of a Lesson Plan
		lessonPlan (nullable: true)

		// not every product or resource has a Reader or Ed Instance
		reader (nullable: true)
		ed (nullable: true)

		topLevel (nullable:true)
		secondLevel (nullable: true)
		thirdLevel (nullable: true)
		fourthLevel (nullable: true)
		fifthLevel (nullable: true)

	}

	// A resource has zero or many keywords, standards, myWriteSmart Instances and Common Cartridge keywords
	static hasMany = [keywords: Keyword, standards: Standard, edStandards: EdStandard, mwsGuids: MyWriteSmart, commonCartridgeKeywords: CommonCartridgeKeyword]

	// A resource belong to a Level
	static belongsTo = [topLevel: TopLevel, secondLevel: SecondLevel, thirdLevel: ThirdLevel, fourthLevel: FourthLevel, fifthLevel: FifthLevel]

	// Many to One
	Strand strand
	InstructionalSegment segment
	ComponentSpec component
	Product product
	LessonPlan lessonPlan //optional

	// Optional One-to-One
	static hasOne = [reader: Reader, ed: Ed]	

	// get Unique ID
	def getUniqueId(){

		this.resourceId ?: "${this.product.isbn}-${padLeftZero(this.id)}"

	}

	def padLeftZero(def numberToPad){

		numberToPad.toString().padLeft(5, '0')
	}

}
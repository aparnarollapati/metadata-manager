package hmh.mms.correlation

import hmh.mms.Content

class ContentSource {

	Content content
	Integer sortId=0
	String sourceType
	static hasMany = [targetResources: ContentTarget]
	static belongsTo = [correlation: CorrelationSource]

	static constraints = {

		content (nullable: false)
		sortId(nullable: false)
		targetResources cascade: "all-delete-orphan"
		sourceType (nullable: true, inList:["testitem", "resource", "stars_standard", "prescription", "enrichment","ise_lesson"])
	}
}

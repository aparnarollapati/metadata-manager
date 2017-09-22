package hmh.mms.correlation

import hmh.mms.Content

class ContentTarget {

	String targetType
	Content content
	Integer sortId=0
	static belongsTo = [correlationTarget: CorrelationTarget, sourceResource: ContentSource]

	static constraints = {

		sourceResource (nullable: true)
		content (nullable: false)
		sortId(nullable: false)
		targetType (nullable: false, inList:["stars_standard", "prescription", "enrichment", "evaluate", "elaborate","PMT"])
	}
}

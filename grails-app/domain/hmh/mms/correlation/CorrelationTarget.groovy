package hmh.mms.correlation

import hmh.mms.ComponentSpec;
import hmh.mms.Product

class CorrelationTarget {

	Product product
	ComponentSpec component

	static belongsTo = [correlation: CorrelationSource]
	static hasMany = [contentTarget: ContentTarget]

	static constraints = {
		product (nullable: false)
		component (nullable: true)
	}
}

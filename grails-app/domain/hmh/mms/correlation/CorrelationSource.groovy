package hmh.mms.correlation

import hmh.mms.ComponentSpec
import hmh.mms.Product
import hmh.mms.Program

class CorrelationSource {

	Product product
	ComponentSpec component

	static hasMany = [targets: CorrelationTarget, resources: ContentSource]
	static belongsTo = [program: Program]

	static constraints = {
		product (nullable: false)
		component (nullable: true)
	}
}

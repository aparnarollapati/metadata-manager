package hmh.mms

class Product {

	String isbn
	String title

	static constraints = {

		isbn (blank: false, unique: true, matches: /[0-9]{13}/)
		title (blank: false) // not used in any generated output but Useful to describe the product being developed

	}

	static belongsTo = [program: Program]

	// A product has many grades and component specifications
	static hasMany = [grades: Grade, components: ComponentSpec]
}
package hmh.mms


import grails.test.mixin.integration.Integration
import grails.transaction.*
import spock.lang.*

@Integration
@Rollback
class ProductIntegrationSpec extends Specification {


	def "Adding duplicate product ISBNs causes an issue"(){

		given: "A new Program"
		def program1 = new Program(name:"Spock2021", state: "FL", copyrightYear:"2020", discipline:"Social Studies", code:"SS", platform:"HMOF", topLevelScope: "Grade",
		"secondLevelScope": "Module", "thirdLevelScope": "Lesson", "fourthLevelScope": null, "fifthLevelScope": null)
		program1.save(failOnError : true)

		and: "A second new Program"
		def program2 = new Program(name:"Spock2022", state: "FL", copyrightYear:"2022", discipline:"Social Studies", code:"SS", platform:"HMOF", topLevelScope: "Grade",
		"secondLevelScope": "Module", "thirdLevelScope": "Lesson", "fourthLevelScope": null, "fifthLevelScope": null)
		program2.save(failOnError : true)

		when: "A product is added to the first Program"
		program1.addToProducts(new Product("isbn":9787774588999, title:"US History beg to 1877 - MS")).save(flush: true)

		and: "A duplicate product is added to the second Program"
		def duplicateProduct = new Product("isbn":9787774588999, title:"Test title")
		program2.addToProducts(duplicateProduct)

		then: "The duplicate product failed validation due to non-unique ISBN"
		! duplicateProduct.validate()
		duplicateProduct.errors.hasFieldErrors('isbn')
		duplicateProduct.errors.getFieldError('isbn')?.code == 'unique'

	}


}

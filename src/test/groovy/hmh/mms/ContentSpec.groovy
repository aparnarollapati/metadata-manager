package hmh.mms


import grails.test.mixin.TestFor
import spock.lang.Specification

/**
 * See the API for {@link grails.test.mixin.domain.DomainClassUnitTestMixin} for usage instructions
 */
@TestFor(Content)
class ContentSpec extends Specification {



	@spock.lang.Unroll("validate the length of the hmhId. #hmhId of length: #length should have returned #shouldBeValid")
	def "Validate hmhId value"(){

		expect: "hmhId to be valid if >=10 and <=32 characters in length"
		new Content(hmhId:hmhId).validate(['hmhId'])==shouldBeValid

		where:
		hmhId	  								|length	||shouldBeValid
		"too-short"		  						|9		||false
		"bare-min10"	 						|10		||true
		"12"	  								|2		||false
		"1"	  									|1 		||false
		"SS_FL20E_CDT_G08M01L00S00S0_0001"      |32 	||true
		"SS_FL20E_CDT_G08M01L00S00S0_00011"	  	|33 	||false //33 characters

	}


	@spock.lang.Unroll("validate the length of the displayTitle of length: #length should have returned #shouldBeValid")
	def "Validate display Title value"(){

		expect: "displayTitle should be valid if between 1-200"
		new Content(displayTitle:displayTitle).validate(['displayTitle'])==shouldBeValid

		where:
		displayTitle	  										|length	||shouldBeValid
		getLongString(1)	  									|1		|| true
		getLongString(100)	 									|100	|| true
		getLongString(200)										|200	|| true
		getLongString(201)										|201	|| false
		"Teacher eBook: America, Africa, and Europe before 1500"|55		|| true
		""														|0		|| false
		null													|0		|| false

	}


	@spock.lang.Unroll("validate the length of the commonCartridgeTitle of length: #length should have returned #shouldBeValid")
	def "Validate common cartridge Title value"(){

		expect: "commonCartridgeTitle should be valid if between 1-200"
		new Content(commonCartridgeTitle:commonCartridgeTitle).validate(['commonCartridgeTitle'])==shouldBeValid

		where:
		commonCartridgeTitle	  								|length	||shouldBeValid
		getLongString(1)	  									|1		|| true
		getLongString(100)	 									|100	|| true
		getLongString(200)										|200	|| true
		getLongString(201)										|201	|| true
		"Teacher eBook: America, Africa, and Europe before 1500"|55		|| true
		""														|0		|| true
		null													|0		|| true // currently there are no constraints on the commonCartridge but this might change

	}



	@spock.lang.Unroll("validate the length of the meaningfulDescription of length: #length should have returned #shouldBeValid")
	def "Validate meaningfulDescription length"(){
		expect: "meaningfulDescription should be valid if between 0-1000"
		new Content(meaningfulDescription:meaningfulDescription).validate(['meaningfulDescription'])==shouldBeValid

		where:
		meaningfulDescription	  								|length	||shouldBeValid
		getLongString(1)	  									|1		|| true
		getLongString(100)	 									|100	|| true
		getLongString(1000)										|1000	|| true
		getLongString(1001)										|1001	|| false
		"Meaningful description"								|22		|| true
		""														|0		|| true
		null													|0		|| true

	}


	/**
	 * Helper method to create long Strings
	 * @param multiplyBy
	 * @return
	 */
	def getLongString(def multiplyBy){

		String longString = "A".multiply(multiplyBy)
	}


	@spock.lang.Unroll("validate doneowner value #doneOwnerValue is validated: #shouldBeValid ")
	def "Validate doneOwner property"(){
		expect: "doneOwner to be valid if T, S or null"
		new Content(doneOwner:doneOwnerValue).validate(['doneOwner'])==shouldBeValid

		where:
		doneOwnerValue			||shouldBeValid
		"S"						||true
		"T"						||true
		"s"						||false
		"t"						||false
		"X"						||false
		null					||true


	}


	@spock.lang.Unroll("validate activeValue: #activeValue when doneOwner value is: #doneOwnerValue then active is validated: #shouldBeValid ")
	def "Validate custom-validator doneOwner property"(){
		expect: "doneOwner to be valid depending on active value "
		new Content(doneOwner:doneOwnerValue, active:activeValue ).validate(['active'])==shouldBeValid

		where:
		activeValue	 		| doneOwnerValue 	||shouldBeValid
		true				| "S"				||true
		true				| "T"				||true
		false				| "S"				||false
		false				| "T"				||false
		false				| "X"				||false
		true				| null				||false // active must be false if doneOwner is null
		false				| null				||true


	}


	@spock.lang.Unroll("Custom Validator if freeplay is #freeplayValue and seFacing is #seFacingValue then Content instance is #shouldBeValid ")
	def "Testing Custom Validator for freeplay"(){

		expect: "if freeplay is true then seFacing must be true"
		new Content(freeplay:freeplayValue, seFacing:seFacingValue ).validate(['freeplay'])==shouldBeValid

		where:
		freeplayValue	 	| seFacingValue 	|| shouldBeValid
		true				| false				|| false
		true				| true				|| true
		false				| true				|| true
		false				| false				|| true


	}


	//getUniqueId()
	def "validate getUniqueId method returns the expected String"(){

		given: "New mocked objects"
		def product1 = new Product(isbn: "9781234123499")
		def content = new Content( product: product1 )

		when: "getUniqueId is called"
		def getUniqueId = content.getUniqueId()

		then: "getUniqueId returns expected"
		getUniqueId == "9781234123499-0null" //null as ID was not available

	}






}

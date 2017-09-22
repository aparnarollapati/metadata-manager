package hmh.mms

import hmh.mms.mapping.*
import hmh.mms.info.*
import grails.transaction.Transactional

@Transactional
class GuidGeneratorService {

	def levelsService


	/**
	 * A typical GUID: JY_CA17_ETE_G03U00L00D0_0004016, is generated from content and scope and sequence parts, this implementation uses these parts and includes contentId to help make it unique
	 * @param contentInstance
	 * @return final GUID String
	 */
	def generateGuid(def contentInstance) {

		// content parts
		def programName = contentInstance.product?.program?.name ?: "HMH"
		def programCode = contentInstance.product?.program?.code ?: createProgramCode(programName)
		def programState = contentInstance.product?.program?.state ?: "NA"
		def copyrightYear = contentInstance.product?.program?.copyrightYear ?: new Date().format( 'YYYY' )
		def resourceLang = contentInstance?.language ?: "E"
		def component = contentInstance?.component?.component ?: "EBK"

		def componentCode = ComponentMapping.where{component == component}.get()?.code ?: createComponentCode(component)
		def contentPart = "${createProgramCode(programCode)}_${programState}${extractYearDigits(copyrightYear)}${createLanguageLetter(resourceLang)}_${componentCode}_"

		// scope-and-sequence part
		def scopeAndSequencePart = createScopeAndSequenceCode(contentInstance)

		def guid = formGuid("${contentPart}${scopeAndSequencePart}")
		def finalGuid = trimGuidTo32Characters(guid)

	}


	/**
	 * Map common Programs to preset codes, otherwise create a new code
	 * @return
	 */
	def createProgramCode(def programName){

		def programCode

		switch (programName) {
			case ~/(?i)^Journeys(.*)/: programCode = "JY"; break;
			case ~/(?i)(.*)Fusion(.*)/: programCode = "SCI"; break;
			case ~/(?i)(.*)Collection(.*)/: programCode = "LT"; break;
			case ~/(?i)^GoMath(.*)/: programCode = "GM"; break;
			case ~/(?i)^Senderos(.*)/: programCode = "SN"; break;
			case ~/(?i)^Social(.*)Studies(.*)/: programCode = "SS"; break;
			case ~/(?i)^High(.*)School(.*)Math(.*)/: programCode = "HSM"; break;
			case ~/(?i)(.*)Expression(.*)/: programCode = "MX"; break;
			case ~/(?i)^Escalate(.*)/: programCode = "ESC"; break;
			case ~/(?i)^Family(.*)Engagement(.*)/: programCode = "FE"; break;
			case ~/(?i)^High(.*)School(.*)Science(.*)/: programCode = "HSS"; break;
			case ~/(?i)^High(.*)School(.*)Biology(.*)/: programCode = "HSB"; break;
			case ~/(?i)^High(.*)School(.*)Chemistry(.*)/: programCode = "HSC"; break;
			case ~/(?i)^High(.*)School(.*)Physics(.*)/: programCode = "HSP"; break;
			case ~/(?i)^On(.*)Our(.*)Way(.*)/: programCode = "OWE"; break;


			default: generateTwoDigitProgramCode(programName)
		}
	}

	/**
	 * Get first and last letter of the Program Name, default to HMH
	 * @param programName
	 * @return
	 */
	def generateTwoDigitProgramCode(def programName){

		def programCode = "HMH"

		def programNameCharacters = programName.replaceAll("[^A-Za-z]", "")

		if ( programNameCharacters.length() >1 ){

			programCode = programNameCharacters[0].toUpperCase() + programNameCharacters[-1].toUpperCase()
		}

		return programCode
	}


	/**
	 * Extract the the last 2 digits from copyright Year
	 * @param copyright
	 * @return
	 */
	def extractYearDigits(def copyright){

		def copyrightDigit = copyright.toString()[-2..-1]
	}


	/**
	 * Return a single Letter to represent the Language code in the GUID
	 * @param lang
	 * @return
	 */
	def createLanguageLetter(def lang){

		def languageletter

		switch (lang.toLowerCase()) {

			case ~/(?i)^en(.*)/: languageletter = 'E'; break;
			case ~/(?i)^es(.*)/: languageletter = 'S'; break;

			default: languageletter =  'O'; //other
		}
	}


	/**
	 * Map resource components to preset codes otherwise generate a new code
	 * @return
	 */
	def createComponentCode(def component){

		def componentCode

		switch (component) {
			case ~/(?i)(.*)Teacher(.*)Edition(.*)|(.*)Teacher(.*)Ebook(.*)/: componentCode = "ETE"; break;
			case ~/(?i)(.*)Student(.*)Edition(.*)|(.*)Student(.*)Ebook(.*)/: componentCode = "ESE"; break;
			case ~/(?i)(.*)Book(.*)/: componentCode = "EBK"; break;
			case ~/(?i)(.*)Assessment(.*)/: componentCode = "OLA"; break;
			case ~/(?i)(.*)Ready(.*)|(.*)Readiness(.*)/: componentCode = "RDY"; break;
			case ~/(?i)(.*)Read(.*)/: componentCode = "RDR"; break;
			case ~/(?i)(.*)Guide(.*)/: componentCode = "EGD"; break;
			case ~/(?i)(.*)Resource(.*)/: componentCode = "RES"; break;
			case ~/(?i)(.*)Vocab(.*)/: componentCode = "SVC"; break;
			case ~/(?i)(.*)Manual(.*)/: componentCode = "MAN"; break;
			case ~/(?i)(.*)Power(.*)/: componentCode = "PWR"; break;
			case ~/(?i)(.*)Magazine(.*)/: componentCode = "MAG"; break;
			case ~/(?i)(.*)Exam(.*)/: componentCode = "EVT"; break;
			case ~/(?i)(.*)Card(.*)/: componentCode = "CRD"; break;
			case ~/(?i)(.*)Standard(.*)/: componentCode = "STN"; break;
			case ~/(?i)(.*)Video(.*)/: componentCode = "VID"; break;
			case ~/(?i)(.*)Audio(.*)/: componentCode = "AUD"; break;
			case ~/(?i)(.*)Glossary(.*)/: componentCode = "MMG"; break;
			case ~/(?i)(.*)Senderos(.*)/: componentCode = "SND"; break;
			case ~/(?i)(.*)itools(.*)/: componentCode = "ITL"; break;
			case ~/(?i)(.*)Test(.*)/: componentCode = "TST"; break;
			case ~/(?i)(.*)Quiz(.*)/: componentCode = "QUZ"; break;
			case ~/(?i)(.*)Practice(.*)/: componentCode = "PRC"; break;
			case ~/(?i)(.*)myWriteSmart|write(.*)smart/: componentCode = "MWS"; break;
			case ~/(?i)(.*)Focus(.*)wall(.*)/: componentCode = "FWL"; break;

			default: generateThreeLetterComponentCode(component)

		}
	}


	/**
	 * Remove characters that are no A-Z and Split into tokens then capitalize, depending on the size of tokens generate a 3-letter component-code
	 * @param component
	 * @return
	 */
	def generateThreeLetterComponentCode(def component){

		def threeLetterCode = "HMH"
		def collectLetters

		def removeUnwantedCharacters = component.replaceAll("[^A-Za-z\\s]", "")

		def getFirstLetters = removeUnwantedCharacters.split('(?<=[\\S])[\\S]*(\\s*)?')

		if (getFirstLetters.size() >= 3){

			collectLetters = getFirstLetters.collect{ it.capitalize() }.join()
			threeLetterCode = collectLetters[0..2]

		} else if (removeUnwantedCharacters.size() >=3){

			collectLetters = removeUnwantedCharacters.collect{it.capitalize()}.join()
			threeLetterCode = collectLetters[0..2]

		} else if (removeUnwantedCharacters.size() >0 && removeUnwantedCharacters.size() <=2){

			collectLetters = removeUnwantedCharacters.collect{it.capitalize()}.join() * 3
			threeLetterCode = collectLetters[0..2]

		}

		return threeLetterCode


	}

	/**
	 * Create Scope and Sequence Pattern, e.g G03U01L00D2
	 * @return
	 */
	def createScopeAndSequenceCode(def contentInstance){

		def programInstance = contentInstance.product?.program

		def scope = levelsService.getScopeAndSequence(programInstance)
		def topLevelScope = scope?.topLevelScope?: "Grade"
		def secondLevelScope = scope?.secondLevelScope?: "X"
		def thirdLevelScope = scope?.thirdLevelScope?: "X"
		def fourthLevelScope = scope?.fourthLevelScope?: "X"
		def fifthLevelScope = scope?.fifthLevelScope?: "X"

		def fullScope = levelsService.getFullLevelsMap(contentInstance)
		def topLevelGrade = fullScope.top?.grades?.grade
		def secondLevelNumber = fullScope.second?.hierarchy?: "00"
		def thirdLevelNumber = fullScope.third?.hierarchy?: "00"
		def fourthLevelNumber = fullScope.fourth?.hierarchy?: "00"
		def fifthLevelNumber = fullScope.fifth?.hierarchy?: "00"

		def sequence = "${topLevelScope[0]}${getGradeNumber(topLevelGrade)}${secondLevelScope[0]}${padLeftZero(secondLevelNumber)}${thirdLevelScope[0]}${padLeftZero(thirdLevelNumber)}${fourthLevelScope[0]}${padLeftZero(fourthLevelNumber)}${fifthLevelScope[0]}${padLeftZero(fifthLevelNumber)}_"

		sequence.replace("X00","").replace("D0", "D")

	}


	/**
	 * Pad content ID part with zeros to form 32 characters
	 * @return
	 */
	def formGuid(def guidParts){

		def guidPartsLength = guidParts.length()

		def lastAvailableContentInstance = Content.last()?.id ?: 0
		def lastDeletedContentInstance = LastDeletedResource.where{id==1}.get()?.resourceId ?: 0

		def thisContentInstanceId = Math.max(lastDeletedContentInstance, lastAvailableContentInstance) + 1

		def thisContentInstanceIdLength = thisContentInstanceId.toString().length()
		def totalZeros = 32 - thisContentInstanceIdLength

		def paddedGuid = guidParts.padRight(totalZeros, '0') + thisContentInstanceId

	}


	/**
	 * Trim the Guid to help prevent it being greater than 32 characters, first remove underscores then the Language letter.
	 * @param guid
	 * @return
	 */
	def trimGuidTo32Characters(def guid){

		def guidLengthMinus32 = guid.length() - 32

		guidLengthMinus32.times{
			guid = guid.replaceFirst("_", "")
		}

		// if Guid length is 33 take away language character after YY
		// Unit tests shows this allows for a full scope and a 9 digit content-Id number
		if (guid.length() == 33){
			guid = guid.replaceFirst(/(?<=\d{2})./, "")
		}

		return guid

	}


	/**
	 * Helper method to pad single digit with zeros
	 * @param numberToPad
	 * @return
	 */
	def padLeftZero(def numberToPad){

		numberToPad.toString().padLeft(2, '0')
	}


	/**
	 * Helper method to get grade number, if the product is multigrade use the largest number, default is 22
	 * @param gradeList
	 * @return
	 */
	def getGradeNumber(List gradeList){

		def gradeNumberList = []
		def scopeGrade

		gradeList.each{

			def gradeNumber

			switch (it) {
				case "IT": gradeNumber = 0; break;
				case "PR": gradeNumber = 0; break;
				case "PK": gradeNumber = 0; break;
				case "TK": gradeNumber = 0; break;
				case "K":  gradeNumber = 0; break;
				case "1":  gradeNumber = 1; break;
				case "2":  gradeNumber = 2; break;
				case "3":  gradeNumber = 3; break;
				case "4":  gradeNumber = 4; break;
				case "5":  gradeNumber = 5; break;
				case "6":  gradeNumber = 6; break;
				case "7":  gradeNumber = 7; break;
				case "8":  gradeNumber = 8; break;
				case "9":  gradeNumber = 9; break;
				case "10": gradeNumber = 10; break;
				case "11": gradeNumber = 11; break;
				case "12": gradeNumber = 12; break;
				case "13": gradeNumber = 13; break;
				case "PS": gradeNumber = 14; break;
				case "AE": gradeNumber = 15; break;
				case "UG": gradeNumber = 16; break;
				case "Other": gradeNumber = 22; break;

				default: 22;
			}

			gradeNumberList << gradeNumber

		}

		if ( gradeNumberList) { scopeGrade = padLeftZero(gradeNumberList.max()) }
		else { scopeGrade = "22" }

		return scopeGrade

	}
}

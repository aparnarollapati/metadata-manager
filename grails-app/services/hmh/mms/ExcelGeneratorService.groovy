package hmh.mms

import grails.transaction.Transactional
import grails.core.GrailsApplication
import org.apache.poi.ss.usermodel.*
import org.apache.poi.ss.util.*
import org.apache.poi.xssf.usermodel.*

@Transactional
class ExcelGeneratorService {

	def levelsService
	GrailsApplication grailsApplication
	def mappingService
	def keywordService
	def correlationMappingService
	def contentService
	/**
	 * Helper method to create CSV Strings
	 * @param list
	 * @return
	 */
	def createCommaSeparatedList(def list){

		String commaSeperatedList = list.join(',')
	}


	/**
	 * Get the Excel template that data is written to
	 * @return
	 */
	def getTemplate(def excelType){

		def programStructureCacheLocation = grailsApplication.config.getProperty('ProgramStructureExcelFolder')
		String programExcelTemplateFolder = programStructureCacheLocation + "template/"


		def cacheLocation = grailsApplication.config.getProperty('CacheLocation')
		String mdsExcelTemplateFolder = cacheLocation + "MDSHeaderExcel"

		FileInputStream excelTemplate

		if(excelType == "EXCEL_PROGRAM_STRUCTURE"){

			excelTemplate = new FileInputStream(new File(programExcelTemplateFolder + "/programStructureTemplate.xlsx"))
		}

		else {

			excelTemplate = new FileInputStream(new File(mdsExcelTemplateFolder + "/MDSHeaderTemplate.xlsx"))
		}

		return excelTemplate

	}


	/**
	 * Set output location for generated files
	 * @param programName
	 * @param isbn
	 * @param excelType
	 * @return
	 */
	def setOutputFile(def programName, def isbn, def excelType){

		def excelOutputLocation

		if (excelType == "EXCEL_ED"){

			excelOutputLocation = grailsApplication.config.getProperty('EDExcelFolder')


		} else {
			excelOutputLocation = grailsApplication.config.getProperty('MDSExcelFolder')

		}

		File dir = new File(excelOutputLocation)
		if(!dir.exists()){
			dir.mkdir()
		}

		File dir1 = new File(excelOutputLocation + programName)
		dir1.mkdir()


		def programNameNoSpaces = programName.replace(' ','_').replace('(','').replace(')','')
		File excelFile = new File(excelOutputLocation + programName + "/" + programNameNoSpaces + "_" + isbn + ".xlsx")

	}


	/**
	 * Generate Program Structure
	 * @param programInstance
	 * @param gradeSpecificContent
	 * @param excelType
	 * @return
	 */
	def generateProgramStructure( def programInstance, def gradeSpecificContent, def excelType ) {


		try{

			log.info "Generating Program Structure"

			def secondLevel = levelsService.getSecondLevelNumber(programInstance)
			def thirdLevel = levelsService.getThirdLevelNumber(programInstance)
			def fourthLevel = levelsService.getFourthLevelNumber(programInstance)
			def fifthLevel = levelsService.getFifthLevelNumber(programInstance)

			if(gradeSpecificContent)
			{
				gradeSpecificContent.each{

					def lessonPlanMap=[:]
					def contentList =[]

					def fullContentList = it.value

					fullContentList.each{ content ->
						if(content.lessonPlan){
							if(lessonPlanMap.containsKey(content.lessonPlan))
							{
								contentList=lessonPlanMap.get(content.lessonPlan)
								if(!contentList.contains(content)){
									contentList.add(content)
									lessonPlanMap << [(content.lessonPlan) :contentList]
								}

							} else{
								contentList = []
								contentList.add(content)
								lessonPlanMap << [(content.lessonPlan) :contentList]
							}
						}
					}


					if(lessonPlanMap){

						lessonPlanMap = lessonPlanMap.sort{ it.key.sortId }

						def strGrade = createCommaSeparatedList(it.key)
						def programGrade = strGrade.replaceAll(",","_")


						def programNameNoSpaces = programInstance.name.replace(' ','_').replace('(','').replace(')','')

						def excelTemplate = getTemplate( excelType )
						def excelFileLocation = grailsApplication.config.getProperty('ProgramStructureExcelFolder')
						File dir = new File(excelFileLocation)
						if(!dir.exists()){
							dir.mkdir()
						}

						File dir1 = new File(excelFileLocation + programInstance.name)
						dir1.mkdir()
						File excelFile = new File(excelFileLocation + programInstance.name + "/" +programNameNoSpaces + "_" + programGrade + ".xlsx")


						XSSFWorkbook excelInputWorkbook = new XSSFWorkbook(excelTemplate)
						FileOutputStream excelOutputWorkbook = new FileOutputStream(excelFile)

						excelInputWorkbook.write(excelOutputWorkbook)
						excelTemplate.close()
						excelOutputWorkbook.close()

						log.info "Adding Program Structure Excel rows..."

						FileInputStream excelInput = new FileInputStream(excelFile)
						XSSFWorkbook wb = new XSSFWorkbook(excelInput)
						wb.setSheetName(0, "Grade" + programGrade)

						XSSFSheet sheet = wb.getSheetAt(0)
						sheet.createFreezePane(0, 4)
						XSSFRow scopeRow = sheet.getRow(1)

						int count = 5

						lessonPlanMap.eachWithIndex{lessonPlan,resrc, inx ->

							def firstResource = resrc[0]
							def levelMap = levelsService.getFullLevelsMap(firstResource)

							def keywordList = firstResource.keywords?.keyword
							def standardList = firstResource.standards?.standard

							XSSFRow resourceRow = sheet.createRow(count)

							String strHierarchy=""

							resourceRow.createCell(1).setCellValue(strGrade)
							resourceRow.createCell(13).setCellValue(levelMap?.top?.title) // L0 title


							if(levelMap.second && secondLevel==1){
								scopeRow.createCell(2).setCellValue(programInstance?.secondLevelScope)
								resourceRow.createCell(2).setCellValue(levelMap.second?.hierarchy)
								resourceRow.createCell(14).setCellValue(levelMap.second?.title) //L1 title
								strHierarchy=strHierarchy+levelMap.second?.hierarchy+"."

							}

							if(levelMap.second && secondLevel==2){
								scopeRow.createCell(3).setCellValue(programInstance?.secondLevelScope)
								resourceRow.createCell(3).setCellValue(levelMap.second?.hierarchy)
								resourceRow.createCell(15).setCellValue(levelMap.second?.title) //L2 title
								strHierarchy=strHierarchy+levelMap.second?.hierarchy+"."
							}

							if(levelMap.second && secondLevel==3){
								scopeRow.createCell(4).setCellValue(programInstance?.secondLevelScope)
								resourceRow.createCell(4).setCellValue(levelMap.second?.hierarchy)
								resourceRow.createCell(16).setCellValue(levelMap.second?.title) //L3 title
								strHierarchy=strHierarchy+levelMap.second?.hierarchy+"."
							}
							else if(levelMap.third && thirdLevel==3){
								scopeRow.createCell(4).setCellValue(programInstance?.thirdLevelScope)
								resourceRow.createCell(4).setCellValue(levelMap.third?.hierarchy)
								resourceRow.createCell(16).setCellValue(levelMap.third?.title) //L3 title
								strHierarchy=strHierarchy+levelMap.third?.hierarchy+"."
							}

							if(levelMap.second && secondLevel==4){
								scopeRow.createCell(5).setCellValue(programInstance?.secondLevelScope)
								resourceRow.createCell(5).setCellValue(levelMap.second?.hierarchy)
								resourceRow.createCell(17).setCellValue(levelMap.second?.title) //L4 title
								strHierarchy=strHierarchy+levelMap.second?.hierarchy+"."
							}
							else if(levelMap.second && secondLevel==5){
								scopeRow.createCell(6).setCellValue(programInstance?.secondLevelScope)
								resourceRow.createCell(6).setCellValue(levelMap.second?.hierarchy)
								resourceRow.createCell(18).setCellValue(levelMap.second?.title) // L5 title
								strHierarchy=strHierarchy+levelMap.second?.hierarchy+"."
							}
							else if(levelMap.third && thirdLevel==4){
								scopeRow.createCell(5).setCellValue(programInstance?.thirdLevelScope)
								resourceRow.createCell(5).setCellValue(levelMap.third?.hierarchy)
								resourceRow.createCell(17).setCellValue(levelMap.third?.title) //L4 title
								strHierarchy=strHierarchy+levelMap.third?.hierarchy+"."
							}
							else if(levelMap.fourth && fourthLevel==4){
								scopeRow.createCell(5).setCellValue(programInstance?.fourthLevelScope)
								resourceRow.createCell(5).setCellValue(levelMap.fourth?.hierarchy)
								resourceRow.createCell(17).setCellValue(levelMap.fourth?.title) //L4 title
							}

							if(levelMap.third && thirdLevel==5){
								scopeRow.createCell(6).setCellValue(programInstance?.thirdLevelScope)
								resourceRow.createCell(6).setCellValue(levelMap.third?.hierarchy)
								resourceRow.createCell(18).setCellValue(levelMap.third?.title) //L5 title
								strHierarchy=strHierarchy+levelMap.third?.hierarchy+"."
							}
							else if(levelMap.fourth && fourthLevel==5){
								scopeRow.createCell(6).setCellValue(programInstance?.fourthLevelScope)
								resourceRow.createCell(6).setCellValue(levelMap.fourth?.hierarchy)
								resourceRow.createCell(18).setCellValue(levelMap.fourth?.title) //L5 title
								strHierarchy=strHierarchy+levelMap.fourth?.hierarchy+"."
							}

							if(levelMap.fourth && fourthLevel==6){
								scopeRow.createCell(7).setCellValue(programInstance?.fourthLevelScope)
								resourceRow.createCell(7).setCellValue(levelMap.fourth?.hierarchy)
								resourceRow.createCell(19).setCellValue(levelMap.fourth?.title) //L6 title
								strHierarchy=strHierarchy+levelMap.fourth?.hierarchy+"."
							}

							else if(levelMap.fifth && fifthLevel==6){
								scopeRow.createCell(7).setCellValue(programInstance?.fifthLevelScope)
								resourceRow.createCell(7).setCellValue(levelMap.fifth?.hierarchy)
								resourceRow.createCell(19).setCellValue(levelMap.fifth?.title) //L6 title
								strHierarchy=strHierarchy+levelMap.fifth?.hierarchy
							} // End Scope and Sequence


							resourceRow.createCell(8).setCellValue(lessonPlan?.lessonPlanId)
							resourceRow.createCell(9).setCellValue(lessonPlan?.title)
							resourceRow.createCell(10).setCellValue(strHierarchy?strHierarchy.substring(0, strHierarchy.length() - 1):"") //Calculation
							resourceRow.createCell(11).setCellValue(lessonPlan?.sortId)
							resourceRow.createCell(12).setCellValue(lessonPlan?.duration)
							resourceRow.createCell(20).setCellValue(createCommaSeparatedList(keywordList.flatten()))
							resourceRow.createCell(21).setCellValue(createCommaSeparatedList(standardList.flatten()))


							count++
						}

						FileOutputStream fileOut = new FileOutputStream(excelFile)
						wb.write(fileOut)
						fileOut.close()
						log.info "Succesfully Added resource values to the Program Structure Excel rows"
					}
				}
			}
		}catch(Exception ex)
		{
			log.error "ERROR: Exception when generating Excel files: " + ex.getMessage()
			return false
		}
	}



	/**
	 * Generate the MDS or ED Excel
	 * @param targetResourceList
	 * @param programInstance
	 * @param productInstance
	 * @return
	 */
	def generateExcel( targetResourceList, Program programInstance, Product productInstance, def excelType ) {

		log.info "Generating Excel for ISBN: " + productInstance.isbn

		try{

			def excelTemplate = getTemplate()
			def excelFile = setOutputFile(programInstance.name, productInstance.isbn, excelType)

			def listGrades = productInstance.grades.grade.sort()
			String platform = productInstance.program?.platform
			def platformUrl = mappingService.identifyPlatform(platform)

			def secondLevel = levelsService.getSecondLevelNumber(programInstance)
			def thirdLevel = levelsService.getThirdLevelNumber(programInstance)
			def fourthLevel = levelsService.getFourthLevelNumber(programInstance)
			def fifthLevel = levelsService.getFifthLevelNumber(programInstance)

			def edStandardSetList = programInstance.standardSets


			XSSFWorkbook excelInputWorkbook = new XSSFWorkbook(excelTemplate)
			FileOutputStream excelOutputWorkbook = new FileOutputStream(excelFile)

			excelInputWorkbook.write(excelOutputWorkbook)
			excelTemplate.close()
			excelOutputWorkbook.close()

			log.info "Adding Excel rows..."

			FileInputStream excelInput = new FileInputStream(excelFile)
			XSSFWorkbook wb = new XSSFWorkbook(excelInput)

			XSSFSheet sheet = wb.getSheetAt(0)
			sheet.createFreezePane(0, 3)
			XSSFRow scopeRow = sheet.getRow(0)
			XSSFRow topRow = sheet.getRow(1)

			XSSFCell cell0 = topRow.getCell(0)
			cell0.setCellValue(productInstance?.isbn)

			XSSFCell cell2 = topRow.getCell(2)
			cell2.setCellValue(productInstance.program?.discipline)

			XSSFCell cell3 = topRow.getCell(3)
			cell3.setCellValue(createCommaSeparatedList(listGrades))

			XSSFCell cell4 = topRow.getCell(4)
			cell4.setCellValue("FALSE")

			XSSFCell cell6 = topRow.getCell(6)
			cell6.setCellValue("3.3")

			XSSFCell cell7 = topRow.getCell(7)
			cell7.setCellValue(platformUrl.toString())

			XSSFCell cell8 = topRow.getCell(8)
			cell8.setCellValue(productInstance.program?.standardSetName)


			if(excelType == "EXCEL_ED"){

				XSSFCell cell7Ed = topRow.getCell(7)
				cell7Ed.setCellValue('HMHOne')

				// third row ED Standards
				XSSFRow thirdRow = sheet.getRow(2)
				XSSFCell cell105 = thirdRow.getCell(105)
				cell105.setCellValue(edStandardSetList[0]?.name)

				XSSFCell cell106 = thirdRow.getCell(106)
				cell106.setCellValue(edStandardSetList[1]?.name)

				XSSFCell cell107 = thirdRow.getCell(107)
				cell107.setCellValue(edStandardSetList[2]?.name)

				XSSFCell cell108 = thirdRow.getCell(108)
				cell108.setCellValue(edStandardSetList[3]?.name)

				XSSFCell cell109 = thirdRow.getCell(109)
				cell109.setCellValue(edStandardSetList[4]?.name)

				XSSFCell cell110 = thirdRow.getCell(110)
				cell110.setCellValue(edStandardSetList[5]?.name)

				XSSFCell cell111 = thirdRow.getCell(111)
				cell111.setCellValue(edStandardSetList[6]?.name)

				XSSFCell cell112 = thirdRow.getCell(112)
				cell112.setCellValue(edStandardSetList[7]?.name)

			}


			int count = 4
			targetResourceList.eachWithIndex{ resrc, inx ->

				inx++
				def levelMap = levelsService.getFullLevelsMap(resrc)

				if(inx==1){

					XSSFCell cell1 = topRow.getCell(1)
					cell1.setCellValue(resrc.language?: "")

					XSSFCell cell5 = topRow.getCell(5)
					cell5.setCellValue(resrc.component?.toolType)
				}

				XSSFRow resourceRow = sheet.createRow(count)

				if(excelType == "EXCEL_ED"){


					resourceRow.createCell(1).setCellValue( resrc?.ed?.pedagogicalPurpose ?: resrc.segment?.title )
					resourceRow.createCell(2).setCellValue( resrc?.ed?.instructionalPurpose ?: resrc.strand?.title )

					resourceRow.createCell(3).setCellValue(resrc?.ed?.pedagogicalPurposeHierarchy ?: resrc.segment?.hierarchy)
					resourceRow.createCell(4).setCellValue(resrc?.ed?.instructionalPurposeHierarchy ?: resrc.strand?.hierarchy)

					resourceRow.createCell(52).setCellValue( resrc?.ed?.component ?:resrc.component?.component )
					resourceRow.createCell(53).setCellValue(resrc?.ed?.componentHierarchy ?: resrc.component?.componentHierarchy)

					resourceRow.createCell(56).setCellValue( resrc?.ed?.mediaType ?:resrc?.mediaType )
					resourceRow.createCell(85).setCellValue( resrc?.ed?.toolType  ?:resrc.component?.toolType )

					resourceRow.createCell(104).setCellValue( resrc?.ed?.productCategory )

					// standard codes
					def standardSet1 = []
					def standardSet2 = []
					def standardSet3 = []
					def standardSet4 = []
					def standardSet5 = []
					def standardSet6 = []
					def standardSet7 = []
					def standardSet8 = []


					if (resrc.edStandards){

						resrc.edStandards.each{

							def standardCode = it

							if(standardCode.standardSet.name == edStandardSetList[0].name){

								standardSet1 << standardCode.standard

							}else if(standardCode.standardSet.name == edStandardSetList[1].name){

								standardSet2 << standardCode.standard

							}else if(standardCode.standardSet.name == edStandardSetList[2].name){

								standardSet3 << standardCode.standard

							}else if(standardCode.standardSet.name == edStandardSetList[3].name){

								standardSet4 << standardCode.standard

							}else if(standardCode.standardSet.name == edStandardSetList[4].name){

								standardSet5 << standardCode.standard

							}else if(standardCode.standardSet.name == edStandardSetList[5].name){

								standardSet6 << standardCode.standard

							}else if(standardCode.standardSet.name == edStandardSetList[6].name){

								standardSet7 << standardCode.standard

							}else if(standardCode.standardSet.name == edStandardSetList[7].name){

								standardSet8 << standardCode.standard

							}else{

								log.error "The following Standard Code: " + standardCode + "does not map to a Standard Set"}

						}

						resourceRow.createCell(105).setCellValue(createCommaSeparatedList( standardSet1 ))
						resourceRow.createCell(106).setCellValue(createCommaSeparatedList( standardSet2 ))
						resourceRow.createCell(107).setCellValue(createCommaSeparatedList( standardSet3 ))
						resourceRow.createCell(108).setCellValue(createCommaSeparatedList( standardSet4 ))
						resourceRow.createCell(109).setCellValue(createCommaSeparatedList( standardSet5 ))
						resourceRow.createCell(110).setCellValue(createCommaSeparatedList( standardSet6 ))
						resourceRow.createCell(111).setCellValue(createCommaSeparatedList( standardSet7 ))
						resourceRow.createCell(112).setCellValue(createCommaSeparatedList( standardSet8 ))

					}


				}

				else{

					resourceRow.createCell(1).setCellValue(resrc.segment?.title)
					resourceRow.createCell(2).setCellValue(resrc.strand?.title)
					resourceRow.createCell(3).setCellValue(resrc.segment?.hierarchy)
					resourceRow.createCell(4).setCellValue(resrc.strand?.hierarchy)
					resourceRow.createCell(52).setCellValue(resrc.component?.component)
					resourceRow.createCell(53).setCellValue(resrc.component?.componentHierarchy)
					resourceRow.createCell(56).setCellValue(resrc?.mediaType)
					resourceRow.createCell(85).setCellValue(resrc.component?.toolType)

				}

				resourceRow.createCell(0).setCellValue(inx.toString())


				resourceRow.createCell(5).setCellValue(resrc.lessonPlan?.lessonPlanId)
				resourceRow.createCell(6).setCellValue(resrc.lessonPlan?.title)
				resourceRow.createCell(7).setCellValue(1)
				resourceRow.createCell(8).setCellValue(resrc?.resourceType)
				resourceRow.createCell(9).setCellValue(resrc?.additionalText)
				resourceRow.createCell(10).setCellValue(resrc.reteach ? "x" : "")
				resourceRow.createCell(11).setCellValue(resrc.enrich ? "x" : "")
				resourceRow.createCell(12).setCellValue(resrc.difInst ? "x" : "")
				resourceRow.createCell(13).setCellValue(resrc.lessonPlan?.duration)
				resourceRow.createCell(14).setCellValue(resrc?.meaningfulDescription)
				resourceRow.createCell(15).setCellValue(resrc?.frequency)
				resourceRow.createCell(16).setCellValue(resrc?.notes)

				resourceRow.createCell(18).setCellValue(createCommaSeparatedList(levelMap.top?.grades?.grade))

				//Scope and Sequence

				if(levelMap.second && secondLevel==1){
					scopeRow.createCell(19).setCellValue(productInstance.program?.secondLevelScope)
					resourceRow.createCell(19).setCellValue(levelMap.second?.hierarchy) //L1
					resourceRow.createCell(26).setCellValue(levelMap.second?.title)	}

				if(levelMap.second && secondLevel==2){
					scopeRow.createCell(20).setCellValue(productInstance.program?.secondLevelScope)
					resourceRow.createCell(20).setCellValue(levelMap.second?.hierarchy) //L2
					resourceRow.createCell(27).setCellValue(levelMap.second?.title)	}

				if(levelMap.second && secondLevel==3){
					scopeRow.createCell(21).setCellValue(productInstance.program?.secondLevelScope)
					resourceRow.createCell(21).setCellValue(levelMap.second?.hierarchy) //L3
					resourceRow.createCell(28).setCellValue(levelMap.second?.title)	}
				else if(levelMap.third && thirdLevel==3){
					scopeRow.createCell(21).setCellValue(productInstance.program?.thirdLevelScope)
					resourceRow.createCell(21).setCellValue(levelMap.third?.hierarchy) //L3
					resourceRow.createCell(28).setCellValue(levelMap.third?.title) }

				if(levelMap.second && secondLevel==4){
					scopeRow.createCell(22).setCellValue(productInstance.program?.secondLevelScope)
					resourceRow.createCell(22).setCellValue(levelMap.second?.hierarchy)//L4
					resourceRow.createCell(29).setCellValue(levelMap.second?.title)	}
				else if(levelMap.second && secondLevel==5){
					scopeRow.createCell(23).setCellValue(productInstance.program?.secondLevelScope) // Column X
					resourceRow.createCell(23).setCellValue(levelMap.second?.hierarchy)// Column X for L5
					resourceRow.createCell(30).setCellValue(levelMap.second?.title) } // Column AE
				else if(levelMap.third && thirdLevel==4){
					scopeRow.createCell(22).setCellValue(productInstance.program?.thirdLevelScope)
					resourceRow.createCell(22).setCellValue(levelMap.third?.hierarchy)//L4
					resourceRow.createCell(29).setCellValue(levelMap.third?.title)}
				else if(levelMap.fourth && fourthLevel==4){
					scopeRow.createCell(22).setCellValue(productInstance.program?.fourthLevelScope)
					resourceRow.createCell(22).setCellValue(levelMap.fourth?.hierarchy)//L4
					resourceRow.createCell(29).setCellValue(levelMap.fourth?.title)}

				if(levelMap.third && thirdLevel==5){
					scopeRow.createCell(23).setCellValue(productInstance.program?.thirdLevelScope)
					resourceRow.createCell(23).setCellValue(levelMap.third?.hierarchy)//L5
					resourceRow.createCell(30).setCellValue(levelMap.third?.title)}
				else if(levelMap.fourth && fourthLevel==5){
					scopeRow.createCell(23).setCellValue(productInstance.program?.fourthLevelScope)
					resourceRow.createCell(23).setCellValue(levelMap.fourth?.hierarchy)//L5
					resourceRow.createCell(30).setCellValue(levelMap.fourth?.title)}

				if(levelMap.fourth && fourthLevel==6){
					scopeRow.createCell(24).setCellValue(productInstance.program?.fourthLevelScope)
					resourceRow.createCell(24).setCellValue(levelMap.fourth?.hierarchy)//L6
					resourceRow.createCell(31).setCellValue(levelMap.fourth?.title)}

				else if(levelMap.fifth && fifthLevel==6){
					scopeRow.createCell(24).setCellValue(productInstance.program?.fifthLevelScope)
					resourceRow.createCell(24).setCellValue(levelMap.fifth?.hierarchy)//L6
					resourceRow.createCell(31).setCellValue(levelMap.fifth?.title)}

				// End Scope and Sequence

				resourceRow.createCell(25).setCellValue(levelMap?.top?.title)


				resourceRow.createCell(32).setCellValue(resrc?.author)
				resourceRow.createCell(33).setCellValue(resrc?.title)
				resourceRow.createCell(34).setCellValue(resrc?.genre)
				resourceRow.createCell(35).setCellValue(resrc?.theme)
				resourceRow.createCell(36).setCellValue(resrc?.textComplexity)

				resourceRow.createCell(37).setCellValue(resrc?.displayTitle)
				resourceRow.createCell(38).setCellValue(resrc?.hmhId)

				resourceRow.createCell(39).setCellValue(resrc.searchable ? "x" : "")
				resourceRow.createCell(40).setCellValue(resrc.viewable ? "x" : "")
				resourceRow.createCell(41).setCellValue(resrc.schedulable ? "x" : "")
				resourceRow.createCell(42).setCellValue(resrc.assignable ? "x" : "")

				resourceRow.createCell(43).setCellValue(resrc.seFacing ? "x" : "")
				resourceRow.createCell(44).setCellValue(resrc.freeplay ? "x" : "")
				resourceRow.createCell(45).setCellValue(resrc.teacherManaged ? "x" : "")
				resourceRow.createCell(46).setCellValue(resrc.iwbCompatible ? "x" : "")

				resourceRow.createCell(47).setCellValue(resrc?.uri)
				resourceRow.createCell(48).setCellValue(0) //display-color

				resourceRow.createCell(49).setCellValue(createCommaSeparatedList(resrc.keywords.keyword))

				// unique ID
				resourceRow.createCell(50).setCellValue(resrc?.resourceId?: "${resrc?.getUniqueId()}")

				resourceRow.createCell(51).setCellValue(createCommaSeparatedList(resrc.standards.standard))


				resourceRow.createCell(54).setCellValue(resrc.component?.componentType)
				resourceRow.createCell(55).setCellValue(resrc.component?.categorization)

				// active and persistent use uppercase true rather than x
				resourceRow.createCell(61).setCellValue(resrc.active ? "TRUE" : "")
				resourceRow.createCell(62).setCellValue(resrc.persistent ? "TRUE" : "")
				resourceRow.createCell(63).setCellValue(resrc?.doneOwner)


				resourceRow.createCell(65).setCellValue(createCommaSeparatedList(resrc.mwsGuids.guid))

				resourceRow.createCell(66).setCellValue(1) //Pacing (in days)
				resourceRow.createCell(67).setCellValue(resrc.nonLocalResource ? "x" : "")
				resourceRow.createCell(68).setCellValue(resrc?.itemId)


				resourceRow.createCell(84).setCellValue(resrc?.strandNumber) // not strand title


				if(resrc.reader)
				{
					resourceRow.createCell(86).setCellValue(resrc.reader?.isbn10)
					resourceRow.createCell(87).setCellValue(resrc.reader?.isbn13)
					resourceRow.createCell(88).setCellValue(resrc.reader?.readerLevel)
					resourceRow.createCell(89).setCellValue(resrc.reader?.guidedReadingLevels)
					resourceRow.createCell(90).setCellValue(resrc.reader?.draEdlLevel)
					resourceRow.createCell(91).setCellValue(resrc.reader?.readingRecoveryLevels)
					resourceRow.createCell(92).setCellValue(resrc.reader?.readingSkills)
				}


				if(resrc.language.equalsIgnoreCase("en-US"))
					resourceRow.createCell(93).setCellValue("English")
				else
					resourceRow.createCell(93).setCellValue("Spanish")

				resourceRow.createCell(94).setCellValue(resrc.resourcesPanelTe ? "x" : "")
				resourceRow.createCell(95).setCellValue(resrc.resourcesPanelSe ? "x" : "")

				def topLevel = levelsService.getTopLevel(resrc)

				resourceRow.createCell(96).setCellValue(topLevel?.nonGradeLevel)
				resourceRow.createCell(97).setCellValue(topLevel?.nonGradeTitle)
				resourceRow.createCell(98).setCellValue(resrc?.downloadUrl)
				resourceRow.createCell(99).setCellValue(resrc?.card)
				resourceRow.createCell(100).setCellValue(resrc?.parentId)
				resourceRow.createCell(101).setCellValue(resrc?.sortId)

				resourceRow.createCell(102).setCellValue(resrc.lessonPlan?.sortId) //lesson-plan sequence

				// Common Cartridge not used in MDS but written to EXCEL
				resourceRow.createCell(115).setCellValue(resrc?.commonCartridgeTitle)

				def commonCartridgeKeywords = keywordService.identifyCommonCartridgeKeywords(resrc)
				resourceRow.createCell(116).setCellValue(createCommaSeparatedList(commonCartridgeKeywords))

				count++
			}


			FileOutputStream fileOut = new FileOutputStream(excelFile)
			wb.write(fileOut)
			fileOut.close()
			log.info "Succesfully Added resource values to the MDS Excel rows"

		}catch(Exception ex)
		{
			log.error "ERROR: Exception when generating Excel files: " + ex.getMessage()
			return false
		}
	}




	/**
	 * Generate the Correlations Excel
	 * @param targetResourceList
	 * @param programInstance
	 * @param productInstance
	 * @return
	 */
	def generateCorrelationsExcel( targetResourceList, Program programInstance, Product productInstance ) {

		try{
			if(targetResourceList){
				def isbn = productInstance.isbn
				log.info "Excel generation for Product ISBN: " + isbn


				log.info "Adding new data to Excel..."

				XSSFWorkbook wb = new XSSFWorkbook()
				XSSFSheet sheet = wb.createSheet("TC Correlations");
				XSSFRow headerRow = sheet.createRow(0)
				headerRow.createCell(0).setCellValue("isbn")
				headerRow.createCell(1).setCellValue("source_buid")
				headerRow.createCell(2).setCellValue("source_type")
				headerRow.createCell(3).setCellValue("source_subsection")
				headerRow.createCell(4).setCellValue("target_id")
				headerRow.createCell(5).setCellValue("target_type")
				headerRow.createCell(6).setCellValue("target_subsection")
				headerRow.createCell(7).setCellValue("standards")

				int count = 1
				def corrflag=false
				targetResourceList.eachWithIndex{ resrc, inx ->
					def resourceData=correlationMappingService.getTargetContents(resrc)
					if(resourceData.targetResources){
						corrflag=true

						resourceData.targetResources.each{
							XSSFRow resourceRow = sheet.createRow(count)
							resourceRow.createCell(0).setCellValue(isbn.toString())
							resourceRow.createCell(1).setCellValue(resrc.hmhId)
							resourceRow.createCell(2).setCellValue(resourceData.sourceContents.sourceType)
							resourceRow.createCell(3).setCellValue("")
							resourceRow.createCell(4).setCellValue(it.content.hmhId)
							resourceRow.createCell(5).setCellValue(it.targetType)
							resourceRow.createCell(6).setCellValue("")
							resourceRow.createCell(7).setCellValue(createCommaSeparatedList(it.content.standards.standard))
							count++
						}

					}

				}
				if(corrflag){
					def productsExcelLocation = grailsApplication.config.getProperty('CorrelationsExcelFolder')
					File dir = new File(productsExcelLocation)
					if(!dir.exists()){
						dir.mkdir()
					}

					File dir1 = new File(productsExcelLocation + programInstance.name)
					dir1.mkdir()

					File excelFile = new File(productsExcelLocation + programInstance.name + "/" +"hsp_correlations_" + isbn + ".xlsx")

					FileOutputStream fileOut = new FileOutputStream(excelFile)
					wb.write(fileOut)
					fileOut.close()
					log.info "Succesfully Added resource values to the Correlation Excel rows"

				}
			}
		}catch(Exception ex)
		{
			log.error "generate Correlation Excel : Found errors while generating Correlation Excel files "+ ex.getMessage()
			return false
		}

	}


}

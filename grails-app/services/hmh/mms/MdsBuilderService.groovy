package hmh.mms

import grails.transaction.Transactional
import grails.util.Holders
import groovy.xml.StreamingMarkupBuilder
import groovy.xml.streamingmarkupsupport.BaseMarkupBuilder.Document


@Transactional
class MdsBuilderService {

	def levelsService
	def mappingService

	/**
	 * Build MDS XML
	 * @param targetResourceList
	 * @param programInstance
	 * @param productInstance
	 * @return
	 */
	def mdsBuildXml(targetResourceList, Program programInstance, Product productInstance,GenerateXmls generateXml) {
		def addSegments
		Set targetLessonPlans = []

		try{
			def xml = {
				mkp.xmlDeclaration()
				mkp.comment "Created by the Metadata Management System"
				MDS() {
					resources{
						targetResourceList.each{resrc->
							if(resrc){
								def allKeywords = []
								Set allStandards
								if(generateXml.isStandards=="Include Standards")
									allStandards = resrc.standards.standard
								String platform = productInstance.program.platform
								def levelMap = levelsService.getFullLevelsMap(resrc)
								def relativeUrl = mappingService.splitPmtUrl(resrc.uri)
								def platformUrl = mappingService.identifyPlatform(platform)

								resource(id :"${resrc.getUniqueId()}"){
									HMH_ID(resrc.hmhId)
									resource_type(resrc.resourceType)
									display_title(resrc.displayTitle)
									uri{
										relative_url(relativeUrl)
										platform_url(platformUrl)
									}
									display_color(0)
									delegate.keywords{
										resrc.keywords.keyword.unique().each{
											if(it)
												keyword(it)
										}
									}
									if(generateXml.isStandards=="Include Standards"&& allStandards)
									{
										delegate.standards{
											allStandards.each{
												if(it)
													standard(it)
											}
										}
									}
									tool_type(resrc.component.toolType)
									language(resrc.language)
									discipline{
										code(mappingService.getDisciplineCode(productInstance.program.discipline))
										label(productInstance.program.discipline)
									}
									setOfISBNs{
										ISBN(type:'primary',productInstance.isbn)
									}
									strand(resrc.strandNumber)
									reteach(resrc.reteach)
									diff_inst(resrc.difInst)
									meaningful_description(resrc.meaningfulDescription)
									additional_text(resrc.additionalText)
									viewable(resrc.viewable)
									assignable(resrc.assignable)
									schedulable(resrc.schedulable)
									searchable(resrc.searchable)
									teacher_managed(resrc.teacherManaged)
									se_facing(resrc.seFacing)
									enrich(resrc.enrich)
									component(resrc.component.component)
									component_type(mappingService.getMdsComponentType(resrc.component.componentType))
									media_type(resrc.mediaType)
									categorization(resrc.component.categorization)

									hierarchy(resrc.component.componentHierarchy)
									author(resrc.author)
									title(resrc.title)
									genres(resrc.genre)
									icon_url{
										relative_icon_url()
										platform_url(platformUrl)
									}
									freeplay(resrc.freeplay)
									active(resrc.active)
									persistent(resrc.persistent)
									doneOwner(resrc.doneOwner)

									secondaryURLs{
										secondaryURL{
											title()
											type()
											URL()
										}
										secondaryURL{
											title()
											type()
											URL()
										}
									}
									lab(type:''){
										class_time(text:"",scale:"0")
										prep_time(text:"",scale:"0")
										difficulty(text:"",scale:"0")
										materials(text:"",scale:"0")
									}
									theme(resrc.theme)
									text_complexity(resrc.textComplexity)
									IWB_Compatible(resrc.iwbCompatible)



									if(levelMap.top){

										level(hierarchy:mappingService.getGradeHierarchy(levelMap.top.grades.grade), type:productInstance.program.topLevelScope.toLowerCase(),level_number:0){
											grades{
												levelMap.top.grades.each{grade1->
													if(grade1.grade=='K')
														grade("KG")
													else
														grade(grade1.grade)
												}
											}

											title(levelMap.top?.title)

											if(levelMap.second==null)
											{
												instructional_segment(hierarchy:resrc.segment.hierarchy){
													title(resrc.segment.title)
													strand_type(hierarchy:resrc.strand.hierarchy){ title(resrc.strand.title) }
												}

											}


											if(levelMap.second){
												level(hierarchy:levelMap.second.hierarchy, type:productInstance.program.secondLevelScope.toLowerCase(),level_number:levelsService.getSecondLevelNumber(programInstance)){
													title(levelMap.second?.title)

													if(levelMap.third==null)
													{
														instructional_segment(hierarchy:resrc.segment.hierarchy){
															title(resrc.segment.title)
															strand_type(hierarchy:resrc.strand.hierarchy){ title(resrc.strand.title) }
														}

													}
													if(levelMap.third){


														level(hierarchy:levelMap.third?.hierarchy, type:productInstance.program.thirdLevelScope.toLowerCase(),level_number:levelsService.getThirdLevelNumber(programInstance)){
															title(levelMap.third?.title)

															if(levelMap.fourth==null)
															{
																instructional_segment(hierarchy:resrc.segment.hierarchy){
																	title(resrc.segment.title)
																	strand_type(hierarchy:resrc.strand.hierarchy){ title(resrc.strand.title) }
																}

															}
															if(levelMap.fourth){

																level(hierarchy:levelMap.fourth?.hierarchy, type:productInstance.program.fourthLevelScope.toLowerCase(),level_number:levelsService.getFourthLevelNumber(programInstance)){
																	title(levelMap.fourth?.title)

																	if(levelMap.fifth==null)
																	{
																		instructional_segment(hierarchy:resrc.segment.hierarchy){
																			title(resrc.segment.title)
																			strand_type(hierarchy:resrc.strand.hierarchy){ title(resrc.strand.title) }
																		}
																	}
																	if(levelMap.fifth){

																		level(hierarchy:levelMap.fifth?.hierarchy, type:productInstance.program.fifthLevelScope.toLowerCase(),level_number:levelsService.getFifthLevelNumber(programInstance)){
																			title(levelMap.fifth?.title)
																			instructional_segment(hierarchy:resrc.segment.hierarchy){
																				title(resrc.segment.title)
																				strand_type(hierarchy:resrc.strand.hierarchy){ title(resrc.strand.title) }
																			}
																		}
																	}
																}
															}
														}
													}
												}
											}
										}
									}


									ext()
									//Reader Instance
									if(resrc.reader){
										reader{
											isbn_10(resrc.reader.isbn10)
											isbn_13(resrc.reader.isbn13)
											reader_level(resrc.reader.readerLevel)
											guided_reading_levels(resrc.reader.guidedReadingLevels)
											dra_edl_level(resrc.reader.draEdlLevel)
											reading_recovery_levels(resrc.reader.readingRecoveryLevels)
											reading_skills(resrc.reader.readingSkills)
										}
									}//Reader Instance END
									resources_panel_te(resrc.resourcesPanelTe)
									resources_panel_se(resrc.resourcesPanelSe)
									def topLevel = levelsService.getTopLevel(resrc)
									non_grade_level(topLevel.nonGradeLevel)
									non_grade_title(topLevel.nonGradeTitle)
									download_url(resrc.downloadUrl)
									parent_resource_id(resrc.parentId)
									sort_id(resrc.sortId)

								}

								if (resrc.lessonPlan){
									targetLessonPlans << resrc.lessonPlan
								}
							}
						}
					}
					//Lesson plans
					lesson_plans{

						if(targetLessonPlans){

							targetLessonPlans.each{ lp ->

								def resourcesBelongingToLessonPlan = Content.where{product.isbn == productInstance.isbn && lessonPlan == lp}.list()

								lesson_plan( id :lp.lessonPlanId, duration:lp.duration, hierarchy :"1" ){
									sort_id(lp.sortId)
									title(lp.title)
									instructional_segment(hierarchy: resourcesBelongingToLessonPlan[0].segment.hierarchy){
										title(resourcesBelongingToLessonPlan[0].segment.title)


										strand_type(hierarchy:resourcesBelongingToLessonPlan[0].strand.hierarchy){
											title(resourcesBelongingToLessonPlan[0].strand.title)
											resources{
												resourcesBelongingToLessonPlan.each{ resourceStrand ->
													resource(id:"${resourceStrand.getUniqueId()}"){}
												}
											}
										}

									}

									languages{ language(resourcesBelongingToLessonPlan[0].language?: 'en-US') }
									disciplines{ discipline(resourcesBelongingToLessonPlan[0].product.program?.discipline) }
									programs{ program() }

									def levelMaps =levelsService.getFullLevelsMap(resourcesBelongingToLessonPlan[0])

									if(levelMaps.top){
										level(hierarchy:mappingService.getGradeHierarchy(levelMaps.top.grades.grade), type:productInstance.program.topLevelScope.toLowerCase(), level_number:0 ){
											grades{
												levelMaps.top.grades.each{ gradeValue ->
													if(gradeValue.grade=='K')
														grade("KG")
													else
														grade(gradeValue.grade)
												}
											}

											title(levelMaps.top?.title)


											if(levelMaps.second){
												level(hierarchy:levelMaps.second.hierarchy, type:productInstance.program.secondLevelScope.toLowerCase(),level_number:levelsService.getSecondLevelNumber(programInstance)){
													title(levelMaps.second?.title)

													if(levelMaps.third){


														level(hierarchy:levelMaps.third?.hierarchy, type:productInstance.program.thirdLevelScope.toLowerCase(),level_number:levelsService.getThirdLevelNumber(programInstance)){
															title(levelMaps.third?.title)

															if(levelMaps.fourth){

																level(hierarchy:levelMaps.fourth?.hierarchy, type:productInstance.program.fourthLevelScope.toLowerCase(),level_number:levelsService.getFourthLevelNumber(programInstance)){
																	title(levelMaps.fourth?.title)

																	if(levelMaps.fifth){

																		level(hierarchy:levelMaps.fifth?.hierarchy, type:productInstance.program.fifthLevelScope.toLowerCase(),level_number:levelsService.getFifthLevelNumber(programInstance)){
																			title(levelMaps.fifth?.title)

																		}
																	}
																}
															}
														}
													}
												}
											}
										}
									}

									//End Levels
									def topLevel=levelsService.getTopLevel(resourcesBelongingToLessonPlan[0])
									non_grade_level(topLevel.nonGradeLevel)
									non_grade_title(topLevel.nonGradeTitle)
								}
							}

						}
					}
					//End Lesson plans
					if(targetResourceList){
						standardSet{
							name(productInstance.program?.standardSetName)
						}
					}

				}
			}
			return xml

		}catch(Exception ex){

			return false
		}
	}
}

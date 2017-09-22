package hmh.mms

class SyncExcelHeaderTemplateJob {
	def concurrent = true
	def group = "scheduled"
	def updateMappingDomainService
	static triggers = {
		// simple repeatInterval: 60000l // execute job once in 5 seconds
		cron name: 'cronTrigger4', cronExpression: "0 0 4 * * ?"	//  Schedule for everynight at 4:00am
	}

	def execute() {
		// execute job
		updateMappingDomainService.updateMDSHeaderExcelTemplate()
		updateMappingDomainService.updateProgramStructureHeaderExcelTemplate()
	}
}

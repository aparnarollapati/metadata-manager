package hmh.mms

class SyncMappingXmlJob {

	def concurrent = true
	def group = "scheduled"
	def updateMappingDomainService

	static triggers = {
		simple startDelay: 40 * 1000, repeatCount: 0	//  Configuration in miliseconds.  Defaulted to wait for 40 seconds and then run once, no repeats
		cron name: 'cronTrigger1', cronExpression: "0 0 2 * * ?"	//  Schedule for everynight at 2:00am
	}

	def execute() {
		// execute job
		updateMappingDomainService.parseMappingXml()
	}
}

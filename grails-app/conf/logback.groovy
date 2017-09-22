import grails.util.BuildSettings
import grails.util.Environment


appender('STDOUT', ConsoleAppender) {
	encoder(PatternLayoutEncoder) {

		pattern = "%d{'HH:mm:ss,SSS'} [%thread] %-5level %logger{35} - %msg %n"
	}
}

def targetDirectory
def byDay = timestamp("yyyyMMdd")


if (Environment.current == Environment.PRODUCTION || Environment.current.name == "nightly"){

	targetDirectory = "E:/MMS-cache/logs"

} else{

	targetDirectory = BuildSettings.TARGET_DIR
}


appender("FULL_STACKTRACE", FileAppender) {
	file = "${targetDirectory}/logs/stacktrace.txt"
	append = true
	encoder(PatternLayoutEncoder) {
		pattern = "%level %logger - %msg%n"
	}
}


appender("FILE", FileAppender) {
	file = "${targetDirectory}/logs/MMS_log-${byDay}.txt"
	append = true
	encoder(PatternLayoutEncoder) {
		pattern = "%d{'HH:mm:ss,SSS'} [%thread] %-5level %logger{35} - %msg %n"
	}
}


root(ERROR, ["FILE","STDOUT"])

logger("StackTrace", DEBUG, ['FULL_STACKTRACE'], false)
logger 'grails.app.controllers.hmh', DEBUG, ['FILE','STDOUT'], false
logger 'grails.app.services.hmh.UpdateMappingDomainService', INFO, ['FILE','STDOUT'], false
logger 'grails.app.services.hmh', DEBUG, ['FILE','STDOUT'], false

// general artifacts
logger 'grails.app.controllers', INFO, ['STDOUT'], false
logger 'grails.app.services', INFO, ['STDOUT'], false
logger 'grails.app.domain', INFO, ['STDOUT'], false
logger 'grails.app.taglib', INFO, ['STDOUT'], false


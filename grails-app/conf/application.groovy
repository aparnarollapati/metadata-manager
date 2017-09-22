// Shared Constraints
grails.gorm.default.constraints = {
	gradeRange(inList: ["PR", "PK", "TK", "K", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "PS", "AE", "UG", "Other"])
	standardsMatch (blank: false, matches: /[A-Za-z0-9.-]+/)
}

grails.gorm.failOnError=true

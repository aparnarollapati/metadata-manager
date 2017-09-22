package hmh.mms

class GenerateExcel {


	String username
	String lastUpdatedDate
	String programsId

	String excelType

	Date lastUpdated



	static belongsTo = [program: Program]


	static constraints = {

		excelType nullable: true, inList: ["EXCEL_MDS", "EXCEL_ED", "EXCEL_CORRELATIONS", "EXCEL_PROGRAM_STRUCTURE"]
	}
}

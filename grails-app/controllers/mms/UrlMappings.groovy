package mms

class UrlMappings {

	static mappings = {

		//  Used to get the application version number
		"/application/index" (controller: "application", action: "index")

		"/$controller/$action?/$id?(.$format)?"{
			constraints {
				// apply constraints here
			}
		}

		// custom URL mapping		
		"/api/programs"( resources: "program" )
		"/api/products"( resources: "product" )
		"/api/resources"( resources: "content" )
		"/api/lessonplans"( resources: "lessonPlan" )
		"/api/instructionalsegments"( resources: "instructionalSegment" )
		"/api/strands"( resources: "strand" )
		"/api/products"( resources: "product" )
		"/api/readers"( resources: "reader" )
		"/api/keywords"( resources: "keyword" )
		"/api/commoncartridgekeywords"( resources: "commonCartridgeKeyword" )
		"/api/standards"( resources: "standard" )
		"/api/mwsguids"( resources: "myWriteSmart" )
		"/api/componentspecs"(resources: "ComponentSpec" )
		"/api/ed"( resources: "ed" )
		"/api/standardsets"( resources: "StandardSet" )
		"/api/edstandards"( resources: "edStandard" )
		
		
		// Correlations
		"/api/correlations/programs"(resources: "correlationProgram")
		"/api/correlations/sources"(resources: "correlationSource")
		"/api/correlations/targets"(resources: "correlationTarget")
		"/api/correlations/content/sources"(resources: "contentSource")
		"/api/correlations/content/targets"(resources: "contentTarget")
		
		
		// Custom Action to preview the Common-Cartridge Keywords
		"/api/resources/preview/${id}"( controller: "content", action: "preview", method: 'GET' )
		"/api/productdetails/$id" (controller: 'productSearch', action: 'productDetails')
		"/api/productcomponents/$id" (controller: 'productSearch', action: 'productComponents')

		// Levels
		"/api/toplevels"( resources: "topLevel" )
		"/api/secondlevels"( resources: "secondLevel" )
		"/api/thirdlevels"( resources: "thirdLevel" )
		"/api/fourthlevels"( resources: "fourthLevel" )
		"/api/fifthlevels"( resources: "fifthLevel" )
		"/api/levelkeywords"( resources: "levelKeyword" )
		"/api/levelstandards"( resources: "levelStandard" )
		"/api/levelgrades"( resources: "levelGrade" )

		"/api/grades"( resources: "grade" )
		"/api/content"( resources: "content" )
		"/api/componentspecs"( resources: "componentSpec" )

		//  Mappings
		"/api/componentmappings"( resources: "componentMapping" )
		"/api/componenttypemappings"( resources: "componentTypeMapping" )
		"/api/categorizationmappings"( resources: "categorizationMapping" )
		"/api/instructionalsegmentmappings"( resources: "instructionalSegmentMapping" )
		"/api/mediatypemappings"( resources: "mediaTypeMapping" )
		"/api/resourcetypemappings"( resources: "resourceTypeMapping" )
		"/api/strandmappings"( resources: "strandMapping" )

		// Generate XMls
		"/api/generateXmls"( resources: "generateXmls" )
		
		// Generate Excel
		"/api/generateExcel"( resources: "generateExcel" )
		
		// Admin Endpoints
		"/api/login"( resources: "login" )
		"/api/users"( resources: "user" )
		"/api/roles"( resources: "role" )

		"/"(view: '/index')
		"500"(controller: "error", action: "internalServer")
		"404"(controller: "error", action: "notFound404")
	}
}
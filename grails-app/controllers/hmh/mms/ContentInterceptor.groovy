package hmh.mms

import hmh.mms.info.*


class ContentInterceptor {


	ContentInterceptor() {
		match(controller:"content", action:"delete")

	}

	boolean before() {

		def contentId = params.getIdentifier()
		def lastDeletedResource = LastDeletedResource.where{id==1}.get()

		if(lastDeletedResource) {lastDeletedResource.properties = [resourceId: contentId]}
		else {new LastDeletedResource(resourceId: contentId).save()}

		true
	}

	boolean after() { true }

	void afterView() {

	}

}

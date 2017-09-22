package hmh.mms

import grails.transaction.*
import org.apache.log4j.Logger
import org.tmatesoft.svn.core.*
import org.tmatesoft.svn.core.auth.*
import org.tmatesoft.svn.core.io.*
import org.tmatesoft.svn.core.wc.*
import org.tmatesoft.svn.core.wc2.*
import org.tmatesoft.svn.core.SVNDepth
import grails.core.GrailsApplication

/**
 * SubversionIntegrationService
 */
@Transactional
class SubversionIntegrationService {

	GrailsApplication grailsApplication

	/**
	 * Helper method to create an SVN Operation Factory
	 */
	def createSvnOperationFactory() {

		log.info "Creating an SVN Client"

		def username = grailsApplication.config.getProperty('svn.username')
		def password = grailsApplication.config.getProperty('svn.password')
		SvnOperationFactory svnOperationFactory = new SvnOperationFactory()

		def authenticationManager = new BasicAuthenticationManager(username, password)

		svnOperationFactory.setAuthenticationManager(authenticationManager)

		return svnOperationFactory
	}

	/**
	 * Disposing context and repository pool if needed
	 * @param svnFactory
	 * @return
	 */
	def cleanupSvnOperationFactory(def svnFactory){
		log.info "SVN Cleanup: Disposing of context and repository pool"
		svnFactory.dispose()
	}



	/**
	 * SVN Checkout and creation of necessary parent folders in the Working Copy
	 * @param svnUrl
	 * @param localCacheLocation
	 */
	void checkoutSvnContent( def svnUrl, def localCacheLocation ){

		def svnClient = createSvnOperationFactory()

		try
		{

			log.info "Checking out SVN Content:" + svnUrl

			SvnCheckout checkout = svnClient.createCheckout()
			SVNURL svnRepositoryURL = SVNURL.parseURIEncoded(svnUrl)

			def localCache =  new File(localCacheLocation)

			// WC parent directories are made automatically
			checkout.setSource((SvnTarget.fromURL(svnRepositoryURL)))
			checkout.setSingleTarget(SvnTarget.fromFile(localCache))

			// Alternative SVNDepth.IMMEDIATES OR SVNDepth.FILES
			checkout.setDepth(SVNDepth.FILES)
			checkout.setRevision(SVNRevision.HEAD)

			checkout.run()


		}catch (Exception e)
		{
			log.error " SVN Error when checking out content:  ${e}"

		}finally{

			cleanupSvnOperationFactory(svnClient)

		}
	}


	/**
	 * Update Working Copy
	 * @param fileToUpdate
	 * @return
	 */
	def doSvnUpdate( def fileToUpdate){

		def svnClient = createSvnOperationFactory()
		SvnUpdate update = svnClient.createUpdate()
		update.setSingleTarget(SvnTarget.fromFile(fileToUpdate))
		update.setRevision(SVNRevision.HEAD)
		update.run()
		cleanupSvnOperationFactory(svnClient)
	}

}

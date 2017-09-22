import java.util.Calendar

node {
    // using Calendar as SimpleDateFormat is restricted by sandbox
    Calendar calendar = Calendar.getInstance()
    def date_string = calendar.get(Calendar.YEAR) + '-' + (calendar.get(Calendar.MONTH) + 1) + '-' + calendar.get(Calendar.DAY_OF_MONTH) + 'H' + calendar.get(Calendar.HOUR_OF_DAY) + 'M' + calendar.get(Calendar.MINUTE)

    stage 'Checkout'
    git credentialsId: '66427afc-2571-4f67-b135-c9a4e6b50ca2', url: "$git_url", branch: "master"

    sh "git rev-parse HEAD > commit"
    def git_commit = readFile('commit').trim()
	
    stage 'Docker build - application'
    sh "builder build -f ./Dockerfile -l -p com-hmhco-mms/$app_name $git_commit"
   
    stage 'Approve Cert Deploy'
    timeout(time: 10, unit: 'MINUTES') {
        input message: 'Deploy to Cert? ', ok: 'Do It!'
    }

    stage 'Cert Deploy'
    sshagent(['83194a78-3158-449e-bc8c-1725045489bb']) {
        sh "builder deploy -f ./app.aurora hmheng-customdev mms $git_commit cert -b subscriber_flag=false -b job_name=mms -b instance_count=1"
    }


    //stage 'Clean'
    //sh './gradlew clean'

    //stage 'Create FAT JAR'
    //sh './gradlew assemble'


    /*
    sh "git rev-parse HEAD > commit"
    def git_commit = readFile('commit').trim()
	
    stage 'Compile'
    
    sh "gradlew assemble -DskipTests=false -Djasypt.encryptor.password=5W1m1#1*fCv*UbIUzvsu"
	
	  
    stage 'Docker build - application'
    sh "builder build -f ./Dockerfile -l -p com-hmhco-mms/$app_name $git_commit"
   
    stage 'Approve Cert Deploy'
    timeout(time: 10, unit: 'MINUTES') {
        input message: 'Deploy to Cert? ', ok: 'Do It!'
    }

    stage 'Cert Deploy'
    sshagent(['83194a78-3158-449e-bc8c-1725045489bb']) {
        sh "builder deploy -f ./app.aurora hmheng-customdev mms $git_commit cert -b subscriber_flag=false -b job_name=mms -b instance_count=1"
    }

 
    stage 'Approve Prod Deploy'
    timeout(time: 10, unit: 'MINUTES') {
        input message: 'Deploy to Prod? ', ok: 'Do It!'
    }

    stage 'Prod Deploy'
    sshagent(['83194a78-3158-449e-bc8c-1725045489bb']) {
        sh "builder deploy -f ./app.aurora hmheng-customdev mms $git_commit prod -b subscriber_flag=false -b job_name=mms -b instance_count=2"
    }
    
    stage 'Prod Tag'
    sshagent(['83194a78-3158-449e-bc8c-1725045489bb']) {
        def currentBuildNumber = currentBuild.number
        sh "git tag -a 'prod_deploy_${currentBuildNumber}_${date_string}' $git_commit -m 'Tagging Prod Release Version prod_deploy_${currentBuildNumber}_${date_string}'"
        sh "git push git@github.com:hmhco/customdev-repo.git --tags"

    }
    */


}

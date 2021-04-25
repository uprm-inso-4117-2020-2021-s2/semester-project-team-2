void setBuildStatus(String message, String state) {
  step([
      $class: "GitHubCommitStatusSetter",
      reposSource: [$class: "ManuallyEnteredRepositorySource", url: "git@github.com:uprm-inso-4117-2020-2021-s2/semester-project-team-2.git/"],
      contextSource: [$class: "ManuallyEnteredCommitContextSource", context: "ci/jenkins/build-status"],
      errorHandlers: [[$class: "ChangingBuildStatusErrorHandler", result: "UNSTABLE"]],
      statusResultSource: [ $class: "ConditionalStatusResultSource", results: [[$class: "AnyBuildResult", message: message, state: state]] ]
  ]);
}

pipeline {
    agent any
    stages {
        stage('Test Stage') {
            steps {
                setBuildStatus("Build Pending", "PENDING")
                //sh "printenv"
                checkout([$class: 'GitSCM', branches: [[name: "${GIT_BRANCH}"]], extensions: [], userRemoteConfigs: [[credentialsId: 'Jenkins', url: 'git@github.com:uprm-inso-4117-2020-2021-s2/semester-project-team-2.git']]])
                sh """
                cd sample_test_environment

                mkdir -p drivers
                yes | cp /usr/lib/chromium-browser/chromedriver drivers/chromedriver
                rm -rf */__pycache__
                """
                script{
                    try{
                       sh """
                       pipenv install
                       cd sample_test_environment
                       pipenv run python3 -m pytest tests.py
                       pipenv run behave
                       """
                    } catch(e){
                        error("Tests Failed: ${e}")
                    }
                }
            }
        }
    }
    post {
        success {
            setBuildStatus("Build succeeded", "SUCCESS");
        }
        failure {
            setBuildStatus("Build failed", "FAILURE");
        }
  }
}

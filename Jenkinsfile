pipeline {
    agent any
    stages {
        stage('Test Stage') {
            steps {
                sh "printenv"
                checkout([$class: 'GitSCM', branches: [[name: "${GIT_BRANCH}"]], extensions: [], userRemoteConfigs: [[credentialsId: 'Jenkins', url: 'git@github.com:uprm-inso-4117-2020-2021-s2/semester-project-team-2.git']]])
                sh """
                cd api
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
}

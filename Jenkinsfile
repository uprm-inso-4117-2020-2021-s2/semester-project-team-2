pipeline {
    agent any
    stages {
        stage('Test Stage') {
            steps {
                checkout([$class: 'GitSCM', branches: [[name: "${env.CHANGE_BRANCH}"]], extensions: [], userRemoteConfigs: [[credentialsId: 'Jenkins', url: 'git@github.com:uprm-inso-4117-2020-2021-s2/semester-project-team-2.git']]])
                sh """
                cd api
                mkdir -p drivers
                yes | cp /usr/lib/chromium-browser/chromedriver drivers/chromedriver
                rm -rf */__pycache__
                """
                script{
                    try{
                       sh """
                       cd api
                       pipenv install
                       pipenv run python3 -m pytest tests.py
                       """
                    } catch(e){
                        error("Tests Failed: ${e}")
                    }
                }
            }
        }
    }
}

pipeline {
    agent any
    stages {
        stage('Test Stage') {
            steps {
                checkout([$class: 'GitSCM', branches: [[name: '*/selenium_setup']], extensions: [], userRemoteConfigs: [[credentialsId: 'Jenkins', url: 'git@github.com:uprm-inso-4117-2020-2021-s2/semester-project-team-2.git']]])
                step([$class: 'LastChangesPublisher', since:'PREVIOUS_REVISION',specificRevision: '', format: 'LINE', matchWordsThreshold: '0.25', matching: 'WORD', matchingMaxComparisons: '1000', showFiles: true, synchronisedScroll: true])
                sh "mkdir -p Drivers"
                sh "yes | cp /usr/lib/chromium-browser/chromedriver Drivers/chromedriver"
                sh "rm -rf */__pycache__"
                script{
                    try{
                       sh """
                       pipenv install
                       pipenv shell
                       python -m pytest tests.py
                       """
                    } catch(e){
                        error("Tests Failed: ${e}")
                    }
                }
            }
        }
    }
}

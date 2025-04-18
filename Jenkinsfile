pipeline {
    agent any
    
    tools {
        nodejs "Node-v20.15.0"
    }
    
    stages {
        stage('Checkout') {
            steps {
                git branch: 'BDD-with-Cucumber', 
                    url: 'https://github.com/sh4rkd/trello-wdio-epam/',
                    credentialsId: 'github-credentials'
            }
        }
        
        stage('Setup') {
            steps {
                bat 'npm install'
                
                withCredentials([
                    string(credentialsId: 'TRELLO_API_KEY', variable: 'TRELLO_API_KEY'),
                    string(credentialsId: 'TRELLO_API_TOKEN', variable: 'TRELLO_API_TOKEN')
                ]) {
                    bat '''
                    echo TRELLO_API_KEY=%TRELLO_API_KEY% > .env
                    echo TRELLO_API_TOKEN=%TRELLO_API_TOKEN% >> .env
                    '''
                }
                
                bat 'echo "Dependencies installed successfully"'
            }
        }
        
        stage('Lint & Format') {
            steps {
                bat 'if exist allure-results rmdir /s /q allure-results'
                bat 'npm run format || echo "Format completed with warnings"'
                bat 'npm run lint:fix || echo "Lint completed with warnings"'
                bat 'echo "Linting and formatting completed"'
            }
        }
        
        stage('Run Cucumber Tests') {
            steps {
                bat 'echo "Running Cucumber API tests"'
                bat 'npm run test:ci'
                bat 'echo "Tests completed successfully"'
            }
            post {
                always {
                    bat 'node scripts/generate-report.js'
                    bat 'echo "Report generated successfully"'
                }
            }
        }
        
        stage('Generate Reports') {
            steps {
                cucumber(
                    reportTitle: 'Trello API Test Results',
                    fileIncludePattern: '**/cucumber_report.json',
                    trendsLimit: 10,
                    classifications: [
                        [
                            'key': 'Branch',
                            'value': 'BDD-with-Cucumber'
                        ]
                    ]
                )
                bat 'echo "Reports published in Jenkins"'
            }
        }
    }
    
    post {
        always {
            archiveArtifacts artifacts: 'cucumber_report.json, cucumber-report.html', allowEmptyArchive: true
            bat 'echo "Artifacts archived"'
            bat 'if exist .env del .env'
        }
        success {
            bat 'echo "Pipeline executed successfully"'
        }
        failure {
            bat 'echo "Pipeline failed - Check logs for details"'
        }
        unstable {
            bat 'echo "Pipeline unstable - Some tests failed"'
        }
        cleanup {
            cleanWs()
            bat 'echo "Workspace cleaned"'
        }
    }
} 
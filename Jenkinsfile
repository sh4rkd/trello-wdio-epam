pipeline {
    agent any
    
    tools {
        nodejs "Node-v20.15.0"
    }
    
    stages {
        stage('Checkout') {
            steps {
                git branch: 'api-testing', 
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
            }
        }
        
        stage('Lint & Format') {
            steps {
                bat 'npm run prettier'
                bat 'npm run lint'
            }
        }
        
        stage('Run API Tests') {
            steps {
                bat 'npm run test'
            }
        }
    }
    
    post {
        always {
            bat 'if exist .env del .env'
        }
        success {
            bat 'echo "¡Pruebas de API completadas con éxito!"'
        }
        failure {
            bat 'echo "Hubo un error en las pruebas de API"'
        }
    }
} 
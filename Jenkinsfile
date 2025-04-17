pipeline {
    agent any
    
    triggers {
        cron('H */2 * * *')
    }
    
    tools {
        nodejs "Node-v20.15.0"
    }
    
    stages {
        stage('Checkout') {
            steps {
                git branch: 'layered-architecture', 
                    url: 'https://github.com/sh4rkd/trello-wdio-epam/',
                    credentialsId: 'github-credentials'
            }
        }
        
        stage('Setup') {
            steps {
                bat 'npm install'
                
                withCredentials([
                    string(credentialsId: 'TEST_EMAIL', variable: 'TEST_EMAIL'),
                    string(credentialsId: 'TEST_PASSWORD', variable: 'TEST_PASSWORD')
                ]) {
                    bat '''
                    echo TEST_EMAIL=%TEST_EMAIL% > .env
                    echo TEST_PASSWORD=%TEST_PASSWORD% >> .env
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
        
        stage('Run Tests') {
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
            bat 'echo "¡Pruebas completadas con éxito!"'
        }
        failure {
            bat 'echo "Hubo un error en las pruebas"'
        }
    }
}
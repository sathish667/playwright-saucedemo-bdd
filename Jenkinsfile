pipeline {
    agent any

    environment {
        PATH = "/opt/homebrew/bin:/usr/local/bin:${env.PATH}"
        CI = "true"
    }

    stages {
        stage('Checkout Code') {
            steps {
                echo 'Pulling latest Playwright code from GitHub...'
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
                sh 'npx playwright install chromium'
            }
        }

        stage('Run E2E Tests') {
            steps {
                echo 'Running Playwright E-commerce tests...'
                sh 'npx playwright test'
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'playwright-report/**, test-results/**', allowEmptyArchive: true
        }
    }
}
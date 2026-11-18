pipeline {
    agent any

    parameters {
        choice(name: 'ENVIRONMENT', choices: ['qa', 'staging', 'prod'], description: 'Target Environment URL')
        choice(name: 'BROWSER', choices: ['chromium', 'firefox', 'all'], description: 'Browser to execute tests')
    }

    environment {
        PATH = "/opt/homebrew/bin:/usr/local/bin:${env.PATH}"
        CI = "true"
        TEST_ENV = "${params.ENVIRONMENT}"
    }

    stages {
        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
                sh 'npx playwright install chromium firefox'
            }
        }

        stage('Run E2E Tests') {
            steps {
                script {
                    if (params.BROWSER == 'all') {
                        sh 'npx playwright test'
                    } else {
                        sh "npx playwright test --project=${params.BROWSER}"
                    }
                }
            }
        }

        stage('Generate Allure Report') {
            steps {
                sh 'npx allure generate allure-results --clean -o allure-report'
            }
        }
    }

    post {
        always {
            publishHTML([
                allowMissing: false,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'allure-report',
                reportFiles: 'index.html',
                reportName: 'Allure E2E Report'
            ])
            archiveArtifacts artifacts: 'playwright-report/**, test-results/**', allowEmptyArchive: true
        }
    }
}
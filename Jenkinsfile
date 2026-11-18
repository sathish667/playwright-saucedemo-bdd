pipeline {
    agent any

    parameters {
        choice(name: 'ENVIRONMENT', choices: ['qa', 'staging', 'prod'], description: 'Target Environment URL')
        choice(name: 'BROWSER', choices: ['chromium', 'firefox', 'all'], description: 'Browser to execute tests')
    }

    triggers {
        // Daily night 2:00 AM-ku automatic-aa run aagum (Cron syntax)
        cron('0 2 * * *')
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
                    echo "Running tests on ${params.ENVIRONMENT} using ${params.BROWSER}..."
                    if (params.BROWSER == 'all') {
                        sh 'npx playwright test'
                    } else {
                        sh "npx playwright test --project=${params.BROWSER}"
                    }
                }
            }
        }
    }

    post {
        always {
            // Jenkins UI-laye direct-aa Playwright HTML report-a publish pannum
            publishHTML([
                allowMissing: false,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'playwright-report',
                reportFiles: 'index.html',
                reportName: 'Playwright E2E Report'
            ])
            archiveArtifacts artifacts: 'test-results/**', allowEmptyArchive: true
        }
    }
}
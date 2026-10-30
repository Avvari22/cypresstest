pipeline {
    agent any

    options {
        timestamps()
        skipDefaultCheckout(true)
        disableConcurrentBuilds()
    }

    environment {
        CI = 'true'
        // Disable ANSI color escape codes across Node, CLI, and Cypress
        NO_COLOR = '1'
        FORCE_COLOR = '0'
        CYPRESS_CACHE = "${WORKSPACE}\\.cypress-cache"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Verify Environment') {
            steps {
                bat '''
                    node --version
                    npm --version
                    java -version
                    git --version
                '''
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm ci'
            }
        }

        stage('Verify Cypress Binary') {
            steps {
                bat 'npx cypress verify'
            }
        }

        stage('Run Cypress Tests') {
            steps {
                script {
                    // Running Cypress headless with color output explicitly disabled
                    def exitCode = bat(
                        script: 'npx cypress run --headless --browser chrome',
                        returnStatus: true
                    )

                    // Mark as UNSTABLE if tests fail so post/reporting steps still run
                    if (exitCode != 0) {
                        currentBuild.result = 'UNSTABLE'
                        echo "Cypress tests completed with failures (exit code: ${exitCode})"
                    }
                }
            }
        }

        stage('Publish Allure Report') {
            steps {
                // Uses the Jenkins Allure Plugin to build and attach trend reports natively
                allure includeProperties: false, jdk: '', results: [[path: 'allure-results']]
            }
        }
    }

    post {
        always {
            archiveArtifacts(
                artifacts: 'allure-results/**,cypress/videos/**,cypress/screenshots/**',
                allowEmptyArchive: true
            )

            junit(
                testResults: 'cypress/results/*.xml,junit-results/*.xml',
                allowEmptyResults: true
            )
        }

        success {
            echo 'All Cypress tests passed successfully!'
        }

        unstable {
            echo 'Cypress tests finished with test failures. Review screenshots, videos, and the Allure report.'
        }

        failure {
            echo 'Pipeline failed due to a build or configuration error.'
        }
    }
}
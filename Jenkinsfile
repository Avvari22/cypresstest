
pipeline {
    agent any

    options {
        timestamps()
        skipDefaultCheckout(true)
        disableConcurrentBuilds()
        timeout(time: 45, unit: 'MINUTES')
    }

    environment {
        CI = 'true'
        NO_COLOR = '1'
        FORCE_COLOR = '0'
        CYPRESS_CACHE = "${WORKSPACE}\\.cypress-cache"
    }

    stages {

        // 1. Checkout source code
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        // 2. Verify Node, npm and Git
        stage('Verify Environment') {
            steps {
                bat '''
                    node --version
                    npm --version
                    git --version
                '''
            }
        }

        // 3. Clean previous execution reports
        stage('Clean Previous Reports') {
            steps {
                bat '''
                    if exist allure-results rmdir /s /q allure-results
                    if exist allure-report rmdir /s /q allure-report
                    if exist cypress\\screenshots rmdir /s /q cypress\\screenshots
                    if exist cypress\\videos rmdir /s /q cypress\\videos
                '''
            }
        }

        // 4. Install npm dependencies
        stage('Install Dependencies') {
            steps {
                bat 'npm ci'
            }
        }

        // 5. Verify Cypress binary
        stage('Verify Cypress Binary') {
            steps {
                bat 'npx cypress verify'
            }
        }

        // 6. Execute Cypress tests
        stage('Run Cypress Tests') {
            steps {
                script {
                    def testExitCode = bat(
                        script: 'npx cypress run --headless --browser chrome',
                        returnStatus: true
                    )

                    env.CYPRESS_EXIT_CODE = "${testExitCode}"

                    if (testExitCode != 0) {
                        currentBuild.result = 'FAILURE'
                        echo "Cypress execution failed. Exit code: ${testExitCode}"
                    } else {
                        echo 'All Cypress tests passed successfully.'
                    }
                }
            }
        }

        // 7. Generate and publish Allure report
        stage('Publish Allure Report') {
            steps {
                script {
                    if (fileExists('allure-results')) {
                        allure([
                            includeProperties: false,
                            jdk: '',
                            results: [
                                [path: 'allure-results']
                            ],
                            reportBuildPolicy: 'ALWAYS'
                        ])
                    } else {
                        echo 'Allure results directory not found.'
                    }
                }
            }
        }
    }

    post {

        // Always archive execution evidence
        always {
            archiveArtifacts(
                artifacts: '''
                    allure-results/**/*,
                    cypress/videos/**/*,
                    cypress/screenshots/**/*
                ''',
                allowEmptyArchive: true
            )
        }

        success {
            echo '''
                =========================================
                BUILD STATUS: SUCCESS
                Cypress execution completed successfully.
                Allure report published.
                =========================================
            '''
        }

        failure {
            echo '''
                =========================================
                BUILD STATUS: FAILURE
                Cypress execution failed.
                Review screenshots, videos and Allure.
                =========================================
            '''
        }

        unstable {
            echo '''
                =========================================
                BUILD STATUS: UNSTABLE
                Investigate Jenkins publishers and
                other build-result modifications.
                =========================================
            '''
        }

        cleanup {
            echo 'Jenkins pipeline execution completed.'
        }
    }
}

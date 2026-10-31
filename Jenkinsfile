
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

          stage('Verify Allure Results') {
            steps {
                script {
                    def resultCode = bat(
                        script: 'dir /b "allure-results\\*-result.json" >nul 2>&1',
                        returnStatus: true
                    )

                    if (resultCode != 0) {
                        error('Allure result JSON files not found. Check Cypress Allure plugin configuration.')
                    }

                    echo 'Allure result JSON files found successfully.'
                }
            }
        }

        stage('Publish Allure Report') {
            steps {
                allure([
                    includeProperties: false,
                    jdk: '',
                    results: [
                        [path: 'allure-results']
                    ],
                    reportBuildPolicy: 'ALWAYS'
                ])

                echo 'Allure report generated and published successfully.'
            }
        }
    }

    post {

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
            echo 'BUILD SUCCESS: Cypress tests passed and Allure report published.'
        }

        failure {
            echo 'BUILD FAILURE: Check Cypress execution and Allure configuration.'
        }

        unstable {
            echo 'BUILD UNSTABLE: Investigate Jenkins build status.'
        }

        cleanup {
            echo 'Jenkins pipeline execution completed.'
        }
    }
}

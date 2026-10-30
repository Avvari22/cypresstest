pipeline {
  agent any

  stages {
    stage('Install dependencies') {
      steps {
        sh 'node --version && npm --version && npm ci'
      }
    }

    stage('Run Cypress tests') {
      steps {
        sh 'npm run cy:run'
      }
    }
  }

  post {
    always {
      script {
        catchError(buildResult: 'FAILURE', stageResult: 'FAILURE') {
          sh '''
            set -eu
            if [ ! -d allure-results ]; then
              echo "Allure results directory is missing"
              exit 1
            fi

            find allure-results -type f
            count=$(find allure-results -type f -name '*-result.json' | wc -l)
            echo "Allure test results: $count"
            if [ "$count" -eq 0 ]; then
              echo "No Allure test results were generated"
              exit 1
            fi
          '''
        }

        catchError(buildResult: 'FAILURE', stageResult: 'FAILURE') {
          sh 'npm install --global allure-commandline'
        }

        catchError(buildResult: 'FAILURE', stageResult: 'FAILURE') {
          sh 'allure generate allure-results --clean -o allure-report'
        }
      }

      archiveArtifacts(
        artifacts: 'allure-report/**,allure-results/**,playwright-report/**,test-results/**',
        allowEmptyArchive: true
      )
    }
  }
}

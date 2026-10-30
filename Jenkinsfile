pipeline {
  agent any

  stages {
    stage('Install dependencies') {
      steps {
        bat 'node --version && npm --version && npm ci'
      }
    }

    stage('Run Cypress tests') {
      steps {
        bat 'npm run cy:run'
      }
    }
  }

  post {
    always {
      script {
        catchError(buildResult: 'FAILURE', stageResult: 'FAILURE') {
          powershell '''
            if (-not (Test-Path -Path "allure-results")) {
              Write-Error "Allure results directory is missing"
              exit 1
            }

            $results = Get-ChildItem -Path "allure-results" -Filter "*-result.json" -File
            $count = $results.Count
            Write-Host "Allure test results: $count"
            if ($count -eq 0) {
              Write-Error "No Allure test results were generated"
              exit 1
            }
          '''
        }

        catchError(buildResult: 'FAILURE', stageResult: 'FAILURE') {
          bat 'npm install --global allure-commandline'
        }

        catchError(buildResult: 'FAILURE', stageResult: 'FAILURE') {
          bat 'allure generate allure-results --clean -o allure-report'
        }
      }

      archiveArtifacts(
        artifacts: 'allure-report/**,allure-results/**,playwright-report/**,test-results/**',
        allowEmptyArchive: true
      )
    }
  }
}
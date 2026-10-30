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
        // Step 1: Verify Allure results exist on Windows using PowerShell
        catchError(buildResult: 'FAILURE', stageResult: 'FAILURE') {
          powershell '''
            if (-not (Test-Path -Path "allure-results")) {
              Write-Error "Allure results directory is missing"
              exit 1
            }

            $results = Get-ChildItem -Path "allure-results" -Filter "*-result.json" -File
            $count = $results.Count
            Write-Host "Allure test results count: $count"
            if ($count -eq 0) {
              Write-Error "No Allure test results were generated"
              exit 1
            }
          '''
        }

        // Step 2: Generate Allure report via npx (no global npm path dependencies needed)
        catchError(buildResult: 'FAILURE', stageResult: 'FAILURE') {
          bat 'npx allure-commandline generate allure-results --clean -o allure-report'
        }
      }

      // Step 3: Archive report artifacts
      archiveArtifacts(
        artifacts: 'allure-report/**,allure-results/**',
        allowEmptyArchive: true
      )
    }
  }
}
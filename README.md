# cypresstest

## CI pipelines

The [Jenkinsfile](./Jenkinsfile) mirrors the Cypress test, Allure validation, and
report-generation steps in the [GitHub Actions workflow](./.github/workflows/cypress.yml).
Jenkins archives the generated report and results as build artifacts; GitHub
Actions can publish the report to GitHub Pages when deployment is enabled. To
enable it, configure GitHub Pages for this repository with the GitHub Actions
source, then add the Actions repository variable `DEPLOY_GITHUB_PAGES` with
the value `true`. Until then, the workflow skips Pages deployment and uploads
the report as a workflow artifact. Use a Linux Jenkins agent with Node.js 18,
npm, and Git available on its `PATH`.

# cypresstest

## CI pipelines

The [Jenkinsfile](./Jenkinsfile) mirrors the Cypress test, Allure validation, and
report-generation steps in the [GitHub Actions workflow](./.github/workflows/cypress.yml).
Jenkins archives the generated report and results as build artifacts; GitHub
Actions handles publishing the report to GitHub Pages. Use a Linux Jenkins
agent with Node.js 18, npm, and Git available on its `PATH`.

# cypresstest

## CI pipelines

The [Jenkinsfile](./Jenkinsfile) mirrors the Cypress test, Allure validation, and
report-generation steps in the [GitHub Actions workflow](./.github/workflows/cypress.yml).
Jenkins archives the generated report and results as build artifacts; GitHub
Actions handles publishing the report to GitHub Pages. Configure a NodeJS tool
named `NodeJS 18` in Jenkins and use a Linux agent with Git and npm available.

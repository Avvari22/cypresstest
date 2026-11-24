import { When, Then } from '@badeball/cypress-cucumber-preprocessor'
When('Visiting home page',()=>{
    cy.visit(Cypress.config('baseUrl'));
})
Then('Verify the url',()=>{
    cy.url().should('eq',Cypress.config('baseUrl'))
})
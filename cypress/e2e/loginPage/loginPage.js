import {When, Then} from 'cypress-cucumber-preprocessor/steps'
When('Visiting home page',()=>{
    cy.visit(Cypress.env('baseUrl'));
})
Then('Verify the url',()=>{
    cy.url().should('eq',Cypress.env('baseUrl'))
})
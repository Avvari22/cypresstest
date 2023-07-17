import {Given, When, Then} from 'cypress-cucumber-preprocessor'
When('Visiting home page',()=>{
    cy.visit(Cypress.env('baseUrl'));
})
Then('Verify the url',()=>{
    cy.url().should('eq',Cypress.env('baseUrl'))
})
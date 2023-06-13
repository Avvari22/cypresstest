describe('TestSuite1',()=>{
    it('Verifying the website navigation url..',()=>{
        //Verifying the URL
        cy.visit(Cypress.env('baseUrl'))
    })
    
 it('Verifying login functionality with Invalid credentials',()=>{
    cy.visit(Cypress.env('baseUrl'))
        //Verifying the title label
        cy.get('div.login_logo').should('have.text','Swag Labs')

        //Verifying the Login when Username is empty
        cy.get('input#login-button').should('be.visible').click()
        cy.get('h3[data-test="error"]').should('have.text','Epic sadface: Username is required')

        //Verifying the Login by defining username but password is empty
        cy.get('input#user-name').should('be.visible').type('admin')
        cy.get('input#login-button').should('be.visible').click()
        cy.get('h3[data-test="error"]').should('have.text','Epic sadface: Password is required')

        //Verifying the login by defining username and password which is invalid
        cy.get('input#password').should('be.visible').type('welcome')

        //Verifying the submit button
        cy.get('input#login-button').should('be.visible').click()
        cy.get('h3[data-test="error"]').should('have.text','Epic sadface: Username and password do not match any user in this service')

    })
    it('Verifying login functionality with valid credentials',()=>{
        //Verifying the URL
        cy.visit(Cypress.env('baseUrl'))
        //Username: standard_user
        //Password: secret_sauce
        //Verifying the title label
        cy.get('div.login_logo').should('have.text','Swag Labs')

        //Verifying the username text field
        cy.get('input#user-name').should('be.visible').type('standard_user')

        //Verifying the password text field
        cy.get('input#password').should('be.visible').type('secret_sauce')

        //Verifying the submit button
        cy.get('input#login-button').should('be.visible').click()

        //Verifying the url after login
        cy.url().should('eq','https://www.saucedemo.com/inventory.html')
        
        cy.get('#logout_sidebar_link').click()

    })
   
})
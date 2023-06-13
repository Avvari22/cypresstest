const { Assertion } = require("chai")

describe('TestSuite', () => {
  it('Verifying the Home page URL', () => {
    cy.visit('https://demo.nopcommerce.com/')
    //Identifying the text field using cy.get()
    //By using id
    cy.get('#small-searchterms').should('be.visible')
    //By using classname
    cy.get('.search-box-text').should('be.visible')

    //By using tagname
    cy.get('input.search-box-text').should('be.visible')

    //By using attributes
    cy.get('input[name="q"]').should('be.visible')

    //Identifying the unique button from ADD TO CART
    cy.get(':nth-child(2) > .product-item > .details > .add-info > .buttons > .product-box-add-to-cart-button').should('contain','Add to cart')

    //Defining input for text field
    cy.get('input[name="q"]').should('be.visible').type('Apple MacBook Pro 13-inch')

    //Identifying the button
    cy.get('#small-search-box-form > .button-1').should('contain','Search').click()

    //TO verify the url after clicking submit
    cy.url().should('eq','https://demo.nopcommerce.com/search?q=Apple+MacBook+Pro+13-inch')

    cy.get('a[href="/apple-macbook-pro-13-inch"]').should('contain','Apple MacBook Pro 13-inch')

    cy.get('div.add-info > div.prices > span').should('contain','$1,800.00')

    // cy.readFile()
    // cy.writeFile()
    //Read the content of json file from fixtures
    cy.readFile('cypress/fixtures/example.json').then((data)=>{
      cy.log(data.email)
    })


    cy.readFile('cypress/fixtures/prodlist.json').then((data)=>{
      cy.log(data.prodName)
      for(var name in data.prodName)
      {
        cy.log(data.prodName[name])
        cy.wait(3000)
        cy.get('input#q').should('be.visible').clear()
        cy.get('input#q').should('be.visible').type(data.prodName[name])
      }
      
    
    })

    
    
  })
})


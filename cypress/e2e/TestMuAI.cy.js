import Page from "../pageobjects/SimpleFormDemo"
describe('MuAI Test', () => {
    const page = Page
    beforeEach(() => {
        page.visit('https://www.lambdatest.com/selenium-playground')
        page.discoverControls()
    })
    it('Validating the buttons visibility', () => {
        page.navigateToSimpleFormDemo()
        page.discoverControls()
        page.controls.buttons.forEach((button) => {
            cy.get(button.selector).should('be.visible')
        })
    });
    it('Validating the inputs visibility', () => {
        page.navigateToSimpleFormDemo()
        page.discoverControls()

        cy.then(() => {
            page.controls.inputs.forEach((input) => {
                cy.get(input.selector).should('be.visible')
            })
            page.enterMessage('Hello World')
        })
    });
})
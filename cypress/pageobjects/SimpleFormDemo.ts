/// <reference types="cypress" />
import { DomScrapper } from '../utils/DomScrapper'
import { locatorRepository } from '../repositories/LocatorRepository'
import { Locator } from '../interfaces/locator'
import { LocatorMap } from '../interfaces/LocatorMap'

class SimpleFormDemo {

  private readonly locators = {

    heading: 'h1',
    simpleFormLink: 'a[href*="simple-form-demo"]',
    messageInput: '#user-message',
    showMessageButton: '#showInput',
    displayedMessage: '#message'

  }

  visit(URL: string) {

    cy.visit(
      URL
    )
  }

  discoverControls() {

    cy.document().then((doc: Document) => {

      const controls: LocatorMap =
        DomScrapper.scrap(doc)

      locatorRepository.setControls(
        controls
      )
    })
  }

  get controls(): LocatorMap {

    return locatorRepository.getControls()
  }

  get buttons(): Locator[] {

    return this.controls.buttons
  }

  get inputs(): Locator[] {

    return this.controls.inputs
  }

  get links(): Locator[] {

    return this.controls.links
  }

  get dropdowns(): Locator[] {

    return this.controls.dropdowns
  }

  get textAreas(): Locator[] {

    return this.controls.textAreas
  }

  getHeading() {
    return cy.get('h1')
  }

  validateControl(locator: Locator) {

    cy.get(locator.selector)
      .should('exist')
      .and('be.visible')
  }

  navigateToSimpleFormDemo() {

    cy.contains('Simple Form Demo')
      .should('be.visible')
      .click()

  }

  enterMessage(message: string) {

    cy.get('#user-message')
      .should('be.visible')
      .clear()
      .type(message)

  }

  clickShowMessage() {

    cy.get('#showInput')
      .should('be.visible')
      .click()

  }

  verifyDisplayedMessage(expectedMessage: string) {

    cy.get('#message')
      .should('be.visible')
      .and('have.text', expectedMessage)

  }
}

export default new SimpleFormDemo()
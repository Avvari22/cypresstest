// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('scrapcontrols', () => {
    return cy.document().then((doc) => {
        const controls = [];
        const elements = doc.querySelectorAll('input, button, a, select, textarea');
        elements.forEach((ele,index) => {
            let selector = '';
            if(ele.id){
                selector = `#${ele.id}`;
            }
            else if(ele.className){
                selector = `.${ele.className.split(' ').join('.')}`;
            }
            else if(ele.getAttribute('name')){
                selector = `[name="${ele.getAttribute('name')}"]`;
            }
            else
            {
                selector = `${ele.tagName.toLowerCase()}`;
            }
            
            controls.push({
                name: ele.getAttribute('name') || ele.id || ele.className || `element-${index}`,
                selector: selector,
                type: ele.tagName.toLowerCase(),
                text: ele.textContent?.trim() || ''
            });
            })
            return controls;
    });
})
    
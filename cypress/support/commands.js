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
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
import 'cypress-file-upload'

Cypress.Commands.add('createImage', (imageName) => {
  cy.contains('images作成').click()
  cy.wait(100)
  cy.get('.dialog.-imageCreate input[type="file"]').attachFile(imageName)
  cy.get('.dialog.-imageCreate input.el-input__inner').clear().type('sample')
  cy.contains('.dialog.-imageCreate button.el-button', '作成').click()
})

Cypress.Commands.add('createDirectory', (directoryName) => {
  cy.contains('フォルダ作成').click()
  cy.wait(100)
  cy.get('.dialog.-directoryCreate input.el-input__inner').type(directoryName)
  cy.contains('.dialog.-directoryCreate button.el-button', '作成').click()
})

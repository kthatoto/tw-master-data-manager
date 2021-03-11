import 'cypress-file-upload'
import './commands/images'
import './commands/imageDirectories'

Cypress.Commands.add('backToHome', () => {
  cy.get('.resources__header .nav .home-icon').click()
})

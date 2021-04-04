import 'cypress-file-upload'
import './commands/images'
import './commands/tiles'
import './commands/directories'

Cypress.Commands.add('backToHome', () => {
  cy.get('.resources__header .nav .home-icon').click()
})

Cypress.Commands.add('goDirectory', (directory) => {
  cy.contains('.resources__item', directory).get('svg').dblclick()
})

Cypress.Commands.add('goDirectories', (directories) => {
  directories.forEach(directory => cy.goDirectory(directory))
})

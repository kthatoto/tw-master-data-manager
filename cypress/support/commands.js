import 'cypress-file-upload'
import './commands/images'
import './commands/tiles'
import './commands/directories'

Cypress.Commands.add('backToHome', (type) => {
  cy.get(`.${type}`).get('.resources__header .nav .home-icon').first().click()
})

Cypress.Commands.add('goDirectory', (type, directory) => {
  cy.get(`.${type}`).contains('.resources__item', directory).find('svg').dblclick()
})

Cypress.Commands.add('goDirectories', (type, directories) => {
  directories.forEach(directory => cy.goDirectory(type, directory))
})

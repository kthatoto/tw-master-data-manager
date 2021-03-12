Cypress.Commands.add('createDirectory', (directoryName, expectedMessage) => {
  cy.contains('フォルダ作成').click()
  cy.wait(100)
  cy.get('.dialog.-directoryCreate input.el-input__inner').type(directoryName)
  cy.contains('.dialog.-directoryCreate button.el-button', '作成').click()
  cy.wait(100)
  if (expectedMessage) {
    cy.contains(expectedMessage).should('be.visible')
  }
})

Cypress.Commands.add('editDirectory', (beforeDirectoryName, directoryName, expectedMessage) => {
  cy.contains(beforeDirectoryName).dblclick()
  cy.wait(100)
  cy.get('.dialog.-directoryEdit input.el-input__inner').clear().type(directoryName)
  cy.contains('.dialog.-directoryEdit button.el-button', '更新').click()
  cy.wait(100)
  if (expectedMessage) {
    cy.contains(expectedMessage).should('be.visible')
  }
})

Cypress.Commands.add('deleteDirectory', (directoryName, expectedMessage) => {
  cy.contains('.resources__item', directoryName).get('svg').rightclick({ multiple: true })
  cy.wait(100)
  cy.contains('.dialog.-objectDelete button.el-button', '削除').click()
  cy.wait(100)
  if (expectedMessage) {
    cy.contains(expectedMessage).should('be.visible')
  }
})

Cypress.Commands.add('createImage', (imageFixtureName, imageName, expectedMessage) => {
  cy.contains('images作成').click()
  cy.wait(100)
  cy.get('.dialog.-imageCreate input[type="file"]').attachFile(imageFixtureName)
  cy.get('.dialog.-imageCreate input.el-input__inner').clear().type(imageName)
  cy.contains('.dialog.-imageCreate button.el-button', '作成').click()
  cy.wait(100)
  if (expectedMessage) {
    cy.contains(expectedMessage).should('be.visible')
  }
})

Cypress.Commands.add('editImage', (beforeImageName, imageFixtureName, imageName, expectedMessage) => {
  cy.contains(beforeImageName).dblclick()
  cy.wait(100)
  cy.get('.dialog.-imageEdit input[type="file"]').attachFile(imageFixtureName)
  cy.get('.dialog.-imageEdit input.el-input__inner').clear().type(imageName)
  cy.contains('.dialog.-imageEdit button.el-button', '更新').click()
  cy.wait(100)
  if (expectedMessage) {
    cy.contains(expectedMessage).should('be.visible')
  }
})

Cypress.Commands.add('deleteImage', (target, expectedMessage) => {
  cy.get(target).rightclick()
  cy.wait(100)
  cy.contains('.dialog.-objectDelete button.el-button', '削除').click()
  cy.wait(100)
  if (expectedMessage) {
    cy.contains(expectedMessage).should('be.visible')
  }
})

Cypress.Commands.add('shouldVisibleImage', (target, imageFixtureName) => {
  cy.fixture(imageFixtureName).then((imageSource) => {
    cy.get(target).invoke('attr', 'src').should('include', imageSource)
  })
})

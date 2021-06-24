Cypress.Commands.add('createFlag', (flagName, flagKey, flagDescription, expectedMessage) => {
  cy.visitMapResources('flags')
  cy.contains('flags作成').click()
  cy.wait(100)
  cy.get('.dialog.-flagCreate').contains('Name').next().find('.el-input__inner').clear().type(flagName)
  cy.get('.dialog.-flagCreate').contains('Key').next().find('.el-input__inner').clear().type(flagKey)
  cy.get('.dialog.-flagCreate').contains('Description').next().find('.el-textarea__inner').clear().type(flagDescription)
  cy.contains('.dialog.-flagCreate button.el-button', 'Create').click()
  cy.wait(100)
  if (expectedMessage) {
    cy.contains(expectedMessage).should('be.visible')
  }
})

Cypress.Commands.add('editFlag', (beforeFlagName, flagName, flagKey, flagDescription, expectedMessage) => {
  cy.visitMapResources('flags')
  cy.contains(beforeFlagName).dblclick()
  cy.wait(100)
  cy.contains('.dialog.-flagEdit', 'Name').next().get('.el-input__inner').clear().type(flagName)
  cy.contains('.dialog.-flagEdit', 'Key').next().get('.el-input__inner').clear().type(flagKey)
  cy.contains('.dialog.-flagEdit', 'Description').next().get('.el-textarea__inner').clear().type(flagDescription)
  cy.contains('.dialog.-flagEdit button.el-button', 'Edit').click()
  cy.wait(100)
  if (expectedMessage) {
    cy.contains(expectedMessage).should('be.visible')
  }
})

Cypress.Commands.add('deleteFlag', (flagName, expectedMessage) => {
  cy.visitMapResources('flags')
  cy.contains('.resources__item', flagName).find('img').rightclick({ multiple: true })
  cy.wait(100)
  cy.contains('.dialog.-objectDelete button.el-button', '削除').click()
  cy.wait(100)
  if (expectedMessage) {
    cy.contains(expectedMessage).should('be.visible')
  }
})

Cypress.Commands.add('flagShouldBeVisible', (flagName) => {
  cy.visitMapResources('flags')
  cy.contains('.resources__item', flagName).should('be.visible')
})

// objects: {
//   type: 'file' | 'directory'
//   directories?: string[]
//   name: string
//   key: string
//   description?: string
// }[]
Cypress.Commands.add('prepareFlagResources', (objects) => {
  cy.visitMapResources('flags')
  objects.forEach(obj => {
    cy.backToHome('flags')
    if (obj.directories) cy.goDirectories('flags', obj.directories)
    if (obj.type === 'file') {
      cy.createFlag(obj.name, obj.key, obj.description)
    }
    if (obj.type === 'directory') {
      cy.createDirectory('flags', obj.name)
    }
  })
  cy.backToHome('flags')
})

// objects: {
//   type: 'file' | 'directory'
//   directories?: string[]
//   name: string
//   key: string
//   description?: string
// }[]
Cypress.Commands.add('flagResourcesShouldBe', (objects) => {
  cy.visitMapResources('flags')
  objects.forEach(obj => {
    cy.backToHome('flags')
    if (obj.directories) cy.goDirectories('flags', obj.directories)
    if (obj.type === 'file') {
      cy.contains('.resources__item', obj.name).find('img').should('be.visible')
      cy.flagShouldBeVisible(obj.name)
    }
    if (obj.type === 'directory') {
      cy.contains('.resources__item', obj.name).find('svg').should('be.visible')
    }
  })
})

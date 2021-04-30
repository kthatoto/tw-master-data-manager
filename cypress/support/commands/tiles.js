Cypress.Commands.add('createTile', (imageName, tileName, expectedMessage) => {
  cy.get('.el-tabs__header').contains('Tiles').click()
  cy.contains('tiles作成').click()
  cy.wait(100)
  cy.contains('.dialog.-tileCreate button', 'Image選択').click()
  cy.wait(100)
  cy.contains('.image-selector', imageName).find('img').click()
  cy.contains('.el-dialog .el-dialog__footer button', '選択').click()
  cy.wait(100)
  cy.get('.dialog.-tileCreate input.el-input__inner').clear().type(tileName)
  cy.contains('.dialog.-tileCreate button.el-button', '作成').click()
  cy.wait(100)
  if (expectedMessage) {
    cy.contains(expectedMessage).should('be.visible')
  }
})

Cypress.Commands.add('deleteTile', (tileName, expectedMessage) => {
  cy.get('.el-tabs__header').contains('Tiles').click()
  cy.contains('.resources__item', tileName).find('img').rightclick({ multiple: true })
  cy.wait(100)
  cy.contains('.dialog.-objectDelete button.el-button', '削除').click()
  cy.wait(100)
  if (expectedMessage) {
    cy.contains(expectedMessage).should('be.visible')
  }
})

Cypress.Commands.add('tileShouldBeVisible', (tileName, imageFixtureName) => {
  cy.get('.el-tabs__header').contains('Tiles').click()
  cy.fixture(imageFixtureName).then((imageSource) => {
    cy.contains('.resources__item', tileName)
      .find('img')
      .invoke('attr', 'src')
      .should('include', imageSource)
  })
})

// objects: {
//   type: 'file' | 'directory'
//   directories?: string[]
//   name: string
//   imageName?: string
// }[]
Cypress.Commands.add('prepareTileResources', (objects) => {
  cy.get('.el-tabs__header').contains('Tiles').click()
  objects.forEach(obj => {
    cy.backToHome()
    if (obj.directories) cy.goDirectories(obj.directories)
    if (obj.type === 'file') {
      cy.createTile(obj.imageName, obj.name)
    }
    if (obj.type === 'directory') {
      cy.createDirectory(obj.name)
    }
  })
  cy.backToHome()
})

// objects: {
//   type: 'file' | 'directory'
//   directories?: string[]
//   name: string
//   imageFixtureName?: string
// }[]
Cypress.Commands.add('tileResourcesShouldBe', (objects) => {
  cy.get('.el-tabs__header').contains('Tiles').click()
  objects.forEach(obj => {
    cy.backToHome()
    if (obj.directories) cy.goDirectories(obj.directories)
    if (obj.type === 'file') {
      cy.contains('.resources__item', obj.name).find('img').should('be.visible')
      cy.tileShouldBeVisible(obj.name, obj.imageFixtureName)
    }
    if (obj.type === 'directory') {
      cy.contains('.resources__item', obj.name).find('svg').should('be.visible')
    }
  })
})

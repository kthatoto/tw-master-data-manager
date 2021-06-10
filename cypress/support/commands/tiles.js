Cypress.Commands.add('createTile', (imageName, tileName, expectedMessage) => {
  cy.visitMapResources('tiles')
  cy.contains('tiles作成').click()
  cy.wait(100)
  cy.get('.dialog.-tileCreate .form__columns > .right .images').contains('.resources__item', imageName).find('img').click()
  cy.get('.dialog.-tileCreate .form__columns > .left .image-set-editor .console .row:nth-child(1) .cell:nth-child(1)').click()
  cy.get('.dialog.-tileCreate .form__columns > .left .image-set-editor .console .row:nth-child(1) .cell:nth-child(2)').click()
  cy.get('.dialog.-tileCreate .form__columns > .left .image-set-editor .console .row:nth-child(2) .cell:nth-child(1)').click()
  cy.get('.dialog.-tileCreate .form__columns > .left .image-set-editor .console .row:nth-child(2) .cell:nth-child(2)').click()
  cy.get('.dialog.-tileCreate input.el-input__inner').clear().type(tileName)
  cy.contains('.dialog.-tileCreate button.el-button', '作成').click()
  cy.wait(100)
  if (expectedMessage) {
    cy.contains(expectedMessage).should('be.visible')
  }
})

Cypress.Commands.add('editTile', (beforeTileName, tileName, imageName, expectedMessage) => {
  cy.visitMapResources('tiles')
  cy.contains(beforeTileName).dblclick()
  cy.wait(100)
  cy.get('.dialog.-tileEdit .form__columns > .right .images').contains('.resources__item', imageName).find('img').click()
  cy.get('.dialog.-tileEdit .form__columns > .left .image-set-editor .console .row:nth-child(1) .cell:nth-child(1)').click()
  cy.get('.dialog.-tileEdit .form__columns > .left .image-set-editor .console .row:nth-child(1) .cell:nth-child(2)').click()
  cy.get('.dialog.-tileEdit .form__columns > .left .image-set-editor .console .row:nth-child(2) .cell:nth-child(1)').click()
  cy.get('.dialog.-tileEdit .form__columns > .left .image-set-editor .console .row:nth-child(2) .cell:nth-child(2)').click()
  cy.get('.dialog.-tileEdit input.el-input__inner').clear().type(tileName)
  cy.contains('.dialog.-tileEdit button.el-button', '更新').click()
  cy.wait(100)
  if (expectedMessage) {
    cy.contains(expectedMessage).should('be.visible')
  }
})

Cypress.Commands.add('deleteTile', (tileName, expectedMessage) => {
  cy.visitMapResources('tiles')
  cy.get('.tiles').contains('.resources__item', tileName).find('.console-image').rightclick()
  cy.wait(100)
  cy.get('.tiles').contains('.dialog.-objectDelete button.el-button', '削除').click()
  cy.wait(100)
  if (expectedMessage) {
    cy.contains(expectedMessage).should('be.visible')
  }
})

Cypress.Commands.add('tileShouldBeVisible', (tileName, imageFixtureName) => {
  cy.visitMapResources('tiles')
  cy.fixture(imageFixtureName).then((imageSource) => {
    cy.get('.tiles')
      .contains('.resources__item', tileName)
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
  cy.visitMapResources('tiles')
  objects.forEach(obj => {
    cy.backToHome('tiles')
    if (obj.directories) cy.goDirectories('tiles', obj.directories)
    if (obj.type === 'file') {
      cy.createTile(obj.imageName, obj.name)
    }
    if (obj.type === 'directory') {
      cy.createDirectory('tiles', obj.name)
    }
  })
  cy.backToHome('tiles')
})

// objects: {
//   type: 'file' | 'directory'
//   directories?: string[]
//   name: string
//   imageFixtureName?: string
// }[]
Cypress.Commands.add('tileResourcesShouldBe', (objects) => {
  cy.visitMapResources('tiles')
  objects.forEach(obj => {
    cy.backToHome('tiles')
    if (obj.directories) cy.goDirectories('tiles', obj.directories)
    if (obj.type === 'file') {
      cy.get('.tiles').contains('.resources__item', obj.name).find('img').should('be.visible')
      cy.tileShouldBeVisible(obj.name, obj.imageFixtureName)
    }
    if (obj.type === 'directory') {
      cy.get('.tiles').contains('.resources__item', obj.name).find('svg').should('be.visible')
    }
  })
})

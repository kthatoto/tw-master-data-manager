Cypress.Commands.add('createImage', (imageFixtureName, imageName, expectedMessage) => {
  cy.visit('http://localhost:3000/map/images')
  cy.get('.el-tabs__header').contains('Images').click()
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
  cy.visit('http://localhost:3000/map/images')
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

Cypress.Commands.add('deleteImage', (imageName, expectedMessage) => {
  cy.visit('http://localhost:3000/map/images')
  cy.contains('.resources__item', imageName).find('img').rightclick({ multiple: true })
  cy.wait(100)
  cy.contains('.dialog.-objectDelete button.el-button', '削除').click()
  cy.wait(100)
  if (expectedMessage) {
    cy.contains(expectedMessage).should('be.visible')
  }
})

Cypress.Commands.add('imageShouldBeVisible', (imageName, imageFixtureName) => {
  cy.visit('http://localhost:3000/map/images')
  cy.fixture(imageFixtureName).then((imageSource) => {
    cy.contains('.resources__item', imageName)
      .find('img')
      .invoke('attr', 'src')
      .should('include', imageSource)
  })
})

// objects: {
//   type: 'file' | 'directory'
//   directories?: string[]
//   name: string
//   imageFixtureName?: string
// }[]
Cypress.Commands.add('prepareImageResources', (objects) => {
  cy.visit('http://localhost:3000/map/images')
  objects.forEach(obj => {
    cy.backToHome('images')
    if (obj.directories) cy.goDirectories('images', obj.directories)
    if (obj.type === 'file') {
      cy.createImage(obj.imageFixtureName, obj.name)
    }
    if (obj.type === 'directory') {
      cy.createDirectory('images', obj.name)
    }
  })
  cy.backToHome('images')
})

// objects: {
//   type: 'file' | 'directory'
//   directories?: string[]
//   name: string
//   imageFixtureName?: string
// }[]
Cypress.Commands.add('imageResourcesShouldBe', (objects) => {
  cy.visit('http://localhost:3000/map/images')
  objects.forEach(obj => {
    cy.backToHome('images')
    if (obj.directories) cy.goDirectories('images', obj.directories)
    if (obj.type === 'file') {
      cy.contains('.resources__item', obj.name).find('img').should('be.visible')
      cy.imageShouldBeVisible(obj.name, obj.imageFixtureName)
    }
    if (obj.type === 'directory') {
      cy.contains('.resources__item', obj.name).find('svg').should('be.visible')
    }
  })
})

context('Images Create', () => {
  context('Success', () => {
    it('creates an image', () => {
      const sampleImage = 'field1.png'
      cy.createImage(sampleImage)
      cy.wait(100)
      cy.contains('作成完了！').should('be.visible')

      cy.contains('sample.png').should('be.visible')
      cy.fixture(sampleImage).then((imageSource) => {
        cy.get('.resources__item img')
          .invoke('attr', 'src')
          .should('include', imageSource)
      })
    })

    it('creates an image under a directory', () => {
      const directoryName = 'fields'
      cy.createDirectory(directoryName)
      cy.wait(100)
      cy.get('.resources__item svg').dblclick()

      const sampleImage = 'field1.png'
      cy.createImage(sampleImage)
      cy.wait(100)
      cy.contains('作成完了！').should('be.visible')

      cy.contains('.nav .breadcrumb', directoryName).should('be.visible')
      cy.contains('sample.png').should('be.visible')
      cy.fixture(sampleImage).then((imageSource) => {
        cy.get('.resources__item img')
          .invoke('attr', 'src')
          .should('include', imageSource)
      })
    })
  })

  context('Failure', () => {
    it('fails to create an image because name is duplicate to another image', () => {
      const sampleImage = 'field1.png'
      cy.createImage(sampleImage)
      cy.wait(100)
      cy.contains('作成完了！').should('be.visible')

      cy.createImage(sampleImage)
      cy.wait(100)
      cy.contains('は既に存在してます').should('be.visible')
      cy.get('.resources__item').should('have.length', 1)
    })
  })
})

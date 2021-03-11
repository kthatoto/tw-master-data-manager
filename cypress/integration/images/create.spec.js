context('Images Create', () => {
  context('Success', () => {
    it('creates an image', () => {
      const sampleImage = 'field1.png'
      cy.createImage(sampleImage, 'sample', '作成完了！')
      cy.contains('sample.png').should('be.visible')
      cy.shouldVisibleImage('.resources__item img', sampleImage)
    })

    it('creates an image under a directory', () => {
      const directoryName = 'fields'
      cy.createDirectory(directoryName)
      cy.get('.resources__item svg').dblclick()

      const sampleImage = 'field1.png'
      cy.createImage(sampleImage, 'sample', '作成完了！')

      cy.contains('.nav .breadcrumb', directoryName).should('be.visible')
      cy.contains('sample.png').should('be.visible')
      cy.shouldVisibleImage('.resources__item img', sampleImage)
    })
  })

  context('Failure', () => {
    it('fails to create an image because name is duplicate to another image', () => {
      const sampleImage = 'field1.png'
      cy.createImage(sampleImage, 'sample', '作成完了！')
      cy.createImage(sampleImage, 'sample', 'は既に存在してます')
      cy.get('.resources__item').should('have.length', 1)
    })
  })
})

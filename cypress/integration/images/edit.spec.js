context('Images Edit', () => {
  context('Success', () => {
    it('edits an image', () => {
      const sampleImage = 'field1.png'
      cy.createImage(sampleImage, 'sample')

      const editImage = 'field2.png'
      cy.editImage('sample.png', editImage, 'sample2', '更新完了！')

      cy.contains('sample2.png').should('be.visible')
      cy.get('.resources__item').should('have.length', 1)
      cy.shouldVisibleImage('.resources__item img', editImage)
    })

    it('edits an image under a directory', () => {
      const directoryName = 'fields'
      cy.createDirectory(directoryName)
      cy.get('.resources__item svg').dblclick()

      const sampleImage = 'field1.png'
      cy.createImage(sampleImage, 'sample')

      const editImage = 'field2.png'
      cy.editImage('sample.png', editImage, 'sample2', '更新完了！')

      cy.contains('.nav .breadcrumb', directoryName).should('be.visible')
      cy.contains('sample2.png').should('be.visible')
      cy.shouldVisibleImage('.resources__item img', editImage)
    })
  })

  context('Failure', () => {
    it('fails to edit an image because name is duplicate to another image', () => {
      const sampleImage = 'field1.png'
      cy.createImage(sampleImage, 'sample')
      cy.createImage(sampleImage, 'sample2')

      const editImage = 'field2.png'
      cy.editImage('sample.png', editImage, 'sample2', 'は既に存在してます')

      cy.get('.resources__item').should('have.length', 2)
      cy.contains('sample.png').should('be.visible')
      cy.contains('sample2.png').should('be.visible')
    })
  })
})

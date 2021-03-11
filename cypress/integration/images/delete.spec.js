context('Images Delete', () => {
  context('Success', () => {
    it('deletes an image', () => {
      const sampleImage = 'field1.png'
      cy.createImage(sampleImage, 'sample')

      cy.deleteImage('.resources__item img', '削除完了！')
      cy.get('.resources__item').should('have.length', 0)
    })

    it('deletes an image under a directory', () => {
      const directoryName = 'fields'
      cy.createDirectory(directoryName)
      cy.get('.resources__item svg').dblclick()

      const sampleImage = 'field1.png'
      cy.createImage(sampleImage, 'sample')

      cy.deleteImage('.resources__item img', '削除完了！')
      cy.contains('.nav .breadcrumb', directoryName).should('be.visible')
      cy.get('.resources__item').should('have.length', 0)
    })
  })
})

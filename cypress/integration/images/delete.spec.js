const imageFixtureName = 'field1.png'
const imageName = 'sample'
const directoryName = 'fields'

context('Images Delete', () => {
  context('Success', () => {
    it('deletes an image', () => {
      cy.prepareImageResources([
        { type: 'file', name: imageName, imageFixtureName }
      ])

      cy.deleteImage(imageName, '削除完了！')

      cy.get('.resources__item').should('have.length', 0)
    })

    it('deletes an image under a directory', () => {
      cy.prepareImageResources([
        { type: 'directory', name: directoryName },
        { type: 'file', directories: [directoryName], name: imageName, imageFixtureName }
      ])

      cy.goDirectory(directoryName)
      cy.deleteImage(imageName, '削除完了！')

      cy.prepareImageResources([
        { type: 'directory', name: directoryName }
      ])
      cy.goDirectory(directoryName)
      cy.get('.resources__item').should('have.length', 0)
    })
  })
})

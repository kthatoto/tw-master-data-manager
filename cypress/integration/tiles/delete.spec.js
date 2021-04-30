const imageFixtureName = 'field1.png'
const imageName = 'sample'
const directoryName = 'fields'
const tileName = 'floor1'

context('Tiles Delete', () => {
  context('Success', () => {
    it('deletes a tile', () => {
      cy.prepareImageResources([
        { type: 'file', name: imageName, imageFixtureName }
      ])
      cy.prepareTileResources([
        { type: 'file', name: tileName, imageName }
      ])

      cy.deleteTile(tileName, '削除完了！')

      cy.get('.tiles .resources__item').should('have.length', 0)
    })

    it('deletes a tile under a directory', () => {
      cy.prepareImageResources([
        { type: 'file', name: imageName, imageFixtureName }
      ])
      cy.prepareTileResources([
        { type: 'directory', name: directoryName },
        { type: 'file', directories: [directoryName], name: tileName, imageName }
      ])

      cy.goDirectory(directoryName)
      cy.deleteTile(tileName, '削除完了！')

      cy.tileResourcesShouldBe([
        { type: 'directory', name: directoryName }
      ])
      cy.goDirectory(directoryName)
      cy.get('.tiles .resources__item').should('have.length', 0)
    })
  })
})

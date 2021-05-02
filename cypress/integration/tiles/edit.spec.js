const imageFixtureName = 'field1.png'
const imageName = 'sample'
const directoryName = 'fields'
const tileName = 'floor1'

const afterImageFixtureName = 'field2.png'
const afterImageName = 'testtest'
const afterTileName = 'floor2'

context('Tiles Edit', () => {
  context('Success', () => {
    it('edits a tile', () => {
      cy.prepareImageResources([
        { type: 'file', name: imageName, imageFixtureName },
        { type: 'file', name: afterImageName, imageFixtureName: afterImageFixtureName }
      ])
      cy.prepareTileResources([
        { type: 'file', name: tileName, imageName }
      ])

      cy.editTile(tileName, afterTileName, afterImageName, '更新完了！')

      cy.tileResourcesShouldBe([
        { type: 'file', name: afterTileName, imageFixtureName: afterImageFixtureName }
      ])
    })

    it('edits a tile under a directory', () => {
      cy.prepareImageResources([
        { type: 'file', name: imageName, imageFixtureName },
        { type: 'file', name: afterImageName, imageFixtureName: afterImageFixtureName }
      ])
      cy.prepareTileResources([
        { type: 'directory', name: directoryName },
        { type: 'file', directories: [directoryName], name: tileName, imageName }
      ])

      cy.goDirectory('tiles', directoryName)
      cy.editTile(tileName, afterTileName, afterImageName, '更新完了！')

      cy.tileResourcesShouldBe([
        { type: 'directory', name: directoryName },
        { type: 'file', directories: [directoryName], name: afterTileName, imageFixtureName: afterImageFixtureName }
      ])
    })
  })
})

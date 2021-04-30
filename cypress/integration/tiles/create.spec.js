const imageFixtureName = 'field1.png'
const imageName = 'sample'
const directoryName = 'fields'
const tileName = 'floor1'

context('Tiles Create', () => {
  context('Success', () => {
    it('creates a tile', () => {
      cy.prepareImageResources([
        { type: 'file', name: imageName, imageFixtureName }
      ])
      cy.createTile(imageName, tileName, '作成完了！')

      cy.tileResourcesShouldBe([
        { type: 'file', name: tileName, imageFixtureName }
      ])
    })

    it('creates a tile under a directory', () => {
      cy.prepareImageResources([
        { type: 'file', name: imageName, imageFixtureName }
      ])
      cy.prepareTileResources([
        { type: 'directory', name: directoryName }
      ])

      cy.goDirectory(directoryName)
      cy.createTile(imageName, tileName, '作成完了！')

      cy.tileResourcesShouldBe([
        { type: 'directory', name: directoryName },
        { type: 'file', directories: [directoryName], name: tileName, imageFixtureName }
      ])
    })
  })

  context('Failure', () => {
    it('fails to create a tile because name is duplicate to another tile', () => {
      cy.prepareImageResources([
        { type: 'file', name: imageName, imageFixtureName }
      ])
      cy.prepareTileResources([
        { type: 'file', name: tileName, imageName }
      ])

      cy.createTile(imageName, tileName, 'は既に存在してます')

      cy.tileResourcesShouldBe([
        { type: 'file', name: tileName, imageFixtureName }
      ])
    })
  })
})

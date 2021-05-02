const imageFixtureName = 'field1.png'
const imageName = 'sample'
const directoryName = 'fields'

context('Images Create', () => {
  context('Success', () => {
    it('creates an image', () => {
      cy.createImage(imageFixtureName, imageName, '作成完了！')

      cy.imageResourcesShouldBe([
        { type: 'file', name: imageName, imageFixtureName }
      ])
    })

    it('creates an image under a directory', () => {
      cy.prepareImageResources([
        { type: 'directory', name: directoryName }
      ])

      cy.goDirectory('images', directoryName)
      cy.createImage(imageFixtureName, imageName, '作成完了！')

      cy.imageResourcesShouldBe([
        { type: 'directory', name: directoryName },
        { type: 'file', directories: [directoryName], name: imageName, imageFixtureName }
      ])
    })
  })

  context('Failure', () => {
    it('fails to create an image because name is duplicate to another image', () => {
      cy.prepareImageResources([
        { type: 'file', name: imageName, imageFixtureName }
      ])

      cy.createImage(imageFixtureName, imageName, 'は既に存在してます')

      cy.imageResourcesShouldBe([
        { type: 'file', name: imageName, imageFixtureName }
      ])
    })
  })
})

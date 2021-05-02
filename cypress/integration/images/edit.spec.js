const imageFixtureName = 'field1.png'
const imageName = 'sample'
const directoryName = 'fields'

const afterImageFixtureName = 'field2.png'
const afterImageName = 'testtest'

context('Images Edit', () => {
  context('Success', () => {
    it('edits an image', () => {
      cy.prepareImageResources([
        { type: 'file', name: imageName, imageFixtureName }
      ])

      cy.editImage(imageName, afterImageFixtureName, afterImageName, '更新完了！')

      cy.imageResourcesShouldBe([
        { type: 'file', name: afterImageName, imageFixtureName: afterImageFixtureName }
      ])
    })

    it('edits an image under a directory', () => {
      cy.prepareImageResources([
        { type: 'directory', name: directoryName },
        { type: 'file', directories: [directoryName], name: imageName, imageFixtureName }
      ])

      cy.goDirectory('images', directoryName)
      cy.editImage(imageName, afterImageFixtureName, afterImageName, '更新完了！')

      cy.imageResourcesShouldBe([
        { type: 'directory', name: directoryName },
        { type: 'file', directories: [directoryName], name: afterImageName, imageFixtureName: afterImageFixtureName }
      ])
    })
  })
})

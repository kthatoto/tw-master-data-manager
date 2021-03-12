const imageFixtureName = 'field1.png'
const imageName = 'sample'
const imageFullName = 'sample.png'
const directoryName = 'fields'
const subDirectoryName = 'floors'

const afterDirectoryName = 'items'

context('Images Directories Edit', () => {
  context('Success', () => {
    it('edits a directory', () => {
      cy.prepareImageResources([
        { type: 'directory', name: directoryName }
      ])

      cy.editDirectory(directoryName, afterDirectoryName, '更新完了！')

      cy.prepareImageResources([
        { type: 'directory', name: afterDirectoryName }
      ])
      cy.get('.resources__item').should('have.length', 1)
    })

    it('edits a directory under a directory', () => {
      cy.prepareImageResources([
        { type: 'directory', name: directoryName },
        { type: 'directory', directories: [directoryName], name: subDirectoryName }
      ])

      cy.editDirectory(subDirectoryName, afterDirectoryName, '更新完了！')

      cy.imageResourcesShouldBe([
        { type: 'directory', name: directoryName },
        { type: 'directory', directories: [directoryName], name: afterDirectoryName }
      ])
    })

    it('edits a directory contains some items', () => {
      cy.prepareImageResources([
        { type: 'directory', name: directoryName },
        { type: 'directory', directories: [directoryName], name: subDirectoryName },
        { type: 'file', directories: [directoryName], name: imageName, imageFixtureName }
      ])

      cy.editDirectory(directoryName, afterDirectoryName, '更新完了！')

      cy.imageResourcesShouldBe([
        { type: 'directory', name: afterDirectoryName },
        { type: 'directory', directories: [afterDirectoryName], name: subDirectoryName },
        { type: 'file', directories: [afterDirectoryName], name: imageName, imageFixtureName }
      ])
    })
  })

  context('Failure', () => {
    it('fails to edit a directory because name is duplicate to another directory', () => {
      cy.prepareImageResources([
        { type: 'directory', name: directoryName },
        { type: 'directory', name: subDirectoryName }
      ])

      cy.editDirectory(subDirectoryName, directoryName, 'は既に存在してます')

      cy.imageResourcesShouldBe([
        { type: 'directory', name: directoryName },
        { type: 'directory', name: subDirectoryName }
      ])
    })

    it('fails to edit a directory because name is duplicate to an image', () => {
      cy.prepareImageResources([
        { type: 'directory', name: directoryName },
        { type: 'file', name: imageName, imageFixtureName }
      ])

      cy.editDirectory(directoryName, imageFullName, 'は既に存在してます')

      cy.imageResourcesShouldBe([
        { type: 'directory', name: directoryName },
        { type: 'file', name: imageName, imageFixtureName }
      ])
    })
  })
})

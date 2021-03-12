const directoryName = 'fields'
const subDirectoryName = 'floors'

context('Images Directories Delete', () => {
  context('Success', () => {
    it('deletes a empty directory', () => {
      cy.prepareImageResources([
        { type: 'directory', name: directoryName }
      ])

      cy.deleteDirectory(directoryName, '削除完了！')

      cy.get('.resources__item').should('have.length', 0)
    })

    it('deletes a empty directory under a directory', () => {
      cy.prepareImageResources([
        { type: 'directory', name: directoryName }
        { type: 'directory', directories: [directoryName], name: subDirectoryName }
      ])

      cy.deleteDirectory(subDirectoryName, '削除完了！')

      cy.imageResourcesShouldBe([
        { type: 'directory', name: directoryName }
      ])
      cy.goDirectory(directoryName)
      cy.get('.resources__item').should('have.length', 0)
    })
  })

  context('Failure', () => {
    it('fails to delete a directory because it contains some items', () => {
      cy.prepareImageResources([
        { type: 'directory', name: directoryName }
        { type: 'directory', directories: [directoryName], name: subDirectoryName }
      ])

      cy.deleteDirectory(directoryName, 'の中は空じゃないので消せません')

      cy.imageResourcesShouldBe([
        { type: 'directory', name: directoryName },
        { type: 'directory', directories: [directoryName], name: subDirectoryName }
      ])
    })
  })
})

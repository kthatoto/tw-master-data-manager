context('Images Directories Edit', () => {
  context('Success', () => {
    it('edits a directory', () => {
      const directoryName = 'fields'
      cy.createDirectory(directoryName)

      const newDirectoryName = 'fields2'
      cy.editDirectory(directoryName, newDirectoryName, '更新完了！')
      cy.contains(newDirectoryName).should('be.visible')
      cy.get('.resources__item').should('have.length', 1)
    })
  })
})

context('Images Directories Delete', () => {
  context('Success', () => {
    it('deletes a empty directory', () => {
      const directoryName = 'fields'
      cy.createDirectory(directoryName)
      cy.deleteDirectory(directoryName, '削除完了！')
    })

    it('deletes a empty directory under a directory', () => {
      const directoryName = 'fields'
      cy.createDirectory(directoryName)
      cy.get('.resources__item svg').dblclick()
      const subDirectoryName = 'subfields'
      cy.createDirectory(subDirectoryName)
      cy.contains('.nav .breadcrumb', directoryName).should('be.visible')
      cy.deleteDirectory(subDirectoryName, '削除完了！')
    })
  })

  context('Failure', () => {
    it('fails to delete a directory because it contains some items', () => {
      const directoryName = 'fields'
      cy.createDirectory(directoryName)
      cy.get('.resources__item svg').dblclick()
      const subDirectoryName = 'subfields'
      cy.createDirectory(subDirectoryName)
      cy.contains('.nav .breadcrumb', directoryName).should('be.visible')

      cy.backToHome()
      cy.deleteDirectory(directoryName, 'の中は空じゃないので消せません')
      cy.contains(directoryName).should('be.visible')
      cy.get('.resources__item').should('have.length', 1)
      cy.get('.resources__item svg').dblclick()
      cy.get('.resources__item').should('have.length', 1)
      cy.contains('.nav .breadcrumb', directoryName).should('be.visible')
      cy.contains(subDirectoryName).should('be.visible')
    })
  })
})

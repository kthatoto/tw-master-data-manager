context('Images Directories Create', () => {
  context('Success', () => {
    it('creates a directory', () => {
      const directoryName = 'fields'
      cy.createDirectory(directoryName, '作成完了！')
      cy.contains(directoryName).should('be.visible')
      cy.get('.resources__item').should('have.length', 1)
    })

    it('creates a directory under a directory', () => {
      const directoryName = 'fields'
      cy.createDirectory(directoryName)
      cy.get('.resources__item svg').dblclick()

      const directoryName2 = 'subfields'
      cy.createDirectory(directoryName2, '作成完了！')
      cy.contains('.nav .breadcrumb', directoryName).should('be.visible')
      cy.contains(directoryName2).should('be.visible')
      cy.get('.resources__item').should('have.length', 1)
    })
  })
})

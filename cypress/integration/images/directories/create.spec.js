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

  context('Failure', () => {
    it('fails to create a directory because name is duplicate to another directory', () => {
      const directoryName = 'fields'
      cy.createDirectory(directoryName)
      cy.createDirectory(directoryName, 'は既に存在してます')
      cy.get('.resources__item').should('have.length', 1)
    })

    it('fails to create a directory because name is duplicate to an image', () => {
      const sampleImage = 'field1.png'
      cy.createImage(sampleImage, 'sample')

      const directoryName = 'sample.png'
      cy.createDirectory(directoryName, 'は既に存在してます')
      cy.get('.resources__item').should('have.length', 1)
      cy.get('.resources__item img').should('have.length', 1)
    })
  })
})

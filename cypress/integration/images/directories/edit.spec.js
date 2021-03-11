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

    it('edits a directory under a directory', () => {
      const directoryName = 'fields'
      cy.createDirectory(directoryName)
      cy.get('.resources__item svg').dblclick()

      const subDirectoryName = 'subfields'
      const subDirectoryName2 = 'subfields2'
      cy.createDirectory(subDirectoryName)
      cy.editDirectory(subDirectoryName, subDirectoryName2, '更新完了！')
      cy.contains('.nav .breadcrumb', directoryName).should('be.visible')
      cy.contains(subDirectoryName).should('be.visible')
      cy.get('.resources__item').should('have.length', 1)
    })

    it('edits a directory contains some items', () => {
      const directoryName = 'fields'
      cy.createDirectory(directoryName)
      cy.get('.resources__item svg').dblclick()
      const childSampleImage = 'field1.png'
      const childSampleImageName = 'sample'
      cy.createImage(childSampleImage, childSampleImageName)
      const subDirectoryName = 'subfields'
      cy.createDirectory(subDirectoryName)

      cy.backToHome()
      const directoryName2 = 'fields2'
      cy.editDirectory(directoryName, directoryName2, '更新完了！')
      cy.get('.resources__item svg').dblclick()
      cy.contains('.nav .breadcrumb', directoryName2).should('be.visible')
      cy.get('.resources__item').should('have.length', 2)
      cy.get('.resources__item svg').should('have.length', 1)
      cy.get('.resources__item img').should('have.length', 1)
      cy.shouldVisibleImage('.resources__item img', childSampleImage)
      cy.contains(subDirectoryName).should('be.visible')
    })
  })

  context('Failure', () => {
    it('fails to edit a directory because name is duplicate to another directory', () => {
      const directoryName = 'fields'
      cy.createDirectory(directoryName)
      const directoryName2 = 'floors'
      cy.createDirectory(directoryName2)

      cy.editDirectory(directoryName2, directoryName, 'は既に存在してます')
      cy.contains(directoryName).should('be.visible')
      cy.contains(directoryName2).should('be.visible')
    })
  })
})

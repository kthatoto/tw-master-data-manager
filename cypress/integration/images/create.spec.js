context('Images Create', () => {
  context('Success', () => {
    it('creates an image', () => {
      const sampleImage = 'field1.png'
      cy.contains('images作成').click()
      cy.wait(100)
      cy.get('input[type="file"]').attachFile(sampleImage)
      cy.get('.dialog.-imageCreate input.el-input__inner').clear().type('sample')
      cy.wait(200)
      cy.contains('.dialog.-imageCreate button.el-button', '作成').click()
      cy.wait(100)
      cy.contains('作成完了！').should('be.visible')

      cy.contains('sample.png').should('be.visible')
      cy.fixture(sampleImage).then((imageSource) => {
        cy.get('.resources__item img')
          .invoke('attr', 'src')
          .should('include', imageSource)
      })
    })

    it('creates an image under a directory', () => {
      const directoryName = 'fields'
      cy.contains('フォルダ作成').click()
      cy.wait(100)
      cy.get('.dialog.-directoryCreate input.el-input__inner').type(directoryName)
      cy.contains('.dialog.-directoryCreate button.el-button', '作成').click()
      cy.get('.resources__item svg').dblclick()

      const sampleImage = 'field1.png'
      cy.contains('images作成').click()
      cy.wait(100)
      cy.get('input[type="file"]').attachFile(sampleImage)
      cy.get('.dialog.-imageCreate input.el-input__inner').clear().type('sample')
      cy.wait(100)
      cy.contains('.dialog.-imageCreate button.el-button', '作成').click()
      cy.wait(100)
      cy.contains('作成完了！').should('be.visible')

      cy.contains('.nav .breadcrumb', directoryName).should('be.visible')
      cy.contains('sample.png').should('be.visible')
      cy.fixture(sampleImage).then((imageSource) => {
        cy.get('.resources__item img')
          .invoke('attr', 'src')
          .should('include', imageSource)
      })
    })
  })

  context('Failure', () => {
    it('fails to create an image because name is duplicate to another image', () => {
      const sampleImage = 'field1.png'
      cy.contains('images作成').click()
      cy.wait(100)
      cy.get('input[type="file"]').attachFile(sampleImage)
      cy.get('.dialog.-imageCreate input.el-input__inner').clear().type('sample')
      cy.wait(200)
      cy.contains('.dialog.-imageCreate button.el-button', '作成').click()
      cy.wait(100)
      cy.contains('作成完了！').should('be.visible')

      cy.contains('images作成').click()
      cy.wait(100)
      cy.get('input[type="file"]').attachFile(sampleImage)
      cy.get('.dialog.-imageCreate input.el-input__inner').clear().type('sample')
      cy.wait(200)
      cy.contains('.dialog.-imageCreate button.el-button', '作成').click()
      cy.wait(100)
      cy.contains('は既に存在してます').should('be.visible')
      cy.get('.resources__item').should('have.length', 1)
    })
  })
})

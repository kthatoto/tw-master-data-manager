context('Images Delete', () => {
  context('Success', () => {
    it('deletes an image', () => {
      const sampleImage = 'field1.png'
      cy.contains('images作成').click()
      cy.wait(100)
      cy.get('.dialog.-imageCreate input[type="file"]').attachFile(sampleImage)
      cy.get('.dialog.-imageCreate input.el-input__inner').clear().type('sample')
      cy.contains('.dialog.-imageCreate button.el-button', '作成').click()
      cy.wait(100)

      cy.get('.resources__item img').rightclick()
      cy.wait(100)
      cy.contains('.dialog.-objectDelete button.el-button', '削除').click()
      cy.wait(100)
      cy.contains('削除完了！').should('be.visible')
      cy.get('.resources__item').should('have.length', 0)
    })

    it('deletes an image under a directory', () => {
      const directoryName = 'fields'
      cy.contains('フォルダ作成').click()
      cy.wait(100)
      cy.get('.dialog.-directoryCreate input.el-input__inner').type(directoryName)
      cy.contains('.dialog.-directoryCreate button.el-button', '作成').click()
      cy.wait(100)
      cy.get('.resources__item svg').dblclick()

      const sampleImage = 'field1.png'
      cy.contains('images作成').click()
      cy.wait(100)
      cy.get('.dialog.-imageCreate input[type="file"]').attachFile(sampleImage)
      cy.get('.dialog.-imageCreate input.el-input__inner').clear().type('sample')
      cy.contains('.dialog.-imageCreate button.el-button', '作成').click()
      cy.wait(100)

      cy.get('.resources__item img').rightclick()
      cy.contains('.dialog.-objectDelete button.el-button', '削除').click()
      cy.wait(100)
      cy.contains('削除完了！').should('be.visible')
      cy.contains('.nav .breadcrumb', directoryName).should('be.visible')
      cy.get('.resources__item').should('have.length', 0)
    })
  })
})

context('Images Edit', () => {
  context('Success', () => {
    it('edits an image', () => {
      const sampleImage = 'field1.png'
      cy.contains('images作成').click()
      cy.wait(100)
      cy.get('.dialog.-imageCreate input[type="file"]').attachFile(sampleImage)
      cy.get('.dialog.-imageCreate input.el-input__inner').clear().type('sample')
      cy.contains('.dialog.-imageCreate button.el-button', '作成').click()

      const editImage = 'field2.png'
      cy.contains('sample.png').dblclick()
      cy.wait(100)
      cy.get('.dialog.-imageEdit input[type="file"]').attachFile(editImage)
      cy.get('.dialog.-imageEdit input.el-input__inner').clear().type('sample2')
      cy.contains('.dialog.-imageEdit button.el-button', '更新').click()
      cy.wait(100)
      cy.contains('更新完了！').should('be.visible')

      cy.contains('sample2.png').should('be.visible')
      cy.get('.resources__item').should('have.length', 1)
      cy.fixture(editImage).then((imageSource) => {
        cy.get('.resources__item img')
          .invoke('attr', 'src')
          .should('include', imageSource)
      })
    })

    it('edits an image under a directory', () => {
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

      const editImage = 'field2.png'
      cy.contains('sample.png').dblclick()
      cy.wait(100)
      cy.get('.dialog.-imageEdit input[type="file"]').attachFile(editImage)
      cy.get('.dialog.-imageEdit input.el-input__inner').clear().type('sample2')
      cy.contains('.dialog.-imageEdit button.el-button', '更新').click()
      cy.wait(100)
      cy.contains('更新完了！').should('be.visible')

      cy.contains('.nav .breadcrumb', directoryName).should('be.visible')
      cy.contains('sample2.png').should('be.visible')
      cy.fixture(editImage).then((imageSource) => {
        cy.get('.resources__item img')
          .invoke('attr', 'src')
          .should('include', imageSource)
      })
    })
  })

  context('Failure', () => {
    it('fails to edit an image because name is duplicate to another image', () => {
      const sampleImage = 'field1.png'
      cy.contains('images作成').click()
      cy.wait(100)
      cy.get('.dialog.-imageCreate input[type="file"]').attachFile(sampleImage)
      cy.get('.dialog.-imageCreate input.el-input__inner').clear().type('sample')
      cy.contains('.dialog.-imageCreate button.el-button', '作成').click()

      cy.contains('images作成').click()
      cy.wait(100)
      cy.get('.dialog.-imageCreate input[type="file"]').attachFile(sampleImage)
      cy.get('.dialog.-imageCreate input.el-input__inner').clear().type('sample2')
      cy.contains('.dialog.-imageCreate button.el-button', '作成').click()

      const editImage = 'field2.png'
      cy.contains('sample.png').dblclick()
      cy.wait(100)
      cy.get('.dialog.-imageEdit input[type="file"]').attachFile(editImage)
      cy.get('.dialog.-imageEdit input.el-input__inner').clear().type('sample2')
      cy.contains('.dialog.-imageEdit button.el-button', '更新').click()
      cy.wait(100)
      cy.contains('は既に存在してます').should('be.visible')

      cy.get('.resources__item').should('have.length', 2)
      cy.contains('sample.png').should('be.visible')
      cy.contains('sample2.png').should('be.visible')
    })
  })
})

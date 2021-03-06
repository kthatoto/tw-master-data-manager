context('Images Edit', () => {
  context('Success', () => {
    it('edits an image', () => {
      const sampleImage = 'field1.png'
      cy.contains('images作成').click()
      cy.wait(100)
      cy.get('input[type="file"]').attachFile()
      cy.get('.dialog.-imageCreate input.el-input__inner').clear().type('sample')
      cy.wait(100)
      cy.contains('.dialog.-imageCreate button.el-button', '作成').click()

      cy.contains('sample.png').dblclick()
    })
  })
})

context('Images Create', () => {
  it('creates an image', () => {
    const sampleImage = 'chrome.png'
    cy.contains('images作成')
      .click()
    cy.wait(200)
    cy.get('input[type="file"]').attachFile(sampleImage)
    cy.get('.dialog input.el-input__inner')
      .clear()
      .type('sample')
    cy.wait(200)
    cy.contains('.dialog button.el-button', '作成').click()
    cy.wait(100)
    cy.contains('作成完了！').should('be.visible')
    cy.contains('sample.png').should('be.visible')
    cy.fixture(sampleImage).then((imageSource) => {
      cy.get('.resources__item img').should('have.attr', 'src', imageSource)
    })
  })
})

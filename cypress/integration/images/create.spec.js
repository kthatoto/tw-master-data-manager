context('Images Create', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
  })

  it('create an image', () => {
    cy.contains('images作成')
      .click()
    cy.wait(200)
    cy.get('input[type="file"]').attachFile('chrome.png')
    cy.wait(200)
    cy.contains('.dialog button.el-button', '作成').click()
    cy.wait(100)
    cy.contains('作成完了！').should('be.visible')
  })
})

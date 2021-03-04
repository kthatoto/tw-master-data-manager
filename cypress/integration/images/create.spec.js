context('Images Create', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
  })

  it('create an image', () => {
    cy.contains('images作成')
      .click()
    cy.wait(500)
    cy.fixture('chrome.png').then(fileContent => {
      cy.get('input[type="file"]').attachFile({
        fileContent: fileContent.toString(),
        fileName: 'chrome.png',
        mimeType: 'image/png'
      })
    })
  })
})

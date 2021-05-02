const imageFixtureName = 'field1.png'
const imageName = 'sample'
const imageFullName = 'sample.png'
const directoryName = 'fields'
const subDirectoryName = 'floors'

context('Images Directories Create', () => {
  context('Success', () => {
    it('creates a directory', () => {
      cy.createDirectory(directoryName, '作成完了！')

      cy.imageResourcesShouldBe([
        { type: 'directory', name: directoryName }
      ])
    })

    it('creates a directory under a directory', () => {
      cy.prepareImageResources([
        { type: 'directory', name: directoryName }
      ])

      cy.goDirectory('images', directoryName)
      cy.createDirectory(subDirectoryName, '作成完了！')

      cy.imageResourcesShouldBe([
        { type: 'directory', name: directoryName },
        { type: 'directory', directories: [directoryName], name: subDirectoryName }
      ])
    })
  })

  context('Failure', () => {
    it('fails to create a directory because name is duplicate to another directory', () => {
      cy.prepareImageResources([
        { type: 'directory', name: directoryName }
      ])

      cy.createDirectory(directoryName, 'は既に存在してます')

      cy.imageResourcesShouldBe([
        { type: 'directory', name: directoryName }
      ])
      cy.get('.resources__item').should('have.length', 1)
    })

    it('fails to create a directory because name is duplicate to an image', () => {
      cy.prepareImageResources([
        { type: 'file', name: imageName, imageFixtureName }
      ])

      cy.createDirectory(imageFullName, 'は既に存在してます')

      cy.imageResourcesShouldBe([
        { type: 'file', name: imageName, imageFixtureName }
      ])
      cy.get('.resources__item').should('have.length', 1)
    })
  })
})

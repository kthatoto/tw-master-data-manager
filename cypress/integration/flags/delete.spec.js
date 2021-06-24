const flagName = 'フラグ1'
const flagKey = 'flag1'
const flagDescription = 'フラグ1です。'
const flagParams = { name: flagName, key: flagKey, description: flagDescription }
const directoryName = 'flags'

context('Flags Delete', () => {
  context('Success', () => {
    it('deletes a flag', () => {
      cy.prepareFlagResources([
        { type: 'file', ...flagParams }
      ])

      cy.deleteFlag(flagName, '削除完了！')

      cy.get('.flags .resources__item').should('have.length', 0)
    })

    it('deletes a flag under a directory', () => {
      cy.prepareFlagResources([
        { type: 'directory', name: directoryName },
        { type: 'file', directories: [directoryName], ...flagParams }
      ])

      cy.goDirectory('flags', directoryName)
      cy.deleteFlag(flagName, '削除完了！')

      cy.flagResourcesShouldBe([
        { type: 'directory', name: directoryName }
      ])
      cy.goDirectory('flags', directoryName)
      cy.get('.flags .resources__item').should('have.length', 0)
    })
  })
})

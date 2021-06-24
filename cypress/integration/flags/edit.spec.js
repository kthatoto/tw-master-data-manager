const flagName = 'フラグ1'
const flagKey = 'flag1'
const flagDescription = 'フラグ1です。'
const flagParams = { name: flagName, key: flagKey, description: flagDescription }
const directoryName = 'flags'

const afterFlagName = 'フラグ2'
const afterFlagKey = 'flag2'
const afterFlagDescription = 'フラグ2です。'
const afterFlagParams = { name: afterFlagName, key: afterFlagKey, description: afterFlagDescription }

context('Flags Edit', () => {
  context('Success', () => {
    it('edits a flag', () => {
      cy.prepareFlagResources([
        { type: 'file', ...flagParams }
      ])

      cy.createFlag(flagName, afterFlagName, afterFlagKey, afterFlagDescription, '更新完了！')

      cy.flagResourcesShouldBe([
        { type: 'file', ...afterFlagParams }
      ])
    })

    it('edits a flag under a directory', () => {
      cy.prepareFlagResources([
        { type: 'directory', name: directoryName },
        { type: 'file', directories: [directoryName], ...flagParams }
      ])

      cy.goDirectory('flags', directoryName)
      cy.createFlag(flagName, afterFlagName, afterFlagKey, afterFlagDescription, '更新完了！')

      cy.flagResourcesShouldBe([
        { type: 'directory', name: directoryName },
        { type: 'file', directories: [directoryName], ...afterFlagParams }
      ])
    })
  })
})

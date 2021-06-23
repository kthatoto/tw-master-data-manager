const flagName = 'フラグ1'
const flagKey = 'flag1'
const flagDescription = 'フラグ1です。'
const directoryName = 'flags'

context('Flags Create', () => {
  context('Success', () => {
    it('creates a flag', () => {
      cy.createFlag(flagName, flagKey, flagDescription, '作成完了！')

      cy.flagResourcesShouldBe([
        { type: 'file', name: flagName, key: flagKey, description: flagDescription }
      ])
    })

    it('creates a flag under a directory', () => {
      cy.prepareFlagResources([
        { type: 'directory', name: directoryName }
      ])

      cy.goDirectory('flags', directoryName)
      cy.createFlag(flagName, flagKey, flagDescription, '作成完了！')

      cy.flagResourcesShouldBe([
        { type: 'directory', name: directoryName },
        { type: 'file', directories: [directoryName], name: flagName, key: flagKey, description: flagDescription }
      ])
    })
  })

  context('Failure', () => {
    it('fails to create a flag because name is duplicate to another flag', () => {
      cy.prepareFlagResources([
        { type: 'file', name: flagName, key: flagKey, description: flagDescription }
      ])

      cy.createFlag(flagName, flagKey, flagDescription, 'は既に存在してます')

      cy.flagResourcesShouldBe([
        { type: 'file', name: flagName, key: flagKey, description: flagDescription }
      ])
    })
  })
})

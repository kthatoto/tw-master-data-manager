import { ResourceModel } from '~server/index.ts'
import DirectoryModel, { DirectoryDocument } from '~server/models/directory'

export default async <ResourceDocument>(directoryNames: string[], resourceModel: ResourceModel) => {
  const resources: ResourceDocument[] = []
  const parentDirectories: DirectoryDocument[] = []

  let notFound = false
  directoryNames.forEach(async (directoryName: string) => {
    if (notFound) return
    const parentDirectory: DirectoryDocument | undefined = parentDirectories[parentDirectories.length - 1]
    const directoryId = parentDirectory ? parentDirectory.id : null
    const directoryDocument: DirectoryDocument | null = await DirectoryModel.findOne({ directoryId, name: directoryName })
    if (!directoryDocument) {
      notFound = true
      return
    }
    parentDirectories.push(directoryDocument)
  })

  if (!notFound && parentDirectories.length > 0) {
    const resourceDocuments: ResourceDocument[] = await resourceModel.find({
      directoryId: parentDirectories[parentDirectories.length - 1].id
    })
    resources.splice(0, 0, ...resourceDocuments)
  }

  return {
    resources,
    parentDirectories
  }
}

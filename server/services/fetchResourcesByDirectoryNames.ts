import { ResourceModel, ResourceType } from '../index'
import DirectoryModel, { DirectoryDocument } from '../models/directory'

export default async <ResourceDocument>(directoryNames: string[], resourceModel: ResourceModel, resourceType: ResourceType) => {
  const resources: ResourceDocument[] = []
  const parentDirectories: DirectoryDocument[] = []

  let notFound = false
  for (const directoryName of directoryNames) {
    if (!notFound) {
      const parentDirectory: DirectoryDocument | undefined = parentDirectories[parentDirectories.length - 1]
      const directoryId = parentDirectory ? parentDirectory.id : null
      const directoryDocument: DirectoryDocument | null = await DirectoryModel.findOne({
        directoryId, resourceType, name: directoryName
      })
      if (!directoryDocument) {
        notFound = true
      } else {
        parentDirectories.push(directoryDocument)
      }
    }
  }

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

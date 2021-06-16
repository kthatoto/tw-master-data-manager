import { Request, Response } from 'express'

import { ResourceModel, ResourceType } from '../index'
import DirectoryModel, { DirectoryDocument } from '../models/directory'

import fetchResourcesByDirectoryNames from '../services/fetchResourcesByDirectoryNames'

export default async <ResourceDocument>(
  req: Request,
  res: Response,
  resourceModel: ResourceModel,
  resourceType: ResourceType,
  resourceReducer: (resource: ResourceDocument) => any
) => {
  const directoryId: string | undefined = (req.query.directoryId || undefined) as string | undefined
  const directoryNamesString: string | undefined = (req.query.directoryNames || undefined) as string | undefined
  const directoryNames: string[] | undefined = directoryNamesString ? directoryNamesString.split(':').filter(d => d) : undefined

  const resources: ResourceDocument[] = []
  const parentDirectories: DirectoryDocument[] = []
  const directories: DirectoryDocument[] = []

  if (directoryId || !directoryNames || directoryNames.length === 0) {
    resources.splice(0, 0, ...(await resourceModel.find({ directoryId })))
    directories.splice(0, 0, ...(await DirectoryModel.find({ directoryId, resourceType })))
  } else {
    const res = await fetchResourcesByDirectoryNames<ResourceDocument>(directoryNames, resourceModel, resourceType)
    resources.splice(0, 0, ...res.resources)
    parentDirectories.splice(0, 0, ...res.parentDirectories)
    const directoriesDirectoryId = parentDirectories[parentDirectories.length - 1].id
    directories.splice(0, 0,
      ...(await DirectoryModel.find({ directoryId: directoriesDirectoryId, resourceType }))
    )
  }

  const response: any = {}
  response.resources = resources.map(resourceReducer)
  const directoryReducer = (directory: DirectoryDocument) => {
    return { id: directory.id, name: directory.name }
  }
  response.directories = directories.map(directoryReducer)
  if (parentDirectories.length > 0) {
    response.parentDirectories = parentDirectories.map(directoryReducer)
  }

  return response
}

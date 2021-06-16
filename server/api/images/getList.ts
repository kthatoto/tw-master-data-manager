import { Application, Request, Response } from 'express'

import { ImagesResponse } from '~domains/images.ts'
import ImageModel, { ImageDocument } from '../../models/image'
import DirectoryModel, { DirectoryDocument } from '../../models/directory'

import fetchResourcesByDirectoryNames from '../../services/fetchResourcesByDirectoryNames'

export default (app: Application, method: 'get', path: string) => {
  app[method](path, async (req: Request, res: Response<ImagesResponse>) => {
    const directoryId: string | undefined = (req.query.directoryId || undefined) as string | undefined
    const directoryNamesString: string | undefined = (req.query.directoryNames || undefined) as string | undefined
    const directoryNames: string[] | undefined = directoryNamesString ? directoryNamesString.split(':').filter(d => d) : undefined

    const images: ImageDocument[] = []
    const parentDirectories: DirectoryDocument[] = []
    const directories: DirectoryDocument[] = []

    if (directoryId || !directoryNames || directoryNames.length === 0) {
      images.splice(0, 0, ...(await ImageModel.find({ directoryId })))
      directories.splice(0, 0, ...(await DirectoryModel.find({ directoryId, resourceType: 'images' })))
    } else {
      const res = await fetchResourcesByDirectoryNames<ImageDocument>(directoryNames, ImageModel, 'images')
      images.splice(0, 0, ...res.resources)
      parentDirectories.splice(0, 0, ...res.parentDirectories)
      const directoriesDirectoryId = parentDirectories[parentDirectories.length - 1].id
      directories.splice(0, 0,
        ...(await DirectoryModel.find({ directoryId: directoriesDirectoryId, resourceType: 'images' }))
      )
    }

    const response: any = {}
    response.resources = images.map((image: ImageDocument) => {
      return { id: image.id, name: image.name, data: image.data }
    })
    response.directories = directories.map((directory: DirectoryDocument) => {
      return { id: directory.id, name: directory.name }
    })
    if (parentDirectories.length > 0) {
      response.parentDirectories = parentDirectories.map((directory: DirectoryDocument) => {
        return { directoryId: directory.id, name: directory.name }
      })
    }

    res.send(response)
  })
}

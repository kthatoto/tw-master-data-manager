import { Application, Request, Response } from 'express'

import { ImagesResponse } from '~domains/images.ts'
import ImageModel, { ImageDocument } from '../../models/image'
import DirectoryModel, { DirectoryDocument } from '../../models/directory'

import fetchResourcesByDirectoryNames from '~server/services/fetchResourcesByDirectoryNames.ts'

export default (app: Application, method: 'get', path: string) => {
  app[method](path, async (req: Request, res: Response<ImagesResponse>) => {
    const directoryId: string | undefined = (req.query.directoryId || undefined) as string | undefined
    const directoryNamesString: string | undefined = (req.query.directoryNames || undefined) as string | undefined
    const directoryNames: string[] | undefined = directoryNamesString ? directoryNamesString.split(':').filter(d => d) : undefined

    const images: ImageDocument[] = []
    const parentDirectories: DirectoryDocument[] = []

    if (directoryId || !directoryNames) {
      images.concat(await ImageModel.find({ directoryId }))
    } else {
      const res = await fetchResourcesByDirectoryNames<ImageDocument>(directoryNames, ImageModel)
      images.splice(0, 0, ...res.resources)
      parentDirectories.splice(0, 0, ...res.parentDirectories)
    }

    const responseImages = images.map((image: ImageDocument) => {
      return {
        id: image.id,
        name: image.name,
        data: image.data
      }
    })

    const directories: DirectoryDocument[] = await DirectoryModel.find({ directoryId, resourceType: 'images' })
    const responseDirectories = directories.map((directory: DirectoryDocument) => {
      return {
        id: directory.id,
        name: directory.name
      }
    })

    res.send({
      resources: responseImages,
      directories: responseDirectories
    })
  })
}

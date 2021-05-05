import { Application, Request, Response } from 'express'

import { ImagesResponse } from '~domains/images.ts'
import ImageModel, { ImageDocument } from '../../models/image'
import DirectoryModel, { DirectoryDocument } from '../../models/directory'

export default (app: Application, method: 'get', path: string) => {
  app[method](path, async (req: Request, res: Response<ImagesResponse>) => {
    const directoryId: string | undefined = (req.query.directoryId || undefined) as string | undefined

    const images: ImageDocument[] = await ImageModel.find({ directoryId })
    const responseImages = images.map((image: ImageDocument) => {
      return {
        id: image.id,
        name: image.name,
        data: image.data
      }
    })

    const directories: DirectoryDocument[] = await DirectoryModel.find({ directoryId })
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

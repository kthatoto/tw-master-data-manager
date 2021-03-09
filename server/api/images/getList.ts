import { Application, Request, Response } from 'express'

import { ImagesResponse } from '~domains/images.ts'
import Image, { IImage } from '../../models/image'

export default (app: Application, method: 'get', path: string) => {
  app[method](path, async (req: Request, res: Response<ImagesResponse>) => {
    const response: ImagesResponse = { resources: [], directories: [] }
    const directoryPath: string = req.query.directory as string

    const images: IImage[] = await Image.find({ path: directoryPath })
    images.forEach((image: IImage) => {
      if (image.objectType === 'file') {
        response.resources.push({
          path: image.path,
          name: image.name,
          data: image.data
        })
      } else if (image.objectType === 'directory') {
        response.directories.push({
          path: image.path,
          name: image.name
        })
      }
    })
    res.send(response)
  })
}

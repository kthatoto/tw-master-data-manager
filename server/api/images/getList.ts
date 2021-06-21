import { Application, Request, Response } from 'express'

import { ImagesResponse } from '~domains/images.ts'
import ImageModel, { ImageDocument } from '../../models/image'

import getList from '../../services/getList'

export default (app: Application, method: 'get', path: string) => {
  app[method](path, async (req: Request, res: Response<ImagesResponse>) => {
    const response = await getList<ImageDocument>(
      req,
      res,
      ImageModel,
      'images',
      (_: any) => {
        return (resource: ImageDocument) => {
          return { id: resource.id, name: resource.name, data: resource.data }
        }
      }
    )
    res.send(response)
  })
}

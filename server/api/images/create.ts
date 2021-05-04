import { Application, Request, Response } from 'express'

import { DefaultResponseBody } from '~server/api/index'
import ImageModel from '../../models/image'

export interface ImagesCreateRequestBody {
  name: string
  data: string
  directoryId?: string
}

export default (app: Application, method: 'post', path: string) => {
  app[method](path, async (req: Request<any, any, ImagesCreateRequestBody>, res: Response<DefaultResponseBody>) => {
    const { name, data, directoryId } = req.body

    const already: boolean = await ImageModel.exists({ name, directoryId })
    if (already) {
      res.send({ message: `「${name}」は既に存在してます` })
      return
    }
    const newImage = new ImageModel({ name, data, directoryId })
    await newImage.save()
    res.send(null)
  })
}

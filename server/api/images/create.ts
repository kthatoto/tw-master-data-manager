import { Application, Request, Response } from 'express'

import { ResponseMessage, DefaultResponseBody } from '~server/api/index'
import Image from '../../models/image'

export interface ImagesCreateRequestBody {
  path: string
  name: string
  data: string
}

export default (app: Application, method: 'post', path: string) => {
  app[method](path, async (req: Request<any, any, ImagesCreateRequestBody>, res: Response<DefaultResponseBody>) => {
    const { path, name, data } = req.body

    const already: boolean = await Image.exists({ path, name })
    if (already) {
      res.send({ message: `「${path}${name}」は既に存在してます` })
      return
    }
    const newImage = new Image({ name, path, data, objectType: 'file' })
    await newImage.save()
    res.send(null)
  })
}

import { Application, Request, Response } from 'express'

import { DefaultResponseBody } from '~server/api/index'
import Image from '../../models/image'

export interface ImagesEditRequestBody {
  path: string
  id: string
  beforeName: string
  name: string
  data: string
}

export default (app: Application, method: 'patch', path: string) => {
  app[method](path, async (req: Request<any, any, ImagesEditRequestBody>, res: Response<DefaultResponseBody>) => {
    const { path, id, beforeName, name, data } = req.body

    const target: boolean = await Image.exists({ path, name: beforeName, objectType: 'file' })
    if (!target) {
      res.send({ message: `「${path}${beforeName}」は存在しません` })
      return
    }
    await Image.findByIdAndUpdate(id, { $set: { name, data } })
    res.send(null)
  })
}

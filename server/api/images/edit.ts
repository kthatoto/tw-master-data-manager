import { Application, Request, Response } from 'express'

import { DefaultResponseBody } from '~server/api/index'
import ImageModel from '../../models/image'

export interface ImagesEditRequestBody {
  id: string
  name: string
  data: string
  directoryId?: string
}

export default (app: Application, method: 'patch', path: string) => {
  app[method](path, async (req: Request<any, any, ImagesEditRequestBody>, res: Response<DefaultResponseBody>) => {
    const { id, name, data, directoryId } = req.body

    const target: boolean = await ImageModel.exists({ id })
    if (!target) {
      res.send({ message: `image(id:${id})が見つかりませんでした` })
      return
    }
    await ImageModel.findByIdAndUpdate(id, { $set: { name, data, directoryId } })
    res.send(null)
  })
}

import { Application, Request, Response } from 'express'

import { DefaultResponseBody } from '~server/api/index'
import TileModel from '../../models/tile'

export interface TilesEditRequestBody {
  id: string
  name: string
  collision: boolean
  imageId: string
  directoryId?: string
}

export default (app: Application, method: 'patch', path: string) => {
  app[method](path, async (req: Request<any, any, TilesEditRequestBody>, res: Response<DefaultResponseBody>) => {
    const { id, name, collision, imageId, directoryId } = req.body

    const target: boolean = await TileModel.exists({ name, directoryId })
    if (!target) {
      res.send({ message: `tile(id:${id})が見つかりませんでした` })
      return
    }
    await TileModel.findByIdAndUpdate(id, { $set: { name, collision, imageId, directoryId } })
    res.send(null)
  })
}

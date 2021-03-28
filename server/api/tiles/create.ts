import { Application, Request, Response } from 'express'
import { Types } from 'mongoose'

import { DefaultResponseBody } from '~server/api/index'
import Tile from '../../models/tile'

export interface TilesCreateRequestBody {
  path: string
  name: string
  collision: boolean
  imageId: Types.ObjectId
}

export default (app: Application, method: 'post', path: string) => {
  app[method](path, async (req: Request<any, any, TilesCreateRequestBody>, res: Response<DefaultResponseBody>) => {
    const { path, name, collision, imageId } = req.body

    const already: boolean = await Tile.exists({ path, name })
    if (already) {
      res.send({ message: `「${path}${name}」は既に存在してます` })
      return
    }
    const newTile = new Tile({ name, path, collision, imageId, objectType: 'file' })
    await newTile.save()
    res.send(null)
  })
}

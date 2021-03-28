import { Application, Request, Response } from 'express'
import { Types } from 'mongoose'

import { DefaultResponseBody } from '~server/api/index'
import Tile from '../../models/tile'

export interface TilesEditRequestBody {
  path: string
  id: string
  beforeName: string
  name: string
  collision: boolean
  imageId: Types.ObjectId
}

export default (app: Application, method: 'patch', path: string) => {
  app[method](path, async (req: Request<any, any, TilesEditRequestBody>, res: Response<DefaultResponseBody>) => {
    const { path, id, beforeName, name, collision, imageId } = req.body

    const target: boolean = await Tile.exists({ path, name: beforeName, objectType: 'file' })
    if (!target) {
      res.send({ message: `「${path}${beforeName}」は存在しません` })
      return
    }
    const already: boolean = await Tile.exists({ path, name, objectType: 'file' })
    if (already) {
      res.send({ message: `「${path}${name}」は既に存在してます` })
      return
    }
    await Tile.findByIdAndUpdate(id, { $set: { name, collision, imageId } })
    res.send(null)
  })
}

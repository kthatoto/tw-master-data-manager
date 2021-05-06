import { Application, Request, Response } from 'express'

import { DefaultResponseBody } from '~server/api/index'
import TileModel from '../../models/tile'

export interface TilesCreateRequestBody {
  name: string
  images: {
    [x: number]: {
      [y: number]: {
        id: string
        collision: boolean
      }
    }
  }
  directoryId?: string
}

export default (app: Application, method: 'post', path: string) => {
  app[method](path, async (req: Request<any, any, TilesCreateRequestBody>, res: Response<DefaultResponseBody>) => {
    const { name, images, directoryId } = req.body

    const already: boolean = await TileModel.exists({ name, directoryId })
    if (already) {
      res.send({ message: `「${name}」は既に存在してます` })
      return
    }
    const newTile = new TileModel({ name, images, directoryId })
    await newTile.save()
    res.send(null)
  })
}

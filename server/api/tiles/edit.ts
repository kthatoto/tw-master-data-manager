import { Application, Request, Response } from 'express'

import { DefaultResponseBody } from '~server/api/index'
import TileModel from '../../models/tile'

export interface TilesEditRequestBody {
  id: string
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

export default (app: Application, method: 'patch', path: string) => {
  app[method](path, async (req: Request<any, any, TilesEditRequestBody>, res: Response<DefaultResponseBody>) => {
    const { id, name, images, directoryId } = req.body

    const target: boolean = await TileModel.exists({ _id: id })
    if (!target) {
      res.send({ message: `tile(id:${id})が見つかりませんでした` })
      return
    }
    const imagesValue = Object.keys(images).reduce(
      (acc: { x: number, y: number, id: string, collision: boolean }[], x: string) => {
        const nx = Number(x)
        Object.keys(images[nx]).forEach((y: string) => {
          const ny = Number(y)
          acc.push({
            x: nx,
            y: ny,
            id: images[nx][ny].id,
            collision: images[nx][ny].collision,
          })
        })
        return acc
      },
      []
    )
    await TileModel.findByIdAndUpdate(id, {
      $set: {
        name,
        images: imagesValue,
        directoryId
      }
    })
    res.send(null)
  })
}
